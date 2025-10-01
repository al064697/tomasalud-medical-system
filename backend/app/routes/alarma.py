"""
routes/alarma.py
----------------
Rutas CRUD para alarmas de medicamentos.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.alarma import Alarma
from app.models.medicamento import Medicamento
from app.services.alarma_service import AlarmaService
from pydantic import BaseModel

router = APIRouter()

class AlarmaResponse(BaseModel):
    ID_ALARMA: int
    ID_MEDICAMENTO: int
    HORA_PROGRAMADA: datetime
    ESTADO: str
    INTERVALO_POSPOSICION: Optional[int] = None
    medicamento_nombre: Optional[str] = None
    medicamento_dosis: Optional[str] = None
    tratamiento_nombre: Optional[str] = None

    class Config:
        from_attributes = True

class AlarmaCreate(BaseModel):
    ID_MEDICAMENTO: int
    HORA_PROGRAMADA: datetime
    ESTADO: str = "PENDIENTE"

class AlarmaUpdate(BaseModel):
    HORA_PROGRAMADA: Optional[datetime] = None
    ESTADO: Optional[str] = None
    INTERVALO_POSPOSICION: Optional[int] = None

@router.get("/", response_model=List[AlarmaResponse])
def obtener_alarmas(usuario_id: int, db: Session = Depends(get_db)):
    """Obtener todas las alarmas de un usuario"""
    alarmas = AlarmaService.obtener_alarmas_por_usuario(db, usuario_id)
    
    resultado = []
    for alarma in alarmas:
        medicamento = alarma.medicamento
        tratamiento = medicamento.tratamiento
        
        resultado.append(AlarmaResponse(
            ID_ALARMA=alarma.ID_ALARMA,
            ID_MEDICAMENTO=alarma.ID_MEDICAMENTO,
            HORA_PROGRAMADA=alarma.HORA_PROGRAMADA,
            ESTADO=alarma.ESTADO,
            INTERVALO_POSPOSICION=alarma.INTERVALO_POSPOSICION,
            medicamento_nombre=medicamento.NOMBRE,
            medicamento_dosis=medicamento.DOSIS,
            tratamiento_nombre=tratamiento.NOMBRE_TRATAMIENTO
        ))
    
    return resultado

@router.get("/{alarma_id}", response_model=AlarmaResponse)
def obtener_alarma(alarma_id: int, db: Session = Depends(get_db)):
    """Obtener una alarma específica por su ID"""
    alarma = AlarmaService.obtener_alarma_por_id(db, alarma_id)
    if not alarma:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    
    medicamento = alarma.medicamento
    tratamiento = medicamento.tratamiento
    
    return AlarmaResponse(
        ID_ALARMA=alarma.ID_ALARMA,
        ID_MEDICAMENTO=alarma.ID_MEDICAMENTO,
        HORA_PROGRAMADA=alarma.HORA_PROGRAMADA,
        ESTADO=alarma.ESTADO,
        INTERVALO_POSPOSICION=alarma.INTERVALO_POSPOSICION,
        medicamento_nombre=medicamento.NOMBRE,
        medicamento_dosis=medicamento.DOSIS,
        tratamiento_nombre=tratamiento.NOMBRE_TRATAMIENTO
    )

@router.post("/", response_model=AlarmaResponse)
def crear_alarma(alarma: AlarmaCreate, db: Session = Depends(get_db)):
    """Crear una nueva alarma"""
    # Verificar que el medicamento existe
    medicamento = db.query(Medicamento).filter(Medicamento.ID_MEDICAMENTO == alarma.ID_MEDICAMENTO).first()
    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento no encontrado")
    
    # Crear la alarma
    datos_alarma = {
        "ID_MEDICAMENTO": alarma.ID_MEDICAMENTO,
        "HORA_PROGRAMADA": alarma.HORA_PROGRAMADA,
        "ESTADO": alarma.ESTADO
    }
    
    nueva_alarma = AlarmaService.crear_alarma(db, datos_alarma)
    
    return AlarmaResponse(
        ID_ALARMA=nueva_alarma.ID_ALARMA,
        ID_MEDICAMENTO=nueva_alarma.ID_MEDICAMENTO,
        HORA_PROGRAMADA=nueva_alarma.HORA_PROGRAMADA,
        ESTADO=nueva_alarma.ESTADO,
        INTERVALO_POSPOSICION=nueva_alarma.INTERVALO_POSPOSICION,
        medicamento_nombre=medicamento.NOMBRE,
        medicamento_dosis=medicamento.DOSIS,
        tratamiento_nombre=medicamento.tratamiento.NOMBRE_TRATAMIENTO
    )

@router.put("/{alarma_id}", response_model=AlarmaResponse)
def actualizar_alarma(alarma_id: int, alarma_update: AlarmaUpdate, db: Session = Depends(get_db)):
    """Actualizar una alarma existente"""
    alarma_existente = AlarmaService.obtener_alarma_por_id(db, alarma_id)
    if not alarma_existente:
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    
    datos_actualizacion = alarma_update.dict(exclude_unset=True)
    if "HORA" in datos_actualizacion:
        datos_actualizacion["HORA_PROGRAMADA"] = datos_actualizacion.pop("HORA")
    
    alarma_actualizada = AlarmaService.actualizar_alarma(db, alarma_id, datos_actualizacion)
    
    medicamento = alarma_actualizada.medicamento
    tratamiento = medicamento.tratamiento
    
    return AlarmaResponse(
        ID_ALARMA=alarma_actualizada.ID_ALARMA,
        ID_MEDICAMENTO=alarma_actualizada.ID_MEDICAMENTO,
        HORA=alarma_actualizada.HORA_PROGRAMADA,
        ESTADO=alarma_actualizada.ESTADO,
        REPETIR=True,  # Por ahora todas las alarmas se repiten
        DESCRIPCION=None,  # Campo nuevo, inicialmente vacío
        medicamento_nombre=medicamento.NOMBRE,
        medicamento_dosis=medicamento.DOSIS,
        tratamiento_nombre=tratamiento.NOMBRE_TRATAMIENTO
    )

@router.delete("/{alarma_id}")
def eliminar_alarma(alarma_id: int, db: Session = Depends(get_db)):
    """Eliminar una alarma"""
    if not AlarmaService.eliminar_alarma(db, alarma_id):
        raise HTTPException(status_code=404, detail="Alarma no encontrada")
    return {"message": "Alarma eliminada"}

@router.get("/pendientes", response_model=List[AlarmaResponse])
def obtener_alarmas_pendientes(user_id: int = None, db: Session = Depends(get_db)):
    """Obtener alarmas pendientes para notificar (filtradas por usuario si se especifica)"""
    alarmas = AlarmaService.obtener_alarmas_pendientes(db, user_id)
    
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