"""
models/medicamento.py
---------------------
Define la tabla `MEDICAMENTO`.
Cada tratamiento puede tener múltiples medicamentos asociados.
"""

from sqlalchemy import Column, Integer, String, Time, Text, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Medicamento(Base):
    __tablename__ = "MEDICAMENTO"

    ID_MEDICAMENTO = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ID_TRATAMIENTO = Column(Integer, ForeignKey("TRATAMIENTO.ID_TRATAMIENTO"), nullable=False)
    NOMBRE = Column(String(50), nullable=False)
    DOSIS = Column(String(50), nullable=False)
    HORA = Column(Time, nullable=False)
    OBSERVACION = Column(Text, nullable=True)
    INTERVALO = Column(Integer, nullable=True)  # Intervalo en horas
    FECHA_CREACION = Column(TIMESTAMP, server_default=func.now()) 

    # Relación con Tratamiento
    tratamiento = relationship("Tratamiento", back_populates="medicamentos")
    
    # Relación con Alarmas
    alarmas = relationship("Alarma", back_populates="medicamento", cascade="all, delete-orphan")