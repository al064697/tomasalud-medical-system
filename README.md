# 💊 TomaSalud - Sistema Completo de Gestión de Tratamientos Médicos

<div align="center">

![TomaSalud Logo](frontend/assets/images/logo.png)

**Sistema web completo para la gestión integral de tratamientos médicos, medicamentos y recordatorios automáticos con arquitectura FastAPI + JavaScript vanilla.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-red.svg)](https://www.sqlalchemy.org/)

[🚀 Demo en Vivo](https://tomasalud.vercel.app) • [📚 Documentación API](http://localhost:8000/docs) • [🐛 Reportar Bug](https://github.com/al064697/tomasalud-medical-system/issues) • [✨ Solicitar Feature](https://github.com/al064697/tomasalud-medical-system/issues/new)

</div>

---

## 📋 Descripción

TomaSalud es una aplicación web completa para la gestión de tratamientos médicos y alarmas de medicamentos. Permite a los usuarios registrar sus tratamientos, configurar alarmas para medicamentos y llevar un seguimiento completo de su salud con una interfaz moderna y funcional.

### 🎯 **Propósito Principal**
Facilitar el seguimiento y cumplimiento de tratamientos médicos mediante un sistema automatizado de recordatorios y gestión integral de medicamentos.

---

## 🚀 Características Principales

### 🔐 **Sistema de Autenticación y Usuarios**
- ✅ **Registro completo de usuarios** - Formulario con datos médicos personales
- ✅ **Autenticación con sesiones** - Login seguro con validación de credenciales
- ✅ **Perfiles médicos detallados** - Información de salud, alergias y padecimientos
- ✅ **Gestión de datos personales** - Tipo de sangre, fecha de nacimiento, donador de órganos
- ✅ **Validación de formularios** - Sanitización y validación en frontend y backend

### 🏥 **Gestión de Tratamientos Médicos**
- ✅ **CRUD completo de tratamientos** - Crear, leer, actualizar y eliminar tratamientos
- ✅ **Planificación temporal** - Fechas de inicio y fin de tratamientos
- ✅ **Estados de tratamiento** - Activo, pausado, completado, cancelado
- ✅ **Asociación por usuario** - Cada usuario gestiona sus propios tratamientos
- ✅ **Historial completo** - Registro de todos los cambios y modificaciones

### 💊 **Sistema de Medicamentos**
- ✅ **Gestión completa de medicamentos** - Nombre, dosis, horarios e intervalos
- ✅ **Horarios personalizados** - Configuración flexible de tomas diarias
- ✅ **Intervalos automáticos** - Cada 4, 6, 8, 12 o 24 horas
- ✅ **Observaciones médicas** - Notas especiales por medicamento
- ✅ **Vinculación a tratamientos** - Cada medicamento pertenece a un tratamiento específico
- ✅ **Generación automática de alarmas** - Creación automática de recordatorios

### 🔔 **Sistema de Alarmas Inteligente**
- ✅ **Generación automática** - Alarmas creadas automáticamente al agregar medicamentos
- ✅ **Recordatorios personalizados** - Horarios específicos por medicamento
- ✅ **Estados dinámicos** - Pendiente, tomada, vencida, aplazada
- ✅ **Aplazamiento inteligente** - 5, 10, 15, 30 minutos o 1 hora
- ✅ **Registro de cumplimiento** - Seguimiento completo de tomas de medicamentos
- ✅ **Notificaciones visuales** - Indicadores de estado con colores específicos

### 📊 **Dashboard y Reportes**
- ✅ **Panel de control interactivo** - Resumen visual de estado general
- ✅ **Exportación a PDF** - Reportes médicos profesionales con jsPDF
- ✅ **Estadísticas en tiempo real** - Tratamientos activos, medicamentos pendientes
- ✅ **Próximas alarmas** - Vista de recordatorios más cercanos
- ✅ **Historial de cumplimiento** - Registro de medicamentos tomados correctamente
- ✅ **Navegación intuitiva** - Acceso rápido a todas las funcionalidades

### 🌙 **Modo Oscuro**
- ✅ **Toggle dinámico** - Cambio entre tema claro y oscuro
- ✅ **Persistencia de preferencias** - Guardado en localStorage
- ✅ **Transiciones suaves** - Animaciones elegantes entre temas
- ✅ **Variables CSS optimizadas** - Paleta de colores completa para ambos modos

---

## 🛠️ Tecnologías

### 🔧 **Backend Stack**
- **[FastAPI](https://fastapi.tiangolo.com/)** - Framework web moderno y de alto rendimiento
- **[SQLAlchemy](https://www.sqlalchemy.org/)** - ORM avanzado para gestión de base de datos
- **[SQLite](https://sqlite.org/)** - Base de datos liviana y eficiente (configurable para PostgreSQL/MySQL)
- **[Pydantic](https://pydantic.dev/)** - Validación robusta de datos y serialización
- **[Uvicorn](https://www.uvicorn.org/)** - Servidor ASGI de producción
- **[bcrypt](https://pypi.org/project/bcrypt/)** - Hashing seguro de contraseñas

### 🎨 **Frontend Stack**
- **HTML5 semántico** - Estructura accesible y bien organizada
- **CSS3 moderno** - Variables CSS, flexbox, grid y responsive design
- **JavaScript ES6+** - Código modular y funcional sin dependencias
- **[Font Awesome 6.4.0](https://fontawesome.com/)** - Iconografía consistente y atractiva
- **[Inter Font](https://rsms.me/inter/)** - Tipografía optimizada para interfaces
- **[jsPDF 2.5.1](https://github.com/parallax/jsPDF)** - Generación de PDFs en el cliente

---

## 📁 Estructura del Proyecto

```
TomaSalud/
├── 📁 backend/                    # 🔧 Servidor API FastAPI
│   ├── 📁 app/
│   │   ├── 📁 models/            # 🗂️ Modelos SQLAlchemy
│   │   │   ├── alarma.py
│   │   │   ├── historial.py
│   │   │   ├── medicamento.py
│   │   │   ├── tratamiento.py
│   │   │   └── usuario.py
│   │   ├── 📁 routes/            # 🛤️ Endpoints REST
│   │   │   ├── alarma.py
│   │   │   ├── auth.py
│   │   │   ├── historial.py
│   │   │   ├── medicamento.py
│   │   │   ├── tratamiento.py
│   │   │   └── usuario.py
│   │   ├── 📁 schemas/           # ✅ Validación Pydantic
│   │   │   ├── alarma.py
│   │   │   ├── auth.py
│   │   │   ├── historial.py
│   │   │   ├── medicamento.py
│   │   │   ├── tratamiento.py
│   │   │   └── usuario.py
│   │   ├── 📁 services/          # 🔧 Lógica de negocio
│   │   │   └── alarma_service.py
│   │   ├── auth.py               # 🔐 Autenticación y autorización
│   │   ├── config.py             # ⚙️ Configuración de la aplicación
│   │   ├── database.py           # 🗄️ Configuración de base de datos
│   │   └── main.py               # 🚀 Punto de entrada de la aplicación
│   ├── 📁 scripts/               # 📋 Scripts de base de datos
│   │   ├── schema.sql
│   │   └── TRATAMIENTOS.sql
│   ├── tratamientos.db           # 🗄️ Base de datos SQLite
│   └── requirements.txt          # 📦 Dependencias de Python
│
├── 📁 frontend/                   # 🎨 Interfaz de usuario
│   ├── 📁 assets/
│   │   ├── 📁 css/               # 🎨 Hojas de estilo
│   │   │   ├── dashboard.css
│   │   │   └── style.css
│   │   ├── 📁 js/                # ⚡ Scripts JavaScript
│   │   │   ├── alarmas.js
│   │   │   ├── config.js
│   │   │   ├── dashboard.js
│   │   │   ├── medicamentos.js
│   │   │   ├── notifications.js
│   │   │   └── tratamientos.js
│   │   └── 📁 images/            # 🖼️ Recursos gráficos
│   │       ├── favicon.ico
│   │       ├── logo.png
│   │       └── usuario.png
│   ├── 📁 pages/                 # 📄 Páginas modernas
│   │   ├── dashboard-moderno.html
│   │   ├── index-moderno.html
│   │   ├── registro-moderno.html
│   │   └── configuracion-moderno.html
│   ├── 📁 test/                  # 🧪 Archivos de prueba
│   ├── alarmas.html              # ⏰ Gestión de alarmas
│   ├── dashboard.html            # 📊 Panel principal
│   ├── index.html                # 🔐 Página de login
│   ├── registro.html             # ✏️ Registro de usuarios
│   ├── favicon.ico               # 🔖 Icono de la aplicación
│   └── sw.js                     # 🔧 Service Worker
│
├── 📁 Design/                     # 🎨 Diseños y mockups
│   ├── Frame 1.png
│   ├── Frame 2.png
│   ├── Frame 3.png
│   └── Frame 4.png
│
├── 📁 docs/                       # 📚 Documentación adicional
│   ├── ESTRUCTURA_PROYECTO.md
│   ├── FUNCIONALIDAD_PDF.md
│   └── SISTEMA_FUNCIONANDO.md
│
├── README.md                      # 📖 Este archivo
├── LICENSE                        # ⚖️ Licencia MIT
├── package.json                   # 📦 Metadata del proyecto
├── vercel.json                    # ☁️ Configuración de despliegue
└── .gitignore                     # 🚫 Archivos ignorados por Git
```

---

## 🚀 Instalación y Configuración

### 📋 **Prerrequisitos del Sistema**
- **Python 3.8+** (Recomendado: Python 3.9 o superior)
- **pip** (administrador de paquetes de Python)
- **Git** (para clonar el repositorio)

### 💻 **Verificar Prerrequisitos**

#### **macOS:**
```bash
# Verificar Python
python3 --version

# Verificar pip
pip3 --version

# Verificar Git
git --version
```

#### **Windows:**
```cmd
# Verificar Python
python --version

# Verificar pip
pip --version

# Verificar Git
git --version
```

### 🔧 **Instalación Paso a Paso**

#### **1. Clonar el repositorio**

**macOS/Linux:**
```bash
git clone https://github.com/al064697/tomasalud-medical-system.git
cd tomasalud-medical-system
```

**Windows:**
```cmd
git clone https://github.com/al064697/tomasalud-medical-system.git
cd tomasalud-medical-system
```

#### **2. Crear y activar entorno virtual**

**macOS:**
```bash
# Crear entorno virtual
python3 -m venv .venv

# Activar entorno virtual
source .venv/bin/activate

# Verificar activación
which python
```

**Windows (Command Prompt):**
```cmd
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
.venv\Scripts\activate.bat

# Verificar activación
where python
```

**Windows (PowerShell):**
```powershell
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
.venv\Scripts\Activate.ps1

# Si hay error de ejecución de scripts:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **3. Instalar dependencias del backend**

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Verificar instalación
python3 -c "import fastapi; print('FastAPI instalado correctamente')"
```

#### **4. Ejecutar el servidor backend**

```bash
# Desde el directorio backend
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Salida esperada:
# INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
# INFO: Started reloader process [PID] using StatReload
# INFO: Started server process [PID]
# INFO: Application startup complete.
```

#### **5. Ejecutar el servidor frontend**

```bash
# En una nueva terminal, navegar al directorio frontend
cd frontend

# Ejecutar servidor HTTP de Python
python3 -m http.server 3000

# Salida esperada:
# Serving HTTP on :: port 3000 (http://[::]:3000/) ...
```

---

## 🌐 Acceso a la Aplicación

### **🔗 URLs Principales**
- **🏠 Frontend Principal**: http://localhost:3000
- **🚀 API Backend**: http://localhost:8000
- **📚 Documentación API**: http://localhost:8000/docs
- **🔧 API Interactiva**: http://localhost:8000/redoc

### **📄 Páginas del Frontend**
- **📋 Página Principal**: http://localhost:3000/index.html (Login)
- **✏️ Registro**: http://localhost:3000/registro.html
- **🏥 Dashboard**: http://localhost:3000/dashboard.html
- **⏰ Alarmas**: http://localhost:3000/alarmas.html
- **💊 Dashboard Moderno**: http://localhost:3000/pages/dashboard-moderno.html

---

## 📡 API REST - Endpoints Disponibles

### 🔐 **Autenticación y Usuarios**

#### **Públicos (sin autenticación requerida)**
```http
POST /auth/login          # Iniciar sesión de usuario
POST /auth/registro       # Registrar nuevo usuario
```

#### **Protegidos (requieren autenticación)**
```http
GET  /usuarios            # Listar usuarios del sistema
POST /usuarios            # Crear nuevo usuario
GET  /usuarios/{id}       # Obtener usuario específico
PUT  /usuarios/{id}       # Actualizar datos de usuario
```

### 🏥 **Gestión de Tratamientos**
```http
GET  /tratamientos                     # Listar tratamientos
POST /tratamientos                     # Crear nuevo tratamiento
GET  /tratamientos/{id}                # Obtener tratamiento específico
PUT  /tratamientos/{id}                # Actualizar tratamiento
DELETE /tratamientos/{id}              # Eliminar tratamiento
GET  /tratamientos/{id}/completo       # Obtener tratamiento con medicamentos (para PDF)
```

### 💊 **Gestión de Medicamentos**
```http
GET  /medicamentos                     # Listar medicamentos
POST /medicamentos                     # Crear nuevo medicamento
GET  /medicamentos/{id}                # Obtener medicamento específico
PUT  /medicamentos/{id}                # Actualizar medicamento
DELETE /medicamentos/{id}              # Eliminar medicamento
```

### 🔔 **Sistema de Alarmas**
```http
GET  /alarmas                          # Listar alarmas
POST /alarmas                          # Crear nueva alarma
GET  /alarmas/{id}                     # Obtener alarma específica
PUT  /alarmas/{id}                     # Actualizar alarma (marcar como tomada)
DELETE /alarmas/{id}                   # Eliminar alarma
```

### 📊 **Historial Médico**
```http
GET  /historiales                      # Listar historial médico
POST /historiales                      # Crear entrada en historial
GET  /historiales/{id}                 # Obtener entrada específica
```

### 📋 **Ejemplos de Uso de la API**

#### **Login de Usuario**
```bash
curl -X POST "http://localhost:8000/auth/login" \
     -H "Content-Type: application/json" \
     -d '{
       "correo": "usuario@example.com",
       "contrasena": "password123"
     }'
```

#### **Crear Tratamiento**
```bash
curl -X POST "http://localhost:8000/tratamientos" \
     -H "Content-Type: application/json" \
     -d '{
       "ID_USUARIO": 1,
       "NOMBRE_TRATAMIENTO": "Tratamiento Antibiótico",
       "FECHA_INICIO": "2025-01-01",
       "FECHA_FIN": "2025-01-10",
       "ESTADO": "ACTIVO"
     }'
```

#### **Agregar Medicamento**
```bash
curl -X POST "http://localhost:8000/medicamentos" \
     -H "Content-Type: application/json" \
     -d '{
       "ID_TRATAMIENTO": 1,
       "NOMBRE": "Amoxicilina",
       "DOSIS": "500mg",
       "HORA": "08:00:00",
       "INTERVALO": 8,
       "OBSERVACION": "Tomar con alimentos"
     }'
```

---

## 🗄️ Esquema de Base de Datos

### **Tablas Principales**

#### **USUARIO**
```sql
ID_USUARIO          INTEGER PRIMARY KEY
NOMBRE              TEXT NOT NULL
CORREO              TEXT UNIQUE NOT NULL
CONTRASENA_HASH     TEXT NOT NULL
SEXO                BOOLEAN
FECHA_NACIMIENTO    DATE
TIPO_SANGRE         TEXT
ALERGIAS            TEXT
PADECIMIENTOS       TEXT
DONADOR_ORGANOS     BOOLEAN
ROL                 TEXT DEFAULT 'USUARIO'
FECHA_REGISTRO      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### **TRATAMIENTO**
```sql
ID_TRATAMIENTO      INTEGER PRIMARY KEY
ID_USUARIO          INTEGER REFERENCES USUARIO(ID_USUARIO)
NOMBRE_TRATAMIENTO  TEXT NOT NULL
FECHA_INICIO        DATE NOT NULL
FECHA_FIN           DATE
ESTADO              TEXT DEFAULT 'ACTIVO'
FECHA_CREACION      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### **MEDICAMENTO**
```sql
ID_MEDICAMENTO      INTEGER PRIMARY KEY
ID_TRATAMIENTO      INTEGER REFERENCES TRATAMIENTO(ID_TRATAMIENTO)
NOMBRE              TEXT NOT NULL
DOSIS               TEXT
HORA                TIME NOT NULL
OBSERVACION         TEXT
INTERVALO           INTEGER NOT NULL
FECHA_CREACION      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### **ALARMA**
```sql
ID_ALARMA           INTEGER PRIMARY KEY
ID_MEDICAMENTO      INTEGER REFERENCES MEDICAMENTO(ID_MEDICAMENTO)
FECHA_HORA          DATETIME NOT NULL
ESTADO              TEXT DEFAULT 'PENDIENTE'
OBSERVACIONES       TEXT
```

#### **HISTORIAL**
```sql
ID_HISTORIAL        INTEGER PRIMARY KEY
ID_USUARIO          INTEGER REFERENCES USUARIO(ID_USUARIO)
ID_MEDICAMENTO      INTEGER REFERENCES MEDICAMENTO(ID_MEDICAMENTO)
FECHA_TOMA          DATETIME NOT NULL
OBSERVACIONES       TEXT
```

---

## 🎨 Características del Frontend

### **🎯 Diseño y UX/UI**
- **🎨 Diseño Moderno** - Interfaz limpia y profesional con design system consistente
- **📱 Responsive Design** - Adaptable a móviles, tablets y escritorio
- **♿ Accesibilidad WCAG** - Navegación por teclado y compatibilidad con lectores de pantalla
- **🌙 Modo Oscuro** - Toggle dinámico con persistencia de preferencias
- **⚡ Micro-interacciones** - Hover effects, transiciones suaves y animaciones elegantes

### **🔔 Sistema de Notificaciones**
- **📢 Web Notifications API** - Notificaciones nativas del navegador
- **⏰ Recordatorios Inteligentes** - 5 minutos antes de la toma
- **🚨 Alertas en Tiempo Real** - Notificación exacta a la hora programada
- **⚠️ Medicamentos Vencidos** - Alertas para dosis perdidas
- **🔧 Service Worker Ready** - Preparado para notificaciones avanzadas

### **📊 Dashboard Interactivo**
- **📈 Estadísticas en Tiempo Real** - Contadores de tratamientos, medicamentos y alarmas
- **🃏 Sistema de Cards** - Información organizada en módulos
- **🎯 Estados Visuales** - Indicadores de color para diferentes estados
- **📋 Navegación Intuitiva** - Sidebar fijo con acceso rápido a todas las secciones

### **📄 Exportación de Reportes**
- **📋 PDF Profesional** - Reportes médicos con jsPDF 2.5.1
- **🏥 Branding Médico** - Header con logo y información corporativa
- **📊 Información Completa** - Datos del paciente, tratamiento y medicamentos
- **📋 Instrucciones Médicas** - Guías generales y disclaimer profesional

---

## 🔐 Seguridad y Mejores Prácticas

### **🛡️ Autenticación y Autorización**
- **🔒 Hash de Contraseñas** - bcrypt con salt automático
- **🍪 Sesiones Seguras** - Manejo de sesiones con cookies HTTPOnly
- **✅ Validación Robusta** - Pydantic en backend, validación JS en frontend
- **🚫 Sanitización de Inputs** - Prevención de inyección SQL y XSS

### **🌐 CORS y Configuración**
- **🔗 CORS Configurado** - Permitir comunicación frontend-backend
- **⚙️ Variables de Entorno** - Configuración separada para desarrollo/producción
- **📝 Logging Detallado** - Registro de eventos y errores para debugging

---

## 🚀 Despliegue en Producción

### **☁️ Opciones de Despliegue**

#### **Backend (API)**
- **[Heroku](https://heroku.com/)** - Despliegue fácil con Git
- **[Railway](https://railway.app/)** - Moderno y simple
- **[Render](https://render.com/)** - Gratis con SSL automático
- **[AWS Lambda](https://aws.amazon.com/lambda/)** - Serverless escalable

#### **Frontend**
- **[Vercel](https://vercel.com/)** - Optimizado para frontend estático
- **[Netlify](https://netlify.com/)** - Deploy automático desde Git
- **[GitHub Pages](https://pages.github.com/)** - Gratis para repositorios públicos
- **[AWS S3 + CloudFront](https://aws.amazon.com/s3/)** - CDN global

### **🔧 Variables de Entorno**

#### **Desarrollo**
```bash
DEBUG=True
DATABASE_URL=sqlite:///./tratamientos.db
CORS_ORIGINS=["http://localhost:3000"]
```

#### **Producción**
```bash
DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/database
SECRET_KEY=your-super-secure-secret-key
CORS_ORIGINS=["https://your-domain.com"]
```

### **🐳 Docker (Opcional)**

**Dockerfile para Backend:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./tratamientos.db
    volumes:
      - ./backend/tratamientos.db:/app/tratamientos.db

  frontend:
    image: nginx:alpine
    ports:
      - "3000:80"
    volumes:
      - ./frontend:/usr/share/nginx/html
```

---

## 🧪 Testing y Desarrollo

### **🔍 Pruebas Backend**
```bash
cd backend
pip install pytest pytest-asyncio
pytest tests/ -v
```

### **🌐 Pruebas Frontend**
```bash
cd frontend/test
# Abrir archivos test-*.html en el navegador
python3 -m http.server 8080
```

### **📊 Linting y Formato**
```bash
# Python
pip install black flake8
black backend/app/
flake8 backend/app/

# JavaScript
npm install -g eslint prettier
eslint frontend/assets/js/
prettier --write frontend/assets/js/
```

---

## 🆘 Troubleshooting

### **❌ Problemas Comunes**

#### **CORS Error**
```bash
# Verificar que el backend esté ejecutándose en puerto 8000
# Verificar configuración CORS en backend/app/main.py
```

#### **Error de Base de Datos**
```bash
# Eliminar base de datos corrupta
rm backend/tratamientos.db

# Ejecutar el backend para recrear automáticamente
cd backend
python3 -m uvicorn app.main:app --reload
```

#### **Puerto Ocupado**
```bash
# Backend en puerto alternativo
uvicorn app.main:app --port 8001

# Frontend en puerto alternativo
python3 -m http.server 3001
```

#### **Problemas de Permisos en Windows**
```powershell
# Habilitar ejecución de scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **📞 Obtener Ayuda**
1. **📚 Revisar la documentación** en `/docs`
2. **🔍 Buscar en issues existentes** en GitHub
3. **🐛 Crear un nuevo issue** con detalles del problema
4. **💬 Contactar al desarrollador** via GitHub

---

## 🤝 Contribuir al Proyecto

### **🚀 Cómo Contribuir**

1. **🍴 Fork** el repositorio
2. **🌿 Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **✅ Agregar** tus cambios siguiendo los estándares de código
4. **🧪 Probar** tu código localmente
5. **💾 Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
6. **📤 Push** a la rama (`git push origin feature/AmazingFeature`)
7. **🔃 Abrir** un Pull Request

### **📏 Estándares de Código**

#### **Python (Backend)**
```python
# Ejemplo de función bien documentada
def crear_alarma(medicamento_id: int, fecha: datetime, hora: time) -> Alarma:
    """
    Crea una nueva alarma para un medicamento específico.
    
    Args:
        medicamento_id: ID del medicamento
        fecha: Fecha de la alarma
        hora: Hora de la alarma
        
    Returns:
        Alarma: Objeto alarma creado
        
    Raises:
        ValueError: Si el medicamento no existe
    """
    # Implementación...
```

#### **JavaScript (Frontend)**
```javascript
// Ejemplo de función moderna
const cargarAlarmas = async (usuarioId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/alarmas/?usuario_id=${usuarioId}`);
    const alarmas = await response.json();
    return alarmas;
  } catch (error) {
    console.error('Error cargando alarmas:', error);
    throw error;
  }
};
```

### **🏷️ Tipos de Contribuciones**
- 🐛 **Corrección de bugs**
- ✨ **Nuevas funcionalidades**
- 📚 **Mejoras en documentación**
- 🎨 **Mejoras en UI/UX**
- 🔧 **Optimizaciones de rendimiento**
- 🧪 **Pruebas unitarias**
- 🌐 **Traducciones**

---

## 📈 Roadmap y Futuras Mejoras

### **🔮 Próximas Características**
- [ ] **🔔 Notificaciones Push** - PWA con service workers avanzados
- [ ] **📱 App Móvil** - React Native o Flutter
- [ ] **📊 Dashboard de Métricas** - Analytics avanzados de adherencia
- [ ] **🤖 IA para Recordatorios** - Machine learning para optimizar horarios
- [ ] **🌐 API Médica** - Integración con sistemas de salud
- [ ] **📧 Recordatorios SMS/Email** - Múltiples canales de notificación
- [ ] **🔗 Sync Multi-dispositivo** - Sincronización en tiempo real
- [ ] **📋 Reportes Avanzados** - Gráficos y análisis temporal

### **🛠️ Mejoras Técnicas**
- [ ] **🐳 Containerización** - Docker y Kubernetes
- [ ] **🧪 Test Coverage** - 90%+ de cobertura de pruebas
- [ ] **⚡ Performance** - Caching y optimizaciones
- [ ] **🔒 Security Audit** - Pentesting y auditoría de seguridad
- [ ] **📊 Monitoring** - Logging avanzado y métricas
- [ ] **🌍 Internacionalización** - Soporte multi-idioma

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

### **🎯 Resumen de la Licencia MIT**
- ✅ **Uso comercial** permitido
- ✅ **Modificación** permitida
- ✅ **Distribución** permitida
- ✅ **Uso privado** permitido
- ❌ **Sin garantía** - uso bajo tu propio riesgo
- ❌ **Sin responsabilidad** del autor

---

## 👥 Autores y Reconocimientos

### **👨‍💻 Desarrollador Principal**
- **[Sebastian Eligio Rios Fuentes](https://github.com/al064697)** - Creador y mantenedor principal
  - 📧 Email: sebastian.eligio@example.com
  - 🐙 GitHub: [@al064697](https://github.com/al064697)

### **🙏 Agradecimientos**
- **FastAPI Team** - Por el excelente framework
- **SQLAlchemy Team** - Por el ORM robusto
- **Font Awesome** - Por los iconos
- **Inter Font** - Por la tipografía
- **Comunidad Open Source** - Por las librerías y herramientas

---

## 📊 Estadísticas del Proyecto

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/al064697/tomasalud-medical-system)
![GitHub language count](https://img.shields.io/github/languages/count/al064697/tomasalud-medical-system)
![GitHub top language](https://img.shields.io/github/languages/top/al064697/tomasalud-medical-system)
![GitHub last commit](https://img.shields.io/github/last-commit/al064697/tomasalud-medical-system)
![GitHub issues](https://img.shields.io/github/issues/al064697/tomasalud-medical-system)
![GitHub pull requests](https://img.shields.io/github/issues-pr/al064697/tomasalud-medical-system)

</div>

---

## 📞 Soporte y Contacto

### **🆘 ¿Necesitas Ayuda?**

#### **📚 Recursos de Documentación**
- **📖 Wiki del Proyecto**: [GitHub Wiki](https://github.com/al064697/tomasalud-medical-system/wiki)
- **📋 FAQ**: Preguntas frecuentes en la documentación
- **🎥 Tutoriales**: Videos explicativos (próximamente)

#### **🐛 Reportar Problemas**
- **🔍 Buscar issues existentes**: [Issues](https://github.com/al064697/tomasalud-medical-system/issues)
- **🆕 Crear nuevo issue**: [Nuevo Issue](https://github.com/al064697/tomasalud-medical-system/issues/new)
- **🔒 Reportar vulnerabilidad**: Contacto directo por email

#### **💬 Comunidad**
- **📧 Email**: sebastian.eligio@example.com
- **🐙 GitHub Discussions**: [Discusiones](https://github.com/al064697/tomasalud-medical-system/discussions)
- **💼 LinkedIn**: [Sebastian Eligio](https://linkedin.com/in/sebastian-eligio)

---

<div align="center">

## 🎉 ¡Gracias por usar TomaSalud!

**💊 Ayudando a mejorar la adherencia a tratamientos médicos, una notificación a la vez.**

### ⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella en GitHub!

[![Star History Chart](https://api.star-history.com/svg?repos=al064697/tomasalud-medical-system&type=Date)](https://star-history.com/#al064697/tomasalud-medical-system&Date)

---

### 🔗 Links Rápidos

[🏠 Inicio](https://github.com/al064697/tomasalud-medical-system) • 
[📚 Documentación](https://github.com/al064697/tomasalud-medical-system/wiki) • 
[🐛 Issues](https://github.com/al064697/tomasalud-medical-system/issues) • 
[🔃 Pull Requests](https://github.com/al064697/tomasalud-medical-system/pulls) • 
[📋 Proyectos](https://github.com/al064697/tomasalud-medical-system/projects) • 
[📊 Insights](https://github.com/al064697/tomasalud-medical-system/pulse)

**Hecho con ❤️ y ☕ por [Sebastian Eligio](https://github.com/al064697)**

</div>



### Sistema de Autenticación y Usuarios## 🛠️ Tecnologías

✅ **Registro completo de usuarios** - Formulario con datos médicos personales  

✅ **Autenticación con sesiones** - Login seguro con validación de credenciales  ### Backend

✅ **Perfiles médicos detallados** - Información de salud, alergias y padecimientos  - **FastAPI** - Framework web moderno y rápido

✅ **Gestión de datos personales** - Tipo de sangre, fecha de nacimiento, donador de órganos  - **SQLAlchemy** - ORM para base de datos

✅ **Validación de formularios** - Sanitización y validación en frontend y backend  - **SQLite** - Base de datos ligera (configurable para MySQL)

- **Pydantic** - Validación de datos

### Gestión de Tratamientos Médicos- **Uvicorn** - Servidor ASGI

✅ **CRUD completo de tratamientos** - Crear, leer, actualizar y eliminar tratamientos  

✅ **Planificación temporal** - Fechas de inicio y fin de tratamientos  ### Frontend

✅ **Estados de tratamiento** - Activo, pausado, completado, cancelado  - **HTML5** - Estructura semántica

✅ **Asociación por usuario** - Cada usuario gestiona sus propios tratamientos  - **CSS3** - Estilos responsive y modernos

✅ **Historial completo** - Registro de todos los cambios y modificaciones  - **JavaScript** - Interactividad y comunicación con API

- **Fetch API** - Comunicación asíncrona con backend

### Sistema de Medicamentos

✅ **Gestión completa de medicamentos** - Nombre, dosis, horarios e intervalos  ## 📁 Estructura del Proyecto

✅ **Horarios personalizados** - Configuración flexible de tomas diarias  

✅ **Intervalos automáticos** - Cada 4, 6, 8, 12 o 24 horas  ```

✅ **Observaciones médicas** - Notas especiales por medicamento  TomaSalud/

✅ **Vinculación a tratamientos** - Cada medicamento pertenece a un tratamiento específico  ├── backend/                    # Servidor API

✅ **Generación automática de alarmas** - Creación automática de recordatorios  │   ├── app/

│   │   ├── models/            # Modelos de base de datos

### Sistema de Alarmas Inteligente│   │   ├── routes/            # Endpoints de la API

✅ **Generación automática** - Alarmas creadas automáticamente al agregar medicamentos  │   │   ├── schemas/           # Esquemas de validación

✅ **Recordatorios personalizados** - Horarios específicos por medicamento  │   │   ├── auth.py           # Autenticación

✅ **Estados dinámicos** - Pendiente, tomada, vencida, aplazada  │   │   ├── config.py         # Configuración

✅ **Aplazamiento inteligente** - 5, 10, 15, 30 minutos o 1 hora  │   │   ├── database.py       # Conexión a BD

✅ **Registro de cumplimiento** - Seguimiento completo de tomas de medicamentos  │   │   └── main.py           # Aplicación principal

✅ **Notificaciones visuales** - Indicadores de estado con colores específicos  │   ├── scripts/              # Scripts de base de datos

│   ├── tests/               # Pruebas unitarias

### Dashboard y Reportes│   └── requirements.txt     # Dependencias Python

✅ **Panel de control interactivo** - Resumen visual de estado general  │

✅ **Estadísticas en tiempo real** - Tratamientos activos, medicamentos pendientes  ├── frontend/                  # Interfaz de usuario

✅ **Próximas alarmas** - Vista de recordatorios más cercanos  │   ├── assets/

✅ **Historial de cumplimiento** - Registro de medicamentos tomados correctamente  │   │   ├── css/              # Estilos CSS

✅ **Navegación intuitiva** - Acceso rápido a todas las funcionalidades  │   │   ├── js/               # Scripts JavaScript

│   │   └── images/           # Recursos gráficos

### Tecnologías Backend│   ├── *.html               # Páginas HTML

✅ **FastAPI** - Framework web moderno y de alto rendimiento  │   └── favicon.ico          # Icono de la aplicación

✅ **SQLAlchemy** - ORM avanzado para gestión de base de datos  │

✅ **SQLite** - Base de datos liviana y eficiente  ├── .venv/                    # Entorno virtual Python

✅ **Pydantic** - Validación robusta de datos y serialización  ├── README.md                 # Este archivo

✅ **Uvicorn** - Servidor ASGI de producción  └── vercel.json              # Configuración de despliegue

✅ **CORS configurado** - Comunicación segura frontend-backend  ```



### Tecnologías Frontend## 🚀 Instalación y Configuración

✅ **HTML5 semántico** - Estructura accesible y bien organizada  

✅ **CSS3 moderno** - Variables CSS, flexbox, grid y responsive design  ### 📋 Prerequisitos

✅ **JavaScript ES6+** - Código modular y funcional  - **Python 3.8+** (Recomendado: Python 3.9 o superior)

✅ **SweetAlert2** - Notificaciones elegantes y profesionales  - **pip** (viene incluido con Python)

✅ **Font Awesome** - Iconografía consistente y atractiva  - **Git** (para clonar el repositorio)

✅ **Fetch API** - Comunicación asíncrona con el backend  

### 💻 Verificar prerequisitos

## 🛠️ Instalación y Configuración

#### En macOS:

### Prerrequisitos del Sistema```bash

- **Python 3.8+** - Lenguaje de programación principal# Verificar Python

- **pip** - Administrador de paquetes de Pythonpython3 --version

- **Git** - Control de versiones# o

python --version

### 1. Clonar y Configurar Proyecto

```bash# Verificar pip

# Clonar repositoriopip3 --version

git clone https://github.com/tu-usuario/tomasalud-medical-system.git# o

cd tomasalud-medical-systempip --version



# Crear entorno virtual (recomendado)# Verificar Git

python3 -m venv venvgit --version

source venv/bin/activate  # En Windows: venv\Scripts\activate```

```

#### En Windows:

### 2. Configurar Backend```cmd

```bash# Verificar Python

# Navegar al directorio backendpython --version

cd backend

# Verificar pip

# Instalar dependencias de Pythonpip --version

pip install -r requirements.txt

# Verificar Git

# Verificar instalacióngit --version

python3 -c "import fastapi; print('FastAPI instalado correctamente')"```

```

### 🔧 Instalación paso a paso

### 3. Ejecutar Servidor Backend

```bash#### 1. **Clonar el repositorio**

# Desde el directorio backend

python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000**macOS/Linux:**

```bash

# Salida esperada:git clone https://github.com/al064697/AppTratamientos.git

# INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)cd AppTratamientos

# INFO: Started reloader process [PID] using StatReload```

# INFO: Started server process [PID]

# INFO: Application startup complete.**Windows (Command Prompt):**

``````cmd

git clone https://github.com/al064697/AppTratamientos.git

### 4. Ejecutar Servidor Frontendcd AppTratamientos

```bash```

# En una nueva terminal, navegar al directorio frontend

cd frontend**Windows (PowerShell):**

```powershell

# Ejecutar servidor HTTP de Pythongit clone https://github.com/al064697/AppTratamientos.git

python3 -m http.server 3000Set-Location AppTratamientos

```

# Salida esperada:

# Serving HTTP on :: port 3000 (http://[::]:3000/) ...#### 2. **Crear y activar entorno virtual**

```

**macOS:**

## 🌐 Acceso a la Aplicación```bash

# Crear entorno virtual

### URLs Principalespython3 -m venv .venv

- **🏠 Frontend Principal**: http://localhost:3000

- **🚀 API Backend**: http://localhost:8000  # Activar entorno virtual

- **📚 Documentación API**: http://localhost:8000/docssource .venv/bin/activate

- **🔧 API Interactiva**: http://localhost:8000/redoc

# Verificar activación (debe aparecer (.venv) al inicio de la línea)

### Páginas del Frontendwhich python

- **📋 Página Principal**: http://localhost:3000/index.html (Login)```

- **✏️ Registro**: http://localhost:3000/registro.html

- **🏥 Dashboard**: http://localhost:3000/dashboard.html**Windows (Command Prompt):**

- **⏰ Alarmas**: http://localhost:3000/alarmas.html```cmd

- **💊 Versión Moderna**: http://localhost:3000/pages/dashboard-moderno.html# Crear entorno virtual

python -m venv .venv

## 📡 API REST - Endpoints Disponibles

# Activar entorno virtual

### 🔐 Autenticación y Usuarios.venv\Scripts\activate.bat



#### Públicos (sin autenticación requerida)# Verificar activación (debe aparecer (.venv) al inicio)

```httpwhere python

POST /auth/login          # Iniciar sesión de usuario```

POST /auth/registro       # Registrar nuevo usuario

```**Windows (PowerShell):**

```powershell

#### Protegidos (requieren autenticación)# Crear entorno virtual

```httppython -m venv .venv

GET  /usuarios            # Listar usuarios del sistema

POST /usuarios            # Crear nuevo usuario# Activar entorno virtual

GET  /usuarios/{id}       # Obtener usuario específico  .venv\Scripts\Activate.ps1

PUT  /usuarios/{id}       # Actualizar datos de usuario

```# Si hay error de ejecución de scripts:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

### 🏥 Gestión de Tratamientos

```http# Verificar activación

GET  /tratamientos                     # Listar tratamientosGet-Command python

POST /tratamientos                     # Crear nuevo tratamiento```

GET  /tratamientos/{id}                # Obtener tratamiento específico

PUT  /tratamientos/{id}                # Actualizar tratamiento#### 3. **Instalar dependencias del backend**

DELETE /tratamientos/{id}              # Eliminar tratamiento

GET  /tratamientos/?usuario_id={id}    # Filtrar por usuario**macOS:**

``````bash

# Navegar al directorio backend

### 💊 Gestión de Medicamentoscd backend

```http

GET  /medicamentos                     # Listar medicamentos# Instalar dependencias

POST /medicamentos                     # Crear nuevo medicamentopip install -r requirements.txt

GET  /medicamentos/{id}                # Obtener medicamento específico

PUT  /medicamentos/{id}                # Actualizar medicamento# Verificar instalación

DELETE /medicamentos/{id}              # Eliminar medicamentopip list

GET  /medicamentos/?usuario_id={id}    # Filtrar por usuario```

```

**Windows:**

### ⏰ Sistema de Alarmas```cmd

```http# Navegar al directorio backend

GET  /alarmas                          # Listar alarmascd backend

POST /alarmas                          # Crear nueva alarma

GET  /alarmas/{id}                     # Obtener alarma específica# Instalar dependencias

PUT  /alarmas/{id}/tomar               # Marcar medicamento como tomadopip install -r requirements.txt

PUT  /alarmas/{id}/aplazar             # Aplazar alarma por X minutos

GET  /alarmas/?usuario_id={id}         # Filtrar alarmas por usuario# Verificar instalación

```pip list

```

### 📊 Historial Médico

```http## 🏃‍♂️ Ejecución de la Aplicación

GET  /historiales                      # Listar historial completo

POST /historiales                      # Crear entrada de historial### 🚨 **IMPORTANTE**: Necesitas **2 terminales** ejecutándose simultáneamente

GET  /historiales/{id}                 # Obtener entrada específica

GET  /historiales/?usuario_id={id}     # Filtrar por usuario---

```

## 📱 **Opción 1: Comandos rápidos (Una línea)**

## 📋 Esquemas de Base de Datos

### **macOS/Linux:**

### 👤 USUARIO```bash

```sql# Terminal 1 - Backend

CREATE TABLE USUARIO (cd backend && source ../.venv/bin/activate && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

    ID_USUARIO INTEGER PRIMARY KEY AUTOINCREMENT,

    NOMBRE VARCHAR(100) NOT NULL,# Terminal 2 - Frontend

    CORREO VARCHAR(150) UNIQUE NOT NULL,cd frontend && source ../.venv/bin/activate && python -m http.server 3000

    CONTRASENA_HASH VARCHAR(255) NOT NULL,```

    SEXO VARCHAR(10),

    FECHA_NACIMIENTO DATE,### **Windows (Command Prompt):**

    TIPO_SANGRE VARCHAR(5),```cmd

    DONADOR_ORGANOS BOOLEAN DEFAULT FALSE,# Terminal 1 - Backend

    ALERGIAS TEXT,cd backend && ..\.venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

    PADECIMIENTOS TEXT,

    ROL VARCHAR(20) DEFAULT 'user',# Terminal 2 - Frontend

    FECHA_REGISTRO DATETIME DEFAULT CURRENT_TIMESTAMPcd frontend && ..\.venv\Scripts\activate.bat && python -m http.server 3000

);```

```

### **Windows (PowerShell):**

### 🏥 TRATAMIENTO```powershell

```sql# Terminal 1 - Backend

CREATE TABLE TRATAMIENTO (Set-Location backend; ..\.venv\Scripts\Activate.ps1; python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

    ID_TRATAMIENTO INTEGER PRIMARY KEY AUTOINCREMENT,

    ID_USUARIO INTEGER NOT NULL,# Terminal 2 - Frontend

    NOMBRE_TRATAMIENTO VARCHAR(200) NOT NULL,Set-Location frontend; ..\.venv\Scripts\Activate.ps1; python -m http.server 3000

    FECHA_INICIO DATE NOT NULL,```

    FECHA_FIN DATE,

    ESTADO VARCHAR(20) DEFAULT 'activo',---

    FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)## 📚 **Opción 2: Paso a paso detallado**

);

```### **🔴 TERMINAL 1 - BACKEND**



### 💊 MEDICAMENTO#### **macOS:**

```sql```bash

CREATE TABLE MEDICAMENTO (# 1. Navegar al directorio raíz del proyecto

    ID_MEDICAMENTO INTEGER PRIMARY KEY AUTOINCREMENT,cd /ruta/a/tu/AppTratamientos

    ID_TRATAMIENTO INTEGER NOT NULL,

    NOMBRE VARCHAR(200) NOT NULL,# 2. Activar entorno virtual

    DOSIS VARCHAR(100),source .venv/bin/activate

    HORA TIME NOT NULL,

    OBSERVACION TEXT,# 3. Navegar al backend

    INTERVALO INTEGER DEFAULT 24,cd backend

    FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ID_TRATAMIENTO) REFERENCES TRATAMIENTO(ID_TRATAMIENTO)# 4. Ejecutar servidor FastAPI

);python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

``````



### ⏰ ALARMA#### **Windows (Command Prompt):**

```sql```cmd

CREATE TABLE ALARMA (# 1. Navegar al directorio raíz del proyecto

    ID_ALARMA INTEGER PRIMARY KEY AUTOINCREMENT,cd C:\ruta\a\tu\AppTratamientos

    ID_MEDICAMENTO INTEGER NOT NULL,

    FECHA DATE NOT NULL,# 2. Activar entorno virtual

    HORA TIME NOT NULL,.venv\Scripts\activate.bat

    TOMADO BOOLEAN DEFAULT FALSE,

    APLAZADO BOOLEAN DEFAULT FALSE,# 3. Navegar al backend

    FECHA_CREACION DATETIME DEFAULT CURRENT_TIMESTAMP,cd backend

    FOREIGN KEY (ID_MEDICAMENTO) REFERENCES MEDICAMENTO(ID_MEDICAMENTO)

);# 4. Ejecutar servidor FastAPI

```python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

```

### 📊 HISTORIAL

```sql#### **Windows (PowerShell):**

CREATE TABLE HISTORIAL (```powershell

    ID_HISTORIAL INTEGER PRIMARY KEY AUTOINCREMENT,# 1. Navegar al directorio raíz del proyecto

    ID_USUARIO INTEGER NOT NULL,Set-Location C:\ruta\a\tu\AppTratamientos

    ID_MEDICAMENTO INTEGER NOT NULL,

    FECHA_TOMA DATETIME NOT NULL,# 2. Activar entorno virtual

    OBSERVACIONES TEXT,.venv\Scripts\Activate.ps1

    ESTADO VARCHAR(20) DEFAULT 'tomado',

    FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO),# 3. Navegar al backend

    FOREIGN KEY (ID_MEDICAMENTO) REFERENCES MEDICAMENTO(ID_MEDICAMENTO)Set-Location backend

);

```# 4. Ejecutar servidor FastAPI

python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## 🔧 Ejemplos de Uso de la API```



### 🔐 Autenticación### **🔵 TERMINAL 2 - FRONTEND**



#### Registro de Usuario#### **macOS:**

```bash```bash

curl -X POST http://localhost:8000/auth/registro \# 1. Abrir NUEVA terminal y navegar al proyecto

  -H "Content-Type: application/json" \cd /ruta/a/tu/AppTratamientos

  -d '{

    "nombre": "Dr. Juan Pérez",# 2. Activar entorno virtual

    "correo": "juan.perez@email.com",source .venv/bin/activate

    "contrasena": "mi_contraseña_segura",

    "sexo": "masculino",# 3. Navegar al frontend

    "fecha_nacimiento": "1985-03-15",cd frontend

    "tipo_sangre": "O+",

    "donador_organos": true,# 4. Ejecutar servidor HTTP

    "alergias": "Penicilina, mariscos",python -m http.server 3000

    "padecimientos": "Hipertensión leve"```

  }'

```#### **Windows (Command Prompt):**

```cmd

#### Respuesta de Registro Exitoso# 1. Abrir NUEVA terminal y navegar al proyecto

```jsoncd C:\ruta\a\tu\AppTratamientos

{

  "message": "Usuario registrado exitosamente",# 2. Activar entorno virtual

  "usuario": {.venv\Scripts\activate.bat

    "ID_USUARIO": 1,

    "NOMBRE": "Dr. Juan Pérez",# 3. Navegar al frontend

    "CORREO": "juan.perez@email.com",cd frontend

    "SEXO": "masculino",

    "FECHA_NACIMIENTO": "1985-03-15",# 4. Ejecutar servidor HTTP

    "TIPO_SANGRE": "O+",python -m http.server 3000

    "DONADOR_ORGANOS": true,```

    "ROL": "user",

    "FECHA_REGISTRO": "2025-10-01T12:00:00"#### **Windows (PowerShell):**

  }```powershell

}# 1. Abrir NUEVA terminal y navegar al proyecto

```Set-Location C:\ruta\a\tu\AppTratamientos



#### Iniciar Sesión# 2. Activar entorno virtual

```bash.venv\Scripts\Activate.ps1

curl -X POST http://localhost:8000/auth/login \

  -H "Content-Type: application/json" \# 3. Navegar al frontend

  -d '{Set-Location frontend

    "correo": "juan.perez@email.com",

    "contrasena": "mi_contraseña_segura"# 4. Ejecutar servidor HTTP

  }'python -m http.server 3000

``````



#### Respuesta de Login Exitoso---

```json

{## 🌐 **Acceso a la aplicación**

  "message": "Login exitoso",

  "usuario": {Cuando ambos terminales estén ejecutándose, accede a:

    "ID_USUARIO": 1,

    "NOMBRE": "Dr. Juan Pérez",- **🖥️ Aplicación Web**: [http://localhost:3000](http://localhost:3000)

    "CORREO": "juan.perez@email.com",- **📚 Documentación API**: [http://localhost:8000/docs](http://localhost:8000/docs)

    "ROL": "user"- **📖 API Redoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

  }

}---

```

## 📝 **Indicadores de éxito**

### 🏥 Gestión de Tratamientos

### **✅ Backend funcionando correctamente:**

#### Crear Nuevo Tratamiento```

```bashINFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)

curl -X POST http://localhost:8000/tratamientos \INFO:     Started reloader process [xxxxx] using WatchFiles

  -H "Content-Type: application/json" \Conectando a la base de datos: sqlite:///./tratamientos.db

  -d '{INFO:     Application startup complete.

    "ID_USUARIO": 1,```

    "NOMBRE_TRATAMIENTO": "Antibiótico para infección respiratoria",

    "FECHA_INICIO": "2025-10-01",### **✅ Frontend funcionando correctamente:**

    "FECHA_FIN": "2025-10-10",```

    "ESTADO": "activo"Serving HTTP on :: port 3000 (http://[::]:3000/) ...

  }'```

```

---

#### Obtener Tratamientos por Usuario

```bash## 🐛 **Troubleshooting**

curl -X GET "http://localhost:8000/tratamientos/?usuario_id=1" \

  -H "Content-Type: application/json"### **Problemas comunes y soluciones:**

```

#### **🔴 "python: command not found" (macOS)**

#### Respuesta de Lista de Tratamientos```bash

```json# Usar python3 en lugar de python

[python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

  {python3 -m http.server 3000

    "ID_TRATAMIENTO": 1,```

    "ID_USUARIO": 1,

    "NOMBRE_TRATAMIENTO": "Antibiótico para infección respiratoria",#### **🔴 "No module named 'uvicorn'"**

    "FECHA_INICIO": "2025-10-01",```bash

    "FECHA_FIN": "2025-10-10",# Asegúrate de que el entorno virtual esté activado

    "ESTADO": "activo",source .venv/bin/activate  # macOS

    "FECHA_CREACION": "2025-10-01T12:00:00".venv\Scripts\activate.bat # Windows

  }

]# Reinstalar dependencias

```cd backend

pip install -r requirements.txt

### 💊 Gestión de Medicamentos```



#### Crear Nuevo Medicamento#### **🔴 Error de puerto ocupado**

```bash```bash

curl -X POST http://localhost:8000/medicamentos \# Cambiar puerto si está ocupado

  -H "Content-Type: application/json" \python -m uvicorn app.main:app --reload --port 8001  # Backend

  -d '{python -m http.server 3001                           # Frontend

    "ID_TRATAMIENTO": 1,```

    "NOMBRE": "Amoxicilina 500mg",

    "DOSIS": "1 cápsula",#### **� Error 404 en frontend**

    "HORA": "08:00:00",- Verifica que estés ejecutando el servidor desde el directorio `frontend`

    "OBSERVACION": "Tomar con alimentos para evitar malestar estomacal",- Asegúrate de acceder a `http://localhost:3000` (no `http://localhost:3000/index.html`)

    "INTERVALO": 8

  }'#### **🔴 PowerShell: "execution of scripts is disabled"**

``````powershell

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

#### Respuesta de Medicamento Creado```

```json

{#### **🔴 No se conecta frontend con backend**

  "ID_MEDICAMENTO": 1,- Verifica que ambos servidores estén ejecutándose

  "ID_TRATAMIENTO": 1,- Backend debe estar en puerto 8000, frontend en puerto 3000

  "NOMBRE": "Amoxicilina 500mg",- Revisa que no haya firewall bloqueando las conexiones

  "DOSIS": "1 cápsula",

  "HORA": "08:00:00",---

  "OBSERVACION": "Tomar con alimentos para evitar malestar estomacal",

  "INTERVALO": 8,## 🎯 **Notas importantes:**

  "FECHA_CREACION": "2025-10-01T12:00:00"

}- ⚠️ **Mantén ambos terminales abiertos** mientras uses la aplicación

```- 🔄 **Backend con recarga automática**: Los cambios en código Python se aplican automáticamente

- 🌐 **CORS configurado**: Comunicación frontend-backend habilitada

### ⏰ Sistema de Alarmas- 💾 **Base de datos**: Se crea automáticamente en `backend/tratamientos.db`

- 🛑 **Para detener**: Presiona `Ctrl+C` en cada terminal

#### Obtener Alarmas del Usuario

```bash## 🔧 **Dependencias del proyecto**

curl -X GET "http://localhost:8000/alarmas/?usuario_id=1" \

  -H "Content-Type: application/json"### **Backend (Python):**

``````

fastapi>=0.68.0

#### Respuesta de Alarmasuvicorn[standard]>=0.15.0

```jsonsqlalchemy>=1.4.23

[sqlite3 (incluido en Python)

  {pydantic>=1.8.0

    "ID_ALARMA": 1,python-jose[cryptography]

    "ID_MEDICAMENTO": 1,passlib[bcrypt]

    "FECHA": "2025-10-01",python-multipart

    "HORA": "08:00:00",```

    "TOMADO": false,

    "APLAZADO": false,### **Frontend:**

    "MEDICAMENTO_NOMBRE": "Amoxicilina 500mg",- HTML5, CSS3, JavaScript vanilla

    "DOSIS": "1 cápsula"- No requiere instalaciones adicionales

  },

  {---

    "ID_ALARMA": 2,

    "ID_MEDICAMENTO": 1,## 🚀 **Comandos alternativos**

    "FECHA": "2025-10-01",

    "HORA": "16:00:00",### **Si tienes problemas con uvicorn:**

    "TOMADO": false,```bash

    "APLAZADO": false,# macOS/Linux

    "MEDICAMENTO_NOMBRE": "Amoxicilina 500mg",python -m fastapi dev app/main.py --host 0.0.0.0 --port 8000

    "DOSIS": "1 cápsula"

  }# Windows

]python -m fastapi dev app/main.py --host 0.0.0.0 --port 8000

``````



#### Marcar Medicamento como Tomado### **Si python3 no funciona en macOS:**

```bash```bash

curl -X PUT http://localhost:8000/alarmas/1/tomar \# Instalar Python usando Homebrew

  -H "Content-Type: application/json"brew install python3

```

# O usar pyenv

#### Aplazar Alarmapyenv install 3.9.16

```bashpyenv global 3.9.16

curl -X PUT http://localhost:8000/alarmas/1/aplazar \```

  -H "Content-Type: application/json" \

  -d '{### **Si tienes múltiples versiones de Python:**

    "minutos": 15```bash

  }'# Especificar versión exacta

```python3.9 -m venv .venv

python3.10 -m venv .venv

## 📁 Estructura del Proyecto```

```

tomasalud-medical-system/---

├── 📁 backend/                    # Servidor API FastAPI

│   ├── 📁 app/## 📦 **Instalación manual de dependencias**

│   │   ├── 📁 models/            # Modelos SQLAlchemy

│   │   │   ├── alarma.pySi `requirements.txt` falla, instala manualmente:

│   │   │   ├── historial.py

│   │   │   ├── medicamento.py```bash

│   │   │   ├── tratamiento.pypip install fastapi uvicorn sqlalchemy pydantic python-jose passlib python-multipart

│   │   │   └── usuario.py```

│   │   ├── 📁 routes/            # Endpoints REST

│   │   │   ├── alarma.py---

│   │   │   ├── auth.py

│   │   │   ├── historial.py## 🎯 Funcionalidades

│   │   │   ├── medicamento.py

│   │   │   ├── tratamiento.py### 👤 Gestión de Usuarios

│   │   │   └── usuario.py- ✅ Registro de usuarios

│   │   ├── 📁 schemas/           # Validación Pydantic- ✅ Autenticación segura

│   │   │   ├── alarma.py- ✅ Perfiles de usuario completos

│   │   │   ├── auth.py- ✅ Información médica (tipo sangre, alergias, etc.)

│   │   │   ├── historial.py

│   │   │   ├── medicamento.py### 💊 Gestión de Tratamientos

│   │   │   ├── tratamiento.py- ✅ Crear tratamientos médicos

│   │   │   └── usuario.py- ✅ Asignar medicamentos a tratamientos

│   │   ├── 📁 services/          # Lógica de negocio- ✅ Configurar dosis y horarios

│   │   │   └── alarma_service.py- ✅ Observaciones detalladas

│   │   ├── auth.py               # Sistema de autenticación- ✅ Estados de tratamiento (Activo, Suspendido, Finalizado)

│   │   ├── config.py             # Configuración general

│   │   ├── database.py           # Conexión a base de datos### ⏰ Sistema de Alarmas

│   │   └── main.py               # Punto de entrada FastAPI- ✅ Alarmas programadas para medicamentos

│   ├── 📁 scripts/               # Scripts de utilidades- ✅ Intervalos personalizables

│   │   ├── schema.sql- ✅ Notificaciones visuales

│   │   └── TRATAMIENTOS.sql- ✅ Seguimiento de tomas

│   ├── 📁 tests/                 # Pruebas unitarias

│   └── requirements.txt          # Dependencias Python### 📊 Panel de Control

│- ✅ Dashboard completo

├── 📁 frontend/                   # Cliente web- ✅ CRUD completo para todas las entidades

│   ├── 📁 assets/- ✅ Interfaz responsive

│   │   ├── 📁 css/               # Hojas de estilo- ✅ Exportación de datos

│   │   │   ├── dashboard.css- ✅ Filtros y búsquedas

│   │   │   └── style.css

│   │   ├── 📁 js/                # JavaScript modular## 👨‍💻 Desarrollador

│   │   │   ├── alarmas.js

│   │   │   ├── config.js**Sebastian Eligio Rios Fuentes**

│   │   │   └── dashboard.js- GitHub: [@al064697](https://github.com/al064697)

│   │   └── 📁 images/            # Recursos gráficos- Email: al064697@uacam.mx

│   │       ├── favicon.ico

│   │       ├── logo.png## 📄 Licencia

│   │       └── usuario.png

│   ├── 📁 pages/                 # Páginas modernasEste proyecto está bajo la Licencia MIT.

│   │   ├── alarmas-moderno.html

│   │   ├── dashboard-moderno.html---

│   │   └── index-moderno.html

│   ├── 📁 test/                  # Archivos de prueba⭐ **¡No olvides dar estrella al proyecto si te ha sido útil!** ⭐
│   ├── alarmas.html              # Gestión de alarmas
│   ├── dashboard.html            # Panel principal
│   ├── index.html                # Página de login
│   └── registro.html             # Registro de usuarios
│
├── 📁 docs/                      # Documentación
├── 📁 scripts/                   # Scripts de configuración
├── README.md                     # Este archivo
├── SETUP.md                      # Guía de instalación
├── LICENSE                       # Licencia MIT
└── .gitignore                    # Archivos ignorados por Git
```

## 🚀 Despliegue

### 🐳 Docker
```dockerfile
# Backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### ☁️ Servicios Cloud
- **Backend**: Railway, Render, Vercel, Heroku
- **Frontend**: Netlify, Vercel, GitHub Pages, Cloudflare Pages

## 🔐 Seguridad

- **🔒 Autenticación**: Sistema de sesiones seguro
- **🛡️ Validación**: Pydantic en backend, JS en frontend  
- **🔐 Contraseñas**: Hash seguro con bcrypt
- **🚫 CORS**: Configuración restrictiva
- **🔍 Sanitización**: Prevención de inyección SQL

## 🆘 Troubleshooting

### Problemas Comunes
1. **CORS Error**: Verificar configuración en `main.py`
2. **BD No Encontrada**: Ejecutar `create_tables()`
3. **Puerto Ocupado**: Cambiar puertos 8001/3001
4. **Dependencias**: `pip install -r requirements.txt`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Sebastian Eligio** - [@al064697](https://github.com/al064697)

## 📞 Soporte

- **📧 Email**: sebastian.eligio@email.com
- **🐙 GitHub Issues**: [Crear Issue](https://github.com/tu-usuario/tomasalud/issues)
- **📖 Documentación**: Ver `/docs` y `SETUP.md`

---

<div align="center">

### ⭐ ¡Dale una estrella si te resulta útil!

**Hecho con ❤️ para mejorar la adherencia a tratamientos médicos**

</div>