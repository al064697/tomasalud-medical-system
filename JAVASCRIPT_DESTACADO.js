/* 🔔 TomaSalud - Sistema de Notificaciones JavaScript Destacado */

/* ═══════════════════════════════════════════════════════════════
   🧠 CLASE PRINCIPAL - NotificationManager
   ═══════════════════════════════════════════════════════════════ */

class NotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window;
        this.permission = this.isSupported ? Notification.permission : 'denied';
        this.activeNotifications = new Map();      // 🗂️ Rastreo de notificaciones activas
        this.checkInterval = null;                 // ⏱️ Intervalo de monitoreo
        this.settings = {                          // ⚙️ Configuraciones personalizables
            reminders: true,    // 📢 Recordatorios 5 min antes
            alerts: true,       // 🚨 Alertas en tiempo real
            overdue: true       // ⚠️ Notificaciones de vencidos
        };
        this.init();
    }

    /* ═══════════════════════════════════════════════════════════════
       🚀 INICIALIZACIÓN INTELIGENTE
       ═══════════════════════════════════════════════════════════════ */
    
    init() {
        console.log("🔍 Inicializando sistema de notificaciones...");
        
        if (!this.isSupported) {
            console.error("❌ Este navegador NO soporta notificaciones web");
            return false;
        }
        
        // 📋 Cargar configuraciones guardadas
        this.loadSettings();
        
        // 🏁 Iniciar monitoreo si hay permisos
        if (this.canSendNotifications()) {
            this.startAlarmMonitoring();
        }
        
        return true;
    }

    /* ═══════════════════════════════════════════════════════════════
       🔐 GESTIÓN DE PERMISOS MODERNA
       ═══════════════════════════════════════════════════════════════ */
    
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

    /* ═══════════════════════════════════════════════════════════════
       ⏰ MONITOREO AUTOMÁTICO DE ALARMAS
       ═══════════════════════════════════════════════════════════════ */
    
    startAlarmMonitoring() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }

        console.log("🕐 Iniciando monitoreo de alarmas...");
        
        // ⚡ Verificar alarmas cada 30 segundos
        this.checkInterval = setInterval(() => {
            this.checkPendingAlarms();
        }, 30000);

        // 🚀 Verificación inmediata
        this.checkPendingAlarms();
    }

    /* ═══════════════════════════════════════════════════════════════
       🔍 VERIFICACIÓN INTELIGENTE DE ALARMAS
       ═══════════════════════════════════════════════════════════════ */
    
    async checkPendingAlarms() {
        // 🛡️ Verificaciones de seguridad
        if (!this.canSendNotifications()) {
            console.log("🚫 No se pueden verificar alarmas: permisos de notificación no concedidos");
            return;
        }

        if (!window.AppState?.user?.user_id) {
            console.log("👤 Esperando que el usuario se loguee...");
            return;
        }

        try {
            console.log("🔍 Verificando alarmas pendientes...");
            
            // 🌐 Consulta al backend
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

            // 🔄 Procesamiento de cada alarma
            alarms.forEach(alarm => {
                if (alarm.ESTADO === 'PENDIENTE') {
                    const alarmTime = new Date(alarm.HORA_PROGRAMADA);
                    const timeDiff = alarmTime - now;

                    console.log(`⏰ Alarma ${alarm.ID_ALARMA}: ${alarm.medicamento_nombre} - Tiempo restante: ${Math.round(timeDiff / 1000 / 60)} minutos`);

                    // 📢 Recordatorio 5 minutos antes
                    if (this.settings.reminders && timeDiff <= 5 * 60 * 1000 && timeDiff > 0) {
                        if (!this.activeNotifications.has(`reminder-${alarm.ID_ALARMA}`)) {
                            console.log(`📢 Enviando recordatorio para alarma ${alarm.ID_ALARMA}`);
                            this.sendReminderNotification(alarm);
                        }
                    }

                    // 🚨 Alerta en tiempo real
                    if (this.settings.alerts && Math.abs(timeDiff) <= 60 * 1000) {
                        if (!this.activeNotifications.has(`alert-${alarm.ID_ALARMA}`)) {
                            console.log(`🚨 Enviando alerta para alarma ${alarm.ID_ALARMA}`);
                            this.sendMedicationNotification(alarm);
                        }
                    }

                    // ⚠️ Notificación de vencido
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

    /* ═══════════════════════════════════════════════════════════════
       💊 NOTIFICACIÓN PRINCIPAL DE MEDICAMENTO
       ═══════════════════════════════════════════════════════════════ */
    
    sendMedicationNotification(alarm) {
        if (!this.canSendNotifications()) {
            console.warn("🚫 No se puede enviar notificación: permisos no concedidos");
            return false;
        }

        try {
            // 🔧 Detección de Service Worker para acciones
            const hasServiceWorker = 'serviceWorker' in navigator;
            
            const notificationOptions = {
                body: `${alarm.medicamento_nombre || 'Medicamento'} - ${alarm.medicamento_dosis || 'Ver dosis'}`,
                icon: '/assets/img/pill-icon.png',
                badge: '/assets/img/tomasalud-icon.png',
                tag: `alert-${alarm.ID_ALARMA}`,
                requireInteraction: true,        // 🔒 Requiere interacción del usuario
                data: { alarmId: alarm.ID_ALARMA, type: 'alert' }
            };

            // ⚡ Agregar acciones solo si hay Service Worker
            if (hasServiceWorker) {
                notificationOptions.actions = [
                    {
                        action: 'taken',
                        title: '✅ Tomado',
                        icon: '/assets/img/check-icon.png'
                    },
                    {
                        action: 'snooze',
                        title: '⏰ Posponer 5 min',
                        icon: '/assets/img/snooze-icon.png'
                    }
                ];
            }

            // 🎯 Crear notificación principal
            const notification = new Notification(
                `💊 ¡Hora de tu medicamento!`,
                notificationOptions
            );

            this.setupNotificationEvents(notification, alarm, 'alert');
            console.log("🎉 Notificación de medicamento enviada exitosamente");
            return true;

        } catch (error) {
            console.error("❌ Error al crear notificación:", error);
            
            // 🛟 Fallback: notificación simple
            try {
                const simpleNotification = new Notification(
                    `💊 ¡Hora de tu medicamento!`,
                    {
                        body: `${alarm.medicamento_nombre || 'Medicamento'} - ${alarm.medicamento_dosis || 'Ver dosis'}`,
                        icon: '/assets/img/pill-icon.png',
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

    /* ═══════════════════════════════════════════════════════════════
       📢 NOTIFICACIÓN DE RECORDATORIO
       ═══════════════════════════════════════════════════════════════ */
    
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
                    icon: '/assets/img/clock-icon.png',
                    badge: '/assets/img/tomasalud-icon.png',
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

    /* ═══════════════════════════════════════════════════════════════
       🎭 CONFIGURACIÓN DE EVENTOS DE NOTIFICACIÓN
       ═══════════════════════════════════════════════════════════════ */
    
    setupNotificationEvents(notification, alarm, type) {
        // 👆 Click: Abrir aplicación
        notification.onclick = () => {
            console.log("👆 Usuario hizo clic en la notificación");
            window.focus();
            this.navigateToAlarms();
            notification.close();
        };

        // 👁️ Show: Registrar notificación activa
        notification.onshow = () => {
            console.log(`👁️ Notificación ${type} mostrada`);
            this.activeNotifications.set(`${type}-${alarm.ID_ALARMA}`, notification);
        };

        // ❌ Error: Limpiar registro
        notification.onerror = (error) => {
            console.error("❌ Error al mostrar notificación:", error);
            this.activeNotifications.delete(`${type}-${alarm.ID_ALARMA}`);
        };

        // 🔒 Close: Limpiar registro
        notification.onclose = () => {
            console.log("🔒 Notificación cerrada");
            this.activeNotifications.delete(`${type}-${alarm.ID_ALARMA}`);
        };

        // ⏰ Auto-cerrar recordatorios después de 15 segundos
        if (type === 'reminder') {
            setTimeout(() => {
                if (this.activeNotifications.has(`${type}-${alarm.ID_ALARMA}`)) {
                    notification.close();
                }
            }, 15000);
        }
    }

    /* ═══════════════════════════════════════════════════════════════
       🔄 REINICIALIZACIÓN INTELIGENTE
       ═══════════════════════════════════════════════════════════════ */
    
    reinitialize() {
        console.log("🔄 Reinicializando sistema de notificaciones...");
        
        // ⏹️ Detener monitoreo actual
        this.stopAlarmMonitoring();
        
        // 🧹 Limpiar notificaciones activas
        this.activeNotifications.clear();
        
        // 📋 Recargar configuraciones
        this.loadSettings();
        
        // 🚀 Reiniciar monitoreo si hay permisos
        if (this.canSendNotifications()) {
            setTimeout(() => {
                this.startAlarmMonitoring();
                console.log("✅ Sistema de notificaciones reinicializado");
            }, 1000);
        }
    }

    /* ═══════════════════════════════════════════════════════════════
       📊 ESTADO Y DIAGNÓSTICO
       ═══════════════════════════════════════════════════════════════ */
    
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

/* ═══════════════════════════════════════════════════════════════
   🌍 INICIALIZACIÓN GLOBAL
   ═══════════════════════════════════════════════════════════════ */

let notificationManager;

document.addEventListener('DOMContentLoaded', () => {
    // ♻️ Evitar duplicación si ya existe
    if (window.notificationManager) {
        console.log("♻️ NotificationManager ya existe, reutilizando instancia");
        notificationManager = window.notificationManager;
        return;
    }

    console.log("🚀 Inicializando nuevo NotificationManager...");
    notificationManager = new NotificationManager();
    
    // 🌍 Hacer disponible globalmente
    window.notificationManager = notificationManager;
    
    // ⏰ Actualizar estado en UI después de un momento
    setTimeout(() => {
        if (notificationManager) {
            notificationManager.updatePermissionStatus();
        }
    }, 1000);
});

/* ═══════════════════════════════════════════════════════════════
   🧪 FUNCIONES DE TESTING PARA DESARROLLO
   ═══════════════════════════════════════════════════════════════ */

window.testNotifications = {
    // 🔍 Verificación manual de alarmas
    checkAlarms: () => {
        if (window.notificationManager) {
            window.notificationManager.refreshAlarmCheck();
            console.log("🔍 Verificación manual de alarmas ejecutada");
        } else {
            console.log("❌ NotificationManager no disponible");
        }
    },
    
    // 📊 Ver estado del sistema
    getStatus: () => {
        if (window.notificationManager) {
            return window.notificationManager.getStatus();
        }
        return "NotificationManager no disponible";
    },
    
    // 📋 Ver alarmas actuales
    viewAlarms: () => {
        console.log("📋 Alarmas en AppState:", window.AppState?.alarms);
    },
    
    // 🔄 Reinicializar sistema
    reinitialize: () => {
        if (window.notificationManager) {
            window.notificationManager.reinitialize();
            console.log("🔄 Sistema de notificaciones reinicializado manualmente");
        } else {
            console.log("❌ NotificationManager no disponible");
        }
    },
    
    // 🧪 Probar notificación
    testNotification: () => {
        if (window.notificationManager) {
            return window.notificationManager.sendTestNotification();
        } else {
            console.log("❌ NotificationManager no disponible");
            return false;
        }
    }
};