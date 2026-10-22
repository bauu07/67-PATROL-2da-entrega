/* ========================================================== */
/* LÓGICA DE INTERACTIVIDAD (gestion.js)                      */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Control del Menú Lateral Desplegable (Drawer) ---
  const btnOpenDrawer = document.getElementById('btnOpenDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const menuDrawer = document.getElementById('menuDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  // Función para abrir el menú lateral
  const openMenu = () => {
    menuDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
  };

  // Función para cerrar el menú lateral
  const closeMenu = () => {
    menuDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
  };

  // Asignación de eventos a los botones y fondo oscuro superpuesto
  if (btnOpenDrawer && btnCloseDrawer && menuDrawer && drawerOverlay) {
    btnOpenDrawer.addEventListener('click', openMenu);
    btnCloseDrawer.addEventListener('click', closeMenu);
    drawerOverlay.addEventListener('click', closeMenu);
  }

  // --- Reloj Digital en Vivo en la Barra Superior ---
  const liveClock = document.getElementById('liveClock');
  if (liveClock) {
    setInterval(() => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      liveClock.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }, 1000);
  }

});