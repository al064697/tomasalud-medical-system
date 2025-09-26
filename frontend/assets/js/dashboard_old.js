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

  // Función para cargar tratamientos desde backend
  async function cargarTratamientos() {
    try {
      const response = await fetch(`${BASE_URL}/tratamientos/usuario/${currentUserId}`);
      const tratamientos = await response.json();
      
      tratamientoList.innerHTML = ''; // Limpiar lista previa
      
      if (tratamientos.length === 0) {
        tratamientoList.innerHTML = '<li class="text-center-muted">No hay tratamientos registrados</li>';
        return;
      }
      
      tratamientos.forEach(tratamiento => {
        const li = document.createElement('li');
        li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION || 'Sin descripción'}`;
        li.classList.add('treatment-item');
        li.style.cursor = 'pointer';
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #ddd';

        // Seleccionar un tratamiento para mostrar medicamentos
        li.addEventListener('click', () => {
          // Remover selección anterior
          document.querySelectorAll('.treatment-item').forEach(item => {
            item.classList.remove('selected');
            item.style.backgroundColor = '';
            item.style.color = '';
          });
          
          // Marcar como seleccionado
          li.classList.add('selected');
          li.style.backgroundColor = '#41c1ba';
          li.style.color = 'white';
          
          tratamientoSeleccionado = tratamiento;
          medicamentoSeleccionado = null; // Reset medicamento seleccionado
          mostrarMedicamentos(tratamiento);
        });

        tratamientoList.appendChild(li);
      });
    } catch (error) {
      console.error('Error cargando tratamientos:', error);
      tratamientoList.innerHTML = '<li class="text-center-muted">Error cargando tratamientos. Usando modo offline.</li>';
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

  // Función para mostrar medicamentos de un tratamiento
  async function mostrarMedicamentos(tratamiento) {
    const medicamentosList = document.querySelector('.medication-list');
    
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
          
          // Seleccionar medicamento
          li.addEventListener('click', () => {
            // Remover selección anterior
            document.querySelectorAll('.medication-item').forEach(item => {
              item.classList.remove('selected');
              item.style.backgroundColor = '';
              item.style.color = '';
            });
            
            // Marcar como seleccionado
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
      // Fallback a medicamentos simulados
      mostrarMedicamentosOffline(tratamiento);
    }
  }
  
  // Función fallback para medicamentos offline
  function mostrarMedicamentosOffline(tratamiento) {
    const medicamentosList = document.querySelector('.medication-list');
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

  // Función para agregar un nuevo tratamiento
  async function agregarTratamiento() {
    const nombreTratamiento = prompt('Ingresa el nombre del nuevo tratamiento:');
    const descripcion = prompt('Ingresa una descripción (opcional):') || '';
    
    if (nombreTratamiento && nombreTratamiento.trim() !== '') {
      try {
        const response = await fetch(`${BASE_URL}/tratamientos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NOMBRE_TRATAMIENTO: nombreTratamiento.trim(),
            DESCRIPCION: descripcion.trim(),
            ID_USUARIO: currentUserId
          })
        });
        
        if (response.ok) {
          const nuevoTratamiento = await response.json();
          alert(`Tratamiento "${nombreTratamiento}" agregado exitosamente!`);
          cargarTratamientos(); // Recargar la lista
        } else {
          throw new Error('Error creando tratamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creando tratamiento. Intenta nuevamente.');
      }
    } else {
      alert('Por favor, ingresa un nombre válido para el tratamiento.');
    }
  }

  // Función para editar tratamiento
  async function editarTratamiento() {
    if (!tratamientoSeleccionado) {
      alert('Selecciona un tratamiento primero.');
      return;
    }

    const nuevoNombre = prompt('Nuevo nombre del tratamiento:', tratamientoSeleccionado.NOMBRE_TRATAMIENTO);
    const nuevaDescripcion = prompt('Nueva descripción:', tratamientoSeleccionado.DESCRIPCION || '');

    if (nuevoNombre && nuevoNombre.trim() !== '') {
      try {
        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NOMBRE_TRATAMIENTO: nuevoNombre.trim(),
            DESCRIPCION: nuevaDescripcion.trim(),
            ID_USUARIO: currentUserId
          })
        });
        
        if (response.ok) {
          alert('Tratamiento actualizado exitosamente!');
          cargarTratamientos();
          tratamientoSeleccionado = null;
        } else {
          throw new Error('Error actualizando tratamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error actualizando tratamiento. Intenta nuevamente.');
      }
    }
  }

  // Función para eliminar tratamiento
  async function eliminarTratamiento() {
    if (!tratamientoSeleccionado) {
      alert('Selecciona un tratamiento primero.');
      return;
    }

    if (confirm(`¿Estás seguro de eliminar el tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}"?`)) {
      try {
        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Tratamiento eliminado exitosamente!');
          cargarTratamientos();
          tratamientoSeleccionado = null;
          medicamentoSeleccionado = null;
          // Limpiar lista de medicamentos
          if (medicamentosList) {
            medicamentosList.innerHTML = '<li class="text-center-muted">Selecciona un tratamiento para ver sus medicamentos</li>';
          }
        } else {
          throw new Error('Error eliminando tratamiento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error eliminando tratamiento. Intenta nuevamente.');
      }
    }
  }

  // Función para agregar medicamento
  async function agregarMedicamento() {
    if (!tratamientoSeleccionado) {
      alert('Selecciona un tratamiento primero.');
      return;
    }

    const nombre = prompt('Nombre del medicamento:');
    const dosis = prompt('Dosis del medicamento:');
    const frecuencia = prompt('Frecuencia:');

    if (nombre && nombre.trim() !== '') {
      try {
        const response = await fetch(`${BASE_URL}/medicamentos/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NOMBRE: nombre.trim(),
            DOSIS: dosis.trim(),
            FRECUENCIA: frecuencia.trim(),
            ID_TRATAMIENTO: tratamientoSeleccionado.ID_TRATAMIENTO
          })
        });
        
        if (response.ok) {
          alert('Medicamento agregado exitosamente!');
          mostrarMedicamentos(tratamientoSeleccionado);
        } else {
          throw new Error('Error creando medicamento');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error creando medicamento. Intenta nuevamente.');
      }
    } else {
      alert('Por favor, ingresa un nombre válido para el medicamento.');
    }
  }

  // Event listeners para botones
  if (addButton) {
    addButton.addEventListener('click', agregarTratamiento);
  }

  // Botones de tratamientos
  const editTreatmentButtons = document.querySelectorAll('.edit-button-treatments');
  const deleteTreatmentButtons = document.querySelectorAll('.delete-button-treatments');
  
  editTreatmentButtons.forEach(button => {
    button.addEventListener('click', editarTratamiento);
  });
  
  deleteTreatmentButtons.forEach(button => {
    button.addEventListener('click', eliminarTratamiento);
  });

  // Botones de medicamentos
  const editMedicationButtons = document.querySelectorAll('.edit-button-medications');
  const deleteMedicationButtons = document.querySelectorAll('.delete-button-medications');
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
    exportPdfButton.addEventListener('click', () => {
      exportarPDF();
    });
  }

  // Función para exportar PDF
  function exportarPDF() {
    if (!tratamientoSeleccionado) {
      alert('Selecciona un tratamiento primero para exportar.');
      return;
    }
    
    // Crear contenido del PDF
    const contenido = `
REPORTE DE TRATAMIENTO
======================

Tratamiento: ${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}
Descripción: ${tratamientoSeleccionado.DESCRIPCION || 'Sin descripción'}
Fecha de generación: ${new Date().toLocaleDateString()}

MEDICAMENTOS:
    `;
    
    // Crear un blob con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Crear enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = `tratamiento_${tratamientoSeleccionado.NOMBRE_TRATAMIENTO.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Reporte exportado exitosamente!');
  }

  // Botón Salir
  const salirButton = document.querySelector('.user-profile');
  if (salirButton) {
    salirButton.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres salir?')) {
        window.location.href = 'index.html';
      }
    });
  }

  // Cargar tratamientos al inicializar
  cargarTratamientos();
});