"""
schemas/medicamento.py
----------------------
Esquemas Pydantic para medicamentos asociados a tratamientos.
"""

from pydantic import BaseModel
from datetime import time
from typing import Optional

class MedicamentoBase(BaseModel):
    ID_TRATAMIENTO: int
    NOMBRE: str
    DOSIS: str
    HORA: time
    OBSERVACION: Optional[str] = None
    INTERVALO: Optional[int] = None

class MedicamentoCreate(MedicamentoBase):
    pass

class MedicamentoUpdate(BaseModel):
    NOMBRE: Optional[str] = None
    DOSIS: Optional[str] = None
    HORA: Optional[time] = None
    OBSERVACION: Optional[str] = None
    INTERVALO: Optional[int] = None

class MedicamentoOut(MedicamentoBase):
    ID_MEDICAMENTO: int

    class Config:
        orm_mode = True