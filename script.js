// Fecha del evento: 11 de Abril 2026 a las 20:00 hs
const eventDate = new Date('2026-04-11T20:00:00').getTime();

// Elementos del countdown
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Función para actualizar el countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        // El evento ya pasó
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Actualizar cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Modal
const modal = document.getElementById('welcome-modal');

// Personalizar saludo con parámetro URL ?c=nombre
const urlParams = new URLSearchParams(window.location.search);
const invitado = urlParams.get('c');
if (invitado) {
    document.getElementById('greeting').textContent = `Hola ${invitado}!`;
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeMapModal();
    }
});

// Prevenir scroll cuando el modal está abierto
document.body.style.overflow = 'hidden';

// Modal del Mapa
const mapModal = document.getElementById('map-modal');

function openMapModal() {
    mapModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMapModal() {
    mapModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Cerrar modal del mapa al hacer clic fuera
mapModal.addEventListener('click', (e) => {
    if (e.target === mapModal) {
        closeMapModal();
    }
});

