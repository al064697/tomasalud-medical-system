# 🤝 Guía de Contribución - TomaSalud

¡Gracias por tu interés en contribuir a TomaSalud! Esta guía te ayudará a realizar contribuciones efectivas al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)

## 📜 Código de Conducta

Este proyecto adhiere a un código de conducta. Al participar, se espera que mantengas este código:

- **Sé respetuoso**: Trata a todos con respeto y cortesía
- **Sé inclusivo**: Bienvenidos a todos, independientemente de su experiencia
- **Sé constructivo**: Proporciona feedback útil y específico
- **Sé paciente**: Recuerda que todos estamos aprendiendo

## 🚀 ¿Cómo Contribuir?

### Tipos de Contribuciones Bienvenidas

- 🐛 **Corrección de bugs**
- ✨ **Nuevas funcionalidades**
- 📚 **Mejoras en documentación**
- 🎨 **Mejoras en UI/UX**
- 🔧 **Optimizaciones de rendimiento**
- 🧪 **Pruebas unitarias**
- 🌐 **Traducciones**

### Proceso Básico

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Haz** tus cambios siguiendo los estándares
4. **Prueba** tu código
5. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
6. **Push** a la rama (`git push origin feature/AmazingFeature`)
7. **Abre** un Pull Request

## ⚙️ Configuración del Entorno

### Prerrequisitos
- Python 3.8+
- Git
- Editor de código (VS Code recomendado)

### Configuración Local
```bash
# 1. Fork y clonar
git clone https://github.com/tu-usuario/tomasalud-medical-system.git
cd tomasalud-medical-system

# 2. Crear entorno virtual
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Instalar dependencias
cd backend
pip install -r requirements.txt

# 4. Ejecutar tests
python -m pytest tests/

# 5. Ejecutar servidor de desarrollo
python -m uvicorn app.main:app --reload --port 8000
```

## 📏 Estándares de Código

### Python (Backend)

#### Estilo de Código
- **PEP 8**: Seguir las guías de estilo de Python
- **Líneas**: Máximo 88 caracteres por línea
- **Imports**: Organizados y agrupados correctamente
- **Docstrings**: Documentar funciones y clases

```python
# ✅ Correcto
def crear_alarma(medicamento_id: int, fecha: date, hora: time) -> Alarma:
    """
    Crea una nueva alarma para un medicamento específico.
    
    Args:
        medicamento_id: ID del medicamento
        fecha: Fecha de la alarma
        hora: Hora de la alarma
        
    Returns:
        Alarma: Objeto alarma creado
    """
    # Implementación...
```

#### Nomenclatura
- **Variables y funciones**: `snake_case`
- **Clases**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Archivos**: `snake_case.py`

### JavaScript (Frontend)

#### Estilo de Código
- **ES6+**: Usar características modernas de JavaScript
- **Semicolons**: Usar siempre
- **Quotes**: Comillas simples preferidas
- **Indentation**: 2 espacios

```javascript
// ✅ Correcto
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

#### Nomenclatura
- **Variables y funciones**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Archivos**: `kebab-case.js`

### Base de Datos

#### Nomenclatura
- **Tablas**: `UPPER_SNAKE_CASE`
- **Columnas**: `UPPER_SNAKE_CASE`
- **Índices**: `idx_tabla_columna`
- **Foreign Keys**: `fk_tabla_columna`

## 🔄 Proceso de Pull Request

### Antes de Crear el PR

1. **Actualiza tu rama**:
   ```bash
   git checkout main
   git pull upstream main
   git checkout tu-rama
   git rebase main
   ```

2. **Ejecuta las pruebas**:
   ```bash
   # Backend
   cd backend
   python -m pytest tests/ -v
   
   # Frontend (si aplica)
   npm test
   ```

3. **Verifica el código**:
   ```bash
   # Linting Python
   flake8 app/
   black app/ --check
   
   # Linting JavaScript
   eslint assets/js/
   ```

### Título del PR

Usa este formato:
```
tipo(scope): descripción breve

Ejemplos:
feat(alarmas): add snooze functionality
fix(auth): resolve login validation issue
docs(api): update endpoint documentation
style(frontend): improve button styling
```

### Descripción del PR

Incluye:
- **¿Qué?**: Descripción clara de los cambios
- **¿Por qué?**: Razón del cambio
- **¿Cómo?**: Enfoque técnico utilizado
- **Testing**: Cómo se probó el cambio
- **Screenshots**: Para cambios visuales

### Template de PR

```markdown
## 📋 Descripción
Breve descripción de los cambios realizados.

## 🧪 ¿Cómo se probó?
- [ ] Pruebas unitarias pasaron
- [ ] Pruebas manuales realizadas
- [ ] Probado en diferentes navegadores

## 📸 Screenshots (si aplica)
Adjuntar capturas de pantalla para cambios visuales.

## ✅ Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código en áreas complejas
- [ ] He actualizado la documentación correspondiente
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado pruebas que validan mi corrección/funcionalidad
```

## 🐛 Reportar Bugs

### Antes de Reportar
1. **Busca** en issues existentes
2. **Actualiza** a la última versión
3. **Reproduce** el bug consistentemente

### Template de Bug Report
```markdown
**Descripción del Bug**
Descripción clara y concisa del bug.

**Pasos para Reproducir**
1. Ve a '...'
2. Haz clic en '....'
3. Desplázate hacia abajo hasta '....'
4. Ve el error

**Comportamiento Esperado**
Descripción clara de lo que esperabas que pasara.

**Screenshots**
Si aplica, agrega screenshots para explicar el problema.

**Información del Sistema:**
 - OS: [e.g. macOS, Windows, Linux]
 - Navegador [e.g. chrome, safari]
 - Versión [e.g. 22]

**Contexto Adicional**
Agrega cualquier otro contexto sobre el problema aquí.
```

## ✨ Solicitar Funcionalidades

### Template de Feature Request
```markdown
**¿Tu solicitud está relacionada con un problema?**
Descripción clara y concisa del problema.

**Describe la solución que te gustaría**
Descripción clara y concisa de lo que quieres que suceda.

**Describe alternativas que hayas considerado**
Descripción clara y concisa de soluciones alternativas.

**Contexto Adicional**
Agrega cualquier otro contexto o screenshots sobre la solicitud.
```

## 🏷️ Labels del Proyecto

- `bug` - Algo no está funcionando
- `enhancement` - Nueva funcionalidad o mejora
- `documentation` - Mejoras en documentación
- `good first issue` - Buenos para nuevos contribuyentes
- `help wanted` - Se necesita ayuda extra
- `question` - Información adicional requerida
- `wontfix` - No será solucionado

## 📞 ¿Necesitas Ayuda?

- **Discord**: [Enlace al servidor] (si aplica)
- **Email**: sebastian.eligio@email.com
- **Issues**: Crear un issue con la etiqueta `question`

## 🙏 Reconocimientos

Agradecemos a todos los contribuyentes que ayudan a hacer TomaSalud mejor:

- [@al064697](https://github.com/al064697) - Creador y mantenedor principal

---

<div align="center">

**¡Gracias por contribuir a TomaSalud! 💊❤️**

*Cada contribución, sin importar el tamaño, hace la diferencia.*

</div>