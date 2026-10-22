/* ========================================================== */
/* LÓGICA DINÁMICA DEL COMPARADOR DE METODOLOGÍAS (comparador.js) */
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

  // --- Base de Datos en Objeto JS para el Comparador ---
  const methodologiesData = {
    scrum: {
      nombre: "Scrum",
      tipo: "Ágil / Iterativo",
      enfoque: "Empírico / Adaptativo",
      flexibilidad: "Alta ante cambios de requisitos",
      gestionRiesgos: "Mitigación temprana por Sprints cortos",
      documentacion: "Ligera (Product Backlog, Incremento)",
      entregaValor: "Iterativa y frecuente (Cada Sprint)"
    },
    kanban: {
      nombre: "Kanban",
      tipo: "Ágil / Flujo Continuo",
      enfoque: "Visualización de flujo y WIP",
      flexibilidad: "Máxima (Cambios en tiempo real)",
      gestionRiesgos: "Control de cuellos de botella por límites WIP",
      documentacion: "Mínima (Basado en tablero visual)",
      entregaValor: "Continua (Sin ciclos de iteración rígidos)"
    },
    cascada: {
      nombre: "Modelo en Cascada",
      tipo: "Tradicional / Secuencial",
      enfoque: "Lineal y predictivo",
      flexibilidad: "Baja (Costoso modificar fases previas)",
      gestionRiesgos: "Planificación exhaustiva inicial",
      documentacion: "Extensa y formal por cada etapa",
      entregaValor: "Al finalizar todo el proyecto"
    },
    espiral: {
      nombre: "Modelo en Espiral",
      tipo: "Tradicional / Evolutivo",
      enfoque: "Basado en análisis de riesgos",
      flexibilidad: "Media-Alta por ciclos evolutivos",
      gestionRiesgos: "Muy Alta (Evaluación constante por cuadrantes)",
      documentacion: "Moderada a alta según iteración",
      entregaValor: "Por prototipos incrementales"
    }
  };

  // Mapeo de filas para la tabla comparativa
  const tableAttributes = [
    { key: 'tipo', label: 'Tipo de Enfoque' },
    { key: 'enfoque', label: 'Filosofía Principal' },
    { key: 'flexibilidad', label: 'Flexibilidad al Cambio' },
    { key: 'gestionRiesgos', label: 'Gestión de Riesgos' },
    { key: 'documentacion', label: 'Nivel de Documentación' },
    { key: 'entregaValor', label: 'Ritmo de Entrega de Valor' }
  ];

  const checkboxes = document.querySelectorAll('input[name="metodologia"]');
  const tableWrapper = document.getElementById('tableWrapper');
  const activeCounter = document.getElementById('activeCounter');

  // Función encargada de renderizar la matriz de forma dinámica
  const renderComparisonTable = () => {
    try {
      // Capturar selecciones activas
      const selectedKeys = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      // Actualizar contador visual
      if (activeCounter) {
        activeCounter.textContent = `Elementos seleccionados: ${selectedKeys.length}`;
      }

      // Validar si no hay elementos seleccionados (Estado vacío sin errores)
      if (selectedKeys.length === 0) {
        tableWrapper.innerHTML = `
          <div class="empty-state">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>No hay metodologías seleccionadas.</p>
            <span>Por favor, marca al menos una casilla en el panel superior para generar la matriz.</span>
          </div>
        `;
        return;
      }

      // Construcción segura de la tabla HTML
      let html = '<table class="cyber-comparison-table"><thead><tr><th>Característica</th>';
      
      selectedKeys.forEach(key => {
        const item = methodologiesData[key];
        if (item) {
          html += `<th>${item.nombre}</th>`;
        }
      });
      html += '</tr></thead><tbody>';

      // Rellenar filas de características
      tableAttributes.forEach(attr => {
        html += `<tr><td>${attr.label}</td>`;
        selectedKeys.forEach(key => {
          const item = methodologiesData[key];
          if (item) {
            html += `<td>${item[attr.key] || 'N/D'}</td>`;
          }
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      tableWrapper.innerHTML = html;

    } catch (error) {
      console.error("[QA Error Log]: Fallo en el renderizado dinámico de la tabla comparativa ->", error);
    }
  };

  // Registrar listeners de eventos de cambio en los checkboxes
  checkboxes.forEach(cb => {
    cb.addEventListener('change', renderComparisonTable);
  });

  // Renderizado inicial al cargar el DOM
  renderComparisonTable();

});