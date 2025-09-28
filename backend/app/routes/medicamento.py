"""
routes/medicamentos.py
---------------------
Rutas CRUD para medicamentos.
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.medicamento import Medicamento
from app.models.tratamiento import Tratamiento
from app.schemas.medicamento import MedicamentoCreate, MedicamentoOut, MedicamentoUpdate
from app.services.alarma_service import AlarmaService

router = APIRouter()

@router.post("/", response_model=MedicamentoOut)
def crear_medicamento(
    medicamento: MedicamentoCreate, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """Crear un nuevo medicamento y generar alarmas automáticamente"""
    # Verificar que el tratamiento existe
    tratamiento = db.query(Tratamiento).filter(Tratamiento.ID_TRATAMIENTO == medicamento.ID_TRATAMIENTO).first()
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    
    # Crear medicamento
    db_medicamento = Medicamento(**medicamento.dict())
    db.add(db_medicamento)
    db.commit()
    db.refresh(db_medicamento)
    
    # Crear alarmas automáticamente en background
    background_tasks.add_task(
        AlarmaService.crear_alarmas_para_medicamento, 
        db, 
        db_medicamento.ID_MEDICAMENTO
    )
    
    return db_medicamento

@router.get("/", response_model=List[MedicamentoOut])
def obtener_medicamentos(usuario_id: int = None, db: Session = Depends(get_db)):
    """Obtener medicamentos, opcionalmente filtrados por usuario"""
    if usuario_id:
        # Filtrar medicamentos por tratamientos del usuario
        medicamentos = db.query(Medicamento).join(Tratamiento).filter(Tratamiento.ID_USUARIO == usuario_id).all()
    else:
        medicamentos = db.query(Medicamento).all()
    return medicamentos

@router.get("/tratamiento/{tratamiento_id}", response_model=List[MedicamentoOut])
def obtener_medicamentos_tratamiento(tratamiento_id: int, db: Session = Depends(get_db)):
    """Obtener todos los medicamentos de un tratamiento"""
    medicamentos = db.query(Medicamento).filter(Medicamento.ID_TRATAMIENTO == tratamiento_id).all()
    return medicamentos

@router.get("/{medicamento_id}", response_model=MedicamentoOut)
def obtener_medicamento(medicamento_id: int, db: Session = Depends(get_db)):
    """Obtener un medicamento específico"""
    medicamento = db.query(Medicamento).filter(Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    return medicamento

@router.put("/{medicamento_id}", response_model=MedicamentoOut)
def actualizar_medicamento(medicamento_id: int, medicamento_data: MedicamentoUpdate, db: Session = Depends(get_db)):
    """Actualizar un medicamento existente"""
    medicamento = db.query(Medicamento).filter(Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    # Actualizar campos (solo los que no son None)
    for key, value in medicamento_data.dict(exclude_unset=True).items():
        if value is not None:
            setattr(medicamento, key, value)
    
    db.commit()
    db.refresh(medicamento)
    return medicamento

@router.delete("/{medicamento_id}")
def eliminar_medicamento(medicamento_id: int, db: Session = Depends(get_db)):
    """Eliminar un medicamento"""
    medicamento = db.query(Medicamento).filter(Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    db.delete(medicamento)
    db.commit()
    return {"message": "Medicamento eliminado exitosamente"}