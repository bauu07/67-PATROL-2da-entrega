/* ========================================================== */
/* TERMINAL LOGIC CONTROLLER (sobre_nosotros.js)              */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

  // Efecto interactivo de consola en las tarjetas al pasar el cursor
  const cards = document.querySelectorAll('.profile-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--term-cyan)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--term-border)';
    });
  });
});