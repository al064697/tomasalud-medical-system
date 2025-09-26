"""
schemas/usuario.py
------------------
Esquemas Pydantic para validar y serializar los datos de usuarios.
"""

from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional

class UsuarioBase(BaseModel):
    NOMBRE: str = Field(..., max_length=50)
    CORREO: EmailStr
    SEXO: bool = Field(..., description="True para Masculino, False para Femenino")
    FECHA_NACIMIENTO: date
    TIPO_SANGRE: Optional[str] = None
    DONADOR_ORGANOS: Optional[bool] = False
    ALERGIAS: Optional[str] = None
    PADECIMIENTOS: Optional[str] = None
    ROL: Optional[str] = "USUARIO"

class UsuarioCreate(UsuarioBase):
    """Datos necesarios para crear un usuario"""
    CONTRASEÑA: str = Field(..., min_length=8)  # Contraseña en texto plano (se hashea en el backend)

class UsuarioUpdate(BaseModel):
    """Datos opcionales para actualizar un usuario"""
    NOMBRE: Optional[str] = None
    CORREO: Optional[str] = None
    SEXO: Optional[str] = None
    FECHA_NACIMIENTO: Optional[date] = None

class UsuarioOut(BaseModel):
    """Datos que se devuelven en las respuestas (sin contraseña)"""
    ID_USUARIO: int
    NOMBRE: str
    CORREO: str
    SEXO: bool
    FECHA_NACIMIENTO: date
    TIPO_SANGRE: Optional[str] = None
    DONADOR_ORGANOS: bool
    ALERGIAS: Optional[str] = None
    PADECIMIENTOS: Optional[str] = None
    ROL: str

    class Config:
        orm_mode = True