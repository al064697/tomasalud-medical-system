"""
routes/medicamento.py
---------------------
Rutas CRUD para medicamentos.
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

@router.post("/", response_model=schemas.medicamento.MedicamentoOut)
def create_medicamento(medicamento: schemas.medicamento.MedicamentoCreate, db: Session = Depends(get_db)):
    db_medicamento = models.medicamento.Medicamento(**medicamento.dict())
    db.add(db_medicamento)
    db.commit()
    db.refresh(db_medicamento)
    return db_medicamento

@router.get("/", response_model=List[schemas.medicamento.MedicamentoOut])
def get_medicamentos(db: Session = Depends(get_db)):
    return db.query(models.medicamento.Medicamento).all()

@router.get("/{medicamento_id}", response_model=schemas.medicamento.MedicamentoOut)
def get_medicamento(medicamento_id: int, db: Session = Depends(get_db)):
    medicamento = db.query(models.medicamento.Medicamento).filter(models.medicamento.Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    return medicamento

@router.put("/{medicamento_id}", response_model=schemas.medicamento.MedicamentoOut)
def update_medicamento(medicamento_id: int, medicamento: schemas.medicamento.MedicamentoUpdate, db: Session = Depends(get_db)):
    db_medicamento = db.query(models.medicamento.Medicamento).filter(models.medicamento.Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not db_medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    for key, value in medicamento.dict(exclude_unset=True).items():
        setattr(db_medicamento, key, value)
    db.commit()
    db.refresh(db_medicamento)
    return db_medicamento

@router.delete("/{medicamento_id}")
def delete_medicamento(medicamento_id: int, db: Session = Depends(get_db)):
    medicamento = db.query(models.medicamento.Medicamento).filter(models.medicamento.Medicamento.ID_MEDICAMENTO == medicamento_id).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    db.delete(medicamento)
    db.commit()
    return {"message": "Medicamento eliminado correctamente"}