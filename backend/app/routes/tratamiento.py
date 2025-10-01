"""
routes/tratamiento.py
---------------------
Rutas CRUD para tratamientos.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app import models, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.tratamiento.TratamientoOut)
def create_tratamiento(tratamiento: schemas.tratamiento.TratamientoCreate, db: Session = Depends(get_db)):
    try:
        print(f"Creando tratamiento: {tratamiento.dict()}")
        db_tratamiento = models.tratamiento.Tratamiento(**tratamiento.dict())
        db.add(db_tratamiento)
        db.commit()
        db.refresh(db_tratamiento)
        print(f"Tratamiento creado exitosamente: ID {db_tratamiento.ID_TRATAMIENTO}")
        return db_tratamiento
    except Exception as e:
        db.rollback()
        print(f"Error al crear tratamiento: {e}")
        raise HTTPException(status_code=500, detail=f"Error al crear tratamiento: {str(e)}")

@router.get("/", response_model=List[schemas.tratamiento.TratamientoOut])
def get_tratamientos(usuario_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.tratamiento.Tratamiento)
    if usuario_id:
        query = query.filter(models.tratamiento.Tratamiento.ID_USUARIO == usuario_id)
    try:
        tratamientos = query.all()
        return tratamientos
    except Exception as e:
        print(f"Error al obtener tratamientos: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")

@router.get("/{tratamiento_id}", response_model=schemas.tratamiento.TratamientoOut)
def get_tratamiento(tratamiento_id: int, db: Session = Depends(get_db)):
    tratamiento = db.query(models.tratamiento.Tratamiento).filter(models.tratamiento.Tratamiento.ID_TRATAMIENTO == tratamiento_id).first()
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    return tratamiento

@router.get("/{tratamiento_id}/completo", response_model=schemas.tratamiento.TratamientoCompleto)
def get_tratamiento_completo(tratamiento_id: int, db: Session = Depends(get_db)):
    """
    Obtiene un tratamiento completo con todos sus medicamentos incluidos.
    Útil para generar reportes PDF completos.
    """
    tratamiento = db.query(models.tratamiento.Tratamiento).filter(
        models.tratamiento.Tratamiento.ID_TRATAMIENTO == tratamiento_id
    ).first()
    
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    
    # Obtener medicamentos del tratamiento
    medicamentos = db.query(models.medicamento.Medicamento).filter(
        models.medicamento.Medicamento.ID_TRATAMIENTO == tratamiento_id
    ).all()
    
    # Crear respuesta completa
    tratamiento_dict = {
        "ID_TRATAMIENTO": tratamiento.ID_TRATAMIENTO,
        "ID_USUARIO": tratamiento.ID_USUARIO,
        "NOMBRE_TRATAMIENTO": tratamiento.NOMBRE_TRATAMIENTO,
        "FECHA_INICIO": tratamiento.FECHA_INICIO,
        "FECHA_FIN": tratamiento.FECHA_FIN,
        "ESTADO": tratamiento.ESTADO,
        "medicamentos": medicamentos
    }
    
    return tratamiento_dict

@router.put("/{tratamiento_id}", response_model=schemas.tratamiento.TratamientoOut)
def update_tratamiento(tratamiento_id: int, tratamiento: schemas.tratamiento.TratamientoUpdate, db: Session = Depends(get_db)):
    db_tratamiento = db.query(models.tratamiento.Tratamiento).filter(models.tratamiento.Tratamiento.ID_TRATAMIENTO == tratamiento_id).first()
    if not db_tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    for key, value in tratamiento.dict(exclude_unset=True).items():
        setattr(db_tratamiento, key, value)
    db.commit()
    db.refresh(db_tratamiento)
    return db_tratamiento

@router.delete("/{tratamiento_id}")
def delete_tratamiento(tratamiento_id: int, db: Session = Depends(get_db)):
    tratamiento = db.query(models.tratamiento.Tratamiento).filter(models.tratamiento.Tratamiento.ID_TRATAMIENTO == tratamiento_id).first()
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    db.delete(tratamiento)
    db.commit()
    return {"message": "Tratamiento eliminado correctamente"}