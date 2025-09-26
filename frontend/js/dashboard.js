document.addEventListener('DOMContentLoaded', () => {
  const tratamientoList = document.querySelector('.treatment-list');
  const addButton = document.querySelector('.add-button');
  
  // Variables para controlar selecciones
  let tratamientoSeleccionado = null;
  let medicamentoSeleccionado = null;
  
  // Script para función de error en los botones editar y eliminar al no tener seleccionado un elemento
  const botonesEditarTratamientos = document.querySelectorAll('.edit-button-treatments');
  const botonesEliminarTratamientos = document.querySelectorAll('.delete-button-treatments');
  const botonesEditarMedicamentos = document.querySelectorAll('.edit-button-medications');
  const botonesEliminarMedicamentos = document.querySelectorAll('.delete-button-medications');

  // Función para validar y ejecutar acciones en tratamientos
  function accionTratamiento(accion) {
    if (!tratamientoSeleccionado) {
      alert('No se puede realizar esta acción. Selecciona primero un tratamiento de la lista.');
      return;
    }
    
    if (accion === 'editar') {
      alert(`Editando tratamiento: ${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}`);
      // Aquí iría la lógica de edición
    } else if (accion === 'eliminar') {
      if (confirm(`¿Estás seguro de eliminar el tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}"?`)) {
        alert(`Tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}" eliminado`);
        // Aquí iría la lógica de eliminación
        tratamientoSeleccionado = null;
        cargarTratamientos(); // Recargar lista
      }
    }
  }

  // Función para validar y ejecutar acciones en medicamentos
  function accionMedicamento(accion) {
    if (!medicamentoSeleccionado) {
      alert('No se puede realizar esta acción. Selecciona primero un medicamento de la lista.');
      return;
    }
    
    if (accion === 'editar') {
      alert(`Editando medicamento: ${medicamentoSeleccionado.nombre}`);
      // Aquí iría la lógica de edición
    } else if (accion === 'eliminar') {
      if (confirm(`¿Estás seguro de eliminar el medicamento "${medicamentoSeleccionado.nombre}"?`)) {
        alert(`Medicamento "${medicamentoSeleccionado.nombre}" eliminado`);
        // Aquí iría la lógica de eliminación
        medicamentoSeleccionado = null;
        if (tratamientoSeleccionado) {
          mostrarMedicamentos(tratamientoSeleccionado); // Recargar medicamentos
        }
      }
    }
  }

  // Event listeners para botones de tratamientos
  botonesEditarTratamientos.forEach(boton => {
    boton.addEventListener('click', () => accionTratamiento('editar'));
  });
  
  botonesEliminarTratamientos.forEach(boton => {
    boton.addEventListener('click', () => accionTratamiento('eliminar'));
  });

  // Event listeners para botones de medicamentos
  botonesEditarMedicamentos.forEach(boton => {
    boton.addEventListener('click', () => accionMedicamento('editar'));
  });
  
  botonesEliminarMedicamentos.forEach(boton => {
    boton.addEventListener('click', () => accionMedicamento('eliminar'));
  });

  // Función para cargar tratamientos desde backend (simulado)
  function cargarTratamientos() {
    // Por ahora simulamos datos ya que el backend no funciona
    const tratamientosSimulados = [
      { id: 1, NOMBRE_TRATAMIENTO: "Antibiótico", ESTADO: "Activo" },
      { id: 2, NOMBRE_TRATAMIENTO: "Antiinflamatorio", ESTADO: "Completado" },
      { id: 3, NOMBRE_TRATAMIENTO: "Vitaminas", ESTADO: "Activo" }
    ];

    tratamientoList.innerHTML = ''; // Limpiar lista previa
    
    tratamientosSimulados.forEach(tratamiento => {
      const li = document.createElement('li');
      li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - Estado: ${tratamiento.ESTADO}`;
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
  }

  // Función para mostrar medicamentos de un tratamiento
  function mostrarMedicamentos(tratamiento) {
    const medicationsPanel = document.querySelector('.medications-panel');
    const medicamentosList = document.querySelector('.medication-list');
    
    // Medicamentos simulados para este tratamiento
    const medicamentosSimulados = [
      { id: 1, nombre: 'Paracetamol', dosis: '500mg', frecuencia: 'Cada 8 horas' },
      { id: 2, nombre: 'Ibuprofeno', dosis: '400mg', frecuencia: 'Cada 12 horas' },
      { id: 3, nombre: 'Vitamina C', dosis: '1000mg', frecuencia: 'Una vez al día' }
    ];
    
    // Limpiar lista previa
    if (medicamentosList) {
      medicamentosList.innerHTML = '';
      
      medicamentosSimulados.forEach(medicamento => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div><strong>${medicamento.nombre}</strong> - ${medicamento.dosis}</div>
          <div style="font-size: 0.9em; color: #666;">${medicamento.frecuencia}</div>
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
          li.style.backgroundColor = '#41c1ba';
          li.style.color = 'white';
          
          medicamentoSeleccionado = medicamento;
        });
        
        // Hover effect
        li.addEventListener('mouseenter', () => {
          if (!li.classList.contains('selected')) {
            li.style.backgroundColor = '#f8f9fa';
          }
        });
        
        li.addEventListener('mouseleave', () => {
          if (!li.classList.contains('selected')) {
            li.style.backgroundColor = '';
          }
        });
        
        medicamentosList.appendChild(li);
      });
    }
  }

  // Función para agregar nuevo tratamiento
  function agregarTratamiento() {
    const nombreTratamiento = prompt('Ingresa el nombre del nuevo tratamiento:');
    
    if (nombreTratamiento && nombreTratamiento.trim() !== '') {
      // Simulamos agregar al array (en un caso real se enviaría al backend)
      const nuevoTratamiento = {
        id: Date.now(),
        NOMBRE_TRATAMIENTO: nombreTratamiento.trim(),
        ESTADO: 'Activo'
      };

      // Agregar visualmente a la lista
      const li = document.createElement('li');
      li.textContent = `${nuevoTratamiento.NOMBRE_TRATAMIENTO} - Estado: ${nuevoTratamiento.ESTADO}`;
      li.classList.add('treatment-item');
      li.style.cursor = 'pointer';
      li.style.padding = '10px';
      li.style.borderBottom = '1px solid #ddd';
      li.style.backgroundColor = '#e8f5e8'; // Verde claro para indicar que es nuevo

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
        
        tratamientoSeleccionado = nuevoTratamiento;
        medicamentoSeleccionado = null; // Reset medicamento seleccionado
        mostrarMedicamentos(nuevoTratamiento);
      });

      tratamientoList.appendChild(li);

      alert(`Tratamiento "${nombreTratamiento}" agregado exitosamente!`);
    } else {
      alert('Por favor, ingresa un nombre válido para el tratamiento.');
    }
  }

  // Event listener para el botón "Agregar Tratamiento"
  addButton.addEventListener('click', agregarTratamiento);

  // Cargar tratamientos al inicializar
  cargarTratamientos();

  // Event listeners para otros botones
  const exportButton = document.querySelector('.action-button');
  const salirButton = document.querySelectorAll('.action-button')[1];

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      alert('Función de exportar a PDF en desarrollo');
    });
  }

  if (salirButton) {
    salirButton.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres salir?')) {
        window.location.href = 'index.html';
      }
    });
  }
});
