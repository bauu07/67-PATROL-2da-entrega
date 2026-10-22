/* ========================================================== */
/* LÓGICA DE INTERACTIVIDAD, PESTAÑAS Y LIGHTBOX (modelos.js)  */
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

  // --- Navegación Interna por Pestañas (Sub-secciones US-06) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // --- Módulo de Vista Previa de Imágenes en Pantalla Completa (Lightbox US-07) ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      
      // Capturar el texto explicativo del pie de foto correspondiente
      const captionElement = img.closest('.illustration-container').querySelector('.img-caption');
      lightboxCaption.textContent = captionElement ? captionElement.textContent : img.alt;

      lightboxModal.classList.add('active');
    });
  });

  // Función para cerrar el Lightbox
  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
  };

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Cerrar haciendo clic en el fondo oscuro
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    // Cerrar presionando la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});