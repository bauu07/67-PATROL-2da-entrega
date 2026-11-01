document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle del Menú Lateral (Drawer)
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

  // 2. Toggle para ver solución de Casos Prácticos (US-15)
  const toggleBtns = document.querySelectorAll('.cyber-btn-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const solutionBox = document.getElementById(targetId);
      
      if (solutionBox.style.display === 'none') {
        solutionBox.style.display = 'block';
        btn.innerHTML = '<i class="fa-solid fa-code"></i> Ocultar Solución Técnica';
      } else {
        solutionBox.style.display = 'none';
        btn.innerHTML = '<i class="fa-solid fa-code"></i> Ver Solución Técnica';
      }
    });
  });

  // 3. Lógica del Wizard / Encuesta Metodológica y Comparador
  const steps = document.querySelectorAll('.wizard-step');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const surveyForm = document.getElementById('surveyForm');
  const resultsContainer = document.getElementById('resultsContainer');
  const stepIndicator = document.getElementById('stepIndicator');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressFill = document.getElementById('progressFill');
  const restartBtn = document.getElementById('restartBtn');

  let currentStep = 0;
  const totalSteps = steps.length;

  function updateWizard() {
    steps.forEach((step, index) => {
      step.style.display = (index === currentStep) ? 'block' : 'none';
    });

    if (prevBtn) prevBtn.style.display = (currentStep === 0) ? 'none' : 'block';

    if (nextBtn) {
      if (currentStep === totalSteps - 1) {
        nextBtn.innerHTML = 'Ver Comparativa <i class="fa-solid fa-check"></i>';
      } else {
        nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
      }
    }

    const progress = ((currentStep + 1) / totalSteps) * 100;
    if (stepIndicator) stepIndicator.textContent = `Paso ${currentStep + 1} de ${totalSteps}`;
    if (progressPercentage) progressPercentage.textContent = `${Math.round(progress)}% Completado`;
    if (progressFill) progressFill.style.width = `${progress}%`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const currentStepEl = steps[currentStep];
      const selectedRadio = currentStepEl.querySelector('input[type="radio"]:checked');

      if (!selectedRadio) {
        alert('Por favor selecciona una opción antes de continuar.');
        return;
      }

      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateWizard();
      } else {
        calculateResults();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateWizard();
      }
    });
  }

  function calculateResults() {
    const formData = new FormData(surveyForm);
    let counts = { scrum: 0, kanban: 0, cascada: 0, modelov: 0 };

    for (let value of formData.values()) {
      if (counts[value] !== undefined) {
        counts[value]++;
      }
    }

    const totalAnswers = totalSteps;
    let scrumPct = Math.round((counts.scrum / totalAnswers) * 100);
    let kanbanPct = Math.round((counts.kanban / totalAnswers) * 100);
    let cascadaPct = Math.round((counts.cascada / totalAnswers) * 100);
    let modelovPct = Math.round((counts.modelov / totalAnswers) * 100);

    if (surveyForm) surveyForm.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'block';

    const scoreScrum = document.getElementById('scoreScrum');
    const scoreKanban = document.getElementById('scoreKanban');
    const scoreCascada = document.getElementById('scoreCascada');
    const scoreModeloV = document.getElementById('scoreModeloV');
    const fillScrum = document.getElementById('fillScrum');
    const fillKanban = document.getElementById('fillKanban');
    const fillCascada = document.getElementById('fillCascada');
    const fillModeloV = document.getElementById('fillModeloV');

    if (scoreScrum) scoreScrum.textContent = `${scrumPct}%`;
    if (scoreKanban) scoreKanban.textContent = `${kanbanPct}%`;
    if (scoreCascada) scoreCascada.textContent = `${cascadaPct}%`;
    if (scoreModeloV) scoreModeloV.textContent = `${modelovPct}%`;

    if (fillScrum) fillScrum.style.width = `${scrumPct}%`;
    if (fillKanban) fillKanban.style.width = `${kanbanPct}%`;
    if (fillCascada) fillCascada.style.width = `${cascadaPct}%`;
    if (fillModeloV) fillModeloV.style.width = `${modelovPct}%`;

    let winner = 'Scrum';
    let maxVal = scrumPct;
    let desc = 'Tu proyecto se adapta perfectamente a Sprints iterativos, roles definidos y entregas periódicas de valor al usuario.';

    if (kanbanPct > maxVal) {
      winner = 'Kanban';
      maxVal = kanbanPct;
      desc = 'Tu proyecto requiere un flujo continuo y optimización de cuellos de botella mediante límites WIP sin iteraciones rígidas.';
    }
    if (cascadaPct > maxVal) {
      winner = 'Modelo en Cascada';
      maxVal = cascadaPct;
      desc = 'Tu proyecto presenta alta criticidad y requisitos estrictos estables, requiriendo un enfoque secuencial documentado.';
    }
    if (modelovPct > maxVal) {
      winner = 'Modelo en V';
      maxVal = modelovPct;
      desc = 'Tu proyecto requiere un alto rigor técnico y estructuración formal, asociando cada fase de diseño de ingeniería con su respectivo nivel de pruebas de verificación y validación (QA).';
    }

    const winnerTitle = document.getElementById('winnerTitle');
    const winnerDesc = document.getElementById('winnerDesc');
    if (winnerTitle) winnerTitle.textContent = winner;
    if (winnerDesc) winnerDesc.textContent = desc;
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      surveyForm.reset();
      surveyForm.style.display = 'block';
      resultsContainer.style.display = 'none';
      currentStep = 0;
      updateWizard();
    });
  }

  updateWizard();
});