"""
routes/historial.py
-------------------
Rutas CRUD para historial de tomas de medicamentos.
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

@router.post("/", response_model=schemas.historial.HistorialOut)
def create_historial(historial: schemas.historial.HistorialCreate, db: Session = Depends(get_db)):
    db_historial = models.historial.Historial(**historial.dict())
    db.add(db_historial)
    db.commit()
    db.refresh(db_historial)
    return db_historial

@router.get("/", response_model=List[schemas.historial.HistorialOut])
def get_historiales(db: Session = Depends(get_db)):
    return db.query(models.historial.Historial).all()

@router.get("/{historial_id}", response_model=schemas.historial.HistorialOut)
def get_historial(historial_id: int, db: Session = Depends(get_db)):
    historial = db.query(models.historial.Historial).filter(models.historial.Historial.ID_HISTORIAL == historial_id).first()
    if not historial:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    return historial

@router.put("/{historial_id}", response_model=schemas.historial.HistorialOut)
def update_historial(historial_id: int, historial: schemas.historial.HistorialUpdate, db: Session = Depends(get_db)):
    db_historial = db.query(models.historial.Historial).filter(models.historial.Historial.ID_HISTORIAL == historial_id).first()
    if not db_historial:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    for key, value in historial.dict(exclude_unset=True).items():
        setattr(db_historial, key, value)
    db.commit()
    db.refresh(db_historial)
    return db_historial

@router.delete("/{historial_id}")
def delete_historial(historial_id: int, db: Session = Depends(get_db)):
    historial = db.query(models.historial.Historial).filter(models.historial.Historial.ID_HISTORIAL == historial_id).first()
    if not historial:
        raise HTTPException(status_code=404, detail="Historial no encontrado")
    db.delete(historial)
    db.commit()
    return {"message": "Historial eliminado correctamente"}