"""
models/usuario.py
-----------------
Define la tabla `USUARIO` en SQLAlchemy.
Representa a los usuarios del sistema, con sus datos personales y médicos.
"""

from sqlalchemy import Column, Integer, String, Date, Enum, Boolean, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Usuario(Base):
    __tablename__ = "USUARIO"

    ID_USUARIO = Column(Integer, primary_key=True, index=True, autoincrement=True)
    NOMBRE = Column(String(50), nullable=False)
    CORREO = Column(String(100), nullable=False, unique=True)
    CONTRASENA_HASH = Column(String(255), nullable=False)
    SEXO = Column(Boolean, nullable=False)  # ✅ TRUE=Masculino, FALSE=Femenino
    FECHA_NACIMIENTO = Column(Date, nullable=False)
    TIPO_SANGRE = Column(Enum('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'), nullable=True)
    DONADOR_ORGANOS = Column(Boolean, default=False)
    ALERGIAS = Column(Text, nullable=True)
    PADECIMIENTOS = Column(Text, nullable=True)
    ROL = Column(Enum('ADMIN', 'USUARIO'), default='USUARIO')
    FECHA_REGISTRO = Column(TIMESTAMP, server_default=func.now())

# Relación con Tratamientos
tratamientos = relationship("Tratamiento", back_populates="usuario", cascade="all, delete-orphan")