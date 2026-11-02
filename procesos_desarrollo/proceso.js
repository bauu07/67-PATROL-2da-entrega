document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle del Menú Lateral (Drawer) para celulares
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function toggleMenu() {
    navDrawer.classList.toggle('open');
    drawerOverlay.classList.toggle('active');
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', toggleMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', toggleMenu);

  // Cerrar menú automáticamente al seleccionar una opción en celular
  const drawerLinks = document.querySelectorAll('.drawer-menu a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 2. Control de Pestañas (Tabs) para Modelos Tradicionales (Cascada, V, Incremental)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Actualizar botones activos
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar contenido correspondiente
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 3. Lightbox Modal para Ampliar Imágenes de los Modelos (US-07)
  const zoomableImgs = document.querySelectorAll('.zoomable-img');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  zoomableImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxModal.classList.add('active');
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt;
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }
});