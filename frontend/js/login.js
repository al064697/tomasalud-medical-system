document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const messageDiv = document.getElementById('login-message');
    
    function showMessage(text, isError = false) {
        messageDiv.innerHTML = text;
        messageDiv.className = isError ? 'error-message' : 'success-message';
        messageDiv.classList.remove('login-message-hidden');
    }
    
    function hideMessage() {
        messageDiv.classList.add('login-message-hidden');
    }
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevenir envío por defecto
            hideMessage();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Ingresando...';
            
            try {
                const formData = new FormData(form);
                const loginData = {
                    correo: formData.get('correo')?.trim(),
                    contrasena: formData.get('contrasena')
                };
                
                // Validación básica
                if (!loginData.correo || !loginData.contrasena) {
                    showMessage('Por favor completa todos los campos', true);
                    return;
                }
                
                // Verificar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(loginData.correo)) {
                    showMessage('Por favor ingresa un correo válido', true);
                    return;
                }
                
                // TODO: Implementar autenticación real con backend
                // Por ahora, simulamos login exitoso
                
                // Simular usuario logueado exitosamente
                const userData = {
                    id: 1,
                    nombre: "Usuario Demo", 
                    correo: loginData.correo
                };
                
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', 'demo-token-' + Date.now());
                
                showMessage('¡Login exitoso! Redirigiendo al dashboard...', false);
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            } catch (error) {
                console.error('Error:', error);
                showMessage('Error de conexión con el servidor', true);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
        
        // Validación en tiempo real para email
        const emailInput = document.getElementById('correo');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        showMessage('⚠️ Formato de correo inválido', true);
                    } else {
                        hideMessage();
                    }
                }
            });
        }
        
    } else {
        console.error('❌ No se encontró el formulario de login');
    }
});
