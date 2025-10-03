// 🔔 TomaSalud Service Worker para Notificaciones
// Este Service Worker permite acciones interactivas en las notificaciones

const CACHE_NAME = 'tomasalud-v1';
const urlsToCache = [
    'pages/dashboard-moderno.html',
    'assets/js/notifications.js',
    'assets/images/favicon-32.png',
    'assets/images/logo-favicon.png'
];

// 📦 Instalación del Service Worker
self.addEventListener('install', (event) => {
    console.log('🚀 Service Worker instalándose...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📂 Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// 🔄 Activación del Service Worker
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activado');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 🌐 Intercepción de solicitudes de red
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Devolver del cache si está disponible
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// 🔔 Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event) => {
    console.log('👆 Click en notificación:', event.notification.data);
    
    const { action, notification } = event;
    const data = notification.data;

    event.notification.close();

    event.waitUntil(
        (async () => {
            // 🎯 Manejar acciones específicas
            switch (action) {
                case 'taken':
                case 'taken-late':
                    console.log(`✅ Medicamento marcado como tomado: ${data.alarmId}`);
                    // Aquí se podría enviar una petición al backend
                    await markMedicationTaken(data.alarmId);
                    break;
                    
                case 'snooze':
                    console.log(`⏰ Medicamento pospuesto: ${data.alarmId}`);
                    // Aquí se podría posponer la alarma
                    await snoozeAlarm(data.alarmId, 5);
                    break;
                    
                case 'skip':
                    console.log(`❌ Dosis omitida: ${data.alarmId}`);
                    // Aquí se podría marcar como omitida
                    break;
                    
                default:
                    // Sin acción específica, abrir la aplicación
                    console.log('📱 Abriendo aplicación');
                    break;
            }
            
            // 🖥️ Abrir o enfocar la aplicación
            const clients = await self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            });
            
            if (clients.length > 0) {
                // Enfocar ventana existente
                return clients[0].focus();
            } else {
                // Abrir nueva ventana
                return self.clients.openWindow('pages/dashboard-moderno.html');
            }
        })()
    );
});

// 📱 Mostrar notificación (para futuro uso)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const { title, options } = event.data;
        
        self.registration.showNotification(title, options);
    }
});

// 🔗 Funciones auxiliares para interactuar con el backend
async function markMedicationTaken(alarmId) {
    try {
        // Esta función se conectaría con el backend
        console.log(`🔗 Conectando con backend para marcar alarma ${alarmId} como tomada`);
        
        // Ejemplo de petición (requiere token y configuración)
        /*
        const response = await fetch(`/api/alarmas/${alarmId}/marcar-tomada`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // Se necesitaría obtener el token
            }
        });
        
        if (response.ok) {
            console.log('✅ Medicamento marcado como tomado en el backend');
        }
        */
        
    } catch (error) {
        console.error('❌ Error al marcar medicamento como tomado:', error);
    }
}

async function snoozeAlarm(alarmId, minutes) {
    try {
        console.log(`🔗 Conectando con backend para posponer alarma ${alarmId} por ${minutes} minutos`);
        
        // Ejemplo de petición (requiere token y configuración)
        /*
        const response = await fetch(`/api/alarmas/${alarmId}/posponer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // Se necesitaría obtener el token
            },
            body: JSON.stringify({ minutos: minutes })
        });
        
        if (response.ok) {
            console.log('⏰ Alarma pospuesta en el backend');
        }
        */
        
    } catch (error) {
        console.error('❌ Error al posponer alarma:', error);
    }
}