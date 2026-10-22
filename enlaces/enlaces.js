/* ========================================================== */
/* LÓGICA NEOBRUTALISTA PARA NAVEGACIÓN Y ENLACES (enlaces.js) */
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

  // --- QA/Tester: Validación de Seguridad Absoluta en Enlaces Externos ---
  const externalLinks = document.querySelectorAll('.external-link-btn');

  externalLinks.forEach(link => {
    // 1. Forzar apertura en pestaña nueva de forma segura
    link.setAttribute('target', '_blank');
    
    // 2. Inyectar protección estricta contra ataques de tabnabbing
    link.setAttribute('rel', 'noopener noreferrer');

    // 3. Manejo de clics y alertas interactivas estéticas
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.trim() === '') {
        e.preventDefault();
        alert('💥 [ERROR 404]: El recurso externo seleccionado no está enlazado todavía.');
      }
    });
  });

  // Animación de entrada de tarjetas estilo bruto-impacto
  const cards = document.querySelectorAll('.link-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 80);
  });

});