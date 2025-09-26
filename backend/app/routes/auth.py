"""
routes/auth.py
--------------
Rutas para autenticación: registro, login.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
from app.schemas import usuario as schemas_usuario
from app.schemas import auth as schemas_auth
from app.auth import pwd_context
from datetime import datetime

router = APIRouter()

# Dependencia para obtener la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/registro", response_model=schemas_usuario.UsuarioOut)
def registrar_usuario(usuario_data: schemas_auth.UsuarioRegister, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario con contraseña hasheada
    """
    # Verificar si el correo ya existe
    existing_user = db.query(models.usuario.Usuario).filter(
        models.usuario.Usuario.CORREO == usuario_data.correo
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico ya está registrado"
        )
    
    # Hashear la contraseña
    hashed_password = pwd_context.hash(usuario_data.contrasena)
    
    # Crear el usuario
    db_usuario = models.usuario.Usuario(
        NOMBRE=usuario_data.nombre,
        CORREO=usuario_data.correo,
        CONTRASENA_HASH=hashed_password,
        SEXO=usuario_data.sexo,
        FECHA_NACIMIENTO=usuario_data.fecha_nacimiento,
        TIPO_SANGRE=usuario_data.tipo_sangre,
        DONADOR_ORGANOS=usuario_data.donador_organos,
        ALERGIAS=usuario_data.alergias,
        PADECIMIENTOS=usuario_data.padecimientos,
        ROL="USUARIO"
    )
    
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario