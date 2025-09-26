"""
models/historial.py
-------------------
Define la tabla `HISTORIAL`.
Registra los eventos de toma de un medicamento (tomado, omitido, pospuesto, cancelado).
"""

from sqlalchemy import Column, Integer, DateTime, Enum, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Historial(Base):
    __tablename__ = "HISTORIAL"

    ID_HISTORIAL = Column(Integer, primary_key=True, index=True, autoincrement=True)
    FECHA_HORA = Column(DateTime, nullable=False)
    ESTADO = Column(Enum('Tomado', 'Omitido', 'Pospuesto', 'Cancelado'), nullable=False)
    OBSERVACION = Column(Text, nullable=True)
    ID_MEDICAMENTO = Column(Integer, ForeignKey("MEDICAMENTO.ID_MEDICAMENTO"), nullable=False)

    # Relación con Medicamento
    medicamento = relationship("Medicamento", backref="historiales")