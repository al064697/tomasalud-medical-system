// Script para simular login correcto
// Ejecutar en la consola del navegador

console.log('🧪 Limpiando localStorage y simulando login...');

// Limpiar datos anteriores
localStorage.clear();

// Simular usuario logueado con datos correctos
const userData = {
    id: 1,
    nombre: "Sebastian",
    correo: "sebastian@test.com"
};

localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('token', 'demo-token-' + Date.now());

console.log('✅ Usuario simulado guardado:', userData);
console.log('📍 Recargando página...');

// Recargar la página
location.reload();