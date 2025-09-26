"""
models/alarma.py
----------------
Define la tabla `ALARMA`.
Representa alarmas programadas para recordar al usuario tomar un medicamento.
"""

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey, TIMESTAMP, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from datetime import datetime, timedelta

class Alarma(Base):
    __tablename__ = "ALARMA"

    ID_ALARMA = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ID_MEDICAMENTO = Column(Integer, ForeignKey("MEDICAMENTO.ID_MEDICAMENTO"), nullable=False)
    HORA_PROGRAMADA = Column(DateTime, nullable=False)
    ESTADO = Column(Enum('PENDIENTE', 'ENVIADA', 'TOMADA', 'POSPUESTA', 'CANCELADA'), default='PENDIENTE')
    INTERVALO_POSPOSICION = Column(Integer, nullable=True)  # minutos

    # Relación
    medicamento = relationship("Medicamento", back_populates="alarmas")
