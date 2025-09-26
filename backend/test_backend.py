"""
test_backend.py
Simple test to verify backend configuration
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.config import settings
from app.database import engine, SessionLocal, DATABASE_URL

print("=" * 50)
print("CONFIGURACIÓN DEL BACKEND")
print("=" * 50)
print(f"DATABASE_URL: {settings.DATABASE_URL}")
print(f"URL construida: {DATABASE_URL}")
print(f"SECRET_KEY: {settings.SECRET_KEY}")

print("\n" + "=" * 50)
print("PRUEBA DE CONEXIÓN A LA BASE DE DATOS")
print("=" * 50)

try:
    # Crear una sesión de prueba
    db = SessionLocal()
    
    # Intentar una consulta simple
    from sqlalchemy import text
    result = db.execute(text("SELECT 1 as test"))
    print("✅ Conexión exitosa a la base de datos")
    print(f"Resultado de prueba: {result.fetchone()}")
    
    db.close()
    
except Exception as e:
    print(f"❌ Error de conexión: {e}")

print("\n" + "=" * 50)
print("VERIFICACIÓN COMPLETADA")
print("=" * 50)