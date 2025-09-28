// Debug script - Copiar y pegar en la consola del navegador del dashboard

console.log('🔧 DIAGNÓSTICO DE MEDICAMENTOS');
console.log('================================');

// 1. Verificar localStorage
console.log('📊 1. Estado del localStorage:');
console.log('user_data:', localStorage.getItem('user_data'));
console.log('user_id:', localStorage.getItem('user_id'));
console.log('access_token:', localStorage.getItem('access_token'));
console.log('user:', localStorage.getItem('user'));

// 2. Verificar currentUserId
console.log('\n📊 2. Variable currentUserId:');
console.log('currentUserId:', typeof currentUserId !== 'undefined' ? currentUserId : 'NO DEFINIDA');

// 3. Verificar elemento DOM
console.log('\n📊 3. Elemento medication-list:');
const medicamentosList = document.querySelector('.medication-list');
console.log('medication-list encontrado:', !!medicamentosList);
if (medicamentosList) {
    console.log('innerHTML actual:', medicamentosList.innerHTML);
}

// 4. Hacer login automáticamente si no hay usuario
async function debugLogin() {
    console.log('\n🔐 4. Intentando login automático...');
    try {
        const response = await fetch('http://127.0.0.1:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'freligio008@gmail.com',
                password: '123456'
            })
        });

        const data = await response.json();
        console.log('Respuesta del login:', data);

        if (response.ok) {
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('id', data.user_id);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user_data', JSON.stringify(data));
            
            // Actualizar currentUserId globalmente
            if (typeof window !== 'undefined') {
                window.currentUserId = data.user_id;
            }
            
            console.log('✅ Login exitoso, usuario ID:', data.user_id);
            return data.user_id;
        } else {
            console.error('❌ Error de login:', data.detail);
            return null;
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return null;
    }
}

// 5. Probar API de medicamentos
async function debugMedicamentos(userId) {
    console.log('\n💊 5. Probando API de medicamentos...');
    try {
        const response = await fetch(`http://127.0.0.1:8000/medicamentos/?usuario_id=${userId}`);
        const medicamentos = await response.json();
        
        console.log('Respuesta de la API:', medicamentos);
        console.log('Cantidad de medicamentos:', medicamentos.length);
        
        if (medicamentos.length > 0) {
            console.log('Primer medicamento:', medicamentos[0]);
            console.log('Campos disponibles:', Object.keys(medicamentos[0]));
        }
        
        return medicamentos;
    } catch (error) {
        console.error('❌ Error en API:', error);
        return [];
    }
}

// 6. Forzar carga de medicamentos en UI
function debugCargarMedicamentosUI(medicamentos) {
    console.log('\n🔄 6. Cargando medicamentos en UI...');
    
    const medicamentosList = document.querySelector('.medication-list');
    if (!medicamentosList) {
        console.error('❌ No se encontró .medication-list');
        return;
    }
    
    medicamentosList.innerHTML = '';
    
    if (medicamentos && medicamentos.length > 0) {
        console.log(`📋 Procesando ${medicamentos.length} medicamentos...`);
        
        medicamentos.forEach((medicamento, index) => {
            console.log(`💊 Medicamento ${index + 1}:`, medicamento);
            
            const li = document.createElement('li');
            li.className = 'medication-item';
            li.innerHTML = `
                <div class="medication-info">
                    <strong>${medicamento.NOMBRE || 'Sin nombre'}</strong>
                    <div class="medication-details">
                        <span>Dosis: ${medicamento.DOSIS || 'Sin dosis'}</span>
                        <span>Hora: ${medicamento.HORA || 'Sin hora'}</span>
                    </div>
                </div>
            `;
            
            li.addEventListener('click', () => {
                document.querySelectorAll('.medication-item').forEach(item => {
                    item.classList.remove('selected');
                });
                li.classList.add('selected');
                if (typeof window.medicamentoSeleccionado !== 'undefined') {
                    window.medicamentoSeleccionado = medicamento;
                }
                console.log('🎯 Medicamento seleccionado:', medicamento);
            });

            medicamentosList.appendChild(li);
        });
        
        console.log('✅ Medicamentos cargados en UI');
    } else {
        medicamentosList.innerHTML = '<li style="color: #666; text-align: center; padding: 20px;">No hay medicamentos registrados</li>';
        console.log('⚠️ No hay medicamentos para mostrar');
    }
}

// 7. Ejecutar diagnóstico completo
async function ejecutarDiagnostico() {
    console.log('\n🚀 7. EJECUTANDO DIAGNÓSTICO COMPLETO...');
    
    let userId = typeof currentUserId !== 'undefined' ? currentUserId : localStorage.getItem('user_id');
    
    if (!userId) {
        console.log('⚠️ No hay usuario, intentando login...');
        userId = await debugLogin();
    }
    
    if (userId) {
        console.log('✅ Usuario disponible:', userId);
        const medicamentos = await debugMedicamentos(userId);
        debugCargarMedicamentosUI(medicamentos);
        
        // Intentar llamar a la función original si existe
        if (typeof cargarMedicamentos === 'function') {
            console.log('\n🔄 Llamando a cargarMedicamentos() original...');
            try {
                await cargarMedicamentos();
                console.log('✅ cargarMedicamentos() ejecutada');
            } catch (error) {
                console.error('❌ Error en cargarMedicamentos():', error);
            }
        }
    } else {
        console.error('❌ No se pudo obtener usuario válido');
    }
}

// Ejecutar automáticamente
setTimeout(ejecutarDiagnostico, 1000);

console.log('\n📝 INSTRUCCIONES:');
console.log('1. Copia y pega este script en la consola del navegador');
console.log('2. Ve al dashboard: http://localhost:9000/dashboard.html');
console.log('3. Abre la consola del navegador (F12)');
console.log('4. Pega este script y presiona Enter');
console.log('5. Observa los mensajes de debug');