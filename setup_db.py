import sqlite3
import bcrypt
from datetime import datetime

# Conectar a la base de datos
conn = sqlite3.connect('/Users/sebastianeligio/Code_Projects/Alarma_Tratamiento_II/backend/tratamientos.db')
cursor = conn.cursor()

# Generar hash de la contraseña
password = "123456"
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Insertar usuario de prueba
try:
    cursor.execute("""
        INSERT INTO USUARIO (NOMBRE, CORREO, CONTRASENA_HASH, SEXO, FECHA_NACIMIENTO, ROL)
        VALUES (?, ?, ?, ?, ?, ?)
    """, ("Usuario Demo", "demo@tomasalud.com", password_hash, True, "1990-01-01", "usuario"))
    
    conn.commit()
    print("✅ Usuario creado exitosamente")
    
    # Verificar que se creó
    cursor.execute("SELECT ID_USUARIO, NOMBRE, CORREO FROM USUARIO WHERE CORREO = ?", ("demo@tomasalud.com",))
    user = cursor.fetchone()
    print(f"Usuario ID: {user[0]}, Nombre: {user[1]}, Correo: {user[2]}")
    
except sqlite3.IntegrityError:
    print("ℹ️ El usuario ya existe")
    cursor.execute("SELECT ID_USUARIO, NOMBRE, CORREO FROM USUARIO WHERE CORREO = ?", ("demo@tomasalud.com",))
    user = cursor.fetchone()
    print(f"Usuario existente - ID: {user[0]}, Nombre: {user[1]}, Correo: {user[2]}")

finally:
    conn.close()