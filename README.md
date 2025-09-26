# 🏥 TomaSalud - Sistema de Gestión de Tratamientos Médicos

## 📋 Descripción

TomaSalud es una aplicación web completa para la gestión de tratamientos médicos y alarmas de medicamentos. Permite a los usuarios registrar sus tratamientos, configurar alarmas para medicamentos y llevar un seguimiento completo de su salud.

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy** - ORM para base de datos
- **SQLite** - Base de datos ligera (configurable para MySQL)
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos responsive y modernos
- **JavaScript** - Interactividad y comunicación con API
- **Fetch API** - Comunicación asíncrona con backend

## 📁 Estructura del Proyecto

```
TomaSalud/
├── backend/                    # Servidor API
│   ├── app/
│   │   ├── models/            # Modelos de base de datos
│   │   ├── routes/            # Endpoints de la API
│   │   ├── schemas/           # Esquemas de validación
│   │   ├── auth.py           # Autenticación
│   │   ├── config.py         # Configuración
│   │   ├── database.py       # Conexión a BD
│   │   └── main.py           # Aplicación principal
│   ├── scripts/              # Scripts de base de datos
│   ├── tests/               # Pruebas unitarias
│   └── requirements.txt     # Dependencias Python
│
├── frontend/                  # Interfaz de usuario
│   ├── assets/
│   │   ├── css/              # Estilos CSS
│   │   ├── js/               # Scripts JavaScript
│   │   └── images/           # Recursos gráficos
│   ├── *.html               # Páginas HTML
│   └── favicon.ico          # Icono de la aplicación
│
├── .venv/                    # Entorno virtual Python
├── README.md                 # Este archivo
└── vercel.json              # Configuración de despliegue
```

## 🚀 Instalación y Configuración

### Prerequisitos
- Python 3.8+
- pip
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/al064697/AppTratamientos.git
   cd AppTratamientos
   ```

2. **Crear entorno virtual**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # macOS/Linux
   # .venv\Scripts\activate   # Windows
   ```

3. **Instalar dependencias**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## 🏃‍♂️ Ejecución

### Backend (Puerto 8004)
```bash
cd backend
uvicorn app.main:app --reload --port 8004
```

### Frontend (Puerto 3001)
```bash
cd frontend
python -m http.server 3001
```

### Acceso
- **Frontend**: http://localhost:3001
- **API Docs**: http://localhost:8004/docs
- **API Redoc**: http://localhost:8004/redoc

## 🎯 Funcionalidades

### 👤 Gestión de Usuarios
- ✅ Registro de usuarios
- ✅ Autenticación segura
- ✅ Perfiles de usuario completos
- ✅ Información médica (tipo sangre, alergias, etc.)

### 💊 Gestión de Tratamientos
- ✅ Crear tratamientos médicos
- ✅ Asignar medicamentos a tratamientos
- ✅ Configurar dosis y horarios
- ✅ Observaciones detalladas
- ✅ Estados de tratamiento (Activo, Suspendido, Finalizado)

### ⏰ Sistema de Alarmas
- ✅ Alarmas programadas para medicamentos
- ✅ Intervalos personalizables
- ✅ Notificaciones visuales
- ✅ Seguimiento de tomas

### 📊 Panel de Control
- ✅ Dashboard completo
- ✅ CRUD completo para todas las entidades
- ✅ Interfaz responsive
- ✅ Exportación de datos
- ✅ Filtros y búsquedas

## 👨‍💻 Desarrollador

**Sebastian Eligio Rios Fuentes**
- GitHub: [@al064697](https://github.com/al064697)
- Email: freligio008@icloud.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⭐ **¡No olvides dar estrella al proyecto si te ha sido útil!** ⭐