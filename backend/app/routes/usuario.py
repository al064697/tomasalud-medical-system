"""
routes/usuario.py
-----------------
Rutas CRUD para la gestión de usuarios.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app import models
from app.schemas import usuario as schemas_usuario
from app.auth import get_current_user

router = APIRouter()

# Dependencia para obtener la sesión de BD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear usuario
@router.post("/", response_model=schemas_usuario.UsuarioOut)
def create_usuario(usuario: schemas_usuario.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = models.usuario.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Listar todos los usuarios
@router.get("/", response_model=List[schemas_usuario.UsuarioOut])
def get_usuarios(db: Session = Depends(get_db)):
    return db.query(models.usuario.Usuario).all()

# Obtener un usuario por ID
@router.get("/{usuario_id}", response_model=schemas_usuario.UsuarioOut)
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.usuario.Usuario).filter(models.usuario.Usuario.ID_USUARIO == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

# Actualizar un usuario
@router.put("/{usuario_id}", response_model=schemas_usuario.UsuarioOut)
def update_usuario(usuario_id: int, usuario: schemas_usuario.UsuarioUpdate, db: Session = Depends(get_db)):
    db_usuario = db.query(models.usuario.Usuario).filter(models.usuario.Usuario.ID_USUARIO == usuario_id).first()
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for key, value in usuario.dict(exclude_unset=True).items():
        setattr(db_usuario, key, value)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

# Eliminar un usuario
@router.delete("/{usuario_id}")
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.usuario.Usuario).filter(models.usuario.Usuario.ID_USUARIO == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(usuario)
    db.commit()
    return {"message": "Usuario eliminado correctamente"}