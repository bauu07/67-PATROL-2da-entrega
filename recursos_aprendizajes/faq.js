/* ========================================================== */
/* LÓGICA DE INTERACTIVIDAD ACCESIBLE Y FLUIDA (faq.js)       */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Control del Menú Lateral (Drawer) ---
  const menuToggle = document.getElementById('menuToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const navDrawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  const openMenu = () => {
    navDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
  };

  const closeMenu = () => {
    navDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
  };

  if (menuToggle && closeDrawer && drawerOverlay) {
    menuToggle.addEventListener('click', openMenu);
    closeDrawer.addEventListener('click', closeMenu);
    drawerOverlay.addEventListener('click', closeMenu);
  }

  // --- Lógica del Acordeón con Transición Adaptativa ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answerWrapper = item.querySelector('.faq-answer-wrapper');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Cerrar las demás preguntas para un diseño limpio
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer-wrapper').style.maxHeight = '0px';
        }
      });

      // Alternar pregunta actual
      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answerWrapper.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + 'px';
      }
    });
  });

  // Re-calcular altura de la pregunta desplegada al redimensionar pantalla
  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.faq-item.active');
    if (activeItem) {
      const activeWrapper = activeItem.querySelector('.faq-answer-wrapper');
      activeWrapper.style.maxHeight = activeWrapper.scrollHeight + 'px';
    }
  });

});