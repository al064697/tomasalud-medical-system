// dashboard.js - TomaSalud Dashboard Management
console.log('🚀 Cargando TomaSalud Dashboard...');

// URLs del backend - usando configuración global
const BASE_URL = CONFIG ? CONFIG.API_BASE_URL : 'http://127.0.0.1:8000';
console.log('🔧 CONFIG disponible:', typeof CONFIG !== 'undefined');
console.log('🌐 BASE_URL configurado:', BASE_URL);

// Obtener ID de usuario desde localStorage
let currentUserId = null;
try {
  // Intentar múltiples fuentes de datos de usuario
  const userData = localStorage.getItem('user_data') || localStorage.getItem('user');
  const userId = localStorage.getItem('user_id') || localStorage.getItem('id');
  
  if (userData) {
    const user = JSON.parse(userData);
    currentUserId = user.user_id || user.id || userId;
    console.log('✅ Usuario logueado ID (desde user_data):', currentUserId);
  } else if (userId) {
    currentUserId = userId;
    console.log('✅ Usuario logueado ID (desde user_id):', currentUserId);
  } else {
    console.warn('⚠️ No se encontraron datos de usuario');
  }
} catch (error) {
  console.error('❌ Error obteniendo ID de usuario:', error);
  // Intentar con user_id directo como fallback
  const fallbackUserId = localStorage.getItem('user_id');
  if (fallbackUserId) {
    currentUserId = fallbackUserId;
    console.log('✅ Usuario logueado ID (fallback):', currentUserId);
  }
}

// Variables globales
let tratamientoSeleccionado = null;
let medicamentoSeleccionado = null;

// Función utilitaria para cerrar sesión
function cerrarSesion() {
  console.log('🔑 Ejecutando proceso de cierre de sesión');
  
  // Limpiar todos los datos de sesión
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  localStorage.removeItem('userData');
  localStorage.removeItem('user');
  
  // Limpiar sessionStorage también si se usa
  sessionStorage.clear();
  
  console.log('✅ Datos de sesión limpiados');
  
  // Redirigir al login
  window.location.href = 'index.html';
}

// Función para crear notificaciones personalizadas
function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
  // Crear el contenedor de notificación si no existe
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  // Crear la notificación
  const notification = document.createElement('div');
  notification.style.cssText = `
    margin-bottom: 10px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.3s ease-out;
    pointer-events: auto;
    max-width: 400px;
    word-wrap: break-word;
    background: ${tipo === 'error' ? '#e74c3c' : tipo === 'success' ? '#27ae60' : tipo === 'warning' ? '#f39c12' : '#3498db'};
  `;

  notification.textContent = mensaje;
  container.appendChild(notification);

  // Auto remover después de la duración especificada
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duracion);
}

// Función para crear modal personalizado
function crearModal(titulo, contenido, onConfirm, onCancel = null) {
  // Crear overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Crear modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 30px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    font-family: Arial, sans-serif;
  `;

  modal.innerHTML = `
    <h3 style="margin: 0 0 20px 0; color: #325866; font-size: 20px;">${titulo}</h3>
    <div style="margin-bottom: 25px; color: #333; line-height: 1.5;">${contenido}</div>
    <div style="display: flex; gap: 10px; justify-content: flex-end;">
      ${onCancel ? '<button id="modal-cancel" style="padding: 10px 20px; border: 1px solid #ccc; background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Cancelar</button>' : ''}
      <button id="modal-confirm" style="padding: 10px 20px; border: none; background: #41c1ba; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Confirmar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Event listeners del modal
  modal.querySelector('#modal-confirm').addEventListener('click', () => {
    document.body.removeChild(overlay);
    if (onConfirm) onConfirm();
  });

  if (onCancel) {
    modal.querySelector('#modal-cancel').addEventListener('click', () => {
      document.body.removeChild(overlay);
      if (onCancel) onCancel();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      if (onCancel) onCancel();
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(overlay);
      if (onCancel) onCancel();
    }
  });
}

// Función para crear formularios modales
function crearFormularioModal(titulo, campos, onSubmit, datosExistentes = null) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    font-family: Arial, sans-serif;
  `;

  let formHTML = `
    <h3 style="margin: 0 0 20px 0; color: #325866; font-size: 20px;">${titulo}</h3>
    <form id="modal-form">
  `;

  campos.forEach(campo => {
    const valor = datosExistentes ? datosExistentes[campo.key] || '' : '';
    
    if (campo.type === 'select') {
      formHTML += `
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">${campo.label}:</label>
          <select name="${campo.key}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
      `;
      campo.options.forEach(option => {
        const selected = valor === option.value ? 'selected' : '';
        formHTML += `<option value="${option.value}" ${selected}>${option.label}</option>`;
      });
      formHTML += `
          </select>
        </div>
      `;
    } else {
      formHTML += `
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">${campo.label}:</label>
          <input type="${campo.type}" name="${campo.key}" value="${valor}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" ${campo.required ? 'required' : ''}>
        </div>
      `;
    }
  });

  formHTML += `
    </form>
    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 25px;">
      <button id="form-cancel" style="padding: 10px 20px; border: 1px solid #ccc; background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Cancelar</button>
      <button id="form-submit" style="padding: 10px 20px; border: none; background: #41c1ba; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Guardar</button>
    </div>
  `;

  modal.innerHTML = formHTML;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Event listeners
  modal.querySelector('#form-submit').addEventListener('click', () => {
    const form = modal.querySelector('#modal-form');
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    document.body.removeChild(overlay);
    if (onSubmit) onSubmit(data);
  });

  modal.querySelector('#form-cancel').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

// Función para cargar tratamientos
async function cargarTratamientos() {
  console.log('📋 Cargando tratamientos para usuario:', currentUserId);
  
  const tratamientoList = document.querySelector('.treatment-list');
  if (!tratamientoList) {
    console.error('❌ No se encontró el elemento .treatment-list');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/tratamientos/?usuario_id=${currentUserId}`);
    console.log('🌐 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const tratamientos = await response.json();
    console.log('📋 Tratamientos recibidos:', tratamientos);

    tratamientoList.innerHTML = '';

    if (Array.isArray(tratamientos) && tratamientos.length > 0) {
      tratamientos.forEach(tratamiento => {
        const li = document.createElement('li');
        li.className = 'treatment-item';
        li.innerHTML = `
          <div class="treatment-info">
            <strong>${tratamiento.NOMBRE_TRATAMIENTO}</strong>
            <div class="treatment-details">
              <span>Inicio: ${tratamiento.FECHA_INICIO}</span>
              <span>Estado: ${tratamiento.ESTADO}</span>
            </div>
          </div>
        `;
        
        li.addEventListener('click', () => {
          document.querySelectorAll('.treatment-item').forEach(item => {
            item.classList.remove('selected');
          });
          li.classList.add('selected');
          tratamientoSeleccionado = tratamiento;
          console.log('🎯 Tratamiento seleccionado:', tratamiento);
        });

        tratamientoList.appendChild(li);
      });
    } else {
      tratamientoList.innerHTML = '<li class="no-data">No hay tratamientos registrados</li>';
    }
  } catch (error) {
    console.error('❌ Error cargando tratamientos:', error);
    mostrarNotificacion('Error al cargar tratamientos: ' + error.message, 'error');
    tratamientoList.innerHTML = '<li class="error">Error cargando tratamientos</li>';
  }
}

// Función para cargar medicamentos
async function cargarMedicamentos() {
  console.log('💊 Cargando medicamentos para usuario:', currentUserId);
  console.log('💊 BASE_URL:', BASE_URL);
  
  // Verificar que tenemos un usuario válido
  if (!currentUserId) {
    console.error('❌ No hay usuario logueado');
    return;
  }
  
  const medicamentosList = document.querySelector('.medication-list');
  if (!medicamentosList) {
    console.error('❌ No se encontró el elemento .medication-list');
    console.error('❌ Elementos disponibles:', document.querySelectorAll('ul'));
    return;
  }
  
  console.log('✅ Elemento medication-list encontrado:', medicamentosList);

  try {
    const response = await fetch(`${BASE_URL}/medicamentos/?usuario_id=${currentUserId}`);
    console.log('🌐 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const medicamentos = await response.json();
    console.log('💊 Medicamentos recibidos:', medicamentos);

    medicamentosList.innerHTML = '';

    if (Array.isArray(medicamentos) && medicamentos.length > 0) {
      console.log('📋 Procesando', medicamentos.length, 'medicamentos');
      medicamentos.forEach((medicamento, index) => {
        console.log(`💊 Medicamento ${index + 1}:`, medicamento);
        console.log('💊 Campos:', Object.keys(medicamento));
        console.log('💊 NOMBRE:', medicamento.NOMBRE);
        console.log('💊 DOSIS:', medicamento.DOSIS);
        console.log('💊 HORA:', medicamento.HORA);
        
        const li = document.createElement('li');
        li.className = 'medication-item';
        li.innerHTML = `
          <div class="medication-info">
            <strong>${medicamento.NOMBRE || 'Sin nombre'}</strong>
            <div class="medication-details">
              <span>Dosis: ${medicamento.DOSIS || 'Sin dosis'}</span>
              <span>Hora: ${medicamento.HORA || 'Sin hora'}</span>
            </div>
          </div>
        `;
        
        li.addEventListener('click', () => {
          document.querySelectorAll('.medication-item').forEach(item => {
            item.classList.remove('selected');
          });
          li.classList.add('selected');
          medicamentoSeleccionado = medicamento;
          console.log('🎯 Medicamento seleccionado:', medicamento);
        });

        medicamentosList.appendChild(li);
      });
    } else {
      console.log('📋 No hay medicamentos o array vacío');
      console.log('📋 Tipo de medicamentos:', typeof medicamentos);
      console.log('📋 Es array?', Array.isArray(medicamentos));
      console.log('📋 Longitud:', medicamentos ? medicamentos.length : 'null/undefined');
      medicamentosList.innerHTML = '<li class="no-data">No hay medicamentos registrados</li>';
    }
  } catch (error) {
    console.error('❌ Error cargando medicamentos:', error);
    mostrarNotificacion('Error al cargar medicamentos: ' + error.message, 'error');
    medicamentosList.innerHTML = '<li class="error">Error cargando medicamentos</li>';
  }
}

// Función para agregar tratamiento
function agregarTratamiento() {
  console.log('✅ Agregando nuevo tratamiento');
  
  const campos = [
    { key: 'NOMBRE_TRATAMIENTO', label: 'Nombre del Tratamiento', type: 'text', required: true },
    { key: 'FECHA_INICIO', label: 'Fecha de Inicio', type: 'date', required: true },
    { key: 'FECHA_FIN', label: 'Fecha de Fin', type: 'date' },
    { 
      key: 'ESTADO', 
      label: 'Estado', 
      type: 'select', 
      options: [
        { value: 'ACTIVO', label: 'Activo' },
        { value: 'PAUSADO', label: 'Pausado' },
        { value: 'COMPLETADO', label: 'Completado' }
      ]
    }
  ];

  crearFormularioModal('Nuevo Tratamiento', campos, async (data) => {
    try {
      data.ID_USUARIO = currentUserId;
      
      const response = await fetch(`${BASE_URL}/tratamientos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const nuevoTratamiento = await response.json();
      console.log('✅ Tratamiento creado:', nuevoTratamiento);
      mostrarNotificacion('Tratamiento agregado exitosamente!', 'success');
      cargarTratamientos();
    } catch (error) {
      console.error('❌ Error creando tratamiento:', error);
      mostrarNotificacion('Error al crear tratamiento: ' + error.message, 'error');
    }
  });
}

// Función para editar tratamiento
function editarTratamiento() {
  if (!tratamientoSeleccionado) {
    mostrarNotificacion('Por favor selecciona un tratamiento para editar', 'warning');
    return;
  }

  console.log('✏️ Editando tratamiento:', tratamientoSeleccionado);
  
  const campos = [
    { key: 'NOMBRE_TRATAMIENTO', label: 'Nombre del Tratamiento', type: 'text', required: true },
    { key: 'FECHA_INICIO', label: 'Fecha de Inicio', type: 'date', required: true },
    { key: 'FECHA_FIN', label: 'Fecha de Fin', type: 'date' },
    { 
      key: 'ESTADO', 
      label: 'Estado', 
      type: 'select', 
      options: [
        { value: 'ACTIVO', label: 'Activo' },
        { value: 'PAUSADO', label: 'Pausado' },
        { value: 'COMPLETADO', label: 'Completado' }
      ]
    }
  ];

  crearFormularioModal('Editar Tratamiento', campos, async (data) => {
    try {
      data.ID_USUARIO = currentUserId;
      
      const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const tratamientoActualizado = await response.json();
      console.log('✅ Tratamiento actualizado:', tratamientoActualizado);
      mostrarNotificacion('Tratamiento actualizado exitosamente!', 'success');
      tratamientoSeleccionado = null;
      cargarTratamientos();
    } catch (error) {
      console.error('❌ Error actualizando tratamiento:', error);
      mostrarNotificacion('Error al actualizar tratamiento: ' + error.message, 'error');
    }
  }, tratamientoSeleccionado);
}

// Función para eliminar tratamiento
function eliminarTratamiento() {
  if (!tratamientoSeleccionado) {
    mostrarNotificacion('Por favor selecciona un tratamiento para eliminar', 'warning');
    return;
  }

  console.log('🗑️ Eliminando tratamiento:', tratamientoSeleccionado);

  crearModal(
    'Confirmar Eliminación',
    `¿Estás seguro de que quieres eliminar el tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}"?`,
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('✅ Tratamiento eliminado exitosamente');
        mostrarNotificacion('Tratamiento eliminado exitosamente!', 'success');
        tratamientoSeleccionado = null;
        cargarTratamientos();
      } catch (error) {
        console.error('❌ Error eliminando tratamiento:', error);
        mostrarNotificacion('Error al eliminar tratamiento: ' + error.message, 'error');
      }
    },
    () => {
      console.log('❌ Eliminación cancelada');
    }
  );
}

// Función para agregar medicamento
async function agregarMedicamento() {
  console.log('✅ Agregando nuevo medicamento');
  
  // Primero obtener tratamientos del usuario para el selector
  try {
    const response = await fetch(`${BASE_URL}/tratamientos/?usuario_id=${currentUserId}`);
    const tratamientos = await response.json();
    
    if (!Array.isArray(tratamientos) || tratamientos.length === 0) {
      mostrarNotificacion('Primero debes crear un tratamiento para agregar medicamentos', 'warning');
      return;
    }
    
    const opcionesTratamientos = tratamientos.map(t => ({
      value: t.ID_TRATAMIENTO,
      label: t.NOMBRE_TRATAMIENTO
    }));
    
    const campos = [
      { 
        key: 'ID_TRATAMIENTO', 
        label: 'Tratamiento', 
        type: 'select', 
        required: true,
        options: opcionesTratamientos
      },
      { key: 'NOMBRE', label: 'Nombre del Medicamento', type: 'text', required: true },
      { key: 'DOSIS', label: 'Dosis', type: 'text', required: true },
      { key: 'HORA', label: 'Hora de Toma', type: 'time', required: true },
      { key: 'OBSERVACION', label: 'Observaciones', type: 'text' },
      { key: 'INTERVALO', label: 'Intervalo (horas)', type: 'number' }
    ];

    crearFormularioModal('Nuevo Medicamento', campos, async (data) => {
      try {
        // Convertir campos numéricos si existen
        if (data.INTERVALO) {
          data.INTERVALO = parseInt(data.INTERVALO);
        }
        
        const response = await fetch(`${BASE_URL}/medicamentos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const nuevoMedicamento = await response.json();
        console.log('✅ Medicamento creado:', nuevoMedicamento);
        mostrarNotificacion('Medicamento agregado exitosamente!', 'success');
        cargarMedicamentos();
      } catch (error) {
        console.error('❌ Error creando medicamento:', error);
        mostrarNotificación('Error al crear medicamento: ' + error.message, 'error');
      }
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo tratamientos:', error);
    mostrarNotificacion('Error al obtener tratamientos: ' + error.message, 'error');
  }
}

// Función para editar medicamento
function editarMedicamento() {
  if (!medicamentoSeleccionado) {
    mostrarNotificacion('Por favor selecciona un medicamento para editar', 'warning');
    return;
  }

  console.log('✏️ Editando medicamento:', medicamentoSeleccionado);
  
  const campos = [
    { key: 'NOMBRE', label: 'Nombre del Medicamento', type: 'text', required: true },
    { key: 'DOSIS', label: 'Dosis', type: 'text', required: true },
    { key: 'HORA', label: 'Hora de Toma', type: 'time', required: true },
    { key: 'OBSERVACION', label: 'Observaciones', type: 'text' },
    { key: 'INTERVALO', label: 'Intervalo (horas)', type: 'number' }
  ];

  crearFormularioModal('Editar Medicamento', campos, async (data) => {
    try {
      // Convertir campos numéricos si existen
      if (data.INTERVALO) {
        data.INTERVALO = parseInt(data.INTERVALO);
      }
      
      const response = await fetch(`${BASE_URL}/medicamentos/${medicamentoSeleccionado.ID_MEDICAMENTO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const medicamentoActualizado = await response.json();
      console.log('✅ Medicamento actualizado:', medicamentoActualizado);
      mostrarNotificacion('Medicamento actualizado exitosamente!', 'success');
      medicamentoSeleccionado = null;
      cargarMedicamentos();
    } catch (error) {
      console.error('❌ Error actualizando medicamento:', error);
      mostrarNotificacion('Error al actualizar medicamento: ' + error.message, 'error');
    }
  }, medicamentoSeleccionado);
}

// Función para eliminar medicamento
function eliminarMedicamento() {
  if (!medicamentoSeleccionado) {
    mostrarNotificacion('Por favor selecciona un medicamento para eliminar', 'warning');
    return;
  }

  console.log('🗑️ Eliminando medicamento:', medicamentoSeleccionado);

  crearModal(
    'Confirmar Eliminación',
    `¿Estás seguro de que quieres eliminar el medicamento "${medicamentoSeleccionado.NOMBRE_MEDICAMENTO}"?`,
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/medicamentos/${medicamentoSeleccionado.ID_MEDICAMENTO}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('✅ Medicamento eliminado exitosamente');
        mostrarNotificacion('Medicamento eliminado exitosamente!', 'success');
        medicamentoSeleccionado = null;
        cargarMedicamentos();
      } catch (error) {
        console.error('❌ Error eliminando medicamento:', error);
        mostrarNotificacion('Error al eliminar medicamento: ' + error.message, 'error');
      }
    },
    () => {
      console.log('❌ Eliminación cancelada');
    }
  );
}

// Función para mostrar el nombre del usuario logueado
function mostrarNombreUsuario() {
  const usernameDisplay = document.getElementById('username-display');
  if (usernameDisplay) {
    try {
      // Obtener datos del usuario desde localStorage
      const userData = localStorage.getItem('user_data') || localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        usernameDisplay.textContent = user.nombre || user.NOMBRE || 'Usuario';
        console.log('✅ Nombre de usuario mostrado:', user.nombre || user.NOMBRE);
      } else {
        // Fallback si no hay datos
        usernameDisplay.textContent = 'Usuario';
        console.log('⚠️ No se encontraron datos de usuario, usando "Usuario" como fallback');
      }
    } catch (error) {
      console.error('❌ Error obteniendo datos de usuario:', error);
      usernameDisplay.textContent = 'Usuario';
    }
  } else {
    console.error('❌ No se encontró el elemento username-display');
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 DOM cargado, inicializando dashboard...');
  console.log('📊 Estado inicial - currentUserId:', currentUserId);
  console.log('🔧 CONFIG objeto:', typeof CONFIG !== 'undefined' ? CONFIG : 'NO DISPONIBLE'); 
  console.log('🌐 BASE_URL final:', BASE_URL);
  
  // Verificar si el usuario está logueado
  if (!currentUserId) {
    console.warn('⚠️ Usuario no logueado, redirigiendo al login...');
    console.log('🔍 Debug - localStorage user:', localStorage.getItem('user'));
    console.log('🔍 Debug - localStorage token:', localStorage.getItem('token'));
    mostrarNotificacion('Debes iniciar sesión para acceder al dashboard', 'error');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    return;
  }

  // Configurar event listeners para botones principales
  const addButton = document.querySelector('#add-treatment-button');
  if (addButton) {
    console.log('✅ Botón agregar tratamiento encontrado');
    addButton.addEventListener('click', agregarTratamiento);
  } else {
    console.error('❌ No se encontró el botón #add-treatment-button');
  }

  const addMedicationButton = document.querySelector('#add-medication-button');
  if (addMedicationButton) {
    console.log('✅ Botón agregar medicamento encontrado');
    addMedicationButton.addEventListener('click', agregarMedicamento);
  } else {
    console.error('❌ No se encontró el botón #add-medication-button');
  }

  // Botones de tratamientos
  document.querySelectorAll('.edit-button-treatments').forEach(button => {
    button.addEventListener('click', editarTratamiento);
    console.log('✅ Event listener agregado a botón editar tratamiento');
  });
  
  document.querySelectorAll('.delete-button-treatments').forEach(button => {
    button.addEventListener('click', eliminarTratamiento);
    console.log('✅ Event listener agregado a botón eliminar tratamiento');
  });

  // Botones de medicamentos
  document.querySelectorAll('.edit-button-medications').forEach(button => {
    button.addEventListener('click', editarMedicamento);
    console.log('✅ Event listener agregado a botón editar medicamento');
  });
  
  document.querySelectorAll('.delete-button-medications').forEach(button => {
    button.addEventListener('click', eliminarMedicamento);
    console.log('✅ Event listener agregado a botón eliminar medicamento');
  });

  // Botón Ver Alarmas
  const alarmasButton = document.getElementById('alarmas-button');
  if (alarmasButton) {
    alarmasButton.addEventListener('click', () => {
      window.location.href = 'alarmas.html';
    });
    console.log('✅ Botón de alarmas configurado');
  }

  // Botón Salir
  const salirButton = document.getElementById('logout-button');
  if (salirButton) {
    console.log('✅ Botón de salir encontrado y configurado');
    salirButton.addEventListener('click', () => {
      console.log('🚪 Botón salir clickeado');
      crearModal(
        'Confirmar Salida',
        '¿Estás seguro de que quieres cerrar sesión?',
        () => {
          cerrarSesion();
        },
        () => {
          console.log('❌ Logout cancelado');
        }
      );
    });
  } else {
    console.error('❌ No se encontró el botón de logout');
  }

  // Funcionalidad adicional: clic en perfil de usuario para cerrar sesión rápido
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', () => {
      crearModal(
        'Cerrar Sesión',
        '¿Deseas cerrar sesión desde el perfil de usuario?',
        () => {
          cerrarSesion();
        },
        () => {}
      );
    });
    console.log('✅ Click en perfil de usuario configurado');
  }

  // Inicializar dashboard
  mostrarNombreUsuario();
  cargarTratamientos();
  
  // Asegurar que el usuario esté disponible antes de cargar medicamentos
  setTimeout(() => {
    if (!currentUserId) {
      // Intentar obtener usuario de múltiples fuentes
      const userData = localStorage.getItem('user_data') || localStorage.getItem('user');
      const userId = localStorage.getItem('user_id') || localStorage.getItem('id');
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          currentUserId = user.user_id || user.id || userId;
        } catch (error) {
          currentUserId = userId;
        }
      } else if (userId) {
        currentUserId = userId;
      }
      
      console.log('🔧 currentUserId ajustado a:', currentUserId);
    }
    
    cargarMedicamentos();
  }, 500);
  
  console.log('🎉 Dashboard inicializado correctamente');
});

// Función de debug para medicamentos
window.debugMedicamentos = async function() {
  console.log('🔧 DEBUG MEDICAMENTOS INICIADO');
  console.log('================================');
  
  // Verificar localStorage
  console.log('📊 localStorage:');
  console.log('- user_data:', localStorage.getItem('user_data'));
  console.log('- user_id:', localStorage.getItem('user_id'));
  console.log('- access_token:', localStorage.getItem('access_token'));
  
  // Verificar currentUserId
  console.log('📊 currentUserId:', currentUserId);
  
  // Si no hay usuario, intentar login
  if (!currentUserId) {
    console.log('⚠️ No hay usuario, intentando login automático...');
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'freligio008@gmail.com',
          password: '123456'
        })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_data', JSON.stringify(data));
        currentUserId = data.user_id;
        console.log('✅ Login automático exitoso, usuario ID:', data.user_id);
      } else {
        console.error('❌ Error en login automático:', data.detail);
        return;
      }
    } catch (error) {
      console.error('❌ Error de conexión en login:', error);
      return;
    }
  }
  
  // Probar API de medicamentos
  console.log('💊 Probando API de medicamentos...');
  try {
    const response = await fetch(`${BASE_URL}/medicamentos/?usuario_id=${currentUserId}`);
    const medicamentos = await response.json();
    
    console.log('📊 Respuesta de la API:', medicamentos);
    console.log('📊 Cantidad:', medicamentos.length);
    
    if (medicamentos.length > 0) {
      console.log('📊 Primer medicamento:', medicamentos[0]);
    }
    
    // Cargar en UI
    const medicamentosList = document.querySelector('.medication-list');
    if (medicamentosList) {
      medicamentosList.innerHTML = '';
      
      if (medicamentos.length > 0) {
        medicamentos.forEach((medicamento) => {
          const li = document.createElement('li');
          li.className = 'medication-item';
          li.innerHTML = `
            <div class="medication-info">
              <strong>${medicamento.NOMBRE}</strong>
              <div class="medication-details">
                <span>Dosis: ${medicamento.DOSIS}</span>
                <span>Hora: ${medicamento.HORA}</span>
              </div>
            </div>
          `;
          medicamentosList.appendChild(li);
        });
        console.log('✅ Medicamentos cargados en UI');
      } else {
        medicamentosList.innerHTML = '<li>No hay medicamentos registrados</li>';
        console.log('⚠️ No hay medicamentos para mostrar');
      }
    } else {
      console.error('❌ No se encontró elemento .medication-list');
    }
    
  } catch (error) {
    console.error('❌ Error en API de medicamentos:', error);
  }
  
  console.log('🎉 Debug completado');
};