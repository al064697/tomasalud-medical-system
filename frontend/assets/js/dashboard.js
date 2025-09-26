document.addEventListener('DOMContentLoaded', () => {
  const tratamientoList = document.querySelector('.treatment-list');
  const medicamentosList = document.querySelector('.medication-list');
  const addButton = document.querySelector('.add-button');
  
  // Variables para controlar selecciones
  let tratamientoSeleccionado = null;
  let medicamentoSeleccionado = null;
  let currentUserId = 1; // Simulamos usuario logueado
  
  // URLs del backend
  const BASE_URL = 'http://127.0.0.1:8004';

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
        max-width: 400px;
      `;
      document.body.appendChild(container);
    }

    // Crear la notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
      background: ${tipo === 'success' ? '#d4edda' : tipo === 'error' ? '#f8d7da' : '#d1ecf1'};
      border: 1px solid ${tipo === 'success' ? '#c3e6cb' : tipo === 'error' ? '#f5c6cb' : '#bee5eb'};
      color: ${tipo === 'success' ? '#155724' : tipo === 'error' ? '#721c24' : '#0c5460'};
      padding: 15px 20px;
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      font-family: Arial, sans-serif;
      font-size: 14px;
      position: relative;
      word-wrap: break-word;
    `;

    // Agregar el ícono según el tipo
    const icono = tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `
      <div style="display: flex; align-items: center;">
        <span style="font-size: 18px; margin-right: 10px;">${icono}</span>
        <span>${mensaje}</span>
      </div>
    `;

    // Agregar animación CSS
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

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

    // Event listeners
    modal.querySelector('#modal-confirm').addEventListener('click', () => {
      document.body.removeChild(overlay);
      onConfirm();
    });

    if (onCancel) {
      modal.querySelector('#modal-cancel').addEventListener('click', () => {
        document.body.removeChild(overlay);
        onCancel();
      });
    }

    // Cerrar con Escape o click fuera
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
      }
    });
  }

  // Función para crear formulario modal
  function crearFormularioModal(titulo, campos, onSubmit) {
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
      max-width: 500px;
      width: 90%;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      font-family: Arial, sans-serif;
    `;

    let camposHTML = campos.map(campo => {
      let inputHTML = '';
      
      if (campo.tipo === 'textarea') {
        inputHTML = `<textarea id="${campo.id}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; font-family: Arial, sans-serif; resize: vertical; height: 80px;" placeholder="${campo.placeholder || ''}">${campo.valor || ''}</textarea>`;
      } else if (campo.tipo === 'select') {
        const opciones = campo.opciones.map(opcion => 
          `<option value="${opcion}" ${opcion === campo.valor ? 'selected' : ''}>${opcion}</option>`
        ).join('');
        inputHTML = `<select id="${campo.id}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">${opciones}</select>`;
      } else {
        inputHTML = `<input type="${campo.tipo || 'text'}" id="${campo.id}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;" placeholder="${campo.placeholder || ''}" value="${campo.valor || ''}" ${campo.tipo === 'number' ? 'min="1"' : ''}>`;
      }
      
      return `
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; color: #325866; font-weight: bold;">${campo.label}:</label>
          ${inputHTML}
        </div>
      `;
    }).join('');

    modal.innerHTML = `
      <h3 style="margin: 0 0 25px 0; color: #325866; font-size: 20px;">${titulo}</h3>
      ${camposHTML}
      <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 25px;">
        <button id="form-cancel" style="padding: 10px 20px; border: 1px solid #ccc; background: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Cancelar</button>
        <button id="form-submit" style="padding: 10px 20px; border: none; background: #41c1ba; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">Guardar</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Event listeners
    modal.querySelector('#form-submit').addEventListener('click', () => {
      const valores = {};
      campos.forEach(campo => {
        valores[campo.id] = modal.querySelector(`#${campo.id}`).value;
      });
      document.body.removeChild(overlay);
      onSubmit(valores);
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

  // Función para cargar tratamientos desde backend
  async function cargarTratamientos() {
    try {
      const response = await fetch(`${BASE_URL}/tratamientos/`);
      const tratamientos = await response.json();
      
      tratamientoList.innerHTML = '';
      
      if (tratamientos.length === 0) {
        tratamientoList.innerHTML = '<li class="text-center-muted">No hay tratamientos registrados</li>';
        return;
      }
      
      tratamientos.forEach(tratamiento => {
        const li = document.createElement('li');
        li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.ESTADO}`;
        li.classList.add('treatment-item');
        li.setAttribute('data-tratamiento-id', tratamiento.ID_TRATAMIENTO);
        li.style.cursor = 'pointer';
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #ddd';

        li.addEventListener('click', () => {
          document.querySelectorAll('.treatment-item').forEach(item => {
            item.classList.remove('selected');
            item.style.backgroundColor = '';
            item.style.color = '';
          });
          
          li.classList.add('selected');
          li.style.backgroundColor = '#41c1ba';
          li.style.color = 'white';
          
          tratamientoSeleccionado = tratamiento;
          medicamentoSeleccionado = null;
          mostrarMedicamentos(tratamiento);
        });

        tratamientoList.appendChild(li);
      });
    } catch (error) {
      console.error('Error cargando tratamientos:', error);
      mostrarNotificacion('Error cargando tratamientos. Usando modo offline.', 'error');
      cargarTratamientosOffline();
    }
  }
  
  // Función fallback para modo offline
  function cargarTratamientosOffline() {
    const tratamientosSimulados = [
      { ID_TRATAMIENTO: 1, NOMBRE_TRATAMIENTO: "Antibiótico", DESCRIPCION: "Tratamiento para infección" },
      { ID_TRATAMIENTO: 2, NOMBRE_TRATAMIENTO: "Antiinflamatorio", DESCRIPCION: "Para reducir inflamación" },
      { ID_TRATAMIENTO: 3, NOMBRE_TRATAMIENTO: "Vitaminas", DESCRIPCION: "Suplemento vitamínico" }
    ];

    tratamientoList.innerHTML = '';
    tratamientosSimulados.forEach(tratamiento => {
      const li = document.createElement('li');
      li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION}`;
      li.classList.add('treatment-item');
      li.setAttribute('data-tratamiento-id', tratamiento.ID_TRATAMIENTO);
      li.style.cursor = 'pointer';
      li.style.padding = '10px';
      li.style.borderBottom = '1px solid #ddd';

      li.addEventListener('click', () => {
        document.querySelectorAll('.treatment-item').forEach(item => {
          item.classList.remove('selected');
          item.style.backgroundColor = '';
          item.style.color = '';
        });
        
        li.classList.add('selected');
        li.style.backgroundColor = '#41c1ba';
        li.style.color = 'white';
        
        tratamientoSeleccionado = tratamiento;
        medicamentoSeleccionado = null;
        mostrarMedicamentos(tratamiento);
      });

      tratamientoList.appendChild(li);
    });
  }

  // Función para mostrar medicamentos
  async function mostrarMedicamentos(tratamiento) {
    try {
      const response = await fetch(`${BASE_URL}/medicamentos/tratamiento/${tratamiento.ID_TRATAMIENTO}`);
      const medicamentos = await response.json();
      
      if (medicamentosList) {
        medicamentosList.innerHTML = '';
        
        if (medicamentos.length === 0) {
          medicamentosList.innerHTML = '<li class="text-center-muted">No hay medicamentos para este tratamiento</li>';
          return;
        }
        
        medicamentos.forEach(medicamento => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>
            <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA || 'Sin frecuencia'}</div>
          `;
          li.classList.add('medication-item');
          li.style.cursor = 'pointer';
          li.style.padding = '10px';
          li.style.marginBottom = '5px';
          li.style.borderRadius = '5px';
          li.style.transition = 'background-color 0.3s ease';
          
          li.addEventListener('click', () => {
            document.querySelectorAll('.medication-item').forEach(item => {
              item.classList.remove('selected');
              item.style.backgroundColor = '';
              item.style.color = '';
            });
            
            li.classList.add('selected');
            li.style.backgroundColor = '#325866';
            li.style.color = 'white';
            
            medicamentoSeleccionado = medicamento;
          });

          medicamentosList.appendChild(li);
        });
      }
    } catch (error) {
      console.error('Error cargando medicamentos:', error);
      mostrarMedicamentosOffline(tratamiento);
    }
  }
  
  // Función fallback para medicamentos offline
  function mostrarMedicamentosOffline(tratamiento) {
    const medicamentosSimulados = [
      { ID_MEDICAMENTO: 1, NOMBRE: 'Paracetamol', DOSIS: '500mg', FRECUENCIA: 'Cada 8 horas' },
      { ID_MEDICAMENTO: 2, NOMBRE: 'Ibuprofeno', DOSIS: '400mg', FRECUENCIA: 'Cada 12 horas' },
      { ID_MEDICAMENTO: 3, NOMBRE: 'Vitamina C', DOSIS: '1000mg', FRECUENCIA: 'Una vez al día' }
    ];
    
    if (medicamentosList) {
      medicamentosList.innerHTML = '';
      
      medicamentosSimulados.forEach(medicamento => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>
          <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA}</div>
        `;
        li.classList.add('medication-item');
        li.style.cursor = 'pointer';
        li.style.padding = '10px';
        li.style.marginBottom = '5px';
        li.style.borderRadius = '5px';
        li.style.transition = 'background-color 0.3s ease';
        
        li.addEventListener('click', () => {
          document.querySelectorAll('.medication-item').forEach(item => {
            item.classList.remove('selected');
            item.style.backgroundColor = '';
            item.style.color = '';
          });
          
          li.classList.add('selected');
          li.style.backgroundColor = '#325866';
          li.style.color = 'white';
          
          medicamentoSeleccionado = medicamento;
        });

        medicamentosList.appendChild(li);
      });
    }
  }

  // Función para agregar tratamiento
  async function agregarTratamiento() {
    crearFormularioModal('Nuevo Tratamiento', [
      { id: 'nombre', label: 'Nombre del Tratamiento', placeholder: 'Ej: Antibiótico para infección' },
      { id: 'descripcion', label: 'Descripción', tipo: 'textarea', placeholder: 'Descripción detallada del tratamiento...' }
    ], async (valores) => {
      if (!valores.nombre.trim()) {
        mostrarNotificacion('El nombre del tratamiento es obligatorio', 'error');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/tratamientos/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            NOMBRE_TRATAMIENTO: valores.nombre.trim(),
            FECHA_INICIO: new Date().toISOString().split('T')[0], // Fecha actual
            ESTADO: "Activo",
            ID_USUARIO: currentUserId
          })
        });
        
        if (response.ok) {
          mostrarNotificacion(`Tratamiento "${valores.nombre}" agregado exitosamente!`, 'success');
          cargarTratamientos();
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error creando tratamiento. Intenta nuevamente.', 'error');
      }
    });
  }

  // Función para editar tratamiento
  async function editarTratamiento() {
    if (!tratamientoSeleccionado) {
      mostrarNotificacion('Selecciona un tratamiento primero.', 'error');
      return;
    }

    crearFormularioModal('Editar Tratamiento', [
      { id: 'nombre', label: 'Nombre del Tratamiento', valor: tratamientoSeleccionado.NOMBRE_TRATAMIENTO },
      { id: 'estado', label: 'Estado', tipo: 'select', opciones: ['Activo', 'Suspendido', 'Finalizado'], valor: tratamientoSeleccionado.ESTADO }
    ], async (valores) => {
      if (!valores.nombre.trim()) {
        mostrarNotificacion('El nombre del tratamiento es obligatorio', 'error');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            NOMBRE_TRATAMIENTO: valores.nombre.trim(),
            ESTADO: valores.estado
          })
        });
        
        if (response.ok) {
          mostrarNotificacion('Tratamiento actualizado exitosamente!', 'success');
          const tratamientoId = tratamientoSeleccionado.ID_TRATAMIENTO;
          await cargarTratamientos();
          // Reseleccionar el tratamiento actualizado
          const tratamientoActualizado = document.querySelector(`[data-tratamiento-id="${tratamientoId}"]`);
          if (tratamientoActualizado) {
            tratamientoActualizado.click();
          }
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error actualizando tratamiento. Intenta nuevamente.', 'error');
      }
    });
  }

  // Función para eliminar tratamiento
  async function eliminarTratamiento() {
    if (!tratamientoSeleccionado) {
      mostrarNotificacion('Selecciona un tratamiento primero.', 'error');
      return;
    }

    crearModal(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar el tratamiento "<strong>${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}</strong>"?<br><br>Esta acción no se puede deshacer.`,
      async () => {
        try {
          const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            mostrarNotificacion('Tratamiento eliminado exitosamente!', 'success');
            cargarTratamientos();
            tratamientoSeleccionado = null;
            medicamentoSeleccionado = null;
            if (medicamentosList) {
              medicamentosList.innerHTML = '<li class="text-center-muted">Selecciona un tratamiento para ver sus medicamentos</li>';
            }
          } else {
            throw new Error('Error en el servidor');
          }
        } catch (error) {
          console.error('Error:', error);
          mostrarNotificacion('Error eliminando tratamiento. Intenta nuevamente.', 'error');
        }
      },
      () => {}
    );
  }

  // Función para agregar medicamento
  async function agregarMedicamento() {
    if (!tratamientoSeleccionado) {
      mostrarNotificacion('Selecciona un tratamiento primero.', 'error');
      return;
    }

    crearFormularioModal('Nuevo Medicamento', [
      { 
        id: 'nombre', 
        label: 'Nombre del Medicamento', 
        placeholder: 'Ej: Paracetamol',
        valor: ''
      },
      { 
        id: 'dosis', 
        label: 'Dosis', 
        placeholder: 'Ej: 500 mg',
        valor: ''
      },
      { 
        id: 'hora', 
        label: 'Hora (HH:MM)', 
        tipo: 'time',
        valor: '08:00'
      },
      { 
        id: 'observaciones', 
        label: 'Observaciones', 
        tipo: 'textarea',
        placeholder: 'Instrucciones especiales, efectos secundarios, etc.',
        valor: ''
      },
      { 
        id: 'intervalo', 
        label: 'Intervalo (horas)', 
        tipo: 'number',
        placeholder: 'Ej: 8',
        valor: '8'
      }
    ], async (valores) => {
      // Validaciones
      if (!valores.nombre.trim()) {
        mostrarNotificacion('El nombre del medicamento es obligatorio', 'error');
        return;
      }
      
      if (!valores.dosis.trim()) {
        mostrarNotificacion('La dosis es obligatoria', 'error');
        return;
      }
      
      if (!valores.hora) {
        mostrarNotificacion('La hora es obligatoria', 'error');
        return;
      }
      
      if (!valores.intervalo || valores.intervalo <= 0) {
        mostrarNotificacion('El intervalo debe ser mayor a 0 horas', 'error');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/medicamentos/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            NOMBRE: valores.nombre.trim(),
            DOSIS: valores.dosis.trim(),
            HORA: valores.hora,
            ID_TRATAMIENTO: tratamientoSeleccionado.ID_TRATAMIENTO,
            OBSERVACION: valores.observaciones.trim(),
            INTERVALO: parseInt(valores.intervalo)
          })
        });
        
        if (response.ok) {
          mostrarNotificacion('💊 Medicamento agregado exitosamente!', 'success');
          mostrarMedicamentos(tratamientoSeleccionado);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Error en el servidor');
        }
      } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion(`Error creando medicamento: ${error.message}`, 'error');
      }
    });
  }

  // Función para editar medicamento
  async function editarMedicamento() {
    if (!medicamentoSeleccionado) {
      mostrarNotificacion('Selecciona un medicamento primero.', 'error');
      return;
    }

    crearFormularioModal('Editar Medicamento', [
      { id: 'nombre', label: 'Nombre del Medicamento', valor: medicamentoSeleccionado.NOMBRE },
      { id: 'dosis', label: 'Dosis', valor: medicamentoSeleccionado.DOSIS },
      { id: 'hora', label: 'Hora (HH:MM)', tipo: 'time', valor: medicamentoSeleccionado.HORA },
      { id: 'observacion', label: 'Observaciones', tipo: 'textarea', valor: medicamentoSeleccionado.OBSERVACION || '' },
      { id: 'intervalo', label: 'Intervalo (horas)', tipo: 'number', valor: medicamentoSeleccionado.INTERVALO || 8 }
    ], async (valores) => {
      if (!valores.nombre.trim()) {
        mostrarNotificacion('El nombre del medicamento es obligatorio', 'error');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/medicamentos/${medicamentoSeleccionado.ID_MEDICAMENTO}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            NOMBRE: valores.nombre.trim(),
            DOSIS: valores.dosis.trim(),
            HORA: valores.hora,
            OBSERVACION: valores.observacion.trim(),
            INTERVALO: parseInt(valores.intervalo) || 8
          })
        });
        
        if (response.ok) {
          mostrarNotificacion('Medicamento actualizado exitosamente!', 'success');
          await mostrarMedicamentos(tratamientoSeleccionado);
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('Error actualizando medicamento. Intenta nuevamente.', 'error');
      }
    });
  }

  // Función para eliminar medicamento
  async function eliminarMedicamento() {
    if (!medicamentoSeleccionado) {
      mostrarNotificacion('Selecciona un medicamento primero.', 'error');
      return;
    }

    crearModal(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar el medicamento "<strong>${medicamentoSeleccionado.NOMBRE}</strong>"?`,
      async () => {
        try {
          const response = await fetch(`${BASE_URL}/medicamentos/${medicamentoSeleccionado.ID_MEDICAMENTO}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            mostrarNotificacion('Medicamento eliminado exitosamente!', 'success');
            mostrarMedicamentos(tratamientoSeleccionado);
            medicamentoSeleccionado = null;
          } else {
            throw new Error('Error en el servidor');
          }
        } catch (error) {
          console.error('Error:', error);
          mostrarNotificacion('Error eliminando medicamento. Intenta nuevamente.', 'error');
        }
      },
      () => {}
    );
  }

  // Función para exportar PDF
  function exportarPDF() {
    if (!tratamientoSeleccionado) {
      mostrarNotificacion('Selecciona un tratamiento primero para exportar.', 'error');
      return;
    }
    
    const contenido = `REPORTE DE TRATAMIENTO
======================

Tratamiento: ${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}
Descripción: ${tratamientoSeleccionado.DESCRIPCION || 'Sin descripción'}
Fecha de generación: ${new Date().toLocaleDateString()}

MEDICAMENTOS:
${medicamentosList ? Array.from(medicamentosList.children).map(item => `- ${item.textContent}`).join('\n') : 'No hay medicamentos registrados'}
    `;
    
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tratamiento_${tratamientoSeleccionado.NOMBRE_TRATAMIENTO.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('Reporte exportado exitosamente!', 'success');
  }

  // Event listeners para botones
  if (addButton) {
    addButton.addEventListener('click', agregarTratamiento);
  }

  // Botones de tratamientos
  document.querySelectorAll('.edit-button-treatments').forEach(button => {
    button.addEventListener('click', editarTratamiento);
  });
  
  document.querySelectorAll('.delete-button-treatments').forEach(button => {
    button.addEventListener('click', eliminarTratamiento);
  });

  // Botones de medicamentos
  document.querySelectorAll('.edit-button-medications').forEach(button => {
    button.addEventListener('click', editarMedicamento);
  });
  
  document.querySelectorAll('.delete-button-medications').forEach(button => {
    button.addEventListener('click', eliminarMedicamento);
  });

  const addMedicationButton = document.querySelector('#add-medication-button');
  if (addMedicationButton) {
    addMedicationButton.addEventListener('click', agregarMedicamento);
  }

  // Botón Ver Alarmas
  const alarmasButton = document.getElementById('alarmas-button');
  if (alarmasButton) {
    alarmasButton.addEventListener('click', () => {
      window.location.href = 'alarmas.html';
    });
  }

  // Botón Exportar PDF
  const exportPdfButton = document.getElementById('export-pdf-button');
  if (exportPdfButton) {
    exportPdfButton.addEventListener('click', exportarPDF);
  }

  // Botón Salir
  const salirButton = document.querySelector('.user-profile');
  if (salirButton) {
    salirButton.addEventListener('click', () => {
      crearModal(
        'Confirmar Salida',
        '¿Estás seguro de que quieres cerrar sesión?',
        () => {
          window.location.href = 'index.html';
        },
        () => {}
      );
    });
  }

  // Cargar tratamientos al inicializar
  cargarTratamientos();
});