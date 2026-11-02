document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle del Menú Lateral (Drawer) para móviles
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

  const drawerLinks = document.querySelectorAll('.drawer-menu a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navDrawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // 2. US-12: Buscador en tiempo real e índice interactivo A-Z del Glosario
  const glossarySearch = document.getElementById('glossarySearch');
  const clearSearch = document.getElementById('clearSearch');
  const alphaBtns = document.querySelectorAll('.alpha-btn');
  const glossaryGroups = document.querySelectorAll('.glossary-group');
  const noResultsCard = document.getElementById('noResults');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  let activeLetter = 'all';

  function filterGlossary() {
    const query = glossarySearch.value.toLowerCase().trim();
    let totalVisibleTerms = 0;

    glossaryGroups.forEach(group => {
      const groupLetter = group.getAttribute('data-group');
      const termCards = group.querySelectorAll('.term-card');
      let groupHasVisibleTerm = false;

      const matchesLetter = (activeLetter === 'all' || groupLetter === activeLetter);

      termCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const tag = card.querySelector('.term-tag').textContent.toLowerCase();

        const matchesQuery = (title.includes(query) || desc.includes(query) || tag.includes(query));

        if (matchesLetter && matchesQuery) {
          card.style.display = 'flex';
          groupHasVisibleTerm = true;
          totalVisibleTerms++;
        } else {
          card.style.display = 'none';
        }
      });

      if (matchesLetter && groupHasVisibleTerm) {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });

    if (totalVisibleTerms === 0) {
      noResultsCard.style.display = 'block';
    } else {
      noResultsCard.style.display = 'none';
    }

    if (query.length > 0) {
      clearSearch.style.display = 'block';
    } else {
      clearSearch.style.display = 'none';
    }
  }

  if (glossarySearch) {
    glossarySearch.addEventListener('input', filterGlossary);
  }

  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      glossarySearch.value = '';
      clearSearch.style.display = 'none';
      filterGlossary();
    });
  }

  alphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alphaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLetter = btn.getAttribute('data-letter');
      filterGlossary();
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      glossarySearch.value = '';
      activeLetter = 'all';
      alphaBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('.alpha-btn[data-letter="all"]').classList.add('active');
      filterGlossary();
    });
  }

  // 3. US-13: Lógica del Acordeón FAQ (Preguntas Frecuentes)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const wrapper = item.querySelector('.faq-answer-wrapper');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-answer-wrapper').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
      }
    });
  });

  // 4. US-15: Botones Mostrar/Ocultar Solución en Casos Prácticos (Ocultas por defecto)
  const toggleBtns = document.querySelectorAll('.cyber-btn-toggle');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const solutionBox = document.getElementById(targetId);

      if (solutionBox.style.display === 'none' || solutionBox.style.display === '') {
        solutionBox.style.display = 'block';
        btn.innerHTML = '<i class="fa-solid fa-code"></i> Ocultar Solución Técnica';
      } else {
        solutionBox.style.display = 'none';
        btn.innerHTML = '<i class="fa-solid fa-code"></i> Ver Solución Técnica';
      }
    });
  });
});