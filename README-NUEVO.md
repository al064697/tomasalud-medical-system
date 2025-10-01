# 💊 TomaSalud - Sistema de Gestión de Tratamientos Médicos

Una aplicación web completa para el manejo de tratamientos médicos, medicamentos y alarmas de recordatorio.

## 🚀 Características

- **Gestión de Usuarios**: Registro, autenticación y perfiles médicos
- **Tratamientos**: Creación y seguimiento de tratamientos médicos
- **Medicamentos**: Administración de medicamentos con dosis y horarios
- **Alarmas**: Sistema automático de recordatorios para toma de medicamentos
- **Dashboard**: Panel de control con estadísticas y resumen
- **Historial**: Registro completo de medicamentos tomados

## 🏗️ Arquitectura

### Backend (FastAPI)
```
backend/
├── app/
│   ├── models/          # Modelos de base de datos (SQLAlchemy)
│   ├── routes/          # Endpoints de la API REST
│   ├── schemas/         # Esquemas de validación (Pydantic)
│   ├── services/        # Lógica de negocio
│   ├── auth.py          # Sistema de autenticación
│   ├── database.py      # Configuración de base de datos
│   └── main.py          # Punto de entrada de la aplicación
├── scripts/             # Scripts de base de datos
└── requirements.txt     # Dependencias de Python
```

### Frontend (HTML/CSS/JavaScript)
```
frontend/
├── assets/
│   ├── css/            # Estilos CSS
│   ├── js/             # JavaScript y configuración
│   └── images/         # Recursos gráficos
├── pages/              # Páginas modernas
├── *.html              # Páginas principales
└── test/               # Archivos de prueba
```

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **SQLAlchemy** - ORM para base de datos
- **SQLite** - Base de datos ligera
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica del cliente
- **Font Awesome** - Iconografía
- **SweetAlert2** - Alertas elegantes

## 📦 Instalación

### Prerrequisitos
- Python 3.8+
- pip

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tomasalud.git
cd tomasalud
```

### 2. Configurar el backend
```bash
cd backend
pip install -r requirements.txt
```

### 3. Ejecutar el backend
```bash
python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Ejecutar el frontend
```bash
cd ../frontend
python3 -m http.server 3000
```

## 🌐 Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs

## 📋 Uso

### 1. Registro de Usuario
- Accede a `http://localhost:3000/registro.html`
- Completa el formulario con tus datos médicos
- Inicia sesión con tu correo y contraseña

### 2. Crear Tratamiento
- Ve al Dashboard
- Haz clic en "Nuevo Tratamiento"
- Ingresa nombre, fechas de inicio y fin

### 3. Agregar Medicamentos
- Dentro de un tratamiento, agrega medicamentos
- Define dosis, horarios e intervalos
- El sistema creará alarmas automáticamente

### 4. Gestionar Alarmas
- Ve a la sección "Alarmas"
- Marca medicamentos como tomados
- Aplaza alarmas si es necesario

## 🗃️ Base de Datos

El sistema utiliza SQLite con las siguientes entidades:

- **USUARIO** - Información de usuarios y datos médicos
- **TRATAMIENTO** - Tratamientos médicos del usuario
- **MEDICAMENTO** - Medicamentos asociados a tratamientos
- **ALARMA** - Recordatorios automáticos
- **HISTORIAL** - Registro de medicamentos tomados

## 🔧 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/registro` - Registrar usuario

### Gestión
- `GET/POST /usuarios` - Usuarios
- `GET/POST /tratamientos` - Tratamientos
- `GET/POST /medicamentos` - Medicamentos
- `GET/POST /alarmas` - Alarmas
- `GET/POST /historiales` - Historial

## 🎨 Características del Frontend

- **Diseño Responsivo** - Adaptable a móviles y escritorio
- **Interfaz Moderna** - UI limpia y profesional
- **Navegación Intuitiva** - Flujo de usuario optimizado
- **Feedback Visual** - Alertas y confirmaciones elegantes
- **Estados Dinámicos** - Indicadores visuales de estado

## 🔐 Seguridad

- Autenticación basada en sesiones
- Validación de datos en frontend y backend
- Sanitización de inputs
- CORS configurado para desarrollo

## 🚀 Despliegue

### Desarrollo Local
Sigue las instrucciones de instalación arriba.

### Producción
- Configura variables de entorno
- Usa un servidor web (Nginx/Apache)
- Configura base de datos PostgreSQL/MySQL
- Implementa HTTPS

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Sebastian Eligio** - Desarrollo inicial

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación en `/docs`
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 📊 Estado del Proyecto

✅ **Funcionalidades Implementadas**:
- Sistema de autenticación completo
- CRUD de usuarios, tratamientos y medicamentos
- Generación automática de alarmas
- Dashboard con estadísticas
- Interfaz responsive

🚧 **En Desarrollo**:
- Notificaciones push
- Reportes médicos
- Integración con APIs médicas
- App móvil

---

⭐ ¡No olvides dar una estrella al proyecto si te resulta útil!