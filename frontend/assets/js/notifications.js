class NotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window;
        this.permission = this.isSupported ? Notification.permission : 'denied';
        this.activeNotifications = new Map(); // Rastrear notificaciones activas
        this.checkInterval = null; // Para monitoreo automático
        this.settings = { // Configuraciones de usuario
            reminders: true, // Recordatorios 5 min antes
            alerts: true, // Alertas en tiempo real
            overdue: true // Notificaciones de vencidos
        };
        this.init();
    }

    init() {
        console.log("🔍 Inicializando sistema de notificaciones...");
        
        if (!this.isSupported) {
            console.error("❌ Este navegador NO soporta notificaciones web");
            return false;
        }
        
        console.log(`📋 Estado inicial de permisos: ${this.permission}`);
        
        // Cargar configuraciones guardadas
        this.loadSettings();
        
        // Iniciar monitoreo si hay permisos
        if (this.canSendNotifications()) {
            this.startAlarmMonitoring();
        }
        
        return true;
    }

    // Cargar configuraciones del localStorage
    loadSettings() {
        const saved = localStorage.getItem('notification-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    // Guardar configuraciones en localStorage
    saveSettings() {
        localStorage.setItem('notification-settings', JSON.stringify(this.settings));
    }

    // Solicitar permisos de notificación
    async requestPermission() {
        console.log("🔔 Solicitando permisos de notificación...");
        
        if (!this.isSupported) {
            throw new Error("❌ Este navegador no soporta notificaciones web");
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            console.log(`📋 Respuesta del permiso: ${permission}`);
            
            if (permission === 'granted') {
                this.startAlarmMonitoring();
                this.updatePermissionStatus();
            }
            
            return permission === 'granted';
        } catch (error) {
            console.error("❌ Error al solicitar permisos:", error);
            throw error;
        }
    }

    // Verificar si se pueden enviar notificaciones
    canSendNotifications() {
        return this.isSupported && this.permission === 'granted';
    }

    // Iniciar monitoreo automático de alarmas
    startAlarmMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }

        console.log("🕐 Iniciando monitoreo de alarmas...");
        
        // Verificar alarmas cada 30 segundos
        this.checkInterval = setInterval(() => {
            this.checkPendingAlarms();
        }, 30000);

        // Verificar inmediatamente
        this.checkPendingAlarms();
    }

    // Detener monitoreo
    stopAlarmMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
            console.log("⏹️ Monitoreo de alarmas detenido");
        }
    }

    // Verificar alarmas pendientes contra el backend
    async checkPendingAlarms() {
        // Verificar permisos de notificación
        if (!this.canSendNotifications()) {
            console.log("🚫 No se pueden verificar alarmas: permisos de notificación no concedidos");
            return;
        }

        // Verificar si el usuario está logueado
        if (!window.AppState?.user?.user_id) {
            console.log("👤 Esperando que el usuario se loguee...");
            return;
        }

        // Verificar si el token está disponible
        if (!window.AppState?.token) {
            console.log("🔑 Token de autenticación no disponible");
            return;
        }

        try {
            console.log("🔍 Verificando alarmas pendientes...");
            const response = await fetch(`${window.CONFIG.API_URL}/alarmas/?usuario_id=${window.AppState.user.user_id}`, {
                headers: {
                    'Authorization': `Bearer ${window.AppState.token}`
                }
            });

            if (!response.ok) {
                console.warn(`⚠️ Error al obtener alarmas del servidor: ${response.status}`);
                return;
            }

            const alarms = await response.json();
            const now = new Date();

            console.log(`📋 ${alarms.length} alarmas encontradas`);

            alarms.forEach(alarm => {
                if (alarm.ESTADO === 'PENDIENTE') {
                    const alarmTime = new Date(alarm.HORA_PROGRAMADA);
                    const timeDiff = alarmTime - now;

                    console.log(`⏰ Alarma ${alarm.ID_ALARMA}: ${alarm.medicamento_nombre} - Tiempo restante: ${Math.round(timeDiff / 1000 / 60)} minutos`);

                    // Recordatorio 5 minutos antes
                    if (this.settings.reminders && timeDiff <= 5 * 60 * 1000 && timeDiff > 0) {
                        if (!this.activeNotifications.has(`reminder-${alarm.ID_ALARMA}`)) {
                            console.log(`📢 Enviando recordatorio para alarma ${alarm.ID_ALARMA}`);
                            this.sendReminderNotification(alarm);
                        }
                    }

                    // Alerta en tiempo real
                    if (this.settings.alerts && Math.abs(timeDiff) <= 60 * 1000) {
                        if (!this.activeNotifications.has(`alert-${alarm.ID_ALARMA}`)) {
                            console.log(`🚨 Enviando alerta para alarma ${alarm.ID_ALARMA}`);
                            this.sendMedicationNotification(alarm);
                        }
                    }

                    // Notificación de vencido
                    if (this.settings.overdue && timeDiff < -10 * 60 * 1000) {
                        if (!this.activeNotifications.has(`overdue-${alarm.ID_ALARMA}`)) {
                            console.log(`⚠️ Enviando notificación de vencido para alarma ${alarm.ID_ALARMA}`);
                            this.sendOverdueNotification(alarm);
                        }
                    }
                }
            });

        } catch (error) {
            console.error("❌ Error verificando alarmas:", error);
        }
    }

    // Notificación de recordatorio (5 min antes)
    sendReminderNotification(alarm) {
        if (!this.canSendNotifications()) return false;

        try {
            const alarmTime = new Date(alarm.HORA_PROGRAMADA);
            const now = new Date();
            const minutesLeft = Math.ceil((alarmTime - now) / (1000 * 60));

            const notification = new Notification(
                `⏰ Recordatorio de medicamento`,
                {
                    body: `En ${minutesLeft} minuto${minutesLeft > 1 ? 's' : ''}: ${alarm.medicamento_nombre || 'Medicamento'} - ${alarm.medicamento_dosis || 'Ver dosis'}`,
                    icon: 'assets/images/favicon-32.png',
                    badge: 'assets/images/logo-favicon.png',
                    tag: `reminder-${alarm.ID_ALARMA}`,
                    requireInteraction: false,
                    data: { alarmId: alarm.ID_ALARMA, type: 'reminder' }
                }
            );

            this.setupNotificationEvents(notification, alarm, 'reminder');
            return true;

        } catch (error) {
            console.error("❌ Error al crear recordatorio:", error);
            return false;
        }
    }

    // Enviar notificación de medicamento
    sendMedicationNotification(alarm) {
        if (!this.canSendNotifications()) {
            console.warn("🚫 No se puede enviar notificación: permisos no concedidos");
            return false;
        }

        try {
            // 🔧 Service Worker deshabilitado temporalmente para evitar errores
            const hasServiceWorker = false; // Cambiar a true cuando tengamos SW configurado
            
            console.log(`🔧 Service Worker disponible: ${hasServiceWorker}`);
            
            const notificationOptions = {
                body: `${alarm.medicamento_nombre || 'Medicamento'} - ${alarm.medicamento_dosis || 'Ver dosis'}`,
                icon: 'assets/images/favicon-32.png',
                badge: 'assets/images/logo-favicon.png',
                tag: `alert-${alarm.ID_ALARMA}`,
                requireInteraction: true,
                data: { alarmId: alarm.ID_ALARMA, type: 'alert' }
            };

            // Solo agregar acciones si hay Service Worker registrado y activo
            if (hasServiceWorker) {
                notificationOptions.actions = [
                    {
                        action: 'taken',
                        title: '✅ Tomado'
                    },
                    {
                        action: 'snooze',
                        title: '⏰ Posponer 5 min'
                    }
                ];
                console.log("🎯 Agregando acciones a la notificación");
            } else {
                console.log("⚠️ Service Worker no disponible, notificación sin acciones");
            }

            const notification = new Notification(
                `💊 ¡Hora de tu medicamento!`, // Título
                notificationOptions
            );

            this.setupNotificationEvents(notification, alarm, 'alert');
            console.log("🎉 Notificación de medicamento enviada exitosamente");
            return true;

        } catch (error) {
            console.error("❌ Error al crear notificación:", error);
            // Fallback: notificación simple sin acciones
            try {
                const simpleNotification = new Notification(
                    `💊 ¡Hora de tu medicamento!`,
                    {
                        body: `${alarm.medicamento_nombre || 'Medicamento'} - ${alarm.medicamento_dosis || 'Ver dosis'}`,
                        icon: 'assets/images/favicon-32.png',
                        tag: `alert-${alarm.ID_ALARMA}`,
                        data: { alarmId: alarm.ID_ALARMA, type: 'alert' }
                    }
                );
                this.setupNotificationEvents(simpleNotification, alarm, 'alert');
                console.log("🎉 Notificación simple enviada como fallback");
                return true;
            } catch (fallbackError) {
                console.error("❌ Error en notificación fallback:", fallbackError);
                return false;
            }
        }
    }

    // Enviar notificación de alarma vencida
    sendOverdueNotification(alarm) {
        if (!this.canSendNotifications()) {
            return false;
        }

        try {
            // 🔧 Service Worker deshabilitado temporalmente para evitar errores
            const hasServiceWorker = false; // Cambiar a true cuando tengamos SW configurado
            
            const notificationOptions = {
                body: `Has perdido la dosis de ${alarm.medicamento_nombre || 'tu medicamento'}. ¿Deseas tomarla ahora?`,
                icon: 'assets/images/favicon-32.png',
                badge: 'assets/images/logo-favicon.png',
                tag: `overdue-${alarm.ID_ALARMA}`,
                requireInteraction: true,
                data: { alarmId: alarm.ID_ALARMA, type: 'overdue' }
            };

            // Solo agregar acciones si hay Service Worker registrado y activo
            if (hasServiceWorker) {
                notificationOptions.actions = [
                    {
                        action: 'taken-late',
                        title: '✅ Tomar ahora'
                    },
                    {
                        action: 'skip',
                        title: '❌ Omitir dosis'
                    }
                ];
            }

            const notification = new Notification(
                `⚠️ Medicamento vencido`, // Título
                notificationOptions
            );

            this.setupNotificationEvents(notification, alarm, 'overdue');
            return true;

        } catch (error) {
            console.error("❌ Error al crear notificación vencida:", error);
            // Fallback: notificación simple sin acciones
            try {
                const simpleNotification = new Notification(
                    `⚠️ Medicamento vencido`,
                    {
                        body: `Has perdido la dosis de ${alarm.medicamento_nombre || 'tu medicamento'}. Haz clic para ver detalles.`,
                        icon: 'assets/images/favicon-32.png',
                        tag: `overdue-${alarm.ID_ALARMA}`,
                        data: { alarmId: alarm.ID_ALARMA, type: 'overdue' }
                    }
                );
                this.setupNotificationEvents(simpleNotification, alarm, 'overdue');
                console.log("🎉 Notificación vencida simple enviada como fallback");
                return true;
            } catch (fallbackError) {
                console.error("❌ Error en notificación vencida fallback:", fallbackError);
                return false;
            }
        }
    }

    // Configurar eventos comunes para todas las notificaciones
    setupNotificationEvents(notification, alarm, type) {
        notification.onclick = () => {
            console.log("👆 Usuario hizo clic en la notificación");
            window.focus();
            this.navigateToAlarms();
            notification.close();
        };

        notification.onshow = () => {
            console.log(`👁️ Notificación ${type} mostrada`);
            this.activeNotifications.set(`${type}-${alarm.ID_ALARMA}`, notification);
        };

        notification.onerror = (error) => {
            console.error("❌ Error al mostrar notificación:", error);
            this.activeNotifications.delete(`${type}-${alarm.ID_ALARMA}`);
        };

        notification.onclose = () => {
            console.log("🔒 Notificación cerrada");
            this.activeNotifications.delete(`${type}-${alarm.ID_ALARMA}`);
        };

        // Auto-cerrar recordatorios después de 15 segundos
        if (type === 'reminder') {
            setTimeout(() => {
                if (this.activeNotifications.has(`${type}-${alarm.ID_ALARMA}`)) {
                    notification.close();
                }
            }, 15000);
        }
    }

    // Marcar medicamento como tomado
    async markMedicationTaken(alarmId) {
        try {
            const response = await fetch(`${window.CONFIG.API_URL}/alarmas/${alarmId}/marcar-tomada`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.AppState.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log("✅ Medicamento marcado como tomado");
                this.clearAlarmNotifications(alarmId);
                if (window.App?.loadData) {
                    window.App.loadData();
                }
                return true;
            }
        } catch (error) {
            console.error("❌ Error marcando medicamento como tomado:", error);
        }
        return false;
    }

    // Posponer alarma
    async snoozeAlarm(alarmId, minutes = 5) {
        try {
            const response = await fetch(`${window.CONFIG.API_URL}/alarmas/${alarmId}/posponer`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.AppState.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minutos: minutes })
            });

            if (response.ok) {
                console.log(`⏰ Alarma pospuesta por ${minutes} minutos`);
                this.clearAlarmNotifications(alarmId);
                return true;
            }
        } catch (error) {
            console.error("❌ Error posponiendo alarma:", error);
        }
        return false;
    }

    // Limpiar notificaciones de una alarma específica
    clearAlarmNotifications(alarmId) {
        ['reminder', 'alert', 'overdue'].forEach(type => {
            const key = `${type}-${alarmId}`;
            if (this.activeNotifications.has(key)) {
                this.activeNotifications.get(key).close();
                this.activeNotifications.delete(key);
            }
        });
    }

    // Probar notificación
    sendTestNotification() {
        if (!this.canSendNotifications()) {
            alert("❌ Primero debes activar las notificaciones");
            return false;
        }

        try {
            const testAlarm = {
                ID_ALARMA: 9999,
                HORA_PROGRAMADA: new Date().toISOString(),
                medicamento_nombre: 'Paracetamol (Prueba)',
                medicamento_dosis: '500mg',
                ESTADO: 'PENDIENTE'
            };
            
            const result = this.sendMedicationNotification(testAlarm);
            if (result) {
                console.log("✅ Notificación de prueba enviada exitosamente");
            }
            return result;
        } catch (error) {
            console.error("❌ Error en notificación de prueba:", error);
            alert("❌ Error al enviar notificación de prueba: " + error.message);
            return false;
        }
    }

    // Navegar a la página de alarmas
    navigateToAlarms() {
        if (window.location.pathname.includes('dashboard.html')) {
            // Buscar sección de alarmas de múltiples formas
            const alarmsSection = document.querySelector('#alarms-list') || 
                                 document.querySelector('#alarmas') ||
                                 document.querySelector('.alarms-container');
            
            if (alarmsSection) {
                const card = alarmsSection.closest('.card');
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    alarmsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            window.location.href = '/alarmas.html';
        }
    }

        // Mostrar estado de permisos en UI
    updatePermissionStatus() {
        const statusElement = document.querySelector('#notification-status');
        if (!statusElement) return;

        if (!this.isSupported) {
            statusElement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i>
                    <h4>No Compatible</h4>
                    <p>Tu navegador no soporta notificaciones web</p>
                </div>
            `;
        } else if (this.permission === 'granted') {
            statusElement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-check-circle" style="color: #27ae60;"></i>
                    <h4>Notificaciones Activas</h4>
                    <p>Recibirás avisos de tus medicamentos</p>
                    <button class="btn btn-secondary btn-sm" onclick="notificationManager.sendTestNotification()">
                        <i class="fas fa-vial"></i> Probar Notificación
                    </button>
                </div>
            `;
            // Mostrar configuraciones
            const settingsDiv = document.getElementById('notification-settings');
            if (settingsDiv) {
                settingsDiv.style.display = 'block';
            }
        } else if (this.permission === 'denied') {
            statusElement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-times-circle" style="color: #e74c3c;"></i>
                    <h4>Notificaciones Bloqueadas</h4>
                    <p>Ve a configuración del navegador para habilitarlas</p>
                </div>
            `;
        } else {
            statusElement.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell" style="color: #3498db;"></i>
                    <h4>Activar Notificaciones</h4>
                    <p>Recibe recordatorios de tus medicamentos</p>
                    <button class="btn btn-primary" onclick="notificationManager.requestPermission()">
                        <i class="fas fa-bell"></i> Activar Notificaciones
                    </button>
                </div>
            `;
        }
    }

    // Actualizar configuración
    updateSetting(setting, value) {
        this.settings[setting] = value;
        this.saveSettings();
        console.log(`📋 Configuración ${setting} actualizada a: ${value}`);
    }

    // Reinicializar sistema (útil después de login)
    reinitialize() {
        console.log("🔄 Reinicializando sistema de notificaciones...");
        
        // Detener monitoreo actual
        this.stopAlarmMonitoring();
        
        // Limpiar notificaciones activas
        this.activeNotifications.clear();
        
        // Recargar configuraciones
        this.loadSettings();
        
        // Reiniciar monitoreo si hay permisos
        if (this.canSendNotifications()) {
            setTimeout(() => {
                this.startAlarmMonitoring();
                console.log("✅ Sistema de notificaciones reinicializado");
            }, 1000);
        }
    }

    // Refrescar verificación de alarmas (útil después de agregar medicamentos)
    refreshAlarmCheck() {
        if (this.canSendNotifications()) {
            console.log("🔄 Refrescando verificación de alarmas...");
            this.checkPendingAlarms();
        }
    }

    // Obtener estado completo
    getStatus() {
        return {
            supported: this.isSupported,
            permission: this.permission,
            monitoring: !!this.checkInterval,
            activeNotifications: this.activeNotifications.size,
            settings: this.settings
        };
    }
}

// Instancia global del gestor de notificaciones
let notificationManager;

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Evitar duplicación si ya existe
    if (window.notificationManager) {
        console.log("♻️ NotificationManager ya existe, reutilizando instancia");
        notificationManager = window.notificationManager;
        return;
    }

    console.log("🚀 Inicializando nuevo NotificationManager...");
    notificationManager = new NotificationManager();
    
    // Hacer disponible globalmente
    window.notificationManager = notificationManager;
    
    // Actualizar estado en UI después de un momento
    setTimeout(() => {
        if (notificationManager) {
            notificationManager.updatePermissionStatus();
        }
    }, 1000);
});

// Manejar acciones de notificaciones si hay Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('notificationclick', (event) => {
        const { action, notification } = event;
        const data = notification.data;

        event.waitUntil((async () => {
            switch (action) {
                case 'taken':
                case 'taken-late':
                    await notificationManager.markMedicationTaken(data.alarmId);
                    break;
                case 'snooze':
                    await notificationManager.snoozeAlarm(data.alarmId, 5);
                    break;
                case 'skip':
                    console.log(`Dosis omitida para alarma ${data.alarmId}`);
                    break;
            }
            
            notification.close();
            
            // Abrir o enfocar la aplicación
            const clients = await self.clients.matchAll();
            if (clients.length > 0) {
                clients[0].focus();
            } else {
                self.clients.openWindow('/dashboard.html');
            }
        })());
    });
}