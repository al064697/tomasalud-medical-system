"""
routes/alarma.py
----------------
Rutas CRUD para alarmas de medicamentos.
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

@router.post("/", response_model=schemas.alarma.AlarmaOut)
def create_alarma(alarma: schemas.alarma.AlarmaCreate, db: Session = Depends(get_db)):
    db_alarma = models.alarma.Alarma(**alarma.dict())
    db.add(db_alarma)
    db.commit()
    db.refresh(db_alarma)
    return db_alarma

@router.get("/", response_model=List[schemas.alarma.AlarmaOut])
def get_alarmas(db: Session = Depends(get_db)):
    return db.query(models.alarma.Alarma).all()

@router.get("/{alarma_id}", response_model=schemas.alarma.AlarmaOut)
def get_alarma(alarma_id: int, db: Session = Depends(get_db)):
    alarma = db.query(models.alarma.Alarma).filter(models.alarma.Alarma.ID_ALARMA == alarma_id).first()
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    return alarma

@router.put("/{alarma_id}", response_model=schemas.alarma.AlarmaOut)
def update_alarma(alarma_id: int, alarma: schemas.alarma.AlarmaUpdate, db: Session = Depends(get_db)):
    db_alarma = db.query(models.alarma.Alarma).filter(models.alarma.Alarma.ID_ALARMA == alarma_id).first()
    if not db_alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    for key, value in alarma.dict(exclude_unset=True).items():
        setattr(db_alarma, key, value)
    db.commit()
    db.refresh(db_alarma)
    return db_alarma

@router.delete("/{alarma_id}")
def delete_alarma(alarma_id: int, db: Session = Depends(get_db)):
    alarma = db.query(models.alarma.Alarma).filter(models.alarma.Alarma.ID_ALARMA == alarma_id).first()
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    db.delete(alarma)
    db.commit()
    return {"message": "Alarma eliminada correctamente"}