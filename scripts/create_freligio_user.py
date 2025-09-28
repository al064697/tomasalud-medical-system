import sqlite3
import bcrypt
from datetime import datetime

# Conectar a la base de datos
conn = sqlite3.connect('/Users/sebastianeligio/Code_Projects/Alarma_Tratamiento_II/backend/tratamientos.db')
cursor = conn.cursor()

# Datos del nuevo usuario
email = "freligio008@gmail.com"  # o el email que prefieras
password = "123456"  # contraseña por defecto
name = "Francisco Eligio"

# Generar hash de la contraseña
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

try:
    # Verificar si el usuario ya existe
    cursor.execute("SELECT ID_USUARIO FROM USUARIO WHERE CORREO = ?", (email,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        print(f"ℹ️ El usuario {email} ya existe con ID: {existing_user[0]}")
    else:
        # Insertar nuevo usuario
        cursor.execute("""
            INSERT INTO USUARIO (NOMBRE, CORREO, CONTRASENA_HASH, SEXO, FECHA_NACIMIENTO, ROL)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (name, email, password_hash, True, "1990-01-01", "usuario"))
        
        conn.commit()
        
        # Obtener el ID del usuario creado
        cursor.execute("SELECT ID_USUARIO FROM USUARIO WHERE CORREO = ?", (email,))
        user_id = cursor.fetchone()[0]
        
        print(f"✅ Usuario creado exitosamente:")
        print(f"  ID: {user_id}")
        print(f"  Nombre: {name}")
        print(f"  Email: {email}")
        print(f"  Contraseña: {password}")

except Exception as e:
    print(f"❌ Error: {e}")

finally:
    conn.close()