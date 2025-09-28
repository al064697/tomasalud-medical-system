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
import hashlib

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
    
    # Hashear la contraseña usando sha256 (temporal)
    hashed_password = hashlib.sha256(usuario_data.contrasena.encode()).hexdigest()
    
    # Convertir sexo de string a boolean (True = Masculino, False = Femenino)
    sexo_bool = usuario_data.sexo.lower() in ['masculino', 'true', '1', 'hombre', 'm']
    
    # Crear el usuario
    db_usuario = models.usuario.Usuario(
        NOMBRE=usuario_data.nombre,
        CORREO=usuario_data.correo,
        CONTRASENA_HASH=hashed_password,
        SEXO=sexo_bool,
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

@router.post("/login", response_model=schemas_auth.Token)
def login_usuario(login_data: schemas_auth.LoginRequiest, db: Session = Depends(get_db)):
    """
    Autentica un usuario y devuelve un token de acceso
    """
    # Buscar usuario por correo
    user = db.query(models.usuario.Usuario).filter(
        models.usuario.Usuario.CORREO == login_data.email
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificar contraseña usando sha256 (temporal)
    hashed_password = hashlib.sha256(login_data.password.encode()).hexdigest()
    
    if user.CONTRASENA_HASH != hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crear token simple (en producción debería usar JWT)
    access_token = f"token_{user.ID_USUARIO}_{datetime.now().timestamp()}"
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.ID_USUARIO,
        "nombre": user.NOMBRE
    }