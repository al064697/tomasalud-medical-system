"""
schemas/auth.py
----------------
Esquemas Pydantic para login y tokens de autenticación. 
"""

from pydantic import BaseModel
from datetime import date
from typing import Optional

class LoginRequiest(BaseModel):
    email: str
    password: str

class Token(BaseModel): 
    access_token: str
    token_type: str = "bearer"

class UsuarioRegister(BaseModel):
    """Schema para registro de nuevos usuarios"""
    nombre: str
    correo: str
    contrasena: str
    sexo: str
    fecha_nacimiento: date
    tipo_sangre: Optional[str] = None
    donador_organos: Optional[bool] = False
    alergias: Optional[str] = None
    padecimientos: Optional[str] = None