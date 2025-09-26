// Configuración global de la aplicación
const CONFIG = {
    API_BASE_URL: 'http://127.0.0.1:8004',
    ENDPOINTS: {
        // Autenticación
        LOGIN: '/auth/login',
        REGISTRO: '/auth/registro',
        
        // CRUD
        USUARIOS: '/usuarios',
        TRATAMIENTOS: '/tratamientos',
        MEDICAMENTOS: '/medicamentos',
        ALARMAS: '/alarmas',
        HISTORIAL: '/historial'
    }
};

// Función helper para construir URLs completas
function getApiUrl(endpoint) {
    return CONFIG.API_BASE_URL + endpoint;
}

// Función helper para hacer peticiones HTTP
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}