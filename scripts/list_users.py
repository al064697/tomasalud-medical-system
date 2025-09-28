import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('/Users/sebastianeligio/Code_Projects/Alarma_Tratamiento_II/backend/tratamientos.db')
cursor = conn.cursor()

try:
    # Listar todos los usuarios
    cursor.execute("SELECT ID_USUARIO, NOMBRE, CORREO FROM USUARIO")
    users = cursor.fetchall()
    
    if users:
        print("👥 Usuarios en la base de datos:")
        for user in users:
            print(f"  ID: {user[0]}, Nombre: {user[1]}, Correo: {user[2]}")
    else:
        print("❌ No hay usuarios en la base de datos")

finally:
    conn.close()