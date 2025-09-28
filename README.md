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

### 📋 Prerequisitos
- **Python 3.8+** (Recomendado: Python 3.9 o superior)
- **pip** (viene incluido con Python)
- **Git** (para clonar el repositorio)

### 💻 Verificar prerequisitos

#### En macOS:
```bash
# Verificar Python
python3 --version
# o
python --version

# Verificar pip
pip3 --version
# o
pip --version

# Verificar Git
git --version
```

#### En Windows:
```cmd
# Verificar Python
python --version

# Verificar pip
pip --version

# Verificar Git
git --version
```

### 🔧 Instalación paso a paso

#### 1. **Clonar el repositorio**

**macOS/Linux:**
```bash
git clone https://github.com/al064697/AppTratamientos.git
cd AppTratamientos
```

**Windows (Command Prompt):**
```cmd
git clone https://github.com/al064697/AppTratamientos.git
cd AppTratamientos
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/al064697/AppTratamientos.git
Set-Location AppTratamientos
```

#### 2. **Crear y activar entorno virtual**

**macOS:**
```bash
# Crear entorno virtual
python3 -m venv .venv

# Activar entorno virtual
source .venv/bin/activate

# Verificar activación (debe aparecer (.venv) al inicio de la línea)
which python
```

**Windows (Command Prompt):**
```cmd
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
.venv\Scripts\activate.bat

# Verificar activación (debe aparecer (.venv) al inicio)
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

# Verificar activación
Get-Command python
```

#### 3. **Instalar dependencias del backend**

**macOS:**
```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Verificar instalación
pip list
```

**Windows:**
```cmd
# Navegar al directorio backend
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Verificar instalación
pip list
```

## 🏃‍♂️ Ejecución de la Aplicación

### 🚨 **IMPORTANTE**: Necesitas **2 terminales** ejecutándose simultáneamente

---

## 📱 **Opción 1: Comandos rápidos (Una línea)**

### **macOS/Linux:**
```bash
# Terminal 1 - Backend
cd backend && source ../.venv/bin/activate && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend && source ../.venv/bin/activate && python -m http.server 3000
```

### **Windows (Command Prompt):**
```cmd
# Terminal 1 - Backend
cd backend && ..\.venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend && ..\.venv\Scripts\activate.bat && python -m http.server 3000
```

### **Windows (PowerShell):**
```powershell
# Terminal 1 - Backend
Set-Location backend; ..\.venv\Scripts\Activate.ps1; python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
Set-Location frontend; ..\.venv\Scripts\Activate.ps1; python -m http.server 3000
```

---

## 📚 **Opción 2: Paso a paso detallado**

### **🔴 TERMINAL 1 - BACKEND**

#### **macOS:**
```bash
# 1. Navegar al directorio raíz del proyecto
cd /ruta/a/tu/AppTratamientos

# 2. Activar entorno virtual
source .venv/bin/activate

# 3. Navegar al backend
cd backend

# 4. Ejecutar servidor FastAPI
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### **Windows (Command Prompt):**
```cmd
# 1. Navegar al directorio raíz del proyecto
cd C:\ruta\a\tu\AppTratamientos

# 2. Activar entorno virtual
.venv\Scripts\activate.bat

# 3. Navegar al backend
cd backend

# 4. Ejecutar servidor FastAPI
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### **Windows (PowerShell):**
```powershell
# 1. Navegar al directorio raíz del proyecto
Set-Location C:\ruta\a\tu\AppTratamientos

# 2. Activar entorno virtual
.venv\Scripts\Activate.ps1

# 3. Navegar al backend
Set-Location backend

# 4. Ejecutar servidor FastAPI
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **🔵 TERMINAL 2 - FRONTEND**

#### **macOS:**
```bash
# 1. Abrir NUEVA terminal y navegar al proyecto
cd /ruta/a/tu/AppTratamientos

# 2. Activar entorno virtual
source .venv/bin/activate

# 3. Navegar al frontend
cd frontend

# 4. Ejecutar servidor HTTP
python -m http.server 3000
```

#### **Windows (Command Prompt):**
```cmd
# 1. Abrir NUEVA terminal y navegar al proyecto
cd C:\ruta\a\tu\AppTratamientos

# 2. Activar entorno virtual
.venv\Scripts\activate.bat

# 3. Navegar al frontend
cd frontend

# 4. Ejecutar servidor HTTP
python -m http.server 3000
```

#### **Windows (PowerShell):**
```powershell
# 1. Abrir NUEVA terminal y navegar al proyecto
Set-Location C:\ruta\a\tu\AppTratamientos

# 2. Activar entorno virtual
.venv\Scripts\Activate.ps1

# 3. Navegar al frontend
Set-Location frontend

# 4. Ejecutar servidor HTTP
python -m http.server 3000
```

---

## 🌐 **Acceso a la aplicación**

Cuando ambos terminales estén ejecutándose, accede a:

- **🖥️ Aplicación Web**: [http://localhost:3000](http://localhost:3000)
- **📚 Documentación API**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **📖 API Redoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📝 **Indicadores de éxito**

### **✅ Backend funcionando correctamente:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
Conectando a la base de datos: sqlite:///./tratamientos.db
INFO:     Application startup complete.
```

### **✅ Frontend funcionando correctamente:**
```
Serving HTTP on :: port 3000 (http://[::]:3000/) ...
```

---

## 🐛 **Troubleshooting**

### **Problemas comunes y soluciones:**

#### **🔴 "python: command not found" (macOS)**
```bash
# Usar python3 en lugar de python
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
python3 -m http.server 3000
```

#### **🔴 "No module named 'uvicorn'"**
```bash
# Asegúrate de que el entorno virtual esté activado
source .venv/bin/activate  # macOS
.venv\Scripts\activate.bat # Windows

# Reinstalar dependencias
cd backend
pip install -r requirements.txt
```

#### **🔴 Error de puerto ocupado**
```bash
# Cambiar puerto si está ocupado
python -m uvicorn app.main:app --reload --port 8001  # Backend
python -m http.server 3001                           # Frontend
```

#### **� Error 404 en frontend**
- Verifica que estés ejecutando el servidor desde el directorio `frontend`
- Asegúrate de acceder a `http://localhost:3000` (no `http://localhost:3000/index.html`)

#### **🔴 PowerShell: "execution of scripts is disabled"**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### **🔴 No se conecta frontend con backend**
- Verifica que ambos servidores estén ejecutándose
- Backend debe estar en puerto 8000, frontend en puerto 3000
- Revisa que no haya firewall bloqueando las conexiones

---

## 🎯 **Notas importantes:**

- ⚠️ **Mantén ambos terminales abiertos** mientras uses la aplicación
- 🔄 **Backend con recarga automática**: Los cambios en código Python se aplican automáticamente
- 🌐 **CORS configurado**: Comunicación frontend-backend habilitada
- 💾 **Base de datos**: Se crea automáticamente en `backend/tratamientos.db`
- 🛑 **Para detener**: Presiona `Ctrl+C` en cada terminal

## 🔧 **Dependencias del proyecto**

### **Backend (Python):**
```
fastapi>=0.68.0
uvicorn[standard]>=0.15.0
sqlalchemy>=1.4.23
sqlite3 (incluido en Python)
pydantic>=1.8.0
python-jose[cryptography]
passlib[bcrypt]
python-multipart
```

### **Frontend:**
- HTML5, CSS3, JavaScript vanilla
- No requiere instalaciones adicionales

---

## 🚀 **Comandos alternativos**

### **Si tienes problemas con uvicorn:**
```bash
# macOS/Linux
python -m fastapi dev app/main.py --host 0.0.0.0 --port 8000

# Windows
python -m fastapi dev app/main.py --host 0.0.0.0 --port 8000
```

### **Si python3 no funciona en macOS:**
```bash
# Instalar Python usando Homebrew
brew install python3

# O usar pyenv
pyenv install 3.9.16
pyenv global 3.9.16
```

### **Si tienes múltiples versiones de Python:**
```bash
# Especificar versión exacta
python3.9 -m venv .venv
python3.10 -m venv .venv
```

---

## 📦 **Instalación manual de dependencias**

Si `requirements.txt` falla, instala manualmente:

```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib python-multipart
```

---

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
- Email: al064697@uacam.mx

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⭐ **¡No olvides dar estrella al proyecto si te ha sido útil!** ⭐