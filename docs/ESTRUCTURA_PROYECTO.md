# Estructura del Proyecto - Alarma Tratamiento II

## 📁 Estructura Organizada

```
Alarma_Tratamiento_II/
├── backend/                    # API Backend (FastAPI)
│   ├── app/
│   │   ├── models/            # Modelos de datos
│   │   ├── routes/            # Endpoints de la API
│   │   ├── schemas/           # Esquemas Pydantic
│   │   └── services/          # Lógica de negocio
│   ├── scripts/               # Scripts SQL
│   ├── requirements.txt       # Dependencias Python
│   └── tratamientos.db        # Base de datos SQLite
│
├── frontend/                   # Frontend Web
│   ├── pages/                 # Páginas principales
│   │   ├── index-moderno.html      # Página de login
│   │   ├── dashboard-moderno.html  # Dashboard principal
│   │   ├── registro-moderno.html   # Registro de usuarios
│   │   ├── alarmas-moderno.html    # Gestión de alarmas
│   │   └── configuracion-moderno.html # Configuración
│   ├── assets/
│   │   ├── css/               # Estilos
│   │   ├── js/                # JavaScript
│   │   └── images/            # Imágenes
│   ├── test/                  # Archivos de prueba y debug
│   ├── index.html             # → pages/index-moderno.html
│   ├── dashboard.html         # → pages/dashboard-moderno.html
│   ├── registro.html          # → pages/registro-moderno.html
│   └── alarmas.html           # → pages/alarmas-moderno.html
│
├── scripts/                    # Scripts de utilidades
│   ├── setup_db.py           # Configuración de BD
│   ├── create_test_user.py    # Crear usuarios de prueba
│   ├── list_users.py          # Listar usuarios
│   └── test_create_treatment.py # Pruebas de tratamientos
│
├── docs/                       # Documentación
│   ├── README-MODERNO.md      # Documentación moderna
│   ├── SISTEMA_FUNCIONANDO.md # Estado del sistema
│   └── ESTRUCTURA_PROYECTO.md # Este archivo
│
├── Design/                     # Mockups y diseños
│   └── Frame*.png             # Diseños UI
│
├── README.md                   # Documentación principal
├── LICENSE                     # Licencia
└── vercel.json                # Configuración Vercel
```

## 🔗 Enlaces Simbólicos

Los archivos principales del frontend son enlaces simbólicos que apuntan a las páginas organizadas:
- `index.html` → `pages/index-moderno.html`
- `dashboard.html` → `pages/dashboard-moderno.html`
- `registro.html` → `pages/registro-moderno.html`
- `alarmas.html` → `pages/alarmas-moderno.html`

## 🧹 Archivos Eliminados

- ✅ `backend.zip` - Archivo zip innecesario
- ✅ `__pycache__/` - Directorios cache de Python
- ✅ `*.pyc` - Archivos compilados de Python
- ✅ `dashboard.js.backup` - Backup innecesario

## 📋 Funcionalidades

### Backend (FastAPI)
- ✅ API REST completa con CRUD
- ✅ Autenticación SHA256
- ✅ Base de datos SQLite
- ✅ Modelos relacionales

### Frontend (HTML5/JS)
- ✅ Interface moderna responsive
- ✅ Operaciones CRUD completas
- ✅ Gestión de tratamientos y medicamentos
- ✅ Sistema de alarmas
- ✅ Autenticación con localStorage

### Scripts de Utilidades
- ✅ Configuración automática de BD
- ✅ Creación de usuarios de prueba
- ✅ Herramientas de testing

## 🚀 Uso

1. **Backend**: `cd backend && uvicorn app.main:app --reload`
2. **Frontend**: Servir con cualquier servidor HTTP
3. **Testing**: Usar scripts en `scripts/`