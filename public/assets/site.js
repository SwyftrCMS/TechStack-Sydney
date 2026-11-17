const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');

function setMenu(open) {
  menu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close menu' : 'Menu';
}

const desktop = matchMedia('(min-width: 64rem)');
function resetMenu() {
  menuToggle.hidden = desktop.matches;
  setMenu(desktop.matches);
}
resetMenu();
desktop.addEventListener('change', resetMenu);
menuToggle.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', event => {
  if (!desktop.matches && event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !desktop.matches && !menu.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});

for (const group of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...group.querySelectorAll('[role=tab]')];
  function select(current) {
    for (const tab of tabs) {
      const active = tab === current;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      const nextIndex = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      }[event.key];
      if (nextIndex === undefined) return;
      event.preventDefault();
      select(tabs[nextIndex]);
      tabs[nextIndex].focus();
    });
  });
}

for (const pillar of document.querySelectorAll('[data-steps]')) {
  const steps = [...pillar.querySelectorAll('button')];
  pillar.addEventListener('click', event => {
    const current = event.target.closest('button');
    if (!current) return;
    for (const step of steps) {
      const active = step === current;
      step.setAttribute('aria-pressed', String(active));
      step.querySelector('.step-copy').hidden = !active;
      document.getElementById(step.getAttribute('aria-controls')).hidden = !active;
    }
  });
}


const scrollHeader = document.querySelector('.site-header--scroll');
if (scrollHeader) {
  function updateScrollHeader() {
    scrollHeader.classList.toggle('is-scrolled', window.scrollY > 0);
  }
  updateScrollHeader();
  window.addEventListener('scroll', updateScrollHeader, { passive: true });
  window.addEventListener('pageshow', updateScrollHeader);
}

const hero = document.querySelector('.hero-frame');
if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pending = false;
  function updateHero() {
    const cardProgress = Math.min(Math.max(scrollY / 275, 0), 1);
    hero.style.setProperty('--hero-card-progress', String(cardProgress));
    pending = false;
  }
  function scheduleHeroUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateHero);
  }
  updateHero();
  addEventListener('scroll', scheduleHeroUpdate, { passive: true });
  addEventListener('resize', scheduleHeroUpdate);
}

const contact = document.querySelector('[data-contact]');
if (contact) initialiseContact(contact);

async function initialiseContact(form) {
  const status = document.querySelector('#form-status');
  const fields = form.querySelector('fieldset');
  const submit = form.querySelector('button[type=submit]');
  const demo = new URLSearchParams(location.search).get('enquiry') === 'demo';
  if (demo) form.elements.type.value = 'demo';

  let token = '';
  let sending = false;
  let widget;
  const updateToken = value => {
    token = value;
    submit.disabled = sending || !token;
  };

  try {
    const response = await fetch('/api/contact');
    if (!response.ok) return;
    const { siteKey } = await response.json();
    if (!siteKey) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
    widget = window.turnstile.render('#turnstile-widget', {
      sitekey: siteKey,
      action: 'enquiry',
      'response-field': false,
      callback: updateToken,
      'expired-callback': () => updateToken(''),
      'error-callback': () => updateToken('')
    });
    fields.disabled = false;
    status.textContent = 'Complete the security check before sending.';
  } catch {
    return;
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !token) return;
    const body = new URLSearchParams(new FormData(form));
    body.set('token', token);
    sending = true;
    updateToken(token);
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(form.action, { method: 'POST', body });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Unable to send your enquiry.');
      form.reset();
      if (demo) form.elements.type.value = 'demo';
      status.textContent = 'Your enquiry has been sent.';
    } catch (error) {
      status.textContent = error.message;
    } finally {
      sending = false;
      updateToken('');
      window.turnstile.reset(widget);
    }
  });
}

const processSection = document.getElementById('run');
if (processSection?.classList.contains('process')) {
  const phases = [...processSection.querySelectorAll('[data-process-step]')];
  const choices = [...processSection.querySelectorAll('[data-process-choice]')];
  const results = [...processSection.querySelectorAll('[data-process-result]')];
  const previewTitle = processSection.querySelector('[data-process-title]');
  const previewPhase = processSection.querySelector('[data-process-phase]');
  const diagram = processSection.querySelector('.process-diagram');

  processSection.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.dataset.processStep) {
      for (const phase of phases) {
        const active = phase === button;
        phase.setAttribute('aria-expanded', String(active));
        const description = phase.querySelector('small');
        if (description) description.hidden = !active;
        document.getElementById(phase.getAttribute('aria-controls')).hidden = !active;
      }
      previewTitle.textContent = button.querySelector('strong').textContent;
      previewPhase.textContent = button.dataset.processStep;
      return;
    }

    const { processChoice: group, value } = button.dataset;
    if (!group) return;
    for (const choice of choices) {
      if (choice.dataset.processChoice === group) {
        choice.setAttribute('aria-pressed', String(choice.dataset.value === value));
      }
    }
    for (const result of results) {
      if (result.dataset.processResult === group) result.hidden = result.dataset.value !== value;
    }
    if (group === 'layer') diagram.dataset.layer = value;
  });
}

const valueComparison = document.getElementById('why-choose-us');
if (valueComparison) {
  const filters = [...valueComparison.querySelectorAll('[data-value-filter]')];
  const rows = [...valueComparison.querySelectorAll('[data-value-group]')];
  const points = [...valueComparison.querySelectorAll('[data-value-point]')];
  let activePoint = null;

  function highlightPoint(id) {
    activePoint = id;
    for (const point of points) {
      point.setAttribute('aria-pressed', String(point.dataset.valuePoint === id));
    }
  }

  valueComparison.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const { valueFilter, valuePoint } = button.dataset;
    if (valueFilter) {
      for (const filter of filters) {
        filter.setAttribute('aria-pressed', String(filter === button));
      }
      for (const row of rows) {
        row.hidden = valueFilter !== 'all' && row.dataset.valueGroup !== valueFilter;
      }
      if (!rows.some(row => !row.hidden && row.firstElementChild.dataset.valuePoint === activePoint)) {
        highlightPoint(null);
      }
    }
    if (valuePoint) highlightPoint(activePoint === valuePoint ? null : valuePoint);
  });

  for (const point of points) point.disabled = false;
  valueComparison.querySelector('.value-filters').hidden = false;
}

const supportPreview = document.querySelector('.support-scale');
if (supportPreview) {
  const steps = [...supportPreview.querySelectorAll('[data-support-step]')];
  const panels = steps.map(step => document.getElementById(step.getAttribute('aria-controls')));
  const choices = [...supportPreview.querySelectorAll('[data-support-choice]')];
  const results = [...supportPreview.querySelectorAll('[data-support-result]')];
  const title = supportPreview.querySelector('[data-support-title]');
  const number = supportPreview.querySelector('[data-support-current]');
  const history = supportPreview.querySelector('.support-history');
  const composer = supportPreview.querySelector('.support-compose');
  const reply = composer.querySelector('input');
  let recent = [steps[0]];

  function selectSupportStep(step) {
    if (recent[0] === step) return;
    recent = [step, ...recent.filter(item => item !== step)];
    steps.forEach((item, index) => {
      const active = item === step;
      item.setAttribute('aria-expanded', String(active));
      item.querySelector('small').hidden = !active;
      panels[index].hidden = !active;
    });
    title.textContent = step.querySelector('strong').textContent;
    number.textContent = step.dataset.supportStep;
    history.replaceChildren(...recent.slice(1).map(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'process-choice support-choice';
      button.dataset.supportHistory = item.dataset.supportStep;
      button.textContent = item.dataset.supportStep + ' ' + item.querySelector('strong').textContent;
      return button;
    }));
    history.hidden = false;
  }

  function selectSupportChoice(group, value) {
    for (const choice of choices) {
      if (choice.dataset.supportChoice === group) {
        choice.setAttribute('aria-pressed', String(choice.dataset.supportValue === value));
      }
    }
    for (const result of results) {
      if (result.dataset.supportResult === group) result.hidden = result.dataset.supportValue !== value;
    }
  }

  supportPreview.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const { supportStep, supportHistory, supportChoice, supportValue } = button.dataset;
    if (supportStep || supportHistory) {
      const step = steps.find(item => item.dataset.supportStep === (supportStep || supportHistory));
      selectSupportStep(step);
      if (supportHistory) step.focus({ preventScroll: true });
    } else if (supportChoice) {
      selectSupportChoice(supportChoice, supportValue);
    } else if (button.hasAttribute('data-support-next')) {
      const flows = choices.filter(choice => choice.dataset.supportChoice === 'flow');
      const active = flows.findIndex(choice => choice.getAttribute('aria-pressed') === 'true');
      selectSupportChoice('flow', flows[(active + 1) % flows.length].dataset.supportValue);
    }
  });

  composer.addEventListener('submit', event => {
    event.preventDefault();
    const message = reply.value.trim();
    if (!message) return;
    const thread = results.find(result => result.dataset.supportResult === 'ticket' && !result.hidden)
      .querySelector('.support-thread');
    const item = document.createElement('li');
    const author = document.createElement('small');
    const body = document.createElement('p');
    item.className = 'support-message support-message-reply';
    author.textContent = 'You · Just now';
    body.textContent = message;
    item.append(author, body);
    thread.append(item);
    thread.scrollTop = thread.scrollHeight;
    composer.reset();
    reply.focus();
  });

  reply.disabled = false;
  composer.querySelector('button').disabled = false;
}
