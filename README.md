# Alarma Tratamiento II

Sistema de gestión de tratamientos médicos desarrollado con:

## Frontend
- HTML5, CSS3, JavaScript
- Diseño responsivo y profesional
- Sistema de autenticación
- Dashboard con CRUD completo

## Backend
- FastAPI (Python)
- SQLAlchemy ORM
- Base de datos SQLite/MySQL
- API RESTful

## Características
- ✅ Registro y login de usuarios
- ✅ Gestión de tratamientos médicos
- ✅ Administración de medicamentos
- ✅ Dashboard interactivo
- ✅ Validación de formularios
- ✅ Diseño profesional

## Desarrollo Local

### Frontend
```bash
cd frontend
python3 -m http.server 3002
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8004
```

## Enlaces
- Frontend: http://localhost:3002
- Backend API: http://localhost:8004/docs

## Producción
Desplegado en Vercel: [URL del proyecto]