"""
models/tratamiento.py
---------------------
Define la tabla `TRATAMIENTO`.
Cada usuario puede tener múltiples tratamientos médicos.
"""

from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Tratamiento(Base):
    __tablename__ = "TRATAMIENTO"

    ID_TRATAMIENTO = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ID_USUARIO = Column(Integer, ForeignKey("USUARIO.ID_USUARIO"), nullable=False)
    NOMBRE_TRATAMIENTO = Column(String(50), nullable=False)
    FECHA_INICIO = Column(Date, nullable=False)
    FECHA_FIN = Column(Date, nullable=True)
    ESTADO = Column(String(20), nullable=False)
    FECHA_CREACION = Column(TIMESTAMP, server_default=func.now())

    # Relación con Usuario
    usuario = relationship("Usuario", backref="tratamientos")
    # Relación con Medicamentos
    medicamentos = relationship("Medicamento", back_populates="tratamiento", cascade="all, delete-orphan")