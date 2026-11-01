/* ========================================================== */
/* SCRIPT DEL FORMULARIO DE CONTACTO (contacto.js)            */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Control del Menú Lateral Móvil (Drawer) ---
  const menuToggle = document.getElementById('menuToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const navDrawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      navDrawer.classList.add('open');
      if (drawerOverlay) drawerOverlay.classList.add('active');
    });
  }

  if (closeDrawer && navDrawer) {
    closeDrawer.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      if (drawerOverlay) drawerOverlay.classList.remove('active');
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      drawerOverlay.classList.remove('active');
    });
  }

  // --- 2. Validación y Envío del Formulario ---
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const asunto = document.getElementById('asunto').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validar si hai un campo vacío
      if (!nombre || !email || !asunto || !mensaje) {
        mostrarAlerta('Porkavor, kompletaen amin dagiti pagilian (campos) sakbay nga i-submit.', 'error');
        return;
      }

      // Validar formato de correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarAlerta('Porkavor, mangiyaliska iti umno a korreo elekstroniko (email).', 'error');
        return;
      }

      // Simulación de éxito al enviar
      mostrarAlerta('¡Naipatuloren ti mensahem! Agyaman kami iti feedbackmo.', 'success');
      contactForm.reset();
    });
  }

  function mostrarAlerta(texto, tipo) {
    if (!formAlert) return;
    formAlert.textContent = texto;
    formAlert.className = `form-alert ${tipo}`;
    formAlert.style.display = 'block';

    // Ocultar alerta automáticamente despues de 5 segundos
    setTimeout(() => {
      formAlert.style.display = 'none';
    }, 5000);
  }

});