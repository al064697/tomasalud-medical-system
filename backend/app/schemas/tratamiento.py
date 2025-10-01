"""
schemas/tratamiento.py
----------------------
Esquemas Pydantic para tratamientos médicos.
"""

from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from .medicamento import MedicamentoOut

class TratamientoBase(BaseModel):
    ID_USUARIO: int
    NOMBRE_TRATAMIENTO: str
    FECHA_INICIO: date
    FECHA_FIN: Optional[date] = None
    ESTADO: str

class TratamientoCreate(TratamientoBase):
    pass

class TratamientoUpdate(BaseModel):
    NOMBRE_TRATAMIENTO: Optional[str] = None
    FECHA_INICIO: Optional[date] = None
    FECHA_FIN: Optional[date] = None
    ESTADO: Optional[str] = None

class TratamientoOut(TratamientoBase):
    ID_TRATAMIENTO: int

    class Config:
        orm_mode = True

class TratamientoCompleto(TratamientoOut):
    medicamentos: List[MedicamentoOut] = []

    class Config:
        orm_mode = True