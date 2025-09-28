#!/usr/bin/env python3
"""
Script para crear usuario de prueba
"""
import requests
import json

# Datos del usuario de prueba
user_data = {
    "NOMBRE": "Usuario Demo",
    "CORREO": "demo@tomasalud.com", 
    "CONTRASENA": "123456",
    "SEXO": True,
    "FECHA_NACIMIENTO": "1990-01-01"
}

try:
    # Crear usuario
    response = requests.post(
        "http://127.0.0.1:8000/auth/registro",
        headers={"Content-Type": "application/json"},
        json=user_data
    )
    
    if response.status_code == 200:
        print("✅ Usuario creado exitosamente:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Error al crear usuario: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Error de conexión: {e}")