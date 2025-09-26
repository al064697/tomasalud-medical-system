"""
database.py
-----------
Configuración de la base de datos utilizando SQLAlchemy y Motor de SQLite en memoria para pruebas.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Usar SQLite para desarrollo local
DATABASE_URL = settings.DATABASE_URL

print(f' Conectando a la base de datos: {DATABASE_URL}')

engine = create_engine(
    DATABASE_URL,
    echo=True,  # Muestra las consultas SQL en la consola (útil para depuración)
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependencia para obtener sesión de base de datos"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear las tablas
def create_tables():
    Base.metadata.create_all(bind=engine)