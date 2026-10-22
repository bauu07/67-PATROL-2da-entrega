/* ========================================================== */
/* SCRIPT INTERACTIVO DE EJERCICIOS (ejercicios.js)           */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Control del Menú Drawer Lateral
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

  // 2. Control de Botones Mostrar/Ocultar Solución (US-15)
  // Las soluciones permanecen ocultas por defecto al cargar la página.
  const toggleButtons = document.querySelectorAll('.cyber-btn-toggle');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const solutionBox = document.getElementById(targetId);
      
      if (solutionBox) {
        if (solutionBox.style.display === 'none' || solutionBox.style.display === '') {
          solutionBox.style.display = 'block';
          btn.innerHTML = '<i class="fa-solid fa-code-merge"></i> Ocultar Solución Técnica';
        } else {
          solutionBox.style.display = 'none';
          btn.innerHTML = '<i class="fa-solid fa-code"></i> Ver Solución Técnica';
        }
      }
    });
  });
});