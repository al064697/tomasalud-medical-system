"""
models/alarma.py
----------------
Define la tabla `ALARMA`.
Representa alarmas programadas para recordar al usuario tomar un medicamento.
"""

from sqlalchemy import Column, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Alarma(Base):
    __tablename__ = "ALARMA"

    ID_ALARMA = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ID_MEDICAMENTO = Column(Integer, ForeignKey("MEDICAMENTO.ID_MEDICAMENTO"), nullable=False)
    HORA_PROGRAMADA = Column(DateTime, nullable=False)
    ESTADO = Column(Enum('ENVIADA', 'PENDIENTE', 'CUMPLIDA', 'CANCELADA'), nullable=False)
    INTERVALO_POSPOSICION = Column(Integer, nullable=True)  # minutos

    # Relación con Medicamento
    medicamento = relationship("Medicamento", backref="alarmas")