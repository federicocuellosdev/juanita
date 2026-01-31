// Configuración de la API
const API_URL = 'https://patagonica.onrender.com/api/juanita/confirmar'; // Ajustar según el dominio real

// Elementos
const form = document.getElementById('confirmation-form');
const successModal = document.getElementById('success-modal');
const submitBtn = form.querySelector('.submit-btn');

// Enviar formulario
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Deshabilitar botón mientras se envía
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Recopilar datos
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email') || '',
        restriccion: formData.get('restriccion') || '',
        mensaje: formData.get('mensaje') || ''
    };

    try {
        // Enviar a la API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Mostrar modal de éxito
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            throw new Error(result.error || 'Error al enviar');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar tu confirmación. Por favor, intentá de nuevo.');

        // Rehabilitar botón
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirmar Asistencia';
    }
});

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
        window.location.href = 'index.html';
    }
});
