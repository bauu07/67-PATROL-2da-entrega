/* ========================================================== */
/* LÓGICA DE INTERACTIVIDAD, TOC Y LIGHTBOX (metodologias.js)  */
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

  // --- Menú de Contenidos Dinámico (TOC Flotante) ---
  const tocButtons = document.querySelectorAll('.toc-btn');
  const sections = document.querySelectorAll('.content-section');

  const updateActiveToc = () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    tocButtons.forEach(btn => {
      btn.classList.remove('active');
      const hrefTarget = btn.getAttribute('href').replace('#', '');
      if (hrefTarget === currentSectionId) {
        btn.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveToc);

  // Smooth scroll para los botones del TOC
  tocButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href').replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 130;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Módulo Lightbox Modal para Diagramas ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      
      const captionElement = img.closest('.illustration-container').querySelector('.img-caption');
      lightboxCaption.textContent = captionElement ? captionElement.textContent : img.alt;

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Previene scroll de fondo
    });
  });

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});