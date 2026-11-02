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

  // 2. US-08: Tabla de Contenidos Dinámica Minimizable (TOC)
  const tocToggleBtn = document.getElementById('tocToggleBtn');
  const tocBody = document.getElementById('tocBody');
  const tocToggleIcon = document.getElementById('tocToggleIcon');

  if (tocToggleBtn) {
    tocToggleBtn.addEventListener('click', () => {
      if (tocBody.style.display === 'none') {
        tocBody.style.display = 'flex';
        tocToggleIcon.className = 'fa-solid fa-chevron-left';
      } else {
        tocBody.style.display = 'none';
        tocToggleIcon.className = 'fa-solid fa-chevron-down';
      }
    });
  }

  // Desplazamiento suave (smooth scroll) para el TOC
  const tocLinks = document.querySelectorAll('.toc-body a');
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 3. US-09: Visor Lightbox Modal para Ampliación de Gráficos (Retina/Full HD)
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
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 4. US-10: Pestañas Temáticas de Scrum
  const scrumBtns = document.querySelectorAll('.scrum-tab-btn');
  const scrumContents = document.querySelectorAll('.scrum-tab-content');

  scrumBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-scrum');

      scrumBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      scrumContents.forEach(content => {
        content.style.display = (content.id === targetId) ? 'block' : 'none';
      });
    });
  });

  // US-10: Cronograma Interactivo del Sprint
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  const timelineDisplay = document.getElementById('timelineDisplay');

  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineBtns.forEach(b => b.style.borderColor = 'var(--border-glass)');
      btn.style.borderColor = 'var(--accent-cyan)';
      const infoText = btn.getAttribute('data-info');
      if (timelineDisplay) {
        timelineDisplay.innerHTML = infoText;
      }
    });
  });

  // 5. US-11: Simulación del Tablero Kanban y Límite WIP (Drag & Drop + Botones)
  window.allowDrop = function(ev) {
    ev.preventDefault();
  };

  window.drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  window.drop = function(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedCard = document.getElementById(data);
    const targetColumn = ev.target.closest('.kanban-column');

    if (targetColumn && draggedCard) {
      if (targetColumn.id === 'colInProgress') {
        const currentWip = document.getElementById('colInProgress').querySelectorAll('.kanban-card').length;
        if (currentWip >= 2 && draggedCard.parentElement.id !== 'colInProgress') {
          showWipWarning();
          return;
        }
      }
      targetColumn.appendChild(draggedCard);
      updateKanbanCounts();
    }
  };

  window.moveCard = function(cardId, targetColId) {
    const card = document.getElementById(cardId);
    const targetCol = document.getElementById(targetColId);

    if (card && targetCol) {
      if (targetColId === 'colInProgress') {
        const currentWip = targetCol.querySelectorAll('.kanban-card').length;
        if (currentWip >= 2 && card.parentElement.id !== 'colInProgress') {
          showWipWarning();
          return;
        }
      }
      targetCol.appendChild(card);
      updateKanbanCounts();
    }
  };

  function updateKanbanCounts() {
    const countTodo = document.getElementById('colTodo').querySelectorAll('.kanban-card').length;
    const countInProgress = document.getElementById('colInProgress').querySelectorAll('.kanban-card').length;
    const countDone = document.getElementById('colDone').querySelectorAll('.kanban-card').length;

    document.getElementById('countTodo').textContent = countTodo;
    document.getElementById('countInProgress').textContent = countInProgress;
    document.getElementById('countDone').textContent = countDone;

    const wipWarning = document.getElementById('wipWarning');
    if (countInProgress < 2 && wipWarning) {
      wipWarning.style.display = 'none';
    }
  }

  function showWipWarning() {
    const wipWarning = document.getElementById('wipWarning');
    if (wipWarning) {
      wipWarning.style.display = 'block';
      setTimeout(() => {
        wipWarning.style.display = 'none';
      }, 4000);
    }
  }

  updateKanbanCounts();
});