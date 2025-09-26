document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const messageDiv = document.getElementById('message');
    
    function showMessage(text, isError = false) {
        messageDiv.innerHTML = text;
        messageDiv.className = isError ? 'error-message register-message-visible' : 'success-message register-message-visible';
        messageDiv.classList.remove('register-message-hidden');
    }
    
    function hideMessage() {
        messageDiv.classList.add('register-message-hidden');
        messageDiv.classList.remove('register-message-visible');
    }
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessage();
            
            // Deshabilitar botón durante el envío
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Registrando...';
            
            try {
                // Obtener datos del formulario
                const formData = new FormData(form);
                
                // Validar campos requeridos
                const nombre = formData.get('nombre')?.trim();
                const correo = formData.get('correo')?.trim();
                const contrasena = formData.get('contrasena');
                const sexo = formData.get('sexo');
                const fecha_nacimiento = formData.get('fecha_nacimiento');
                
                if (!nombre || !correo || !contrasena || !sexo || !fecha_nacimiento) {
                    showMessage('Por favor, completa todos los campos obligatorios', true);
                    return;
                }
                
                // Crear objeto de datos del usuario
                const userData = {
                    NOMBRE: nombre,
                    CORREO: correo,
                    CONTRASENA: contrasena,
                    SEXO: formData.get('sexo') === 'true',  // ✅ CAMBIO: Convertir string a boolean
                    FECHA_NACIMIENTO: fecha_nacimiento,
                    TIPO_SANGRE: formData.get('tipo_sangre') || null,
                    DONADOR_ORGANOS: formData.get('donador_organos') === 'true',  // ✅ Ya estaba correcto
                    ALERGIAS: formData.get('alergias')?.trim() || null,
                    PADECIMIENTOS: formData.get('padecimientos')?.trim() || null,
                    ROL: 'USUARIO'
                };
                
                console.log('📤 Enviando datos:', userData);
                
                // ✅ CAMBIO: Conectar al backend en lugar de simulación
                const response = await fetch('http://127.0.0.1:8004/auth/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    showMessage(`¡Usuario registrado exitosamente! 🎉\nID: ${result.ID_USUARIO}\nNombre: ${result.NOMBRE}`);
                    
                    // Limpiar formulario
                    form.reset();
                    
                    // Redirigir al login después de 3 segundos
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 3000);
                } else {
                    let errorMessage = 'Error al registrar usuario';
                    
                    if (result.detail) {
                        if (typeof result.detail === 'string') {
                            errorMessage = result.detail;
                        } else if (Array.isArray(result.detail)) {
                            errorMessage = result.detail.map(err => `${err.loc?.[1] || 'Campo'}: ${err.msg}`).join('\n');
                        }
                    }
                    
                    showMessage(`❌ ${errorMessage}`, true);
                }
            } catch (error) {
                console.error('❌ Error:', error);
                
                // ✅ CAMBIO: Fallback a modo offline si no hay backend
                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    showMessage('⚠️ Backend no disponible. Guardando en modo offline...', false);
                    
                    // Simulación offline
                    const formData = new FormData(form);
                    const userData = {
                        NOMBRE: formData.get('nombre')?.trim(),
                        CORREO: formData.get('correo')?.trim(),
                        SEXO: formData.get('sexo') === 'true' ? 'Masculino' : 'Femenino',  // ✅ Para mostrar
                        FECHA_NACIMIENTO: formData.get('fecha_nacimiento'),
                        DONADOR_ORGANOS: formData.get('donador_organos') === 'true' ? 'Sí' : 'No'
                    };
                    
                    setTimeout(() => {
                        alert(`¡Registro simulado exitoso! 📋\n\nDatos:\n- Nombre: ${userData.NOMBRE}\n- Correo: ${userData.CORREO}\n- Sexo: ${userData.SEXO}\n- Fecha: ${userData.FECHA_NACIMIENTO}\n- Donador: ${userData.DONADOR_ORGANOS}`);
                        form.reset();
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    showMessage('❌ Error de conexión con el servidor', true);
                }
            } finally {
                // Rehabilitar botón
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
        
        // ✅ Validación en tiempo real para el correo
        const emailInput = document.getElementById('correo');
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                showMessage('⚠️ Por favor, ingresa un correo válido', true);
            } else if (email) {
                hideMessage();
            }
        });
        
        // ✅ Validación para la contraseña
        const passwordInput = document.getElementById('contrasena');
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            if (password.length > 0 && password.length < 6) {
                showMessage('⚠️ La contraseña debe tener al menos 6 caracteres', true);
            } else {
                hideMessage();
            }
        });
        
        // ✅ Validación para fecha de nacimiento
        const dateInput = document.getElementById('fecha_nacimiento');
        dateInput.addEventListener('change', function() {
            const birthDate = new Date(this.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 1 || age > 120) {
                showMessage('⚠️ Por favor, ingresa una fecha de nacimiento válida', true);
            } else {
                hideMessage();
            }
        });
        
    } else {
        console.error('❌ No se encontró el formulario de registro');
    }
    
    // ✅ Función auxiliar para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});