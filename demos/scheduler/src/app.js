// Pure Vanilla JavaScript — Zero external frameworks or third-party libraries

import demoData from './data/demo-data.json';
import '@fontsource-variable/lexend-deca/wght.css';

let state = structuredClone(demoData);

// DOM Elements
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');
const brandHomeBtn = document.getElementById('brand-home-btn');
const profileBtn = document.getElementById('profile-btn');
const profileDropdown = document.getElementById('profile-dropdown');
const notificationsBtn = document.getElementById('notifications-btn');
const notificationsDropdown = document.getElementById('notifications-dropdown');
const notifListEl = document.getElementById('notif-list');
const notifCountEl = document.getElementById('notif-count');
const markAllReadBtn = document.getElementById('mark-all-read-btn');
const sheetBackdrop = document.getElementById('sheet-backdrop');
const bottomSheet = document.getElementById('bottom-sheet');
const sheetTitle = document.getElementById('sheet-title');
const sheetBody = document.getElementById('sheet-body');
const sheetCloseBtn = document.getElementById('sheet-close-btn');
const toastEl = document.getElementById('toast');

let toastTimer = null;

// Helpers
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(num) {
  return '$' + Number(num).toLocaleString('en-US');
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2400);
}

function getStatusClass(status) {
  if (status === 'Completed') return 'completed';
  if (status === 'In Progress') return 'in-progress';
  return 'scheduled';
}

function chevronSvg() {
  return `<svg class="row-chevron" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`;
}

// Inline Pure SVG Sparkline & Bar Charts
function paidSparklineSvg() {
  return `
    <svg class="kpi-graph" viewBox="0 0 140 36" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="paidAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4F9CF9" stop-opacity="0.32" />
          <stop offset="100%" stop-color="#4F9CF9" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <path d="M0 30 L22 25 L46 27 L70 16 L94 19 L118 8 L140 4 L140 36 L0 36 Z" fill="url(#paidAreaGrad)" />
      <path d="M0 30 L22 25 L46 27 L70 16 L94 19 L118 8 L140 4" stroke="#4F9CF9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="140" cy="4" r="3" fill="#FFFFFF" />
    </svg>`;
}

function unpaidBarsSvg() {
  return `
    <svg class="kpi-graph" viewBox="0 0 140 36" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <rect x="4" y="18" width="18" height="18" rx="4" fill="rgba(255,255,255,0.16)" />
      <rect x="31" y="10" width="18" height="26" rx="4" fill="rgba(255,255,255,0.24)" />
      <rect x="58" y="22" width="18" height="14" rx="4" fill="rgba(255,255,255,0.16)" />
      <rect x="85" y="14" width="18" height="22" rx="4" fill="rgba(255,255,255,0.28)" />
      <rect x="112" y="6" width="18" height="30" rx="4" fill="#4F9CF9" />
    </svg>`;
}

// Popovers (Profile Dropdown & Notifications)
function closeAllDropdowns() {
  if (profileDropdown) {
    profileDropdown.hidden = true;
    profileBtn?.setAttribute('aria-expanded', 'false');
  }
  if (notificationsDropdown) {
    notificationsDropdown.hidden = true;
    notificationsBtn?.setAttribute('aria-expanded', 'false');
  }
}

function renderNotifications() {
  const unreadCount = state.notifications.filter((n) => n.unread).length;
  if (notifCountEl) {
    notifCountEl.textContent = String(unreadCount);
    notifCountEl.hidden = unreadCount === 0;
  }
  if (notifListEl) {
    notifListEl.innerHTML = state.notifications
      .map(
        (item) => `
      <div class="notif-item ${item.unread ? 'unread' : ''}">
        <div class="notif-item-title">${escapeHtml(item.title)}</div>
        <div class="notif-item-meta">${escapeHtml(item.time)}</div>
      </div>`
      )
      .join('');
  }
}

profileBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isHidden = profileDropdown.hidden;
  closeAllDropdowns();
  profileDropdown.hidden = !isHidden;
  profileBtn.setAttribute('aria-expanded', String(!profileDropdown.hidden));
});

// Profile dropdown selections explicitly do nothing as specified
profileDropdown?.addEventListener('click', (e) => {
  const item = e.target.closest('.dropdown-item');
  if (item) {
    e.stopPropagation();
  }
});

notificationsBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isHidden = notificationsDropdown.hidden;
  closeAllDropdowns();
  notificationsDropdown.hidden = !isHidden;
  notificationsBtn.setAttribute('aria-expanded', String(!notificationsDropdown.hidden));
});

notificationsDropdown?.addEventListener('click', (e) => {
  e.stopPropagation();
});

markAllReadBtn?.addEventListener('click', () => {
  state.notifications.forEach((n) => {
    n.unread = false;
  });
  renderNotifications();
  showToast('Notifications marked read');
});

document.addEventListener('click', () => {
  closeAllDropdowns();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllDropdowns();
    closeSheet();
  }
});

// Bottom Sheet Controls
function openSheet(title, htmlContent) {
  closeAllDropdowns();
  sheetTitle.textContent = title;
  sheetBody.innerHTML = htmlContent;
  sheetBackdrop.hidden = false;
  bottomSheet.hidden = false;
  sheetCloseBtn?.focus();
}

function closeSheet() {
  if (!bottomSheet || bottomSheet.hidden) return;
  sheetBackdrop.hidden = true;
  bottomSheet.hidden = true;
  sheetBody.innerHTML = '';
}

sheetBackdrop?.addEventListener('click', closeSheet);
sheetCloseBtn?.addEventListener('click', closeSheet);

// Tab Ordering for Directional Woosh
const TAB_ORDER = {
  home: 0,
  contacts: 1,
  calendar: 2,
  leads: 3,
};

let outgoingCleanupTimer = null;

// Tab Switching
function setTab(tabName) {
  if (state.activeTab === tabName) return;
  const prevIndex = TAB_ORDER[state.activeTab] ?? 0;
  const nextIndex = TAB_ORDER[tabName] ?? 0;
  const direction = nextIndex >= prevIndex ? 1 : -1;

  state.activeTab = tabName;
  closeAllDropdowns();
  navItems.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });
  renderView({ wooshDirection: direction, animateItems: true });
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

navItems.forEach((btn) => {
  btn.addEventListener('click', () => {
    setTab(btn.dataset.tab);
  });
});

brandHomeBtn?.addEventListener('click', () => {
  setTab('home');
});

// Flat Job Row Template
function renderJobRow(job, staggerIndex = 0) {
  return `
    <button type="button" class="flat-row anim-row" style="--stagger:${staggerIndex}" data-job-id="${escapeHtml(job.id)}">
      <div class="row-time-col">
        <span class="row-time-main tabular">${escapeHtml(job.time)}</span>
        <span class="row-time-sub tabular">${escapeHtml(job.duration)}</span>
      </div>
      <div class="row-main">
        <div class="row-title">${escapeHtml(job.title)}</div>
        <div class="row-subline">${escapeHtml(job.client)} · ${escapeHtml(job.address)}</div>
      </div>
      <div class="row-right">
        <span class="status-label ${getStatusClass(job.status)}">${escapeHtml(job.status)}</span>
        ${chevronSvg()}
      </div>
    </button>`;
}

// Views
function renderHomeView() {
  const paidInvoices = state.invoices.filter((i) => i.status === 'paid');
  const unpaidInvoices = state.invoices.filter((i) => i.status === 'unpaid');
  const paidTotal = paidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const unpaidTotal = unpaidInvoices.reduce((sum, i) => sum + i.amount, 0);
  const todayJobs = state.jobs.filter((j) => j.dayIndex === 1);

  const maxRevenue = Math.max(...state.weekDays.map((d) => d.revenue), 1);
  const activeGraphDay = state.weekDays[state.selectedGraphDayIndex];
  const activeGraphJobs = state.jobs.filter((j) => j.dayIndex === state.selectedGraphDayIndex).length;

  return `
    <section aria-label="Invoice KPI cards" class="anim-item" style="--stagger:0">
      <div class="kpi-grid">
        <button type="button" class="kpi-card" id="paid-kpi-btn">
          <div class="kpi-top">
            <span class="kpi-label">Paid Invoices</span>
            <svg class="kpi-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div class="kpi-value tabular">${formatMoney(paidTotal)}</div>
          ${paidSparklineSvg()}
          <div class="kpi-meta tabular"><span class="kpi-meta-accent">+14%</span> · ${paidInvoices.length} paid Nov</div>
        </button>

        <button type="button" class="kpi-card" id="unpaid-kpi-btn">
          <div class="kpi-top">
            <span class="kpi-label">Unpaid Invoices</span>
            <svg class="kpi-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div class="kpi-value tabular">${formatMoney(unpaidTotal)}</div>
          ${unpaidBarsSvg()}
          <div class="kpi-meta tabular">${unpaidInvoices.length} pending · 1 due today</div>
        </button>
      </div>
    </section>

    <section class="glass-card anim-item" style="--stagger:1" aria-label="Weekly Revenue Graph">
      <div class="graph-card-head">
        <span class="graph-card-title">Weekly Activity</span>
        <span class="graph-card-stat tabular">${escapeHtml(activeGraphDay.dow)} ${escapeHtml(activeGraphDay.num)} · ${formatMoney(activeGraphDay.revenue)} · ${activeGraphJobs} jobs</span>
      </div>
      <div class="weekly-bars" role="listbox" aria-label="Weekly revenue bars">
        ${state.weekDays
          .map((day, idx) => {
            const pct = Math.max(16, Math.round((day.revenue / maxRevenue) * 100));
            const isSelected = idx === state.selectedGraphDayIndex;
            return `
            <button
              type="button"
              class="week-bar-col ${isSelected ? 'is-selected' : ''}"
              data-graph-day="${idx}"
              role="option"
              aria-selected="${isSelected}"
              aria-label="${escapeHtml(day.full)}, ${formatMoney(day.revenue)}"
            >
              <div class="week-bar-track">
                <div class="week-bar-fill" style="height:${pct}%"></div>
              </div>
              <span class="week-bar-label">${day.dow}</span>
            </button>`;
          })
          .join('')}
      </div>
    </section>

    <section class="glass-card anim-item" style="--stagger:2" aria-label="Today's Schedule">
      <div class="section-header">
        <div>
          <h2 class="section-title">Today's Schedule</h2>
          <p class="view-subtitle tabular">Tuesday, Nov 17 · ${todayJobs.length} jobs</p>
        </div>
        <button type="button" class="section-action" id="see-calendar-btn">
          <span>Calendar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div class="flat-list">
        ${todayJobs.map((job, idx) => renderJobRow(job, idx)).join('')}
      </div>
    </section>

    <section class="glass-card anim-item" style="--stagger:3" aria-label="Quick Actions">
      <div class="section-header">
        <h2 class="section-title">Quick Actions</h2>
      </div>
      <div class="quick-actions-grid">
        <button type="button" class="quick-action-btn primary-action" data-quick="new-job">
          <span class="quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
          <span>New Job</span>
        </button>

        <button type="button" class="quick-action-btn" data-quick="send-invoice">
          <span class="quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </span>
          <span>Send Invoice</span>
        </button>

        <button type="button" class="quick-action-btn" data-quick="add-contact">
          <span class="quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </span>
          <span>Add Contact</span>
        </button>

        <button type="button" class="quick-action-btn" data-quick="log-lead">
          <span class="quick-action-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </span>
          <span>Log Lead</span>
        </button>
      </div>
    </section>
  `;
}

function renderContactsView() {
  const q = state.contactQuery.trim().toLowerCase();
  const filtered = state.contacts.filter((c) => {
    const matchesType = state.contactFilter === 'All' || c.type === state.contactFilter;
    const matchesQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  return `
    <div class="view-header anim-item" style="--stagger:0">
      <div>
        <h1 class="view-title">Contacts</h1>
        <p class="view-subtitle tabular">${state.contacts.length} clients saved</p>
      </div>
      <button type="button" class="compact-btn" id="contacts-add-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>Add</span>
      </button>
    </div>

    <div class="glass-card anim-item" style="--stagger:1">
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          class="search-input"
          id="contact-search-input"
          placeholder="Search"
          value="${escapeHtml(state.contactQuery)}"
          aria-label="Search contacts"
        />
        <button type="button" class="search-clear-btn" id="contact-search-clear" aria-label="Clear search" ${state.contactQuery ? '' : 'hidden'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="flat-filter-tabs" role="tablist" aria-label="Contact type filter">
        ${['All', 'Residential', 'Commercial']
          .map(
            (tab) => `
          <button type="button" class="filter-tab-btn ${state.contactFilter === tab ? 'active' : ''}" data-contact-filter="${tab}" role="tab" aria-selected="${state.contactFilter === tab}">
            ${tab}
          </button>`
          )
          .join('')}
      </div>
    </div>

    <div class="glass-card anim-item" style="--stagger:2">
      <div class="flat-list">
        ${
          filtered.length
            ? filtered
                .map(
                  (contact, idx) => `
          <button type="button" class="flat-row anim-row" style="--stagger:${idx}" data-contact-id="${escapeHtml(contact.id)}">
            <span class="contact-avatar" aria-hidden="true">${escapeHtml(getInitials(contact.name))}</span>
            <span class="row-main">
              <span class="row-title" style="display:block">${escapeHtml(contact.name)}</span>
              <span class="row-subline" style="display:block">${escapeHtml(contact.type)} · ${escapeHtml(contact.lastJob)}</span>
            </span>
            ${chevronSvg()}
          </button>`
                )
                .join('')
            : `
          <div class="empty-state">
            <div class="empty-state-title">No matching contacts</div>
            <div class="empty-state-text">Try clearing your search or adding a new client.</div>
          </div>`
        }
      </div>
    </div>
  `;
}

function renderCalendarView() {
  const selectedDay = state.weekDays[state.selectedDayIndex];
  const dayJobs = state.jobs.filter((j) => j.dayIndex === state.selectedDayIndex);

  return `
    <div class="view-header anim-item" style="--stagger:0">
      <div>
        <h1 class="view-title">Calendar</h1>
        <p class="view-subtitle">November 2026</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button type="button" class="compact-btn-secondary" id="cal-today-btn">Today</button>
        <button type="button" class="compact-btn" id="cal-add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Job</span>
        </button>
      </div>
    </div>

    <div class="glass-card anim-item" style="--stagger:1">
      <div class="week-strip" role="listbox" aria-label="Select day">
        ${state.weekDays
          .map((day, idx) => {
            const count = state.jobs.filter((j) => j.dayIndex === idx).length;
            return `
            <button
              type="button"
              class="day-btn ${idx === state.selectedDayIndex ? 'active' : ''}"
              data-day-index="${idx}"
              role="option"
              aria-selected="${idx === state.selectedDayIndex}"
            >
              <span class="day-dow">${day.dow}</span>
              <span class="day-num">${day.num}</span>
              <span class="day-count">${count} ${count === 1 ? 'job' : 'jobs'}</span>
            </button>`;
          })
          .join('')}
      </div>
    </div>

    <section class="glass-card anim-item" style="--stagger:2" aria-label="Selected day schedule">
      <div class="section-header">
        <h2 class="section-title">${escapeHtml(selectedDay.full)}</h2>
        <span class="view-subtitle tabular">${dayJobs.length} scheduled</span>
      </div>

      ${
        dayJobs.length
          ? `<div class="flat-list">${dayJobs.map((job, idx) => renderJobRow(job, idx)).join('')}</div>`
          : `
        <div class="empty-state">
          <div class="empty-state-title">Open day</div>
          <div class="empty-state-text">No jobs scheduled for ${escapeHtml(selectedDay.full)}.</div>
          <button type="button" class="compact-btn" id="empty-cal-add-btn">Schedule a job</button>
        </div>`
      }
    </section>
  `;
}

function renderLeadsView() {
  const newLeads = state.leads.filter((l) => l.stage === 'New');
  const quotedLeads = state.leads.filter((l) => l.stage === 'Quoted');
  const wonLeads = state.leads.filter((l) => l.stage === 'Won');

  const sumVal = (arr) => arr.reduce((acc, item) => acc + item.value, 0);
  const filtered = state.leads.filter((l) => state.leadFilter === 'All' || l.stage === state.leadFilter);

  return `
    <div class="view-header anim-item" style="--stagger:0">
      <div>
        <h1 class="view-title">Leads</h1>
        <p class="view-subtitle tabular">${state.leads.length} active inquiries</p>
      </div>
      <button type="button" class="compact-btn" id="leads-add-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span>Lead</span>
      </button>
    </div>

    <div class="glass-card anim-item" style="--stagger:1">
      <div class="pipeline-strip">
        <div class="pipeline-stat">
          <div class="pipeline-stat-label">New</div>
          <div class="pipeline-stat-value tabular">${formatMoney(sumVal(newLeads))}</div>
          <div class="pipeline-stat-count tabular">${newLeads.length} leads</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-stat-label">Quoted</div>
          <div class="pipeline-stat-value tabular">${formatMoney(sumVal(quotedLeads))}</div>
          <div class="pipeline-stat-count tabular">${quotedLeads.length} leads</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-stat-label">Won</div>
          <div class="pipeline-stat-value tabular" style="color:var(--accent-primary)">${formatMoney(sumVal(wonLeads))}</div>
          <div class="pipeline-stat-count tabular">${wonLeads.length} leads</div>
        </div>
      </div>
    </div>

    <div class="glass-card anim-item" style="--stagger:2">
      <div class="flat-filter-tabs" role="tablist" aria-label="Lead stage filter">
        ${['All', 'New', 'Quoted', 'Won']
          .map(
            (stage) => `
          <button type="button" class="filter-tab-btn ${state.leadFilter === stage ? 'active' : ''}" data-lead-filter="${stage}" role="tab" aria-selected="${state.leadFilter === stage}">
            ${stage}
          </button>`
          )
          .join('')}
      </div>

      <div class="flat-list">
        ${
          filtered.length
            ? filtered
                .map(
                  (lead, idx) => `
          <button type="button" class="flat-row anim-row" style="--stagger:${idx}" data-lead-id="${escapeHtml(lead.id)}">
            <div class="row-main">
              <div class="row-title">${escapeHtml(lead.name)}</div>
              <div class="row-subline">${escapeHtml(lead.service)} · ${escapeHtml(lead.source)} · ${escapeHtml(lead.age)}</div>
            </div>
            <div class="row-right">
              <div style="text-align:right;">
                <div class="lead-value tabular">${formatMoney(lead.value)}</div>
                <div class="status-label ${lead.stage === 'Won' ? 'completed' : lead.stage === 'Quoted' ? 'in-progress' : 'scheduled'}">${escapeHtml(lead.stage)}</div>
              </div>
              ${chevronSvg()}
            </div>
          </button>`
                )
                .join('')
            : `
          <div class="empty-state">
            <div class="empty-state-title">No leads in ${escapeHtml(state.leadFilter)}</div>
            <div class="empty-state-text">Tap + Lead to capture a new estimate request.</div>
          </div>`
        }
      </div>
    </div>
  `;
}

// Sheet Builders
function openInvoicesSheet(statusFilter) {
  const list = state.invoices.filter((i) => i.status === statusFilter);
  const title = statusFilter === 'paid' ? 'Paid Invoices' : 'Unpaid Invoices';

  const html = `
    <div class="detail-list">
      ${list
        .map(
          (inv) => `
        <div class="detail-row" style="align-items:center;">
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text-primary)">${escapeHtml(inv.client)}</div>
            <div style="font-size:12px;color:var(--text-muted)" class="tabular">${escapeHtml(inv.id)} · ${escapeHtml(inv.date)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="tabular" style="font-size:15px;font-weight:700;color:var(--text-white)">${formatMoney(inv.amount)}</span>
            ${
              statusFilter === 'unpaid'
                ? `<button type="button" class="compact-btn" data-mark-paid="${escapeHtml(inv.id)}">Mark Paid</button>`
                : ''
            }
          </div>
        </div>`
        )
        .join('')}
    </div>
  `;

  openSheet(title, html);

  sheetBody.querySelectorAll('[data-mark-paid]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const invId = btn.getAttribute('data-mark-paid');
      const target = state.invoices.find((i) => i.id === invId);
      if (target) {
        target.status = 'paid';
        target.date = 'Paid Today';
        closeSheet();
        renderView({ animateItems: true });
        showToast(`${target.id} marked paid`);
      }
    });
  });
}

function openJobSheet(jobId) {
  const job = state.jobs.find((j) => j.id === jobId);
  if (!job) return;
  const day = state.weekDays[job.dayIndex];
  const isComplete = job.status === 'Completed';

  openSheet(
    job.title,
    `
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Client</span>
        <span class="detail-val">${escapeHtml(job.client)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Schedule</span>
        <span class="detail-val tabular">${escapeHtml(day.full)} · ${escapeHtml(job.time)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Duration</span>
        <span class="detail-val tabular">${escapeHtml(job.duration)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Location</span>
        <span class="detail-val">${escapeHtml(job.address)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-val">${escapeHtml(job.status)}</span>
      </div>
    </div>
    <div class="detail-notes">${escapeHtml(job.notes)}</div>
    <div class="sheet-actions">
      <button type="button" class="btn-full btn-primary" id="toggle-job-status-btn">
        ${isComplete ? 'Reopen Job' : 'Mark Completed'}
      </button>
    </div>
  `
  );

  document.getElementById('toggle-job-status-btn')?.addEventListener('click', () => {
    job.status = isComplete ? 'Scheduled' : 'Completed';
    closeSheet();
    renderView({ animateItems: false });
    showToast(job.status === 'Completed' ? 'Job marked completed' : 'Job reopened');
  });
}

function openNewJobSheet(presetDayIndex = state.selectedDayIndex, presetClient = '') {
  openSheet(
    'Schedule New Job',
    `
    <form class="form-stack" id="new-job-form">
      <div class="field-group">
        <label class="field-label" for="job-title-input">Job Title</label>
        <input class="field-input" id="job-title-input" required placeholder="e.g. Furnace Filter Service" />
      </div>
      <div class="field-group">
        <label class="field-label" for="job-client-input">Client Name</label>
        <input class="field-input" id="job-client-input" required placeholder="e.g. Elena Rostova" value="${escapeHtml(presetClient)}" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="field-group">
          <label class="field-label" for="job-day-select">Day</label>
          <select class="field-input" id="job-day-select">
            ${state.weekDays
              .map(
                (d, idx) =>
                  `<option value="${idx}" ${idx === presetDayIndex ? 'selected' : ''}>${escapeHtml(d.dow)} ${escapeHtml(d.num)}</option>`
              )
              .join('')}
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="job-time-input">Time</label>
          <input class="field-input" id="job-time-input" required value="03:30 PM" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label" for="job-address-input">Address</label>
        <input class="field-input" id="job-address-input" required placeholder="e.g. 412 Oakridge Ave" />
      </div>
      <div class="sheet-actions">
        <button type="submit" class="btn-full btn-primary">Save Job</button>
      </div>
    </form>
  `
  );

  document.getElementById('new-job-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('job-title-input').value.trim();
    const client = document.getElementById('job-client-input').value.trim();
    const dayIndex = Number(document.getElementById('job-day-select').value);
    const time = document.getElementById('job-time-input').value.trim();
    const address = document.getElementById('job-address-input').value.trim();
    if (!title || !client) return;

    state.jobs.push({
      id: 'job-' + Date.now(),
      dayIndex,
      time,
      duration: '1.5h',
      title,
      client,
      address: address || 'On-site',
      status: 'Scheduled',
      notes: 'Scheduled from mobile app.',
    });
    state.selectedDayIndex = dayIndex;
    closeSheet();
    renderView({ animateItems: true });
    showToast('Job added to schedule');
  });
}

function openSendInvoiceSheet() {
  openSheet(
    'Send Invoice',
    `
    <form class="form-stack" id="send-invoice-form">
      <div class="field-group">
        <label class="field-label" for="inv-client-input">Client Name</label>
        <input class="field-input" id="inv-client-input" required placeholder="e.g. Marcus Vance" />
      </div>
      <div class="field-group">
        <label class="field-label" for="inv-amount-input">Amount ($)</label>
        <input class="field-input tabular" id="inv-amount-input" type="number" min="1" required placeholder="650" />
      </div>
      <div class="sheet-actions">
        <button type="submit" class="btn-full btn-primary">Create &amp; Send</button>
      </div>
    </form>
  `
  );

  document.getElementById('send-invoice-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const client = document.getElementById('inv-client-input').value.trim();
    const amount = Number(document.getElementById('inv-amount-input').value);
    if (!client || !amount) return;

    state.invoices.unshift({
      id: 'INV-' + (1046 + state.invoices.length),
      client,
      amount,
      status: 'unpaid',
      date: 'Sent Today',
    });
    closeSheet();
    renderView({ animateItems: false });
    showToast(`Invoice sent to ${client}`);
  });
}

function openAddContactSheet() {
  openSheet(
    'Add Contact',
    `
    <form class="form-stack" id="add-contact-form">
      <div class="field-group">
        <label class="field-label" for="ct-name-input">Full Name or Business</label>
        <input class="field-input" id="ct-name-input" required placeholder="e.g. Jordan Hayes" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="field-group">
          <label class="field-label" for="ct-type-select">Type</label>
          <select class="field-input" id="ct-type-select">
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div class="field-group">
          <label class="field-label" for="ct-phone-input">Phone</label>
          <input class="field-input tabular" id="ct-phone-input" required placeholder="(415) 555-0199" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label" for="ct-address-input">Service Address</label>
        <input class="field-input" id="ct-address-input" required placeholder="e.g. 210 Birch St" />
      </div>
      <div class="sheet-actions">
        <button type="submit" class="btn-full btn-primary">Save Contact</button>
      </div>
    </form>
  `
  );

  document.getElementById('add-contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('ct-name-input').value.trim();
    const type = document.getElementById('ct-type-select').value;
    const phone = document.getElementById('ct-phone-input').value.trim();
    const address = document.getElementById('ct-address-input').value.trim();
    if (!name) return;

    state.contacts.unshift({
      id: 'c-' + Date.now(),
      name,
      type,
      phone,
      email: name.toLowerCase().replace(/\s+/g, '.') + '@example.com',
      address,
      lastJob: 'Added today',
    });
    closeSheet();
    renderView({ animateItems: true });
    showToast(`${name} added to Contacts`);
  });
}

function openAddLeadSheet() {
  openSheet(
    'Log New Lead',
    `
    <form class="form-stack" id="add-lead-form">
      <div class="field-group">
        <label class="field-label" for="ld-name-input">Prospect Name</label>
        <input class="field-input" id="ld-name-input" required placeholder="e.g. Avery Brooks" />
      </div>
      <div class="field-group">
        <label class="field-label" for="ld-service-input">Requested Service</label>
        <input class="field-input" id="ld-service-input" required placeholder="e.g. Mini-Split Installation" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="field-group">
          <label class="field-label" for="ld-value-input">Est. Value ($)</label>
          <input class="field-input tabular" id="ld-value-input" type="number" min="1" required placeholder="2400" />
        </div>
        <div class="field-group">
          <label class="field-label" for="ld-source-select">Source</label>
          <select class="field-input" id="ld-source-select">
            <option value="Phone Call">Phone Call</option>
            <option value="Web Form">Web Form</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
      </div>
      <div class="sheet-actions">
        <button type="submit" class="btn-full btn-primary">Save Lead</button>
      </div>
    </form>
  `
  );

  document.getElementById('add-lead-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('ld-name-input').value.trim();
    const service = document.getElementById('ld-service-input').value.trim();
    const value = Number(document.getElementById('ld-value-input').value);
    const source = document.getElementById('ld-source-select').value;
    if (!name || !service) return;

    state.leads.unshift({
      id: 'l-' + Date.now(),
      name,
      service,
      value: value || 0,
      stage: 'New',
      source,
      age: 'Just now',
      phone: '(415) 555-0100',
      notes: 'Logged via mobile quick action.',
    });
    closeSheet();
    renderView({ animateItems: true });
    showToast(`Lead logged for ${name}`);
  });
}

function openContactSheet(contactId) {
  const contact = state.contacts.find((c) => c.id === contactId);
  if (!contact) return;

  openSheet(
    contact.name,
    `
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Account Type</span>
        <span class="detail-val">${escapeHtml(contact.type)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-val tabular">${escapeHtml(contact.phone)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Email</span>
        <span class="detail-val">${escapeHtml(contact.email)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Address</span>
        <span class="detail-val">${escapeHtml(contact.address)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Recent Activity</span>
        <span class="detail-val">${escapeHtml(contact.lastJob)}</span>
      </div>
    </div>
    <div class="sheet-actions">
      <button type="button" class="btn-full btn-secondary" id="call-contact-btn">Call Client</button>
      <button type="button" class="btn-full btn-primary" id="schedule-for-contact-btn">Schedule Job</button>
    </div>
  `
  );

  document.getElementById('call-contact-btn')?.addEventListener('click', () => {
    showToast(`Calling ${contact.phone}`);
  });

  document.getElementById('schedule-for-contact-btn')?.addEventListener('click', () => {
    openNewJobSheet(state.selectedDayIndex, contact.name);
  });
}

function openLeadSheet(leadId) {
  const lead = state.leads.find((l) => l.id === leadId);
  if (!lead) return;

  const nextStage = lead.stage === 'New' ? 'Quoted' : lead.stage === 'Quoted' ? 'Won' : null;

  openSheet(
    lead.name,
    `
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Requested Service</span>
        <span class="detail-val">${escapeHtml(lead.service)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Estimated Value</span>
        <span class="detail-val tabular">${formatMoney(lead.value)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Stage</span>
        <span class="detail-val">${escapeHtml(lead.stage)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Source</span>
        <span class="detail-val">${escapeHtml(lead.source)} · ${escapeHtml(lead.age)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-val tabular">${escapeHtml(lead.phone)}</span>
      </div>
    </div>
    <div class="detail-notes">${escapeHtml(lead.notes)}</div>
    <div class="sheet-actions">
      ${
        nextStage
          ? `<button type="button" class="btn-full btn-secondary" id="advance-lead-btn">Move to ${escapeHtml(nextStage)}</button>`
          : ''
      }
      <button type="button" class="btn-full btn-primary" id="convert-lead-job-btn">Schedule Job</button>
    </div>
  `
  );

  document.getElementById('advance-lead-btn')?.addEventListener('click', () => {
    if (nextStage) {
      lead.stage = nextStage;
      closeSheet();
      renderView({ animateItems: false });
      showToast(`Lead moved to ${nextStage}`);
    }
  });

  document.getElementById('convert-lead-job-btn')?.addEventListener('click', () => {
    openNewJobSheet(state.selectedDayIndex, lead.name);
  });
}

// Event Binding After Render
function bindViewEvents(container) {
  const scope = container || mainContent;

  // Home
  scope.querySelector('#paid-kpi-btn')?.addEventListener('click', () => openInvoicesSheet('paid'));
  scope.querySelector('#unpaid-kpi-btn')?.addEventListener('click', () => openInvoicesSheet('unpaid'));
  scope.querySelector('#see-calendar-btn')?.addEventListener('click', () => setTab('calendar'));

  scope.querySelectorAll('[data-graph-day]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedGraphDayIndex = Number(btn.getAttribute('data-graph-day'));
      renderView({ animateItems: false });
    });
  });

  scope.querySelectorAll('[data-quick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-quick');
      if (action === 'new-job') openNewJobSheet();
      else if (action === 'send-invoice') openSendInvoiceSheet();
      else if (action === 'add-contact') openAddContactSheet();
      else if (action === 'log-lead') openAddLeadSheet();
    });
  });

  // Shared Job Rows
  scope.querySelectorAll('[data-job-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openJobSheet(btn.getAttribute('data-job-id'));
    });
  });

  // Contacts
  const searchInput = scope.querySelector('#contact-search-input');
  searchInput?.addEventListener('input', (e) => {
    state.contactQuery = e.target.value;
    const caretPos = e.target.selectionStart;
    renderView({ animateItems: false });
    const nextInput = document.getElementById('contact-search-input');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(caretPos, caretPos);
    }
  });

  scope.querySelector('#contact-search-clear')?.addEventListener('click', () => {
    state.contactQuery = '';
    renderView({ animateItems: true });
    document.getElementById('contact-search-input')?.focus();
  });

  scope.querySelectorAll('[data-contact-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.contactFilter = btn.getAttribute('data-contact-filter');
      renderView({ animateItems: true });
    });
  });

  scope.querySelector('#contacts-add-btn')?.addEventListener('click', openAddContactSheet);

  scope.querySelectorAll('[data-contact-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openContactSheet(btn.getAttribute('data-contact-id'));
    });
  });

  // Calendar
  scope.querySelector('#cal-today-btn')?.addEventListener('click', () => {
    state.selectedDayIndex = 1;
    renderView({ animateItems: true });
  });

  scope.querySelector('#cal-add-btn')?.addEventListener('click', () => {
    openNewJobSheet(state.selectedDayIndex);
  });

  scope.querySelector('#empty-cal-add-btn')?.addEventListener('click', () => {
    openNewJobSheet(state.selectedDayIndex);
  });

  scope.querySelectorAll('[data-day-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedDayIndex = Number(btn.getAttribute('data-day-index'));
      renderView({ animateItems: true });
    });
  });

  // Leads
  scope.querySelector('#leads-add-btn')?.addEventListener('click', openAddLeadSheet);

  scope.querySelectorAll('[data-lead-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.leadFilter = btn.getAttribute('data-lead-filter');
      renderView({ animateItems: true });
    });
  });

  scope.querySelectorAll('[data-lead-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openLeadSheet(btn.getAttribute('data-lead-id'));
    });
  });
}

function getActiveViewMarkup() {
  if (state.activeTab === 'home') return renderHomeView();
  if (state.activeTab === 'contacts') return renderContactsView();
  if (state.activeTab === 'calendar') return renderCalendarView();
  return renderLeadsView();
}

function renderView(options = {}) {
  if (!mainContent) return;
  const { wooshDirection = 0, animateItems = true } = options;

  clearTimeout(outgoingCleanupTimer);
  mainContent.querySelectorAll('.page-outgoing').forEach((el) => el.remove());

  const prevStage = mainContent.querySelector('.page-stage:not(.page-outgoing)');
  if (wooshDirection !== 0 && prevStage) {
    const outgoing = prevStage.cloneNode(true);
    outgoing.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    outgoing.classList.remove('animate-items', 'page-woosh-in-right', 'page-woosh-in-left');
    outgoing.classList.add('page-outgoing', wooshDirection > 0 ? 'page-woosh-out-left' : 'page-woosh-out-right');
    outgoing.setAttribute('aria-hidden', 'true');
    prevStage.replaceWith(outgoing);
    outgoingCleanupTimer = setTimeout(() => {
      outgoing.remove();
    }, 260);
  } else {
    mainContent.innerHTML = '';
  }

  const nextStage = document.createElement('div');
  nextStage.className = 'page-stage';
  if (animateItems) {
    nextStage.classList.add('animate-items');
  }
  if (wooshDirection > 0) {
    nextStage.classList.add('page-woosh-in-right');
  } else if (wooshDirection < 0) {
    nextStage.classList.add('page-woosh-in-left');
  }

  nextStage.innerHTML = getActiveViewMarkup();
  mainContent.appendChild(nextStage);

  bindViewEvents(nextStage);
}

document.getElementById('demo-profile-initials').textContent = demoData.profile.initials;
document.getElementById('reset-demo').addEventListener('click', () => location.reload());

// Initial Render
renderNotifications();
renderView({ animateItems: true });

if (parent !== window) parent.postMessage({ type: 'scheduler-demo-ready' }, location.origin);
