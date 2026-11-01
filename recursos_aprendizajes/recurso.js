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

  // 2. Buscador y Filtro A-Z del Glosario
  const glossarySearch = document.getElementById('glossarySearch');
  const clearSearch = document.getElementById('clearSearch');
  const alphaBtns = document.querySelectorAll('.alpha-btn');
  const glossaryGroups = document.querySelectorAll('.glossary-group');
  const noResults = document.getElementById('noResults');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  function filterGlossary(query = '', letter = 'all') {
    const q = query.toLowerCase().trim();
    let totalVisible = 0;

    glossaryGroups.forEach(group => {
      const groupLetter = group.getAttribute('data-group');
      const termCards = group.querySelectorAll('.term-card');
      let groupHasVisible = false;

      const matchLetter = (letter === 'all' || groupLetter === letter);

      termCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const tag = card.querySelector('.term-tag').textContent.toLowerCase();

        const matchQuery = (title.includes(q) || desc.includes(q) || tag.includes(q));

        if (matchLetter && matchQuery) {
          card.style.display = 'flex';
          groupHasVisible = true;
          totalVisible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (groupHasVisible) {
        group.style.display = 'block';
      } else {
        group.style.display = 'none';
      }
    });

    if (totalVisible === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }

    if (q.length > 0) {
      clearSearch.style.display = 'block';
    } else {
      clearSearch.style.display = 'none';
    }
  }

  if (glossarySearch) {
    glossarySearch.addEventListener('input', (e) => {
      const activeAlpha = document.querySelector('.alpha-btn.active').getAttribute('data-letter');
      filterGlossary(e.target.value, activeAlpha);
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      glossarySearch.value = '';
      const activeAlpha = document.querySelector('.alpha-btn.active').getAttribute('data-letter');
      filterGlossary('', activeAlpha);
    });
  }

  alphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alphaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const letter = btn.getAttribute('data-letter');
      const query = glossarySearch.value;
      filterGlossary(query, letter);
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      glossarySearch.value = '';
      alphaBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('.alpha-btn[data-letter="all"]').classList.add('active');
      filterGlossary('', 'all');
    });
  }

  // 3. Acordeón FAQ
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.parentElement;
      const answerWrapper = btn.nextElementSibling;
      const isOpen = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer-wrapper').style.maxHeight = null;
        item.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Toggle para Soluciones de Casos Prácticos (US-15)
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

  // 5. Lógica del Wizard / Encuesta Metodológica y Comparador (Scrum, Kanban, Cascada, Modelo en V)
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