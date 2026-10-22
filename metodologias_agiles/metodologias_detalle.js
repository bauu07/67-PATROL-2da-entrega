/* ========================================================== */
/* SCRIPT INTERACTIVO DE METODOLOGÍAS EN DETALLE              */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Control del Menú Drawer Lateral
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

  // 2. Control de Pestañas de Scrum (US-10)
  const scrumTabs = document.querySelectorAll('.scrum-tab-btn');
  const scrumContents = document.querySelectorAll('.scrum-tab-content');

  scrumTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-scrum');
      scrumTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      scrumContents.forEach(c => {
        c.style.display = (c.id === target) ? 'block' : 'none';
      });
    });
  });

  // 3. Cronograma Interactivo del Sprint (US-10)
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  const timelineDisplay = document.getElementById('timelineDisplay');

  timelineBtns.forEach(b => {
    b.addEventListener('click', () => {
      timelineDisplay.innerHTML = b.getAttribute('data-info');
      timelineDisplay.style.borderColor = 'var(--amber-neon)';
    });
  });
});

// 4. Funciones de Drag and Drop para el Tablero Kanban (US-11)
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  
  let targetColumn = ev.target.closest('.kanban-column');
  if (targetColumn) {
    targetColumn.appendChild(draggedElement);
  }
}