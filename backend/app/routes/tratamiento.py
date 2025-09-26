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
    db_tratamiento = models.tratamiento.Tratamiento(**tratamiento.dict())
    db.add(db_tratamiento)
    db.commit()
    db.refresh(db_tratamiento)
    return db_tratamiento

@router.get("/", response_model=List[schemas.tratamiento.TratamientoOut])
def get_tratamientos(db: Session = Depends(get_db)):
    return db.query(models.tratamiento.Tratamiento).all()

@router.get("/{tratamiento_id}", response_model=schemas.tratamiento.TratamientoOut)
def get_tratamiento(tratamiento_id: int, db: Session = Depends(get_db)):
    tratamiento = db.query(models.tratamiento.Tratamiento).filter(models.tratamiento.Tratamiento.ID_TRATAMIENTO == tratamiento_id).first()
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    return tratamiento

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