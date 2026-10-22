/* ========================================================== */
/* LÓGICA CYBERPUNK BÚSQUEDA Y NAVEGACIÓN GLOSARIO (recurso.js)*/
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

  // --- Buscador y Filtro A-Z en Tiempo Real ---
  const searchInput = document.getElementById('glossarySearch');
  const clearBtn = document.getElementById('clearSearch');
  const alphaBtns = document.querySelectorAll('.alpha-btn');
  const glossaryGroups = document.querySelectorAll('.glossary-group');
  const noResultsCard = document.getElementById('noResults');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  let currentLetter = 'all';

  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterGlossary = () => {
    const query = normalizeText(searchInput.value.trim());
    let totalVisible = 0;

    glossaryGroups.forEach(group => {
      const groupLetter = group.getAttribute('data-group');
      const cards = group.querySelectorAll('.term-card');
      let visibleCount = 0;

      const matchesLetter = (currentLetter === 'all' || groupLetter === currentLetter);

      cards.forEach(card => {
        const title = normalizeText(card.querySelector('h3').textContent);
        const text = normalizeText(card.querySelector('p').textContent);
        const tag = normalizeText(card.querySelector('.term-tag').textContent);

        const matchesQuery = query === '' || title.includes(query) || text.includes(query) || tag.includes(query);

        if (matchesLetter && matchesQuery) {
          card.style.display = 'flex';
          visibleCount++;
          totalVisible++;
        } else {
          card.style.display = 'none';
        }
      });

      group.style.display = visibleCount > 0 ? 'block' : 'none';
    });

    if (noResultsCard) {
      noResultsCard.style.display = totalVisible === 0 ? 'block' : 'none';
    }

    if (clearBtn) {
      clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterGlossary);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterGlossary();
      searchInput.focus();
    });
  }

  alphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alphaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentLetter = btn.getAttribute('data-letter');
      filterGlossary();
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentLetter = 'all';

      alphaBtns.forEach(b => b.classList.remove('active'));
      const allBtn = document.querySelector('.alpha-btn[data-letter="all"]');
      if (allBtn) allBtn.classList.add('active');

      filterGlossary();
    });
  }

});