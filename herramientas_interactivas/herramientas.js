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

  /* =========================================
     US-18: COMPARADOR DE METODOLOGÍAS
     ========================================= */
  const metodologiasDB = {
    scrum: {
      nombre: "Scrum",
      enfoque: "Iterativo e Incremental (Ágil)",
      flexibilidad: "Alta (Adaptación por Sprints)",
      roles: "Scrum Master, Product Owner, Developers",
      entrega: "Entregables funcionales cada 1-4 semanas",
      idealPara: "Proyectos complejos con requisitos cambiantes."
    },
    kanban: {
      nombre: "Kanban",
      enfoque: "Flujo Continuo (Ágil)",
      flexibilidad: "Muy Alta (Cambios en cualquier momento)",
      roles: "No prescribe roles estrictos",
      entrega: "Entrega continua, tarea por tarea",
      idealPara: "Mantenimiento, soporte y gestión de cuellos de botella."
    },
    xp: {
      nombre: "eXtreme Programming (XP)",
      enfoque: "Iterativo enfocado en código (Ágil)",
      flexibilidad: "Alta (Diseño simple y refactorización)",
      roles: "Cliente, Programadores, Tracker, Coach",
      entrega: "Entregas muy frecuentes y pequeñas",
      idealPara: "Proyectos de alto riesgo técnico y calidad estricta."
    },
    cascada: {
      nombre: "Cascada (Waterfall)",
      enfoque: "Secuencial y Lineal (Tradicional)",
      flexibilidad: "Baja (Difícil volver a fases anteriores)",
      roles: "Project Manager, Analistas, Desarrolladores, QA",
      entrega: "Una única entrega al final del proyecto",
      idealPara: "Requisitos 100% claros, fijos y sin cambios."
    },
    incremental: {
      nombre: "Modelo Incremental",
      enfoque: "Módulos secuenciales sucesivos (Tradicional)",
      flexibilidad: "Media (Permite cambios entre incrementos)",
      roles: "Roles tradicionales de ingeniería de software",
      entrega: "Entregas parciales funcionales por incrementos",
      idealPara: "Proyectos grandes donde se requiere valor temprano."
    }
  };

  const checkboxes = document.querySelectorAll('#methodology-selectors input[type="checkbox"]');
  const tablaComparativa = document.getElementById('tabla-comparativa');
  const tablaHead = document.getElementById('tabla-head');
  const tablaBody = document.getElementById('tabla-body');
  const mensajeAlerta = document.getElementById('comparador-mensaje');

  const caracteristicas = [
    { clave: 'enfoque', label: 'Enfoque Principal' },
    { clave: 'flexibilidad', label: 'Flexibilidad a Cambios' },
    { clave: 'roles', label: 'Roles Definidos' },
    { clave: 'entrega', label: 'Frecuencia de Entrega' },
    { clave: 'idealPara', label: 'Ideal Para' }
  ];

  function actualizarTabla() {
    const seleccionados = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    tablaHead.innerHTML = '';
    tablaBody.innerHTML = '';

    if (seleccionados.length < 2) {
      tablaComparativa.classList.add('tabla-oculta');
      mensajeAlerta.style.display = 'block';
      return;
    }

    tablaComparativa.classList.remove('tabla-oculta');
    mensajeAlerta.style.display = 'none';

    // Renderizar Headers
    let trHead = '<th>Característica</th>';
    seleccionados.forEach(id => {
      trHead += `<th>${metodologiasDB[id].nombre}</th>`;
    });
    tablaHead.innerHTML = trHead;

    // Renderizar Filas
    caracteristicas.forEach(caract => {
      let tr = `<td><strong>${caract.label}</strong></td>`;
      seleccionados.forEach(id => {
        tr += `<td>${metodologiasDB[id][caract.clave]}</td>`;
      });
      const fila = document.createElement('tr');
      fila.innerHTML = tr;
      tablaBody.appendChild(fila);
    });
  }

  checkboxes.forEach(cb => cb.addEventListener('change', actualizarTabla));


  /* =========================================
     US-19: ENCUESTA WIZARD (Algoritmo de Selección)
     ========================================= */
  const preguntas = [
    {
      pregunta: "¿Cómo están definidos los requisitos iniciales del proyecto?",
      opciones: [
        { texto: "Claros, fijos y estables desde el día 1, no van a cambiar.", puntaje: { cascada: 3, incremental: 1 } },
        { texto: "Conocemos lo básico, pero irán evolucionando por fases/módulos.", puntaje: { incremental: 3, scrum: 1 } },
        { texto: "Muy cambiantes, el cliente descubrirá los detalles sobre la marcha.", puntaje: { scrum: 3, xp: 2 } },
        { texto: "Es un flujo continuo de solicitudes variadas sin un alcance cerrado.", puntaje: { kanban: 3 } }
      ]
    },
    {
      pregunta: "¿Con qué frecuencia necesitas entregar software funcional?",
      opciones: [
        { texto: "Al finalizar todo el proyecto de forma global.", puntaje: { cascada: 3 } },
        { texto: "Cada vez que terminamos un módulo grande e independiente.", puntaje: { incremental: 3 } },
        { texto: "Cada 2 a 4 semanas de manera regular (Sprints).", puntaje: { scrum: 3, xp: 1 } },
        { texto: "De manera continua, apenas se termina una tarea se despliega.", puntaje: { kanban: 3, xp: 2 } }
      ]
    },
    {
      pregunta: "¿Cómo está conformado o estructurado el equipo de trabajo?",
      opciones: [
        { texto: "Departamentos separados (Diseño, Dev, QA operan en fases secuenciales).", puntaje: { cascada: 3, incremental: 1 } },
        { texto: "Equipo auto-organizado, colaborativo y multidisciplinario.", puntaje: { scrum: 3, xp: 2 } },
        { texto: "Equipo enfocado en resolver tareas diarias y eliminar cuellos de botella.", puntaje: { kanban: 3 } },
        { texto: "Desarrolladores muy técnicos enfocados en pruebas unitarias y calidad de código.", puntaje: { xp: 3 } }
      ]
    }
  ];

  let pasoActual = 0;
  const puntajesAcumulados = { scrum: 0, kanban: 0, xp: 0, cascada: 0, incremental: 0 };

  const quizContainer = document.getElementById('quiz-container');
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const progressBar = document.getElementById('progress-bar');
  const quizResult = document.getElementById('quiz-result');

  function renderizarEncuesta() {
    quizContainer.innerHTML = '';
    preguntas.forEach((q, qIndex) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = `quiz-step ${qIndex === pasoActual ? 'active' : ''}`;
      stepDiv.id = `step-${qIndex}`;

      let html = `<h3>Pregunta ${qIndex + 1} de ${preguntas.length}: ${q.pregunta}</h3>`;
      q.opciones.forEach((opc, oIndex) => {
        html += `
          <label class="opcion-respuesta">
            <input type="radio" name="p${qIndex}" value="${oIndex}">
            ${opc.texto}
          </label>
        `;
      });
      stepDiv.innerHTML = html;
      quizContainer.appendChild(stepDiv);
    });

    quizContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', actualizarBotones);
    });
  }

  function actualizarBotones() {
    const radiosActuales = document.querySelectorAll(`input[name="p${pasoActual}"]:checked`);
    btnNext.disabled = radiosActuales.length === 0;
    btnPrev.disabled = pasoActual === 0;

    if (pasoActual === preguntas.length - 1) {
      btnNext.innerHTML = 'Finalizar y Ver Resultado <i class="fa-solid fa-flag-checkered"></i>';
    } else {
      btnNext.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }

    progressBar.style.width = `${((pasoActual) / preguntas.length) * 100}%`;
  }

  btnNext.addEventListener('click', () => {
    const seleccion = document.querySelector(`input[name="p${pasoActual}"]:checked`).value;
    const puntajesOpcion = preguntas[pasoActual].opciones[seleccion].puntaje;
    
    for (let met in puntajesOpcion) {
      puntajesAcumulados[met] += puntajesOpcion[met];
    }

    if (pasoActual < preguntas.length - 1) {
      document.getElementById(`step-${pasoActual}`).classList.remove('active');
      pasoActual++;
      document.getElementById(`step-${pasoActual}`).classList.add('active');
      actualizarBotones();
    } else {
      progressBar.style.width = '100%';
      mostrarResultado();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (pasoActual > 0) {
      const seleccionPrevia = document.querySelector(`input[name="p${pasoActual-1}"]:checked`).value;
      const puntajesOpcion = preguntas[pasoActual-1].opciones[seleccionPrevia].puntaje;
      for (let met in puntajesOpcion) {
        puntajesAcumulados[met] -= puntajesOpcion[met];
      }

      document.getElementById(`step-${pasoActual}`).classList.remove('active');
      pasoActual--;
      document.getElementById(`step-${pasoActual}`).classList.add('active');
      actualizarBotones();
    }
  });

  function mostrarResultado() {
    quizContainer.style.display = 'none';
    document.querySelector('.wizard-controls').style.display = 'none';
    quizResult.classList.remove('oculto');

    const maxPuntosPosibles = preguntas.length * 3; 
    let ganador = '';
    let maxPuntaje = 0;

    const barrasContenedor = document.getElementById('resultado-barras');
    barrasContenedor.innerHTML = '';

    const puntajesArray = Object.entries(puntajesAcumulados).sort((a, b) => b[1] - a[1]);

    puntajesArray.forEach(([met, puntaje]) => {
      if (puntaje > maxPuntaje) {
        maxPuntaje = puntaje;
        ganador = met;
      }
      
      let porcentaje = Math.round((puntaje / maxPuntosPosibles) * 100);
      let nombreCapitalizado = metodologiasDB[met].nombre;

      barrasContenedor.innerHTML += `
        <div class="resultado-item">
          <div class="resultado-label">
            <span>${nombreCapitalizado}</span>
            <span>${porcentaje}% Match</span>
          </div>
          <div class="resultado-track">
            <div class="resultado-fill" style="width: 0%;" data-width="${porcentaje}%"></div>
          </div>
        </div>
      `;
    });

    document.getElementById('resultado-texto').innerHTML = `
      Basado en tus respuestas, la metodología más recomendada y compatible con tu proyecto es: 
      <strong style="color: var(--accent-cyan);">${metodologiasDB[ganador].nombre}</strong>.
    `;

    setTimeout(() => {
      document.querySelectorAll('.resultado-fill').forEach(fill => {
        fill.style.width = fill.getAttribute('data-width');
      });
    }, 100);
  }

  document.getElementById('btn-reiniciar').addEventListener('click', () => {
    pasoActual = 0;
    for (let met in puntajesAcumulados) puntajesAcumulados[met] = 0;
    
    quizContainer.style.display = 'block';
    document.querySelector('.wizard-controls').style.display = 'flex';
    quizResult.classList.add('oculto');
    
    renderizarEncuesta();
    actualizarBotones();
    progressBar.style.width = '0%';
  });

  renderizarEncuesta();
  actualizarBotones();
});