// Script para simular usuario logueado - Ejecutar en la consola del navegador
localStorage.setItem('user', JSON.stringify({
  user_id: 1,
  nombre: "Francisco Eligio",
  access_token: "token_test_123"
}));

console.log("✅ Usuario de prueba configurado");
console.log("📍 Recarga la página para que tome efecto");
location.reload();
