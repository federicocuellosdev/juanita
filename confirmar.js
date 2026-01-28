// Configuración
const MAX_GUESTS = 2;
let guestCount = 0;

// Elementos
const container = document.getElementById('invitados-container');
const addBtn = document.getElementById('add-guest-btn');
const form = document.getElementById('confirmation-form');
const successModal = document.getElementById('success-modal');

// Agregar invitado
function addGuest() {
    if (guestCount >= MAX_GUESTS) return;

    guestCount++;
    const guestNumber = guestCount;

    const guestDiv = document.createElement('div');
    guestDiv.className = 'guest-item';
    guestDiv.id = `guest-${guestNumber}`;
    guestDiv.innerHTML = `
        <div class="guest-header">
            <span class="guest-title">Acompañante ${guestNumber}</span>
            <button type="button" class="remove-guest-btn" onclick="removeGuest(${guestNumber})">Eliminar</button>
        </div>
        <div class="form-group">
            <label for="invitado-${guestNumber}">Nombre completo</label>
            <input type="text" id="invitado-${guestNumber}" name="invitado-${guestNumber}" placeholder="Nombre del acompañante">
        </div>
        <div class="form-group">
            <label for="restriccion-invitado-${guestNumber}">Restricción alimentaria</label>
            <input type="text" id="restriccion-invitado-${guestNumber}" name="restriccion-invitado-${guestNumber}" placeholder="Ej: vegetariano, celíaco, sin TACC...">
        </div>
    `;

    container.appendChild(guestDiv);
    updateAddButton();
}

// Eliminar invitado
function removeGuest(number) {
    const guestDiv = document.getElementById(`guest-${number}`);
    if (guestDiv) {
        guestDiv.style.animation = 'slideIn 0.2s ease reverse';
        setTimeout(() => {
            guestDiv.remove();
            guestCount--;
            renumberGuests();
            updateAddButton();
        }, 200);
    }
}

// Renumerar invitados después de eliminar
function renumberGuests() {
    const guests = container.querySelectorAll('.guest-item');
    guests.forEach((guest, index) => {
        const num = index + 1;
        guest.id = `guest-${num}`;
        guest.querySelector('.guest-title').textContent = `Acompañante ${num}`;
        guest.querySelector('.remove-guest-btn').setAttribute('onclick', `removeGuest(${num})`);

        const labels = guest.querySelectorAll('label');
        const inputs = guest.querySelectorAll('input');

        // Nombre
        labels[0].setAttribute('for', `invitado-${num}`);
        inputs[0].id = `invitado-${num}`;
        inputs[0].name = `invitado-${num}`;

        // Restricción
        labels[1].setAttribute('for', `restriccion-invitado-${num}`);
        inputs[1].id = `restriccion-invitado-${num}`;
        inputs[1].name = `restriccion-invitado-${num}`;
    });
}

// Actualizar estado del botón
function updateAddButton() {
    if (guestCount >= MAX_GUESTS) {
        addBtn.disabled = true;
        addBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Máximo de acompañantes alcanzado
        `;
    } else {
        addBtn.disabled = false;
        addBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar acompañante
        `;
    }
}

// Event Listeners
addBtn.addEventListener('click', addGuest);

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Recopilar datos
    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        restriccion: formData.get('restriccion'),
        mensaje: formData.get('mensaje'),
        invitados: []
    };

    // Agregar invitados adicionales
    for (let i = 1; i <= guestCount; i++) {
        const invitadoNombre = formData.get(`invitado-${i}`);
        const invitadoRestriccion = formData.get(`restriccion-invitado-${i}`);
        if (invitadoNombre && invitadoNombre.trim()) {
            data.invitados.push({
                nombre: invitadoNombre.trim(),
                restriccion: invitadoRestriccion ? invitadoRestriccion.trim() : ''
            });
        }
    }

    // Mostrar en consola (para debug)
    console.log('Datos de confirmación:', data);

    // Mostrar modal de éxito
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
        window.location.href = 'index.html';
    }
});
