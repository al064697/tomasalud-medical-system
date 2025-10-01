# 📋 Guía de Configuración y Despliegue

## 🚀 Configuración Rápida

### 1. Requisitos del Sistema
- Python 3.8 o superior
- pip (administrador de paquetes de Python)
- Git

### 2. Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tomasalud.git
cd tomasalud

# Crear entorno virtual (recomendado)
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias del backend
cd backend
pip install -r requirements.txt

# Ejecutar el backend
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

En otra terminal:
```bash
# Ejecutar el frontend
cd frontend
python3 -m http.server 3000
```

### 3. Acceso a la Aplicación
- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Documentación**: http://localhost:8000/docs

## 🗂️ Estructura de Archivos

```
TomaSalud/
├── 📁 backend/                 # Servidor API FastAPI
│   ├── 📁 app/
│   │   ├── 📁 models/         # Modelos SQLAlchemy
│   │   │   ├── alarma.py
│   │   │   ├── historial.py
│   │   │   ├── medicamento.py
│   │   │   ├── tratamiento.py
│   │   │   └── usuario.py
│   │   ├── 📁 routes/         # Endpoints REST
│   │   │   ├── alarma.py
│   │   │   ├── auth.py
│   │   │   ├── historial.py
│   │   │   ├── medicamento.py
│   │   │   ├── tratamiento.py
│   │   │   └── usuario.py
│   │   ├── 📁 schemas/        # Validación Pydantic
│   │   ├── 📁 services/       # Lógica de negocio
│   │   ├── auth.py           # Autenticación
│   │   ├── config.py         # Configuración
│   │   ├── database.py       # Base de datos
│   │   └── main.py           # Punto de entrada
│   ├── 📁 scripts/           # Scripts de DB
│   └── requirements.txt      # Dependencias Python
│
├── 📁 frontend/               # Cliente web
│   ├── 📁 assets/
│   │   ├── 📁 css/           # Estilos
│   │   ├── 📁 js/            # JavaScript
│   │   └── 📁 images/        # Recursos
│   ├── 📁 pages/             # Páginas modernas
│   ├── alarmas.html          # Gestión de alarmas
│   ├── dashboard.html        # Panel principal
│   ├── index.html            # Login
│   └── registro.html         # Registro
│
├── 📁 docs/                  # Documentación
├── README.md                 # Documentación principal
├── .gitignore               # Archivos ignorados
└── LICENSE                  # Licencia
```

## 🔧 Configuración de Base de Datos

La aplicación usa SQLite por defecto. Los archivos de base de datos se crean automáticamente:

```
backend/
├── tratamientos.db          # Base de datos principal
└── tratamientos_backup_*.db # Respaldos automáticos
```

### Esquema de Base de Datos

**USUARIO**
- ID_USUARIO (PK)
- NOMBRE, CORREO, CONTRASENA_HASH
- SEXO, FECHA_NACIMIENTO, TIPO_SANGRE
- ALERGIAS, PADECIMIENTOS
- FECHA_REGISTRO

**TRATAMIENTO**
- ID_TRATAMIENTO (PK)
- ID_USUARIO (FK)
- NOMBRE_TRATAMIENTO
- FECHA_INICIO, FECHA_FIN
- ESTADO

**MEDICAMENTO**
- ID_MEDICAMENTO (PK)
- ID_TRATAMIENTO (FK)
- NOMBRE, DOSIS, HORA
- INTERVALO, OBSERVACION

**ALARMA**
- ID_ALARMA (PK)
- ID_MEDICAMENTO (FK)
- FECHA, HORA
- TOMADO, APLAZADO

**HISTORIAL**
- ID_HISTORIAL (PK)
- ID_USUARIO (FK)
- ID_MEDICAMENTO (FK)
- FECHA_TOMA, OBSERVACIONES

## 🌐 API Endpoints

### Autenticación
```http
POST /auth/login          # Iniciar sesión
POST /auth/registro       # Registrar usuario
```

### Gestión de Datos
```http
GET/POST /usuarios        # Gestión de usuarios
GET/POST /tratamientos    # Gestión de tratamientos  
GET/POST /medicamentos    # Gestión de medicamentos
GET/POST /alarmas         # Gestión de alarmas
GET/POST /historiales     # Historial médico
```

### Ejemplos de Uso

**Login**:
```javascript
POST /auth/login
{
  "correo": "usuario@example.com",
  "contrasena": "password123"
}
```

**Crear Tratamiento**:
```javascript
POST /tratamientos
{
  "ID_USUARIO": 1,
  "NOMBRE_TRATAMIENTO": "Antibiótico",
  "FECHA_INICIO": "2025-01-01",
  "FECHA_FIN": "2025-01-10"
}
```

## 🔐 Seguridad

- **Autenticación**: Sistema basado en sesiones
- **Validación**: Pydantic en backend, validación JS en frontend
- **CORS**: Configurado para desarrollo local
- **Sanitización**: Inputs validados y sanitizados

## 🎨 Frontend

### Tecnologías
- **HTML5 Semántico**
- **CSS3** con variables personalizadas
- **JavaScript ES6+** modular
- **Font Awesome** para iconos
- **SweetAlert2** para notificaciones

### Características
- **Responsive Design** - Móvil y escritorio
- **Dark/Light Theme** - Temas adaptativos
- **Progressive Enhancement** - Funciona sin JS
- **Accessibility** - Etiquetas ARIA y navegación por teclado

## 🚀 Despliegue en Producción

### Usando Docker (Recomendado)

Crear `Dockerfile` para backend:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Usando Servicios Cloud

**Backend (API)**:
- Heroku
- Railway
- Render
- AWS Lambda

**Frontend**:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Variables de Entorno

```bash
# Desarrollo
DEBUG=True
DATABASE_URL=sqlite:///./tratamientos.db

# Producción
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key
CORS_ORIGINS=https://your-domain.com
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pip install pytest
pytest tests/
```

### Frontend Tests
```bash
cd frontend
# Abrir test/test-*.html en el navegador
```

## 📊 Monitoreo

### Logs
- Backend: Logs automáticos con FastAPI
- Frontend: Console logs para debugging

### Métricas
- Tiempo de respuesta API
- Errores de autenticación
- Uso de endpoints

## 🆘 Troubleshooting

### Problemas Comunes

**CORS Error**:
```bash
# Verificar que el backend esté en puerto 8000
# Verificar configuración CORS en main.py
```

**Base de Datos**:
```bash
# Eliminar base de datos y recrear
rm tratamientos.db
python3 -c "from app.database import create_tables; create_tables()"
```

**Puerto Ocupado**:
```bash
# Cambiar puerto del backend
uvicorn app.main:app --port 8001

# Cambiar puerto del frontend  
python3 -m http.server 3001
```

## 📈 Roadmap

### Próximas Características
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Reportes médicos PDF
- [ ] Integración con APIs médicas
- [ ] Sistema de recordatorios SMS
- [ ] Dashboard de métricas avanzadas

---

📧 **Soporte**: Crea un issue en GitHub para reportar problemas o solicitar características.