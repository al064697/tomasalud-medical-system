"""
schemas/alarma.py
-----------------
Esquemas Pydantic para alarmas de medicamentos.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AlarmaBase(BaseModel):
    ID_MEDICAMENTO: int
    HORA_PROGRAMADA: datetime
    ESTADO: str
    INTERVALO_POSPOSICION: Optional[int] = None

class AlarmaCreate(AlarmaBase):
    pass

class AlarmaUpdate(BaseModel):
    ESTADO: Optional[str] = None
    HORA_PROGRAMADA: Optional[datetime] = None
    INTERVALO_POSPOSICION: Optional[int] = None

class AlarmaOut(AlarmaBase):
    ID_ALARMA: int

    class Config:
        orm_mode = True