const PROGRAMS = {
  'private-strength': {
    number: '01',
    title: 'Private Strength & Structural Conditioning',
    subtitle: '1-on-1 Coaching · Burleigh Heads Studio',
    description:
      'Individualised resistance training built around your joint mechanics, energy rhythm, and long-term bone density—without high-cortisol burnout.',
    formatSummary: '50-minute 1-on-1 studio sessions · 1× or 2× weekly',
    idealFor:
      'Women seeking measurable strength, neck and lower-back relief, and calm consistency in a private Burleigh Heads studio.',
    weeklyStructure: [
      '10 min joint preparation & diaphragmatic breath calibration',
      '30 min compound strength progressions (kettlebells, barbell, cables)',
      '10 min targeted mobility & parasympathetic down-regulation',
    ],
    locationNote: 'Suite 3, 14 Connor Street, Burleigh Heads (with optional home programming).',
  },
  'postpartum-rebuild': {
    number: '02',
    title: 'Postpartum & Pelvic Core Rebuild',
    subtitle: 'Studio or In-Home · Southern Gold Coast',
    description:
      'Breath-led core and pelvic floor restoration for mothers returning to movement—from six weeks postnatal through to years after birth.',
    formatSummary: '50-minute private sessions · Babies welcome in studio',
    idealFor:
      'New and experienced mothers across the Gold Coast wanting safe, confident progression back into coastal exercise.',
    weeklyStructure: [
      'Pelvic alignment & ribcage breath mechanics check-in',
      'Reformer and mat core integration under gentle resistance',
      'Practical daily posture & lifting cues for carrying little ones',
    ],
    locationNote: 'Available in Burleigh Heads studio or in-home from Miami to Currumbin.',
  },
  'perimenopause-wellbeing': {
    number: '03',
    title: 'Perimenopause & Coastal Wellbeing',
    subtitle: 'Strength, Mobility & Sleep Support',
    description:
      'Targeted strength loading paired with headland mobility and guided breath recovery for women navigating midlife sleep, energy, and joint shifts.',
    formatSummary: '12-week guided coaching · Studio + optional headland morning',
    idealFor:
      'Women in their 40s and 50s wanting steady energy, deeper restorative sleep, and resilient hips, knees, and shoulders.',
    weeklyStructure: [
      'Two 50-minute strength sessions focused on muscle & bone retention',
      'Optional Saturday 6:15 AM coastal mobility & breath session',
      'Simple 10-minute evening nervous-system reset routine at home',
    ],
    locationNote:
      'Burleigh Heads studio sessions paired with Burleigh Point & Currumbin headland mornings.',
  },
};

const TESTIMONIALS = [
  {
    quote:
      'After my second daughter, high-intensity classes left me exhausted and sore through my lower back. Twelve weeks with Sienna rebuilt my core confidence, cleared my hip pain, and got me back in the surf every morning.',
    name: 'Claire Henderson',
    context: 'Paediatric Physiotherapist · Palm Beach',
    outcome: '12 weeks · Pain-free 60 kg deadlift & 3× weekly morning surf',
    portraitSrc: '/previews/wisdom-wellbeing/src/assets/images/client_claire_portrait_1794917658959.jpg',
    portraitAlt:
      'Portrait of Claire Henderson smiling outdoors in morning coastal sunlight in Palm Beach, Gold Coast',
  },
  {
    quote:
      'Every session feels calm, deliberate, and completely tailored to how my week is actually going. Sienna never pushes for the sake of fatigue—yet I am visibly stronger at 48 than I was in my late twenties.',
    name: 'Naomi Callaghan',
    context: 'Architectural Designer · Mermaid Waters',
    outcome: '16 weeks · Full overhead shoulder mobility & 7.5 hrs steady sleep',
    portraitSrc: '/previews/wisdom-wellbeing/src/assets/images/client_naomi_portrait_1794917658916.jpg',
    portraitAlt:
      'Portrait of Naomi Callaghan in warm natural window light inside a serene coastal studio',
  },
  {
    quote:
      'Having a quiet private space in Burleigh where programming adapts around hospital shift work changed my relationship with exercise. Training feels grounding rather than another source of stress.',
    name: 'Tessa McKay',
    context: 'Emergency Nurse · Currumbin',
    outcome: '6 months · Unbroken 2× weekly consistency & +40% upper-body pull strength',
    portraitSrc: '/previews/wisdom-wellbeing/src/assets/images/client_tessa_portrait_1794917660379.jpg',
    portraitAlt:
      'Portrait of Tessa McKay smiling near Currumbin Creek greenery after a morning coastal walk',
  },
];

function createBotanicalFallback(captionText, altText) {
  const wrapper = document.createElement('div');
  wrapper.className = 'media-fallback';
  wrapper.setAttribute('role', 'img');
  wrapper.setAttribute('aria-label', altText || captionText);

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '28');
  svg.setAttribute('height', '28');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.25');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS(svgNS, 'path');
  path1.setAttribute(
    'd',
    'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z'
  );
  const path2 = document.createElementNS(svgNS, 'path');
  path2.setAttribute('d', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12');

  svg.appendChild(path1);
  svg.appendChild(path2);

  const title = document.createElement('p');
  title.className = 'media-fallback-title';
  title.textContent = captionText || altText || 'Sienna Vale Studio';

  wrapper.appendChild(svg);
  wrapper.appendChild(title);
  return wrapper;
}

function attachImageFallbacks() {
  const frames = document.querySelectorAll('[data-image-frame]');
  frames.forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img) return;

    img.addEventListener('error', () => {
      if (frame.querySelector('.media-fallback')) return;
      const caption = frame.getAttribute('data-caption') || '';
      const alt = img.getAttribute('alt') || '';
      img.hidden = true;
      frame.appendChild(createBotanicalFallback(caption, alt));
    });
  });
}

function initTestimonialCarousel() {
  let activeIndex = 0;

  const figure = document.getElementById('testimonial-figure');
  const img = document.getElementById('testimonial-img');
  const quoteEl = document.getElementById('testimonial-quote');
  const nameEl = document.getElementById('testimonial-name');
  const contextEl = document.getElementById('testimonial-context');
  const outcomeEl = document.getElementById('testimonial-outcome');
  const counterEl = document.getElementById('testimonial-counter');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!figure || !img || !quoteEl || !nameEl || !contextEl || !outcomeEl || !counterEl) {
    return;
  }

  function renderTestimonial(index) {
    const item = TESTIMONIALS[index];
    const existingFallback = figure.querySelector('.media-fallback');
    if (existingFallback) {
      existingFallback.remove();
    }
    img.hidden = false;
    figure.setAttribute('data-caption', item.name);
    img.src = item.portraitSrc;
    img.alt = item.portraitAlt;
    quoteEl.textContent = `“${item.quote}”`;
    nameEl.textContent = item.name;
    contextEl.textContent = item.context;
    outcomeEl.textContent = item.outcome;
    counterEl.textContent = `0${index + 1} / 0${TESTIMONIALS.length}`;
  }

  prevBtn?.addEventListener('click', () => {
    activeIndex = activeIndex === 0 ? TESTIMONIALS.length - 1 : activeIndex - 1;
    renderTestimonial(activeIndex);
  });

  nextBtn?.addEventListener('click', () => {
    activeIndex = activeIndex === TESTIMONIALS.length - 1 ? 0 : activeIndex + 1;
    renderTestimonial(activeIndex);
  });
}

function initModals() {
  const programModal = document.getElementById('program-modal');
  const programEyebrow = document.getElementById('program-modal-eyebrow');
  const programTitle = document.getElementById('program-modal-title');
  const programDesc = document.getElementById('program-modal-desc');
  const programFormat = document.getElementById('program-modal-format');
  const programIdeal = document.getElementById('program-modal-ideal');
  const programStructure = document.getElementById('program-modal-structure');
  const programLocation = document.getElementById('program-modal-location');
  const programBookBtn = document.getElementById('program-modal-book');

  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingError = document.getElementById('booking-error');
  const bookingConfirm = document.getElementById('booking-confirmation');
  const programSelect = document.getElementById('booking-program');
  const suburbSelect = document.getElementById('booking-suburb');
  const nameInput = document.getElementById('booking-name');
  const emailInput = document.getElementById('booking-email');
  const phoneInput = document.getElementById('booking-phone');
  const notesInput = document.getElementById('booking-notes');
  const confirmMessage = document.getElementById('confirm-message');
  const confirmProgram = document.getElementById('confirm-program');
  const confirmSuburb = document.getElementById('confirm-suburb');

  let activeProgramId = 'private-strength';
  let lastFocusedTrigger = null;

  function createCheckSvg() {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'icon-check');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.25');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M20 6 9 17l-5-5');
    svg.appendChild(path);
    return svg;
  }

  function openProgramModal(programId, triggerEl) {
    const program = PROGRAMS[programId];
    if (!program || !programModal) return;

    activeProgramId = programId;
    lastFocusedTrigger = triggerEl || document.activeElement;

    programEyebrow.textContent = `Program ${program.number} · ${program.subtitle}`;
    programTitle.textContent = program.title;
    programDesc.textContent = program.description;
    programFormat.textContent = program.formatSummary;
    programIdeal.textContent = program.idealFor;
    programLocation.textContent = program.locationNote;

    programStructure.innerHTML = '';
    program.weeklyStructure.forEach((step) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = step;
      li.appendChild(createCheckSvg());
      li.appendChild(span);
      programStructure.appendChild(li);
    });

    programModal.hidden = false;
    programModal.querySelector('[data-close-program]')?.focus();
  }

  function closeProgramModal(restoreFocus = true) {
    if (!programModal || programModal.hidden) return;
    programModal.hidden = true;
    if (restoreFocus && lastFocusedTrigger instanceof HTMLElement) {
      lastFocusedTrigger.focus();
    }
  }

  function openBookingModal(preselectedProgramId, triggerEl) {
    if (!bookingModal) return;
    closeProgramModal(false);
    lastFocusedTrigger = triggerEl || document.activeElement;

    if (preselectedProgramId && programSelect) {
      programSelect.value = preselectedProgramId;
    }

    if (bookingError) bookingError.hidden = true;
    if (bookingForm) bookingForm.hidden = false;
    if (bookingConfirm) bookingConfirm.hidden = true;

    bookingModal.hidden = false;
    nameInput?.focus();
  }

  function closeBookingModal() {
    if (!bookingModal || bookingModal.hidden) return;
    bookingModal.hidden = true;
    bookingForm?.reset();
    if (bookingError) bookingError.hidden = true;
    if (bookingForm) bookingForm.hidden = false;
    if (bookingConfirm) bookingConfirm.hidden = true;

    if (lastFocusedTrigger instanceof HTMLElement) {
      lastFocusedTrigger.focus();
    }
  }

  document.querySelectorAll('[data-explore-program]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const programId = btn.getAttribute('data-explore-program');
      if (programId) openProgramModal(programId, btn);
    });
  });

  document.querySelectorAll('[data-open-booking]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openBookingModal(undefined, btn);
    });
  });

  programBookBtn?.addEventListener('click', () => {
    openBookingModal(activeProgramId, programBookBtn);
  });

  document.querySelectorAll('[data-close-program]').forEach((btn) => {
    btn.addEventListener('click', () => closeProgramModal(true));
  });

  document.querySelectorAll('[data-close-booking]').forEach((btn) => {
    btn.addEventListener('click', () => closeBookingModal());
  });

  programModal?.addEventListener('click', (e) => {
    if (e.target === programModal) closeProgramModal(true);
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProgramModal(true);
      closeBookingModal();
    }
  });

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const selectedProgramId = programSelect?.value || 'private-strength';
    const selectedSuburb = suburbSelect?.value || 'Burleigh Heads';

    if (fullName.length < 2) {
      bookingError.textContent =
        'Please enter your full name so Sienna can address your enquiry personally.';
      bookingError.hidden = false;
      nameInput?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      bookingError.textContent = 'Please enter a valid email address.';
      bookingError.hidden = false;
      emailInput?.focus();
      return;
    }

    if (phone.replace(/\D/g, '').length < 8) {
      bookingError.textContent = 'Please enter a valid Australian mobile or contact number.';
      bookingError.hidden = false;
      phoneInput?.focus();
      return;
    }

    bookingError.hidden = true;
    const chosenProgram = PROGRAMS[selectedProgramId] || PROGRAMS['private-strength'];

    confirmMessage.textContent = `Thank you, ${fullName}. This was a demo. No consultation request was sent.`;
    confirmProgram.textContent = chosenProgram.title;
    confirmSuburb.textContent = `${selectedSuburb}, Gold Coast`;

    if (notesInput) notesInput.value = '';
    bookingForm.hidden = true;
    bookingConfirm.hidden = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachImageFallbacks();
  initTestimonialCarousel();
  initModals();
});
