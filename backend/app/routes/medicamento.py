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
from app.schemas.medicamento import MedicamentoCreate, MedicamentoOut
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

@router.get("/tratamiento/{tratamiento_id}", response_model=List[MedicamentoOut])
def obtener_medicamentos_tratamiento(tratamiento_id: int, db: Session = Depends(get_db)):
    """Obtener todos los medicamentos de un tratamiento"""
    medicamentos = db.query(Medicamento).filter(Medicamento.ID_TRATAMIENTO == tratamiento_id).all()
    return medicamentos