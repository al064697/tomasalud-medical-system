// frontend/js/alarmas.js
class AlarmaManager {
    constructor() {
        this.alarmas = [];
        this.intervaloActualizacion = null;
        this.init();
    }
    
    async init() {
        await this.cargarAlarmas();
        this.iniciarActualizacionAutomatica();
        this.configurarNotificaciones();
    }
    
    async cargarAlarmas() {
        try {
            const response = await fetch('http://127.0.0.1:8004/alarmas/pendientes');
            if (response.ok) {
                this.alarmas = await response.json();
                this.mostrarAlarmas();
            }
        } catch (error) {
            console.log('Backend no disponible, usando datos de ejemplo');
            this.alarmas = [
                {
                    ID_ALARMA: 1,
                    HORA_PROGRAMADA: new Date(Date.now() + 5 * 60000).toISOString(),
                    medicamento_nombre: "Enalapril",
                    medicamento_dosis: "10mg",
                    tratamiento_nombre: "Hipertensión"
                }
            ];
            this.mostrarAlarmas();
        }
    }
    
    mostrarAlarmas() {
        const container = document.getElementById('alarmas-container');
        
        if (this.alarmas.length === 0) {
            container.innerHTML = `
                <div class="alarma-card">
                    <h3>✅ No hay alarmas pendientes</h3>
                    <p>Todas tus medicinas están al día</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.alarmas.map(alarma => {
            const fecha = new Date(alarma.HORA_PROGRAMADA);
            const ahora = new Date();
            const esPendiente = fecha <= ahora;
            
            return `
                <div class="alarma-card ${esPendiente ? 'alarma-pendiente' : ''}">
                    <h3>💊 ${alarma.medicamento_nombre}</h3>
                    <p><strong>Dosis:</strong> ${alarma.medicamento_dosis}</p>
                    <p><strong>Tratamiento:</strong> ${alarma.tratamiento_nombre}</p>
                    <p><strong>Hora:</strong> ${fecha.toLocaleString()}</p>
                    
                    ${esPendiente ? `
                        <div class="alarma-buttons">
                            <button class="btn-tomado" onclick="alarmaManager.marcarTomada(${alarma.ID_ALARMA})">
                                ✅ Ya la tomé
                            </button>
                            <button class="btn-posponer" onclick="alarmaManager.posponer(${alarma.ID_ALARMA})">
                                ⏰ Posponer 15 min
                            </button>
                        </div>
                    ` : `
                        <p style="color: #28a745;">⏱️ Programada para más tarde</p>
                    `}
                </div>
            `;
        }).join('');
    }
    
    async marcarTomada(alarmaId) {
        try {
            const response = await fetch(`http://127.0.0.1:8004/alarmas/${alarmaId}/tomada`, {
                method: 'POST'
            });
            
            if (response.ok) {
                this.mostrarNotificacion('✅ ¡Perfecto! Medicamento registrado como tomado', 'success');
                await this.cargarAlarmas();
            }
        } catch (error) {
            this.mostrarNotificacion('✅ Medicamento marcado como tomado (modo offline)', 'success');
            this.alarmas = this.alarmas.filter(a => a.ID_ALARMA !== alarmaId);
            this.mostrarAlarmas();
        }
    }
    
    async posponer(alarmaId, minutos = 15) {
        try {
            const response = await fetch(`http://127.0.0.1:8004/alarmas/${alarmaId}/posponer?minutos=${minutos}`, {
                method: 'POST'
            });
            
            if (response.ok) {
                this.mostrarNotificacion(`⏰ Alarma pospuesta ${minutos} minutos`, 'info');
                await this.cargarAlarmas();
            }
        } catch (error) {
            this.mostrarNotificacion(`⏰ Alarma pospuesta ${minutos} minutos (modo offline)`, 'info');
            const alarma = this.alarmas.find(a => a.ID_ALARMA === alarmaId);
            if (alarma) {
                const nuevaHora = new Date(alarma.HORA_PROGRAMADA);
                nuevaHora.setMinutes(nuevaHora.getMinutes() + minutos);
                alarma.HORA_PROGRAMADA = nuevaHora.toISOString();
            }
            this.mostrarAlarmas();
        }
    }
    
    iniciarActualizacionAutomatica() {
        this.intervaloActualizacion = setInterval(() => {
            this.cargarAlarmas();
        }, 30000); // Actualizar cada 30 segundos
    }
    
    configurarNotificaciones() {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }
    
    mostrarNotificacionPush(titulo, mensaje) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(titulo, {
                body: mensaje,
                icon: '../images/logo.png',
                tag: 'alarma-medicamento'
            });
        }
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'success' ? '#28a745' : tipo === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    }
}

// Inicializar cuando la página carga
const alarmaManager = new AlarmaManager();