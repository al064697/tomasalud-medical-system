"""
schemas/historial.py
--------------------
Esquemas Pydantic para historial de tomas de medicamentos.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HistorialBase(BaseModel):
    FECHA_HORA: datetime
    ESTADO: str
    OBSERVACION: Optional[str] = None
    ID_MEDICAMENTO: int

class HistorialCreate(HistorialBase):
    pass

class HistorialUpdate(BaseModel):
    ESTADO: Optional[str] = None
    OBSERVACION: Optional[str] = None

class HistorialOut(HistorialBase):
    ID_HISTORIAL: int

    class Config:
        orm_mode = True