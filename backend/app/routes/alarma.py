"""
routes/alarma.py
----------------
Rutas CRUD para alarmas de medicamentos.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.models.alarma import Alarma
from app.services.alarma_service import AlarmaService
from pydantic import BaseModel

router = APIRouter()

class AlarmaResponse(BaseModel):
    ID_ALARMA: int
    ID_MEDICAMENTO: int
    HORA_PROGRAMADA: datetime
    ESTADO: str
    medicamento_nombre: str
    medicamento_dosis: str
    tratamiento_nombre: str

    class Config:
        from_attributes = True

@router.get("/pendientes", response_model=List[AlarmaResponse])
def obtener_alarmas_pendientes(db: Session = Depends(get_db)):
    """Obtener alarmas pendientes para notificar"""
    alarmas = AlarmaService.obtener_alarmas_pendientes(db)
    
    resultado = []
    for alarma in alarmas:
        medicamento = alarma.medicamento
        tratamiento = medicamento.tratamiento
        
        resultado.append(AlarmaResponse(
            ID_ALARMA=alarma.ID_ALARMA,
            ID_MEDICAMENTO=alarma.ID_MEDICAMENTO,
            HORA_PROGRAMADA=alarma.HORA_PROGRAMADA,
            ESTADO=alarma.ESTADO,
            medicamento_nombre=medicamento.NOMBRE,
            medicamento_dosis=medicamento.DOSIS,
            tratamiento_nombre=tratamiento.NOMBRE_TRATAMIENTO
        ))
    
    return resultado

@router.post("/{alarma_id}/tomada")
def marcar_alarma_tomada(alarma_id: int, db: Session = Depends(get_db)):
    """Marcar una alarma como tomada"""
    if AlarmaService.marcar_como_tomada(db, alarma_id):
        return {"message": "Alarma marcada como tomada"}
    else:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")

@router.post("/{alarma_id}/posponer")
def posponer_alarma(alarma_id: int, minutos: int = 15, db: Session = Depends(get_db)):
    """Posponer una alarma"""
    if AlarmaService.posponer_alarma(db, alarma_id, minutos):
        return {"message": f"Alarma pospuesta {minutos} minutos"}
    else:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")