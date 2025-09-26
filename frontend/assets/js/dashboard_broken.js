document.addEventListener('DOMContentLoaded', () => {document.addEventListener('DOMContentLoaded', () => {

  const tratamientoList = document.querySelector('.treatment-list');  const tratamientoList = document.querySelector('.treatment-list');

  const medicamentosList = document.querySelector('.medication-list');  const medicamentosList = document.querySelector('.medication-list');

  const addButton = document.querySelector('.add-button');  const addButton = document.querySelector('.add-button');

    

  // Variables para controlar selecciones  // Variables para controlar selecciones

  let tratamientoSeleccionado = null;  let tratamientoSeleccionado = null;

  let medicamentoSeleccionado = null;  let medicamentoSeleccionado = null;

  let currentUserId = 1; // Simulamos usuario logueado  let currentUserId = 1; // Simulamos usuario logueado

    

  // URLs del backend  // URLs del backend

  const BASE_URL = 'http://127.0.0.1:8004';  const BASE_URL = 'http://127.0.0.1:8004';



  // Función para cargar tratamientos desde backend  // Función para cargar tratamientos desde backend

  async function cargarTratamientos() {  async function cargarTratamientos() {

    try {    try {

      const response = await fetch(`${BASE_URL}/tratamientos/usuario/${currentUserId}`);      const response = await fetch(`${BASE_URL}/tratamientos/usuario/${currentUserId}`);

      const tratamientos = await response.json();      const tratamientos = await response.json();

            

      tratamientoList.innerHTML = ''; // Limpiar lista previa      tratamientoList.innerHTML = ''; // Limpiar lista previa

            

      if (tratamientos.length === 0) {      if (tratamientos.length === 0) {

        tratamientoList.innerHTML = '<li class="text-center-muted">No hay tratamientos registrados</li>';        tratamientoList.innerHTML = '<li class="text-center-muted">No hay tratamientos registrados</li>';

        return;        return;

      }      }

            

      tratamientos.forEach(tratamiento => {      tratamientos.forEach(tratamiento => {

        const li = document.createElement('li');        const li = document.createElement('li');

        li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION || 'Sin descripción'}`;        li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION || 'Sin descripción'}`;

        li.classList.add('treatment-item');        li.classList.add('treatment-item');

        li.style.cursor = 'pointer';        li.style.cursor = 'pointer';

        li.style.padding = '10px';        li.style.padding = '10px';

        li.style.borderBottom = '1px solid #ddd';        li.style.borderBottom = '1px solid #ddd';



        // Seleccionar un tratamiento para mostrar medicamentos        // Seleccionar un tratamiento para mostrar medicamentos

        li.addEventListener('click', () => {        li.addEventListener('click', () => {

          // Remover selección anterior          // Remover selección anterior

          document.querySelectorAll('.treatment-item').forEach(item => {          document.querySelectorAll('.treatment-item').forEach(item => {

            item.classList.remove('selected');            item.classList.remove('selected');

            item.style.backgroundColor = '';            item.style.backgroundColor = '';

            item.style.color = '';            item.style.color = '';

          });          });

                    

          // Marcar como seleccionado          // Marcar como seleccionado

          li.classList.add('selected');          li.classList.add('selected');

          li.style.backgroundColor = '#41c1ba';          li.style.backgroundColor = '#41c1ba';

          li.style.color = 'white';          li.style.color = 'white';

                    

          tratamientoSeleccionado = tratamiento;          tratamientoSeleccionado = tratamiento;

          medicamentoSeleccionado = null; // Reset medicamento seleccionado          medicamentoSeleccionado = null; // Reset medicamento seleccionado

          mostrarMedicamentos(tratamiento);          mostrarMedicamentos(tratamiento);

        });        });



        tratamientoList.appendChild(li);        tratamientoList.appendChild(li);

      });      });

    } catch (error) {    } catch (error) {

      console.error('Error cargando tratamientos:', error);      console.error('Error cargando tratamientos:', error);

      tratamientoList.innerHTML = '<li class="text-center-muted">Error cargando tratamientos. Usando modo offline.</li>';      tratamientoList.innerHTML = '<li class="text-center-muted">Error cargando tratamientos. Usando modo offline.</li>';

      cargarTratamientosOffline();      cargarTratamientosOffline();

    }    }

  }  }

    

  // Función fallback para modo offline  // Función fallback para modo offline

  function cargarTratamientosOffline() {  function cargarTratamientosOffline() {

    const tratamientosSimulados = [    const tratamientosSimulados = [

      { ID_TRATAMIENTO: 1, NOMBRE_TRATAMIENTO: "Antibiótico", DESCRIPCION: "Tratamiento para infección" },      { ID_TRATAMIENTO: 1, NOMBRE_TRATAMIENTO: "Antibiótico", DESCRIPCION: "Tratamiento para infección" },

      { ID_TRATAMIENTO: 2, NOMBRE_TRATAMIENTO: "Antiinflamatorio", DESCRIPCION: "Para reducir inflamación" },      { ID_TRATAMIENTO: 2, NOMBRE_TRATAMIENTO: "Antiinflamatorio", DESCRIPCION: "Para reducir inflamación" },

      { ID_TRATAMIENTO: 3, NOMBRE_TRATAMIENTO: "Vitaminas", DESCRIPCION: "Suplemento vitamínico" }      { ID_TRATAMIENTO: 3, NOMBRE_TRATAMIENTO: "Vitaminas", DESCRIPCION: "Suplemento vitamínico" }

    ];    ];



    tratamientoList.innerHTML = '';    tratamientoList.innerHTML = '';

    tratamientosSimulados.forEach(tratamiento => {    tratamientosSimulados.forEach(tratamiento => {

      const li = document.createElement('li');      const li = document.createElement('li');

      li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION}`;      li.textContent = `${tratamiento.NOMBRE_TRATAMIENTO} - ${tratamiento.DESCRIPCION}`;

      li.classList.add('treatment-item');      li.classList.add('treatment-item');

      li.style.cursor = 'pointer';      li.style.cursor = 'pointer';

      li.style.padding = '10px';      li.style.padding = '10px';

      li.style.borderBottom = '1px solid #ddd';      li.style.borderBottom = '1px solid #ddd';



      li.addEventListener('click', () => {      li.addEventListener('click', () => {

        document.querySelectorAll('.treatment-item').forEach(item => {        document.querySelectorAll('.treatment-item').forEach(item => {

          item.classList.remove('selected');          item.classList.remove('selected');

          item.style.backgroundColor = '';          item.style.backgroundColor = '';

          item.style.color = '';          item.style.color = '';

        });        });

                

        li.classList.add('selected');        li.classList.add('selected');

        li.style.backgroundColor = '#41c1ba';        li.style.backgroundColor = '#41c1ba';

        li.style.color = 'white';        li.style.color = 'white';

                

        tratamientoSeleccionado = tratamiento;        tratamientoSeleccionado = tratamiento;

        medicamentoSeleccionado = null;        medicamentoSeleccionado = null;

        mostrarMedicamentos(tratamiento);        mostrarMedicamentos(tratamiento);

      });      });



      tratamientoList.appendChild(li);      tratamientoList.appendChild(li);

    });    });

  }  }



  // Función para mostrar medicamentos de un tratamiento  // Función para mostrar medicamentos de un tratamiento

  async function mostrarMedicamentos(tratamiento) {  async function mostrarMedicamentos(tratamiento) {

    const medicamentosList = document.querySelector('.medication-list');    const medicamentosList = document.querySelector('.medication-list');

        

    try {    try {

      const response = await fetch(`${BASE_URL}/medicamentos/tratamiento/${tratamiento.ID_TRATAMIENTO}`);      const response = await fetch(`${BASE_URL}/medicamentos/tratamiento/${tratamiento.ID_TRATAMIENTO}`);

      const medicamentos = await response.json();      const medicamentos = await response.json();

            

      if (medicamentosList) {      if (medicamentosList) {

        medicamentosList.innerHTML = '';        medicamentosList.innerHTML = '';

                

        if (medicamentos.length === 0) {        if (medicamentos.length === 0) {

          medicamentosList.innerHTML = '<li class="text-center-muted">No hay medicamentos para este tratamiento</li>';          medicamentosList.innerHTML = '<li class="text-center-muted">No hay medicamentos para este tratamiento</li>';

          return;          return;

        }        }

                

        medicamentos.forEach(medicamento => {        medicamentos.forEach(medicamento => {

          const li = document.createElement('li');          const li = document.createElement('li');

          li.innerHTML = `          li.innerHTML = `

            <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>            <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>

            <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA || 'Sin frecuencia'}</div>            <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA || 'Sin frecuencia'}</div>

          `;          `;

          li.classList.add('medication-item');          li.classList.add('medication-item');

          li.style.cursor = 'pointer';          li.style.cursor = 'pointer';

          li.style.padding = '10px';          li.style.padding = '10px';

          li.style.marginBottom = '5px';          li.style.marginBottom = '5px';

          li.style.borderRadius = '5px';          li.style.borderRadius = '5px';

          li.style.transition = 'background-color 0.3s ease';          li.style.transition = 'background-color 0.3s ease';

                    

          // Seleccionar medicamento          // Seleccionar medicamento

          li.addEventListener('click', () => {          li.addEventListener('click', () => {

            // Remover selección anterior            // Remover selección anterior

            document.querySelectorAll('.medication-item').forEach(item => {            document.querySelectorAll('.medication-item').forEach(item => {

              item.classList.remove('selected');              item.classList.remove('selected');

              item.style.backgroundColor = '';              item.style.backgroundColor = '';

              item.style.color = '';              item.style.color = '';

            });            });

                        

            // Marcar como seleccionado            // Marcar como seleccionado

            li.classList.add('selected');            li.classList.add('selected');

            li.style.backgroundColor = '#325866';            li.style.backgroundColor = '#325866';

            li.style.color = 'white';            li.style.color = 'white';

                        

            medicamentoSeleccionado = medicamento;            medicamentoSeleccionado = medicamento;

          });          });



          medicamentosList.appendChild(li);          medicamentosList.appendChild(li);

        });        });

      }      }

    } catch (error) {    } catch (error) {

      console.error('Error cargando medicamentos:', error);      console.error('Error cargando medicamentos:', error);

      // Fallback a medicamentos simulados      // Fallback a medicamentos simulados

      mostrarMedicamentosOffline(tratamiento);      mostrarMedicamentosOffline(tratamiento);

    }    }

  }  }

    

  // Función fallback para medicamentos offline  // Función fallback para medicamentos offline

  function mostrarMedicamentosOffline(tratamiento) {  function mostrarMedicamentosOffline(tratamiento) {

    const medicamentosList = document.querySelector('.medication-list');    const medicamentosList = document.querySelector('.medication-list');

    const medicamentosSimulados = [    const medicamentosSimulados = [

      { ID_MEDICAMENTO: 1, NOMBRE: 'Paracetamol', DOSIS: '500mg', FRECUENCIA: 'Cada 8 horas' },      { ID_MEDICAMENTO: 1, NOMBRE: 'Paracetamol', DOSIS: '500mg', FRECUENCIA: 'Cada 8 horas' },

      { ID_MEDICAMENTO: 2, NOMBRE: 'Ibuprofeno', DOSIS: '400mg', FRECUENCIA: 'Cada 12 horas' },      { ID_MEDICAMENTO: 2, NOMBRE: 'Ibuprofeno', DOSIS: '400mg', FRECUENCIA: 'Cada 12 horas' },

      { ID_MEDICAMENTO: 3, NOMBRE: 'Vitamina C', DOSIS: '1000mg', FRECUENCIA: 'Una vez al día' }      { ID_MEDICAMENTO: 3, NOMBRE: 'Vitamina C', DOSIS: '1000mg', FRECUENCIA: 'Una vez al día' }

    ];    ];

        

    if (medicamentosList) {    if (medicamentosList) {

      medicamentosList.innerHTML = '';      medicamentosList.innerHTML = '';

            

      medicamentosSimulados.forEach(medicamento => {      medicamentosSimulados.forEach(medicamento => {

        const li = document.createElement('li');        const li = document.createElement('li');

        li.innerHTML = `        li.innerHTML = `

          <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>          <div><strong>${medicamento.NOMBRE}</strong> - ${medicamento.DOSIS}</div>

          <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA}</div>          <div style="font-size: 0.9em; color: #666;">${medicamento.FRECUENCIA}</div>

        `;        `;

        li.classList.add('medication-item');        li.classList.add('medication-item');

        li.style.cursor = 'pointer';        li.style.cursor = 'pointer';

        li.style.padding = '10px';        li.style.padding = '10px';

        li.style.marginBottom = '5px';        li.style.marginBottom = '5px';

        li.style.borderRadius = '5px';        li.style.borderRadius = '5px';

        li.style.transition = 'background-color 0.3s ease';        li.style.transition = 'background-color 0.3s ease';

                

        li.addEventListener('click', () => {        li.addEventListener('click', () => {

          document.querySelectorAll('.medication-item').forEach(item => {          document.querySelectorAll('.medication-item').forEach(item => {

            item.classList.remove('selected');            item.classList.remove('selected');

            item.style.backgroundColor = '';            item.style.backgroundColor = '';

            item.style.color = '';            item.style.color = '';

          });          });

                    

          li.classList.add('selected');          li.classList.add('selected');

          li.style.backgroundColor = '#325866';          li.style.backgroundColor = '#325866';

          li.style.color = 'white';          li.style.color = 'white';

                    

          medicamentoSeleccionado = medicamento;          medicamentoSeleccionado = medicamento;

        });        });



        medicamentosList.appendChild(li);        medicamentosList.appendChild(li);

      });      });

    }    }

  }  }



  // Función para agregar un nuevo tratamiento  // Función para agregar un nuevo tratamiento

  async function agregarTratamiento() {  async function agregarTratamiento() {

    const nombreTratamiento = prompt('Ingresa el nombre del nuevo tratamiento:');    const nombreTratamiento = prompt('Ingresa el nombre del nuevo tratamiento:');

    const descripcion = prompt('Ingresa una descripción (opcional):') || '';    const descripcion = prompt('Ingresa una descripción (opcional):') || '';

        

    if (nombreTratamiento && nombreTratamiento.trim() !== '') {    if (nombreTratamiento && nombreTratamiento.trim() !== '') {

      try {      try {

        const response = await fetch(`${BASE_URL}/tratamientos/`, {        const response = await fetch(`${BASE_URL}/tratamientos/`, {

          method: 'POST',          method: 'POST',

          headers: {          headers: {

            'Content-Type': 'application/json',            'Content-Type': 'application/json',

          },          },

          body: JSON.stringify({          body: JSON.stringify({

            NOMBRE_TRATAMIENTO: nombreTratamiento.trim(),            NOMBRE_TRATAMIENTO: nombreTratamiento.trim(),

            DESCRIPCION: descripcion.trim(),            DESCRIPCION: descripcion.trim(),

            ID_USUARIO: currentUserId            ID_USUARIO: currentUserId

          })          })

        });        });

                

        if (response.ok) {        if (response.ok) {

          const nuevoTratamiento = await response.json();          const nuevoTratamiento = await response.json();

          alert(`Tratamiento "${nombreTratamiento}" agregado exitosamente!`);          alert(`Tratamiento "${nombreTratamiento}" agregado exitosamente!`);

          cargarTratamientos(); // Recargar la lista          cargarTratamientos(); // Recargar la lista

        } else {        } else {

          throw new Error('Error creando tratamiento');          throw new Error('Error creando tratamiento');

        }        }

      } catch (error) {      } catch (error) {

        console.error('Error:', error);        console.error('Error:', error);

        alert('Error creando tratamiento. Intenta nuevamente.');        alert('Error creando tratamiento. Intenta nuevamente.');

      }      }

    } else {    } else {

      alert('Por favor, ingresa un nombre válido para el tratamiento.');      alert('Por favor, ingresa un nombre válido para el tratamiento.');

    }    }

  }  }



  // Función para editar tratamiento  // Función para editar tratamiento

  async function editarTratamiento() {  async function editarTratamiento() {

    if (!tratamientoSeleccionado) {    if (!tratamientoSeleccionado) {

      alert('Selecciona un tratamiento primero.');      alert('Selecciona un tratamiento primero.');

      return;      return;

    }    }



    const nuevoNombre = prompt('Nuevo nombre del tratamiento:', tratamientoSeleccionado.NOMBRE_TRATAMIENTO);    const nuevoNombre = prompt('Nuevo nombre del tratamiento:', tratamientoSeleccionado.NOMBRE_TRATAMIENTO);

    const nuevaDescripcion = prompt('Nueva descripción:', tratamientoSeleccionado.DESCRIPCION || '');    const nuevaDescripcion = prompt('Nueva descripción:', tratamientoSeleccionado.DESCRIPCION || '');



    if (nuevoNombre && nuevoNombre.trim() !== '') {    if (nuevoNombre && nuevoNombre.trim() !== '') {

      try {      try {

        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {

          method: 'PUT',          method: 'PUT',

          headers: {          headers: {

            'Content-Type': 'application/json',            'Content-Type': 'application/json',

          },          },

          body: JSON.stringify({          body: JSON.stringify({

            NOMBRE_TRATAMIENTO: nuevoNombre.trim(),            NOMBRE_TRATAMIENTO: nuevoNombre.trim(),

            DESCRIPCION: nuevaDescripcion.trim(),            DESCRIPCION: nuevaDescripcion.trim(),

            ID_USUARIO: currentUserId            ID_USUARIO: currentUserId

          })          })

        });        });

                

        if (response.ok) {        if (response.ok) {

          alert('Tratamiento actualizado exitosamente!');          alert('Tratamiento actualizado exitosamente!');

          cargarTratamientos();          cargarTratamientos();

          tratamientoSeleccionado = null;          tratamientoSeleccionado = null;

        } else {        } else {

          throw new Error('Error actualizando tratamiento');          throw new Error('Error actualizando tratamiento');

        }        }

      } catch (error) {      } catch (error) {

        console.error('Error:', error);        console.error('Error:', error);

        alert('Error actualizando tratamiento. Intenta nuevamente.');        alert('Error actualizando tratamiento. Intenta nuevamente.');

      }      }

    }    }

  }  }



  // Función para eliminar tratamiento  // Función para eliminar tratamiento

  async function eliminarTratamiento() {  async function eliminarTratamiento() {

    if (!tratamientoSeleccionado) {    if (!tratamientoSeleccionado) {

      alert('Selecciona un tratamiento primero.');      alert('Selecciona un tratamiento primero.');

      return;      return;

    }    }



    if (confirm(`¿Estás seguro de eliminar el tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}"?`)) {    if (confirm(`¿Estás seguro de eliminar el tratamiento "${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}"?`)) {

      try {      try {

        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {        const response = await fetch(`${BASE_URL}/tratamientos/${tratamientoSeleccionado.ID_TRATAMIENTO}`, {

          method: 'DELETE'          method: 'DELETE'

        });        });

                

        if (response.ok) {        if (response.ok) {

          alert('Tratamiento eliminado exitosamente!');          alert('Tratamiento eliminado exitosamente!');

          cargarTratamientos();          cargarTratamientos();

          tratamientoSeleccionado = null;          tratamientoSeleccionado = null;

          medicamentoSeleccionado = null;          medicamentoSeleccionado = null;

          // Limpiar lista de medicamentos          // Limpiar lista de medicamentos

          if (medicamentosList) {          if (medicamentosList) {

            medicamentosList.innerHTML = '<li class="text-center-muted">Selecciona un tratamiento para ver sus medicamentos</li>';            medicamentosList.innerHTML = '<li class="text-center-muted">Selecciona un tratamiento para ver sus medicamentos</li>';

          }          }

        } else {        } else {

          throw new Error('Error eliminando tratamiento');          throw new Error('Error eliminando tratamiento');

        }        }

      } catch (error) {      } catch (error) {

        console.error('Error:', error);        console.error('Error:', error);

        alert('Error eliminando tratamiento. Intenta nuevamente.');        alert('Error eliminando tratamiento. Intenta nuevamente.');

      }      }

    }    }

  }  }



  // Función para agregar medicamento  // Función para agregar medicamento

  async function agregarMedicamento() {  async function agregarMedicamento() {

    if (!tratamientoSeleccionado) {    if (!tratamientoSeleccionado) {

      alert('Selecciona un tratamiento primero.');      alert('Selecciona un tratamiento primero.');

      return;      return;

    }    }



    const nombre = prompt('Nombre del medicamento:');    const nombre = prompt('Nombre del medicamento:');

    const dosis = prompt('Dosis del medicamento:');    const dosis = prompt('Dosis del medicamento:');

    const frecuencia = prompt('Frecuencia:');    const frecuencia = prompt('Frecuencia:');



    if (nombre && nombre.trim() !== '') {    if (nombre && nombre.trim() !== '') {

      try {      try {

        const response = await fetch(`${BASE_URL}/medicamentos/`, {        const response = await fetch(`${BASE_URL}/medicamentos/`, {

          method: 'POST',          method: 'POST',

          headers: {          headers: {

            'Content-Type': 'application/json',            'Content-Type': 'application/json',

          },          },

          body: JSON.stringify({          body: JSON.stringify({

            NOMBRE: nombre.trim(),            NOMBRE: nombre.trim(),

            DOSIS: dosis.trim(),            DOSIS: dosis.trim(),

            FRECUENCIA: frecuencia.trim(),            FRECUENCIA: frecuencia.trim(),

            ID_TRATAMIENTO: tratamientoSeleccionado.ID_TRATAMIENTO            ID_TRATAMIENTO: tratamientoSeleccionado.ID_TRATAMIENTO

          })          })

        });        });

                

        if (response.ok) {        if (response.ok) {

          alert('Medicamento agregado exitosamente!');          alert('Medicamento agregado exitosamente!');

          mostrarMedicamentos(tratamientoSeleccionado);          mostrarMedicamentos(tratamientoSeleccionado);

        } else {        } else {

          throw new Error('Error creando medicamento');          throw new Error('Error creando medicamento');

        }        }

      } catch (error) {      } catch (error) {

        console.error('Error:', error);        console.error('Error:', error);

        alert('Error creando medicamento. Intenta nuevamente.');        alert('Error creando medicamento. Intenta nuevamente.');

      }      }

    } else {    } else {

      alert('Por favor, ingresa un nombre válido para el medicamento.');      alert('Por favor, ingresa un nombre válido para el medicamento.');

    }    }

  }  }



  // Event listeners para botones  // Event listeners para botones

  if (addButton) {  if (addButton) {

    addButton.addEventListener('click', agregarTratamiento);    addButton.addEventListener('click', agregarTratamiento);

  }  }



  // Botones de tratamientos  // Botones de tratamientos

  const editTreatmentButtons = document.querySelectorAll('.edit-button-treatments');  const editTreatmentButtons = document.querySelectorAll('.edit-button-treatments');

  const deleteTreatmentButtons = document.querySelectorAll('.delete-button-treatments');  const deleteTreatmentButtons = document.querySelectorAll('.delete-button-treatments');

    

  editTreatmentButtons.forEach(button => {  editTreatmentButtons.forEach(button => {

    button.addEventListener('click', editarTratamiento);    button.addEventListener('click', editarTratamiento);

  });  });

    

  deleteTreatmentButtons.forEach(button => {  deleteTreatmentButtons.forEach(button => {

    button.addEventListener('click', eliminarTratamiento);    button.addEventListener('click', eliminarTratamiento);

  });  });



  // Botones de medicamentos  // Botones de medicamentos

  const editMedicationButtons = document.querySelectorAll('.edit-button-medications');  const editMedicationButtons = document.querySelectorAll('.edit-button-medications');

  const deleteMedicationButtons = document.querySelectorAll('.delete-button-medications');  const deleteMedicationButtons = document.querySelectorAll('.delete-button-medications');

  const addMedicationButton = document.querySelector('#add-medication-button');  const addMedicationButton = document.querySelector('#add-medication-button');

    

  if (addMedicationButton) {  if (addMedicationButton) {

    addMedicationButton.addEventListener('click', agregarMedicamento);    addMedicationButton.addEventListener('click', agregarMedicamento);

  }  }



  // Botón Ver Alarmas  // Botón Ver Alarmas

  const alarmasButton = document.getElementById('alarmas-button');  const alarmasButton = document.getElementById('alarmas-button');

  if (alarmasButton) {  if (alarmasButton) {

    alarmasButton.addEventListener('click', () => {    alarmasButton.addEventListener('click', () => {

      window.location.href = 'alarmas.html';      window.location.href = 'alarmas.html';

    });    });

  }  }



  // Botón Exportar PDF  // Botón Exportar PDF

  const exportPdfButton = document.getElementById('export-pdf-button');  const exportPdfButton = document.getElementById('export-pdf-button');

  if (exportPdfButton) {  if (exportPdfButton) {

    exportPdfButton.addEventListener('click', () => {    exportPdfButton.addEventListener('click', () => {

      exportarPDF();      exportarPDF();

    });    });

  }  }



  // Función para exportar PDF  // Función para exportar PDF

  function exportarPDF() {  function exportarPDF() {

    if (!tratamientoSeleccionado) {    if (!tratamientoSeleccionado) {

      alert('Selecciona un tratamiento primero para exportar.');      alert('Selecciona un tratamiento primero para exportar.');

      return;      return;

    }    }

        

    // Crear contenido del PDF    // Crear contenido del PDF

    const contenido = `    const contenido = `

REPORTE DE TRATAMIENTOREPORTE DE TRATAMIENTO

============================================



Tratamiento: ${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}Tratamiento: ${tratamientoSeleccionado.NOMBRE_TRATAMIENTO}

Descripción: ${tratamientoSeleccionado.DESCRIPCION || 'Sin descripción'}Descripción: ${tratamientoSeleccionado.DESCRIPCION || 'Sin descripción'}

Fecha de generación: ${new Date().toLocaleDateString()}Fecha de generación: ${new Date().toLocaleDateString()}



MEDICAMENTOS:MEDICAMENTOS:

    `;    `;

        

    // Crear un blob con el contenido    // Crear un blob con el contenido

    const blob = new Blob([contenido], { type: 'text/plain' });    const blob = new Blob([contenido], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);    const url = window.URL.createObjectURL(blob);

        

    // Crear enlace de descarga    // Crear enlace de descarga

    const a = document.createElement('a');    const a = document.createElement('a');

    a.href = url;    a.href = url;

    a.download = `tratamiento_${tratamientoSeleccionado.NOMBRE_TRATAMIENTO.replace(/\s+/g, '_')}.txt`;    a.download = `tratamiento_${tratamientoSeleccionado.NOMBRE_TRATAMIENTO.replace(/\s+/g, '_')}.txt`;

    document.body.appendChild(a);    document.body.appendChild(a);

    a.click();    a.click();

    document.body.removeChild(a);    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);    window.URL.revokeObjectURL(url);

        

    alert('Reporte exportado exitosamente!');    alert('Reporte exportado exitosamente!');

  }  }



  // Botón Salir  // Botón Salir

  const salirButton = document.querySelector('.user-profile');  const salirButton = document.querySelector('.user-profile');

  if (salirButton) {  if (salirButton) {

    salirButton.addEventListener('click', () => {    salirButton.addEventListener('click', () => {

      if (confirm('¿Estás seguro de que quieres salir?')) {      if (confirm('¿Estás seguro de que quieres salir?')) {

        window.location.href = 'index.html';        window.location.href = 'index.html';

      }      }

    });    });

  }  }



  // Cargar tratamientos al inicializar  // Cargar tratamientos al inicializar

  cargarTratamientos();  cargarTratamientos();

});});