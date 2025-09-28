#!/usr/bin/env python3
import requests
import json

# Crear tratamiento de prueba
tratamiento_data = {
    "ID_USUARIO": 1,
    "NOMBRE_TRATAMIENTO": "Tratamiento de Prueba",
    "FECHA_INICIO": "2025-09-27",
    "ESTADO": "activo"
}

try:
    response = requests.post(
        "http://127.0.0.1:8000/tratamientos/",
        headers={"Content-Type": "application/json"},
        json=tratamiento_data
    )
    
    if response.status_code == 200:
        print("✅ Tratamiento creado exitosamente:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Error al crear tratamiento: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Error de conexión: {e}")