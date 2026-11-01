/* ========================================================== */
/* SCRIPT DE HERRAMIENTAS Y PRÁCTICA (herramientas.js)        */
/* ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Control del Menú Lateral (Drawer Móvil) ---
  const menuToggle = document.getElementById('menuToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const navDrawer = document.getElementById('navDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
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
      drawerOverlay.classList.remove('active');
    });
  }

  // --- 2. Desplegable de Soluciones de Ejercicios ---
  const toggleButtons = document.querySelectorAll('.cyber-btn-toggle');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const solutionBox = document.getElementById(targetId);

      if (solutionBox) {
        if (solutionBox.style.display === 'none' || solutionBox.style.display === '') {
          solutionBox.style.display = 'block';
          btn.innerHTML = '<i class="fa-solid fa-code"></i> Ocultar Solución';
        } else {
          solutionBox.style.display = 'none';
          btn.innerHTML = '<i class="fa-solid fa-code"></i> Ver Solución Técnica';
        }
      }
    });
  });

  // --- 3. Lógica del Asistente / Wizard de Encuesta ---
  const surveyForm = document.getElementById('surveyForm');
  const steps = document.querySelectorAll('.wizard-step');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const stepIndicator = document.getElementById('stepIndicator');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressFill = document.getElementById('progressFill');
  const resultsContainer = document.getElementById('resultsContainer');
  const restartBtn = document.getElementById('restartBtn');

  let currentStep = 1;
  const totalSteps = steps.length;

  function updateWizard() {
    steps.forEach(step => {
      const stepNum = parseInt(step.getAttribute('data-step'));
      if (stepNum === currentStep) {
        step.style.display = 'block';
      } else {
        step.style.display = 'none';
      }
    });

    // Actualizar barra de progreso
    const percentage = (currentStep / totalSteps) * 100;
    if (stepIndicator) stepIndicator.textContent = `Paso ${currentStep} de ${totalSteps}`;
    if (progressPercentage) progressPercentage.textContent = `${Math.round(percentage)}% Completado`;
    if (progressFill) progressFill.style.width = `${percentage}%`;

    // Mostrar/Ocultar botón Anterior
    if (currentStep === 1) {
      if (prevBtn) prevBtn.style.display = 'none';
    } else {
      if (prevBtn) prevBtn.style.display = 'inline-flex';
    }

    // Cambiar texto del botón Siguiente en el último paso
    if (currentStep === totalSteps) {
      if (nextBtn) nextBtn.innerHTML = 'Calcular Resultados <i class="fa-solid fa-square-poll-vertical"></i>';
    } else {
      if (nextBtn) nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Validar que se haya seleccionado una opción en el paso actual
      const currentStepEl = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
      const selectedOption = currentStepEl.querySelector('input[type="radio"]:checked');

      if (!selectedOption) {
        alert('Por favor, selecciona una opción antes de continuar.');
        return;
      }

      if (currentStep < totalSteps) {
        currentStep++;
        updateWizard();
        window.scrollTo({ top: surveyForm.offsetTop - 100, behavior: 'smooth' });
      } else {
        // Fin de la encuesta: Calcular resultados y mostrar comparador
        calcularResultados();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizard();
        window.scrollTo({ top: surveyForm.offsetTop - 100, behavior: 'smooth' });
      }
    });
  }

  function calcularResultados() {
    const formData = new FormData(surveyForm);
    let scores = { scrum: 0, kanban: 0, cascada: 0, modelov: 0 };

    for (let value of formData.values()) {
      if (scores[value] !== undefined) {
        scores[value] += 25; // Cada una de las 4 preguntas aporta hasta un 25% si coincide
      }
    }

    // Ocultar formulario y mostrar contenedor de resultados
    if (surveyForm) surveyForm.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'block';

    // Rellenar barras animadas
    document.getElementById('scoreScrum').textContent = `${scores.scrum}%`;
    document.getElementById('scoreKanban').textContent = `${scores.kanban}%`;
    document.getElementById('scoreCascada').textContent = `${scores.cascada}%`;
    document.getElementById('scoreModeloV').textContent = `${scores.modelov}%`;

    setTimeout(() => {
      document.getElementById('fillScrum').style.width = `${scores.scrum}%`;
      document.getElementById('fillKanban').style.width = `${scores.kanban}%`;
      document.getElementById('fillCascada').style.width = `${scores.cascada}%`;
      document.getElementById('fillModeloV').style.width = `${scores.modelov}%`;
    }, 150);

    // Determinar ganador
    let ganador = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const winnerTitle = document.getElementById('winnerTitle');
    const winnerDesc = document.getElementById('winnerDesc');

    const descripciones = {
      scrum: {
        title: "Scrum Framework",
        desc: "Ideal para tu proyecto debido a la flexibilidad de requisitos, entregas iterativas en Sprints cortos y alta colaboración autónoma del equipo."
      },
      kanban: {
        title: "Método Kanban",
        desc: "Se alinea perfectamente con flujos continuos, gestión visual de tareas y control riguroso de cuellos de botella mediante límites WIP."
      },
      cascada: {
        title: "Modelo en Cascada",
        desc: "Adecuado para proyectos altamente regulados con requisitos estrictos, previsibles y una secuencia estructurada por fases cerradas."
      },
      modelov: {
        title: "Modelo en V",
        desc: "Perfecto para entornos donde la verificación y validación de pruebas en paralelo son cruciales para mitigar riesgos técnicos complejos."
      }
    };

    if (winnerTitle && winnerDesc && descripciones[ganador]) {
      winnerTitle.textContent = descripciones[ganador].title;
      winnerDesc.textContent = descripciones[ganador].desc;
    }

    window.scrollTo({ top: resultsContainer.offsetTop - 100, behavior: 'smooth' });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      surveyForm.reset();
      currentStep = 1;
      if (resultsContainer) resultsContainer.style.display = 'none';
      if (surveyForm) surveyForm.style.display = 'block';
      
      // Resetear barras
      ['fillScrum', 'fillKanban', 'fillCascada', 'fillModeloV'].forEach(id => {
        document.getElementById(id).style.width = '0%';
      });

      updateWizard();
      window.scrollTo({ top: surveyForm.offsetTop - 100, behavior: 'smooth' });
    });
  }

});