// Script de prueba para localStorage - TomaSalud
// Ejecuta esto en la consola del navegador para probar

console.log('🧪 Iniciando prueba de autenticación TomaSalud...');

// Limpiar storage anterior
localStorage.clear();
console.log('🧹 localStorage limpiado');

// Simular datos de login exitoso (como los devuelve el backend)
const userData = {
    user_id: 1,
    id: 1, // Compatibilidad
    nombre: "Francisco Eligio",
    correo: "freligio008@gmail.com",
    token: "token_1_test"
};

// Guardar en localStorage
localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('token', userData.token);

console.log('✅ Datos de usuario guardados en localStorage:');
console.log('📄 user:', localStorage.getItem('user'));
console.log('🔑 token:', localStorage.getItem('token'));

// Probar lectura como lo hace dashboard.js
try {
  const storedUserData = localStorage.getItem('user');
  if (storedUserData) {
    const user = JSON.parse(storedUserData);
    const currentUserId = user.id || user.user_id;
    console.log('🎯 currentUserId detectado:', currentUserId);
    console.log('✅ Autenticación debería funcionar ahora');
  }
} catch (error) {
  console.error('❌ Error:', error);
}

console.log('🔄 Recarga la página del dashboard para probar');