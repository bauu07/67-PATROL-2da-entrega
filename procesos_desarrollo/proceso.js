document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle del menú lateral (Drawer)
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

  // 2. Sistema de Pestañas para Modelos Tradicionales (US-06)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.style.display = 'block';
          content.classList.add('active');
        } else {
          content.style.display = 'none';
          content.classList.remove('active');
        }
      });
    });
  });

  // 3. Lightbox Modal para Pantalla Completa (US-07)
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const zoomableImgs = document.querySelectorAll('.zoomable-img');

  zoomableImgs.forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.src;
      modalCaption.textContent = img.alt;
    });
  });

  function closeLightbox() {
    modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLightbox();
      }
    });
  }

  // Cerrar lightbox con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
});