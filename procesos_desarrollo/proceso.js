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

  // --- Animaciones e Iluminación del Timeline ---
  const cards = document.querySelectorAll('.timeline-card');
  const progressFill = document.getElementById('progressFill');

  const observerOptions = {
    root: null,
    threshold: 0.35
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        updateProgressBar();
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));

  function updateProgressBar() {
    const activeCards = document.querySelectorAll('.timeline-card.active').length;
    const percentage = (activeCards / cards.length) * 100;
    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  }

});