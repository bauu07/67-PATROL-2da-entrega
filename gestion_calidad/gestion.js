/* ========================================================== */
/* SCRIPT DE GESTIÓN, TÉCNICAS Y HERRAMIENTAS (gestion.js)     */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Control del Menú Lateral (Drawer) ---
  const btnOpenDrawer = document.getElementById('btnOpenDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const navDrawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (btnOpenDrawer && navDrawer) {
    btnOpenDrawer.addEventListener('click', () => {
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
      if (drawerOverlay) drawerOverlay.classList.remove('active');
    });
  }

  // --- 2. Reloj en Tiempo Real (UTC) ---
  const liveClock = document.getElementById('liveClock');
  if (liveClock) {
    function updateClock() {
      const now = new Date();
      const utcString = now.toUTCString().slice(17, 25) + ' UTC';
      liveClock.textContent = utcString;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // --- 3. Sistema de Pestañas (Tabs) para Estándares ISO ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.borderColor = 'var(--border-glass)';
        btn.style.color = 'var(--text-muted)';
      });

      tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      // Activar botón seleccionado
      button.classList.add('active');
      button.style.background = targetTab === 'iso9126' ? 'rgba(0, 102, 255, 0.2)' : 'rgba(255, 187, 0, 0.2)';
      button.style.borderColor = targetTab === 'iso9126' ? 'var(--electric-blue)' : 'var(--laser-gold)';
      button.style.color = '#ffffff';

      // Mostrar contenido correspondiente
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
      }
    });
  });

  // --- 4. Control de Tarjetas Giratorias 3D (Flip Cards) ---
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // --- 5. Sistema de Filtrado para la US-04 (Herramientas de Calidad) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Cambiar estilos activos de los botones de filtro
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.borderColor = 'var(--border-glass)';
        b.style.color = 'var(--text-muted)';
      });

      btn.classList.add('active');
      btn.style.background = 'rgba(0, 242, 254, 0.2)';
      btn.style.borderColor = 'var(--accent-cyan)';
      btn.style.color = '#ffffff';

      const category = btn.getAttribute('data-filter');

      // Mostrar u ocultar las tarjetas según corresponda (Todas o Individuales)
      toolCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

});