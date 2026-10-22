/* ========================================================== */
/* LÓGICA DEL ASISTENTE WIZARD Y ALGORITMO DE PUNTAJE (encuesta.js) */
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

  // --- Control del Wizard y Formulario ---
  const steps = document.querySelectorAll('.wizard-step');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const stepIndicator = document.getElementById('stepIndicator');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressFill = document.getElementById('progressFill');
  const surveyForm = document.getElementById('surveyForm');
  const wizardFormContainer = document.getElementById('surveyForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const restartBtn = document.getElementById('restartBtn');

  let currentStep = 0;
  const totalSteps = steps.length;

  // Función para actualizar la interfaz visual del Wizard
  const updateWizardUI = () => {
    steps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Indicador y barra de progreso
    const progressVal = ((currentStep + 1) / totalSteps) * 100;
    stepIndicator.textContent = `Paso ${currentStep + 1} de ${totalSteps}`;
    progressPercentage.textContent = `${Math.round(progressVal)}% Completado`;
    progressFill.style.width = `${progressVal}%`;

    // Botones de navegación
    if (currentStep === 0) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'inline-flex';
    }

    if (currentStep === totalSteps - 1) {
      nextBtn.innerHTML = 'Ver Resultados <i class="fa-solid fa-square-poll-vertical"></i>';
    } else {
      nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }
  };

  // Validación de opción seleccionada en el paso actual
  const validateCurrentStep = () => {
    const activeStepElement = steps[currentStep];
    const selectedRadio = activeStepElement.querySelector('input[type="radio"]:checked');
    return selectedRadio !== null;
  };

  // Botón Siguiente
  nextBtn.addEventListener('click', () => {
    if (!validateCurrentStep()) {
      alert('⚠️ [ALERTA QA]: Debes seleccionar una opción para continuar con el análisis.');
      return;
    }

    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateWizardUI();
    } else {
      // Ejecutar Algoritmo de Cómputo de Puntaje
      calculateResults();
    }
  });

  // Botón Anterior
  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateWizardUI();
    }
  });

  // --- Algoritmo de Cómputo de Puntaje ---
  const calculateResults = () => {
    try {
      const formData = new FormData(surveyForm);
      let scores = { scrum: 0, kanban: 0, cascada: 0 };

      // Evaluar respuestas seleccionadas
      for (let [key, value] of formData.entries()) {
        if (scores.hasOwnProperty(value)) {
          scores[value] += 1;
        }
      }

      // Calcular porcentajes sobre 4 preguntas totales
      const totalQuestions = totalSteps;
      let percentages = {
        scrum: Math.round((scores.scrum / totalQuestions) * 100),
        kanban: Math.round((scores.kanban / totalQuestions) * 100),
        cascada: Math.round((scores.cascada / totalQuestions) * 100)
      };

      // Renderizar resultados en pantalla
      displayResults(percentages);

    } catch (error) {
      console.error("[QA Error Log]: Fallo en la ejecución del algoritmo de puntaje ->", error);
    }
  };

  // Mostrar Resumen Dinámico
  const displayResults = (percentages) => {
    wizardFormContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Asignar valores a las barras
    document.getElementById('scoreScrum').textContent = `${percentages.scrum}%`;
    document.getElementById('fillScrum').style.width = `${percentages.scrum}%`;

    document.getElementById('scoreKanban').textContent = `${percentages.kanban}%`;
    document.getElementById('fillKanban').style.width = `${percentages.kanban}%`;

    document.getElementById('scoreCascada').textContent =`${percentages.cascada}%`;
    document.getElementById('fillCascada').style.width = `${percentages.cascada}%`;

    // Determinar metodología ganadora
    let winner = 'scrum';
    let maxScore = percentages.scrum;

    if (percentages.kanban > maxScore) {
      winner = 'kanban';
      maxScore = percentages.kanban;
    }
    if (percentages.cascada > maxScore) {
      winner = 'cascada';
      maxScore = percentages.cascada;
    }

    const winnerTitle = document.getElementById('winnerTitle');
    const winnerDesc = document.getElementById('winnerDesc');

    if (winner === 'scrum') {
      winnerTitle.textContent = "SCRUM (Alta Coincidencia)";
      winnerDesc.textContent = "Tu proyecto presenta requisitos dinámicos, entregas iterativas frecuentes y equipos auto-organizados. Scrum es el marco ideal para maximizar la adaptabilidad y el valor continuo.";
    } else if (winner === 'kanban') {
      winnerTitle.textContent = "KANBAN (Alta Coincidencia)";
      winnerDesc.textContent = "Tus respuestas reflejan un flujo de trabajo continuo, gestión de tareas operativas y necesidad de controlar límites WIP para eliminar cuellos de botella.";
    } else {
      winnerTitle.textContent = "MODELO EN CASCADA (Alta Coincidencia)";
      winnerDesc.textContent = "El proyecto describe requisitos rígidos, alta criticidad y fases secuenciales estrictas. Los modelos tradicionales garantizan control documental y estabilidad ante bajo margen de error.";
    }
  };

  // Botón Reiniciar Encuesta
  restartBtn.addEventListener('click', () => {
    surveyForm.reset();
    currentStep = 0;
    resultsContainer.style.display = 'none';
    wizardFormContainer.style.display = 'block';
    updateWizardUI();
  });

  // Inicialización
  updateWizardUI();

});