"""
main.py
---------------
Punto de entrada de la aplicación FastAPI.
Incluye configuración de CORS para permitir que el frontend se conecte.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importar las rutas
from app.routes import usuario, tratamiento, medicamento, historial, alarma, auth
from app.database import create_tables

app = FastAPI(title="Mi API Médica", version="1.0")

# Crear las tablas al iniciar la aplicación
create_tables()

# Configuración de CORS
origins = [
    "http://localhost:3000",      # Frontend en localhost
    "http://127.0.0.1:3000",      # Frontend en 127.0.0.1
    "http://localhost:5500",      # Live Server de VSCode
    "http://127.0.0.1:5500",      # Live Server en 127.0.0.1
    "http://localhost:8080",      # Otros puertos comunes
    "http://127.0.0.1:8080",
    "*"  # Permite todos los orígenes (solo en desarrollo)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Qué dominios pueden conectarse
    allow_credentials=True,
    allow_methods=["*"],    # Qué métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],    # Qué headers
)

# Ruta raíz
@app.get("/")
def read_root():
    return {
        "message": "API de Tratamientos Médicos", 
        "version": "1.0",
        "docs": "/docs",
        "endpoints": {
            "auth": "/auth",
            "usuarios": "/usuarios", 
            "tratamientos": "/tratamientos",
            "medicamentos": "/medicamentos",
            "historiales": "/historiales",
            "alarmas": "/alarmas"
        }
    }

# Incluir rutas
app.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
app.include_router(usuario.router, prefix="/usuarios", tags=["Usuarios"])
app.include_router(tratamiento.router, prefix="/tratamientos", tags=["Tratamientos"])
app.include_router(medicamento.router, prefix="/medicamentos", tags=["Medicamentos"])
app.include_router(historial.router, prefix="/historiales", tags=["Historiales"])
app.include_router(alarma.router, prefix="/alarmas", tags=["Alarmas"])