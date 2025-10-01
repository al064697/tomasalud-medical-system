/**
 * alarmas.js
 * Script para la gestión de alarmas de medicamentos
 */

// Estado de la aplicación
let alarmas = [];
let usuarioActual = null;

// URLs de la API
const API_BASE = CONFIG.API_BASE;

// Elementos del DOM
let tbody;
let contenedorPrincipal;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando gestión de alarmas...');
    
    // Obtener referencias de elementos DOM
    tbody = document.querySelector('#tabla-alarmas tbody');
    contenedorPrincipal = document.querySelector('.alarmas-container');
    
    // Verificar autenticación
    verificarAutenticacion();
    
    // Cargar alarmas
    cargarAlarmas();
    
    // Configurar event listeners
    configurarEventListeners();
});

/**
 * Verificar si el usuario está autenticado
 */
function verificarAutenticacion() {
    usuarioActual = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuarioActual) {
        console.log('Usuario no autenticado, redirigiendo al login...');
        window.location.href = 'index.html';
        return;
    }
    
    console.log('Usuario autenticado:', usuarioActual.NOMBRE);
    
    // Mostrar nombre del usuario en el header si existe
    const nombreUsuario = document.querySelector('#nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = usuarioActual.NOMBRE;
    }
}

/**
 * Configurar event listeners
 */
function configurarEventListeners() {
    // Botón de logout
    const btnLogout = document.querySelector('#btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    }
    
    // Botones de navegación
    const btnDashboard = document.querySelector('#btn-dashboard');
    if (btnDashboard) {
        btnDashboard.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }
    
    // Botón de actualizar alarmas
    const btnActualizar = document.querySelector('#btn-actualizar');
    if (btnActualizar) {
        btnActualizar.addEventListener('click', cargarAlarmas);
    }
}

/**
 * Cargar alarmas del usuario
 */
async function cargarAlarmas() {
    try {
        console.log('Cargando alarmas...');
        
        mostrarCargando(true);
        
        const response = await fetch(`${API_BASE}/alarmas/?usuario_id=${usuarioActual.ID_USUARIO}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        alarmas = await response.json();
        console.log('Alarmas cargadas:', alarmas);
        
        mostrarAlarmas();
        
    } catch (error) {
        console.error('Error al cargar alarmas:', error);
        mostrarError('Error al cargar las alarmas. Por favor, intenta de nuevo.');
    } finally {
        mostrarCargando(false);
    }
}

/**
 * Mostrar alarmas en la tabla
 */
function mostrarAlarmas() {
    if (!tbody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    if (alarmas.length === 0) {
        mostrarMensajeVacio();
        return;
    }
    
    // Ordenar alarmas por fecha y hora
    alarmas.sort((a, b) => {
        const fechaA = new Date(`${a.FECHA} ${a.HORA}`);
        const fechaB = new Date(`${b.FECHA} ${b.HORA}`);
        return fechaA - fechaB;
    });
    
    // Crear filas de la tabla
    alarmas.forEach(alarma => {
        const fila = crearFilaAlarma(alarma);
        tbody.appendChild(fila);
    });
}

/**
 * Crear fila de alarma para la tabla
 */
function crearFilaAlarma(alarma) {
    const fila = document.createElement('tr');
    
    // Determinar estado de la alarma
    const ahora = new Date();
    const fechaAlarma = new Date(`${alarma.FECHA} ${alarma.HORA}`);
    const esVencida = fechaAlarma < ahora;
    const esPendiente = !alarma.TOMADO && !esVencida;
    const esTomado = alarma.TOMADO;
    
    // Aplicar clase según el estado
    if (esTomado) {
        fila.classList.add('alarma-tomada');
    } else if (esVencida) {
        fila.classList.add('alarma-vencida');
    } else if (esPendiente) {
        fila.classList.add('alarma-pendiente');
    }
    
    fila.innerHTML = `
        <td>
            <div class="medicamento-info">
                <strong>${alarma.MEDICAMENTO_NOMBRE || 'Medicamento'}</strong>
                <span class="dosis">${alarma.DOSIS || 'N/A'}</span>
            </div>
        </td>
        <td>
            <time class="fecha-hora">
                ${formatearFecha(alarma.FECHA)} - ${formatearHora(alarma.HORA)}
            </time>
        </td>
        <td>
            <span class="badge estado-${getEstadoClase(alarma, esVencida)}">
                ${getEstadoTexto(alarma, esVencida)}
            </span>
        </td>
        <td class="acciones">
            ${crearBotonesAccion(alarma, esVencida)}
        </td>
    `;
    
    return fila;
}

/**
 * Obtener clase CSS para el estado
 */
function getEstadoClase(alarma, esVencida) {
    if (alarma.TOMADO) return 'tomada';
    if (esVencida) return 'vencida';
    return 'pendiente';
}

/**
 * Obtener texto del estado
 */
function getEstadoTexto(alarma, esVencida) {
    if (alarma.TOMADO) return 'Tomada';
    if (esVencida) return 'Vencida';
    return 'Pendiente';
}

/**
 * Crear botones de acción
 */
function crearBotonesAccion(alarma, esVencida) {
    if (alarma.TOMADO) {
        return '<span class="text-muted">Completada</span>';
    }
    
    if (esVencida) {
        return `
            <button class="btn btn-sm btn-outline-warning" onclick="marcarComoTomada(${alarma.ID_ALARMA})">
                <i class="fas fa-clock"></i> Tomada tarde
            </button>
        `;
    }
    
    return `
        <button class="btn btn-sm btn-success" onclick="marcarComoTomada(${alarma.ID_ALARMA})">
            <i class="fas fa-check"></i> Marcar tomada
        </button>
        <button class="btn btn-sm btn-outline-secondary" onclick="aplazarAlarma(${alarma.ID_ALARMA})">
            <i class="fas fa-clock"></i> Aplazar
        </button>
    `;
}

/**
 * Marcar alarma como tomada
 */
async function marcarComoTomada(idAlarma) {
    try {
        console.log('Marcando alarma como tomada:', idAlarma);
        
        const response = await fetch(`${API_BASE}/alarmas/${idAlarma}/tomar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Perfecto!',
            text: 'Medicamento marcado como tomado',
            timer: 2000,
            showConfirmButton: false
        });
        
        // Recargar alarmas
        await cargarAlarmas();
        
    } catch (error) {
        console.error('Error al marcar alarma como tomada:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo marcar el medicamento como tomado'
        });
    }
}

/**
 * Aplazar alarma
 */
async function aplazarAlarma(idAlarma) {
    const { value: minutos } = await Swal.fire({
        title: 'Aplazar alarma',
        input: 'select',
        inputOptions: {
            5: '5 minutos',
            10: '10 minutos',
            15: '15 minutos',
            30: '30 minutos',
            60: '1 hora'
        },
        inputPlaceholder: 'Selecciona el tiempo',
        showCancelButton: true,
        confirmButtonText: 'Aplazar',
        cancelButtonText: 'Cancelar'
    });
    
    if (minutos) {
        try {
            const response = await fetch(`${API_BASE}/alarmas/${idAlarma}/aplazar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minutos: parseInt(minutos) })
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            Swal.fire({
                icon: 'success',
                title: 'Alarma aplazada',
                text: `Se ha aplazado por ${minutos} minutos`,
                timer: 2000,
                showConfirmButton: false
            });
            
            await cargarAlarmas();
            
        } catch (error) {
            console.error('Error al aplazar alarma:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo aplazar la alarma'
            });
        }
    }
}

/**
 * Mostrar mensaje cuando no hay alarmas
 */
function mostrarMensajeVacio() {
    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="text-center py-4">
                <div class="empty-state">
                    <i class="fas fa-bell-slash fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No tienes alarmas programadas</h5>
                    <p class="text-muted">Las alarmas aparecerán automáticamente cuando agregues medicamentos con horarios.</p>
                    <a href="dashboard.html" class="btn btn-primary mt-3">
                        <i class="fas fa-plus"></i> Agregar medicamento
                    </a>
                </div>
            </td>
        </tr>
    `;
}

/**
 * Mostrar/ocultar indicador de carga
 */
function mostrarCargando(mostrar) {
    const loader = document.querySelector('#loader');
    if (loader) {
        loader.style.display = mostrar ? 'block' : 'none';
    }
    
    if (contenedorPrincipal) {
        contenedorPrincipal.style.opacity = mostrar ? '0.5' : '1';
    }
}

/**
 * Mostrar mensaje de error
 */
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
    });
}

/**
 * Formatear fecha
 */
function formatearFecha(fecha) {
    const opciones = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

/**
 * Formatear hora
 */
function formatearHora(hora) {
    return hora.substring(0, 5); // HH:MM
}

/**
 * Cerrar sesión
 */
function logout() {
    Swal.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro que quieres cerrar sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('usuario');
            window.location.href = 'index.html';
        }
    });
}

// Funciones globales para que puedan ser llamadas desde HTML
window.marcarComoTomada = marcarComoTomada;
window.aplazarAlarma = aplazarAlarma;
window.logout = logout;