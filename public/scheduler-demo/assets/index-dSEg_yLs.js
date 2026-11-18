(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={activeTab:`home`,selectedDayIndex:1,selectedGraphDayIndex:1,contactFilter:`All`,contactQuery:``,leadFilter:`All`,invoices:[{id:`INV-1042`,client:`Elena Rostova`,amount:1850,status:`paid`,date:`Nov 15`},{id:`INV-1041`,client:`Northgate Dental`,amount:4200,status:`paid`,date:`Nov 12`},{id:`INV-1040`,client:`Marcus Vance`,amount:3150,status:`paid`,date:`Nov 09`},{id:`INV-1039`,client:`Harborview Lofts`,amount:9250,status:`paid`,date:`Nov 04`},{id:`INV-1045`,client:`Daniel Park`,amount:1480,status:`unpaid`,date:`Due Nov 19`},{id:`INV-1044`,client:`Oakridge Bistro`,amount:1950,status:`unpaid`,date:`Due Today`},{id:`INV-1043`,client:`Claire Bennett`,amount:850,status:`unpaid`,date:`Due Nov 22`}],weekDays:[{dow:`Mon`,num:`16`,full:`Monday, Nov 16`,revenue:3200},{dow:`Tue`,num:`17`,full:`Tuesday, Nov 17`,revenue:5400},{dow:`Wed`,num:`18`,full:`Wednesday, Nov 18`,revenue:2850},{dow:`Thu`,num:`19`,full:`Thursday, Nov 19`,revenue:4100},{dow:`Fri`,num:`20`,full:`Friday, Nov 20`,revenue:3650},{dow:`Sat`,num:`21`,full:`Saturday, Nov 21`,revenue:1400},{dow:`Sun`,num:`22`,full:`Sunday, Nov 22`,revenue:900}],jobs:[{id:`job-1`,dayIndex:1,time:`08:30 AM`,duration:`1.5h`,title:`HVAC Compressor Tune-Up`,client:`Elena Rostova`,address:`412 Oakridge Ave`,status:`In Progress`,notes:`Annual filter and refrigerant pressure inspection.`},{id:`job-2`,dayIndex:1,time:`11:00 AM`,duration:`2h`,title:`Panel Upgrade Inspection`,client:`Oakridge Bistro`,address:`89 Market St, Suite B`,status:`Confirmed`,notes:`Meet kitchen manager at rear loading dock before shutting off sub-panel.`},{id:`job-3`,dayIndex:1,time:`02:15 PM`,duration:`1h`,title:`Smart Thermostat Install`,client:`Daniel Park`,address:`1204 Cedar Lane`,status:`Scheduled`,notes:`Customer requested dual-zone sensor pairing in upstairs hallway.`},{id:`job-4`,dayIndex:1,time:`04:30 PM`,duration:`1.5h`,title:`Backflow Valve Replacement`,client:`Northgate Dental`,address:`305 Pinecrest Blvd`,status:`Scheduled`,notes:`Bring 3/4-inch brass assembly and pressure test gauge.`},{id:`job-5`,dayIndex:0,time:`09:30 AM`,duration:`2h`,title:`Rooftop Unit Maintenance`,client:`Harborview Lofts`,address:`720 Bayshore Dr`,status:`Completed`,notes:`Replaced belt and cleared condensate drain line.`},{id:`job-6`,dayIndex:2,time:`10:00 AM`,duration:`3h`,title:`Tankless Water Heater Flush`,client:`Claire Bennett`,address:`58 Elmwood Ct`,status:`Confirmed`,notes:`Garage utility closet on the left side.`},{id:`job-7`,dayIndex:3,time:`01:00 PM`,duration:`2.5h`,title:`Lighting Circuit Rewire`,client:`Marcus Vance`,address:`910 Maple Terrace`,status:`Scheduled`,notes:`Install dimmer bank in main studio.`}],contacts:[{id:`c-1`,name:`Elena Rostova`,type:`Residential`,phone:`(415) 555-0148`,email:`elena.rostova@example.com`,address:`412 Oakridge Ave`,lastJob:`HVAC Tune-Up · Today`},{id:`c-2`,name:`Oakridge Bistro`,type:`Commercial`,phone:`(415) 555-0192`,email:`ops@example.com`,address:`89 Market St, Suite B`,lastJob:`Panel Inspection · Today`},{id:`c-3`,name:`Daniel Park`,type:`Residential`,phone:`(415) 555-0163`,email:`dpark@example.com`,address:`1204 Cedar Lane`,lastJob:`Thermostat Install · Today`},{id:`c-4`,name:`Northgate Dental`,type:`Commercial`,phone:`(415) 555-0117`,email:`facilities@example.com`,address:`305 Pinecrest Blvd`,lastJob:`Valve Replacement · Today`},{id:`c-5`,name:`Claire Bennett`,type:`Residential`,phone:`(415) 555-0174`,email:`claire.bennett@example.com`,address:`58 Elmwood Ct`,lastJob:`Water Heater · Nov 18`},{id:`c-6`,name:`Harborview Lofts`,type:`Commercial`,phone:`(415) 555-0185`,email:`hoa@example.com`,address:`720 Bayshore Dr`,lastJob:`Rooftop Unit · Nov 16`}],leads:[{id:`l-1`,name:`Sofia Alvarez`,service:`EV Charger 240V Drop`,value:1650,stage:`New`,source:`Web Form`,age:`2h ago`,phone:`(415) 555-0211`,notes:`Wants Wallbox installed inside attached 2-car garage.`},{id:`l-2`,name:`Westside Coffee Co.`,service:`Commercial Espresso Plumbing`,value:3400,stage:`Quoted`,source:`Referral`,age:`1d ago`,phone:`(415) 555-0234`,notes:`Sent estimate #Q-209. Follow up Thursday morning.`},{id:`l-3`,name:`Liam O’Connor`,service:`Heat Pump Conversion`,value:8900,stage:`Quoted`,source:`Google Maps`,age:`3d ago`,phone:`(415) 555-0279`,notes:`Reviewing rebate options with homeowner.`},{id:`l-4`,name:`Hannah Kim`,service:`Kitchen Recessed Lighting`,value:2100,stage:`Won`,source:`Repeat Client`,age:`4d ago`,phone:`(415) 555-0295`,notes:`Approved deposit. Ready to add to next week schedule.`},{id:`l-5`,name:`Summit Gym`,service:`Locker Room Exhaust Fan`,value:2750,stage:`New`,source:`Phone Call`,age:`5h ago`,phone:`(415) 555-0260`,notes:`Needs site walk before 11 AM.`}],notifications:[{id:`n-1`,title:`Oakridge Bistro confirmed 11:00 AM slot`,time:`14m ago`,unread:!0},{id:`n-2`,title:`Invoice #1042 paid ($1,850)`,time:`2h ago`,unread:!0},{id:`n-3`,title:`New lead from Sofia Alvarez`,time:`2h ago`,unread:!1}],profile:{initials:`JF`,name:`Jordan Fields`}},t=structuredClone(e),n=document.getElementById(`main-content`),r=document.querySelectorAll(`.nav-item`),i=document.getElementById(`brand-home-btn`),a=document.getElementById(`profile-btn`),o=document.getElementById(`profile-dropdown`),s=document.getElementById(`notifications-btn`),c=document.getElementById(`notifications-dropdown`),l=document.getElementById(`notif-list`),u=document.getElementById(`notif-count`),d=document.getElementById(`mark-all-read-btn`),f=document.getElementById(`sheet-backdrop`),p=document.getElementById(`bottom-sheet`),m=document.getElementById(`sheet-title`),h=document.getElementById(`sheet-body`),g=document.getElementById(`sheet-close-btn`),_=document.getElementById(`toast`),v=null;function y(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function b(e){return`$`+Number(e).toLocaleString(`en-US`)}function x(e){return e.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join(``)}function S(e){_&&(_.textContent=e,_.hidden=!1,clearTimeout(v),v=setTimeout(()=>{_.hidden=!0},2400))}function C(e){return e===`Completed`?`completed`:e===`In Progress`?`in-progress`:`scheduled`}function w(){return`<svg class="row-chevron" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>`}function T(){return`
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
    </svg>`}function E(){return`
    <svg class="kpi-graph" viewBox="0 0 140 36" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <rect x="4" y="18" width="18" height="18" rx="4" fill="rgba(255,255,255,0.16)" />
      <rect x="31" y="10" width="18" height="26" rx="4" fill="rgba(255,255,255,0.24)" />
      <rect x="58" y="22" width="18" height="14" rx="4" fill="rgba(255,255,255,0.16)" />
      <rect x="85" y="14" width="18" height="22" rx="4" fill="rgba(255,255,255,0.28)" />
      <rect x="112" y="6" width="18" height="30" rx="4" fill="#4F9CF9" />
    </svg>`}function D(){o&&(o.hidden=!0,a?.setAttribute(`aria-expanded`,`false`)),c&&(c.hidden=!0,s?.setAttribute(`aria-expanded`,`false`))}function O(){let e=t.notifications.filter(e=>e.unread).length;u&&(u.textContent=String(e),u.hidden=e===0),l&&(l.innerHTML=t.notifications.map(e=>`
      <div class="notif-item ${e.unread?`unread`:``}">
        <div class="notif-item-title">${y(e.title)}</div>
        <div class="notif-item-meta">${y(e.time)}</div>
      </div>`).join(``))}a?.addEventListener(`click`,e=>{e.stopPropagation();let t=o.hidden;D(),o.hidden=!t,a.setAttribute(`aria-expanded`,String(!o.hidden))}),o?.addEventListener(`click`,e=>{e.target.closest(`.dropdown-item`)&&e.stopPropagation()}),s?.addEventListener(`click`,e=>{e.stopPropagation();let t=c.hidden;D(),c.hidden=!t,s.setAttribute(`aria-expanded`,String(!c.hidden))}),c?.addEventListener(`click`,e=>{e.stopPropagation()}),d?.addEventListener(`click`,()=>{t.notifications.forEach(e=>{e.unread=!1}),O(),S(`Notifications marked read`)}),document.addEventListener(`click`,()=>{D()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(D(),A())});function k(e,t){D(),m.textContent=e,h.innerHTML=t,f.hidden=!1,p.hidden=!1,g?.focus()}function A(){p&&!p.hidden&&(f.hidden=!0,p.hidden=!0,h.innerHTML=``)}f?.addEventListener(`click`,A),g?.addEventListener(`click`,A);var j={home:0,contacts:1,calendar:2,leads:3},M=null;function N(e){if(t.activeTab===e)return;let i=j[t.activeTab]??0,a=(j[e]??0)>=i?1:-1;t.activeTab=e,D(),r.forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`active`,n),n?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)}),Y({wooshDirection:a,animateItems:!0}),n&&(n.scrollTop=0),window.scrollTo({top:0,behavior:`instant`})}r.forEach(e=>{e.addEventListener(`click`,()=>{N(e.dataset.tab)})}),i?.addEventListener(`click`,()=>{N(`home`)});function P(e,t=0){return`
    <button type="button" class="flat-row anim-row" style="--stagger:${t}" data-job-id="${y(e.id)}">
      <div class="row-time-col">
        <span class="row-time-main tabular">${y(e.time)}</span>
        <span class="row-time-sub tabular">${y(e.duration)}</span>
      </div>
      <div class="row-main">
        <div class="row-title">${y(e.title)}</div>
        <div class="row-subline">${y(e.client)} · ${y(e.address)}</div>
      </div>
      <div class="row-right">
        <span class="status-label ${C(e.status)}">${y(e.status)}</span>
        ${w()}
      </div>
    </button>`}function F(){let e=t.invoices.filter(e=>e.status===`paid`),n=t.invoices.filter(e=>e.status===`unpaid`),r=e.reduce((e,t)=>e+t.amount,0),i=n.reduce((e,t)=>e+t.amount,0),a=t.jobs.filter(e=>e.dayIndex===1),o=Math.max(...t.weekDays.map(e=>e.revenue),1),s=t.weekDays[t.selectedGraphDayIndex],c=t.jobs.filter(e=>e.dayIndex===t.selectedGraphDayIndex).length;return`
    <section aria-label="Invoice KPI cards" class="anim-item" style="--stagger:0">
      <div class="kpi-grid">
        <button type="button" class="kpi-card" id="paid-kpi-btn">
          <div class="kpi-top">
            <span class="kpi-label">Paid Invoices</span>
            <svg class="kpi-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div class="kpi-value tabular">${b(r)}</div>
          ${T()}
          <div class="kpi-meta tabular"><span class="kpi-meta-accent">+14%</span> · ${e.length} paid Nov</div>
        </button>

        <button type="button" class="kpi-card" id="unpaid-kpi-btn">
          <div class="kpi-top">
            <span class="kpi-label">Unpaid Invoices</span>
            <svg class="kpi-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div class="kpi-value tabular">${b(i)}</div>
          ${E()}
          <div class="kpi-meta tabular">${n.length} pending · 1 due today</div>
        </button>
      </div>
    </section>

    <section class="glass-card anim-item" style="--stagger:1" aria-label="Weekly Revenue Graph">
      <div class="graph-card-head">
        <span class="graph-card-title">Weekly Activity</span>
        <span class="graph-card-stat tabular">${y(s.dow)} ${y(s.num)} · ${b(s.revenue)} · ${c} jobs</span>
      </div>
      <div class="weekly-bars" role="listbox" aria-label="Weekly revenue bars">
        ${t.weekDays.map((e,n)=>{let r=Math.max(16,Math.round(e.revenue/o*100)),i=n===t.selectedGraphDayIndex;return`
            <button
              type="button"
              class="week-bar-col ${i?`is-selected`:``}"
              data-graph-day="${n}"
              role="option"
              aria-selected="${i}"
              aria-label="${y(e.full)}, ${b(e.revenue)}"
            >
              <div class="week-bar-track">
                <div class="week-bar-fill" style="height:${r}%"></div>
              </div>
              <span class="week-bar-label">${e.dow}</span>
            </button>`}).join(``)}
      </div>
    </section>

    <section class="glass-card anim-item" style="--stagger:2" aria-label="Today's Schedule">
      <div class="section-header">
        <div>
          <h2 class="section-title">Today's Schedule</h2>
          <p class="view-subtitle tabular">Tuesday, Nov 17 · ${a.length} jobs</p>
        </div>
        <button type="button" class="section-action" id="see-calendar-btn">
          <span>Calendar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div class="flat-list">
        ${a.map((e,t)=>P(e,t)).join(``)}
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
  `}function I(){let e=t.contactQuery.trim().toLowerCase(),n=t.contacts.filter(n=>{let r=t.contactFilter===`All`||n.type===t.contactFilter,i=!e||n.name.toLowerCase().includes(e)||n.address.toLowerCase().includes(e)||n.type.toLowerCase().includes(e);return r&&i});return`
    <div class="view-header anim-item" style="--stagger:0">
      <div>
        <h1 class="view-title">Contacts</h1>
        <p class="view-subtitle tabular">${t.contacts.length} clients saved</p>
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
          value="${y(t.contactQuery)}"
          aria-label="Search contacts"
        />
        <button type="button" class="search-clear-btn" id="contact-search-clear" aria-label="Clear search" ${t.contactQuery?``:`hidden`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div class="flat-filter-tabs" role="tablist" aria-label="Contact type filter">
        ${[`All`,`Residential`,`Commercial`].map(e=>`
          <button type="button" class="filter-tab-btn ${t.contactFilter===e?`active`:``}" data-contact-filter="${e}" role="tab" aria-selected="${t.contactFilter===e}">
            ${e}
          </button>`).join(``)}
      </div>
    </div>

    <div class="glass-card anim-item" style="--stagger:2">
      <div class="flat-list">
        ${n.length?n.map((e,t)=>`
          <button type="button" class="flat-row anim-row" style="--stagger:${t}" data-contact-id="${y(e.id)}">
            <span class="contact-avatar" aria-hidden="true">${y(x(e.name))}</span>
            <span class="row-main">
              <span class="row-title" style="display:block">${y(e.name)}</span>
              <span class="row-subline" style="display:block">${y(e.type)} · ${y(e.lastJob)}</span>
            </span>
            ${w()}
          </button>`).join(``):`
          <div class="empty-state">
            <div class="empty-state-title">No matching contacts</div>
            <div class="empty-state-text">Try clearing your search or adding a new client.</div>
          </div>`}
      </div>
    </div>
  `}function L(){let e=t.weekDays[t.selectedDayIndex],n=t.jobs.filter(e=>e.dayIndex===t.selectedDayIndex);return`
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
        ${t.weekDays.map((e,n)=>{let r=t.jobs.filter(e=>e.dayIndex===n).length;return`
            <button
              type="button"
              class="day-btn ${n===t.selectedDayIndex?`active`:``}"
              data-day-index="${n}"
              role="option"
              aria-selected="${n===t.selectedDayIndex}"
            >
              <span class="day-dow">${e.dow}</span>
              <span class="day-num">${e.num}</span>
              <span class="day-count">${r} ${r===1?`job`:`jobs`}</span>
            </button>`}).join(``)}
      </div>
    </div>

    <section class="glass-card anim-item" style="--stagger:2" aria-label="Selected day schedule">
      <div class="section-header">
        <h2 class="section-title">${y(e.full)}</h2>
        <span class="view-subtitle tabular">${n.length} scheduled</span>
      </div>

      ${n.length?`<div class="flat-list">${n.map((e,t)=>P(e,t)).join(``)}</div>`:`
        <div class="empty-state">
          <div class="empty-state-title">Open day</div>
          <div class="empty-state-text">No jobs scheduled for ${y(e.full)}.</div>
          <button type="button" class="compact-btn" id="empty-cal-add-btn">Schedule a job</button>
        </div>`}
    </section>
  `}function R(){let e=t.leads.filter(e=>e.stage===`New`),n=t.leads.filter(e=>e.stage===`Quoted`),r=t.leads.filter(e=>e.stage===`Won`),i=e=>e.reduce((e,t)=>e+t.value,0),a=t.leads.filter(e=>t.leadFilter===`All`||e.stage===t.leadFilter);return`
    <div class="view-header anim-item" style="--stagger:0">
      <div>
        <h1 class="view-title">Leads</h1>
        <p class="view-subtitle tabular">${t.leads.length} active inquiries</p>
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
          <div class="pipeline-stat-value tabular">${b(i(e))}</div>
          <div class="pipeline-stat-count tabular">${e.length} leads</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-stat-label">Quoted</div>
          <div class="pipeline-stat-value tabular">${b(i(n))}</div>
          <div class="pipeline-stat-count tabular">${n.length} leads</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-stat-label">Won</div>
          <div class="pipeline-stat-value tabular" style="color:var(--accent-primary)">${b(i(r))}</div>
          <div class="pipeline-stat-count tabular">${r.length} leads</div>
        </div>
      </div>
    </div>

    <div class="glass-card anim-item" style="--stagger:2">
      <div class="flat-filter-tabs" role="tablist" aria-label="Lead stage filter">
        ${[`All`,`New`,`Quoted`,`Won`].map(e=>`
          <button type="button" class="filter-tab-btn ${t.leadFilter===e?`active`:``}" data-lead-filter="${e}" role="tab" aria-selected="${t.leadFilter===e}">
            ${e}
          </button>`).join(``)}
      </div>

      <div class="flat-list">
        ${a.length?a.map((e,t)=>`
          <button type="button" class="flat-row anim-row" style="--stagger:${t}" data-lead-id="${y(e.id)}">
            <div class="row-main">
              <div class="row-title">${y(e.name)}</div>
              <div class="row-subline">${y(e.service)} · ${y(e.source)} · ${y(e.age)}</div>
            </div>
            <div class="row-right">
              <div style="text-align:right;">
                <div class="lead-value tabular">${b(e.value)}</div>
                <div class="status-label ${e.stage===`Won`?`completed`:e.stage===`Quoted`?`in-progress`:`scheduled`}">${y(e.stage)}</div>
              </div>
              ${w()}
            </div>
          </button>`).join(``):`
          <div class="empty-state">
            <div class="empty-state-title">No leads in ${y(t.leadFilter)}</div>
            <div class="empty-state-text">Tap + Lead to capture a new estimate request.</div>
          </div>`}
      </div>
    </div>
  `}function z(e){let n=t.invoices.filter(t=>t.status===e);k(e===`paid`?`Paid Invoices`:`Unpaid Invoices`,`
    <div class="detail-list">
      ${n.map(t=>`
        <div class="detail-row" style="align-items:center;">
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text-primary)">${y(t.client)}</div>
            <div style="font-size:12px;color:var(--text-muted)" class="tabular">${y(t.id)} · ${y(t.date)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="tabular" style="font-size:15px;font-weight:700;color:var(--text-white)">${b(t.amount)}</span>
            ${e===`unpaid`?`<button type="button" class="compact-btn" data-mark-paid="${y(t.id)}">Mark Paid</button>`:``}
          </div>
        </div>`).join(``)}
    </div>
  `),h.querySelectorAll(`[data-mark-paid]`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.getAttribute(`data-mark-paid`),r=t.invoices.find(e=>e.id===n);r&&(r.status=`paid`,r.date=`Paid Today`,A(),Y({animateItems:!0}),S(`${r.id} marked paid`))})})}function B(e){let n=t.jobs.find(t=>t.id===e);if(!n)return;let r=t.weekDays[n.dayIndex],i=n.status===`Completed`;k(n.title,`
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Client</span>
        <span class="detail-val">${y(n.client)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Schedule</span>
        <span class="detail-val tabular">${y(r.full)} · ${y(n.time)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Duration</span>
        <span class="detail-val tabular">${y(n.duration)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Location</span>
        <span class="detail-val">${y(n.address)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status</span>
        <span class="detail-val">${y(n.status)}</span>
      </div>
    </div>
    <div class="detail-notes">${y(n.notes)}</div>
    <div class="sheet-actions">
      <button type="button" class="btn-full btn-primary" id="toggle-job-status-btn">
        ${i?`Reopen Job`:`Mark Completed`}
      </button>
    </div>
  `),document.getElementById(`toggle-job-status-btn`)?.addEventListener(`click`,()=>{n.status=i?`Scheduled`:`Completed`,A(),Y({animateItems:!1}),S(n.status===`Completed`?`Job marked completed`:`Job reopened`)})}function V(e=t.selectedDayIndex,n=``){k(`Schedule New Job`,`
    <form class="form-stack" id="new-job-form">
      <div class="field-group">
        <label class="field-label" for="job-title-input">Job Title</label>
        <input class="field-input" id="job-title-input" required placeholder="e.g. Furnace Filter Service" />
      </div>
      <div class="field-group">
        <label class="field-label" for="job-client-input">Client Name</label>
        <input class="field-input" id="job-client-input" required placeholder="e.g. Elena Rostova" value="${y(n)}" />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="field-group">
          <label class="field-label" for="job-day-select">Day</label>
          <select class="field-input" id="job-day-select">
            ${t.weekDays.map((t,n)=>`<option value="${n}" ${n===e?`selected`:``}>${y(t.dow)} ${y(t.num)}</option>`).join(``)}
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
  `),document.getElementById(`new-job-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`job-title-input`).value.trim(),r=document.getElementById(`job-client-input`).value.trim(),i=Number(document.getElementById(`job-day-select`).value),a=document.getElementById(`job-time-input`).value.trim(),o=document.getElementById(`job-address-input`).value.trim();n&&r&&(t.jobs.push({id:`job-`+Date.now(),dayIndex:i,time:a,duration:`1.5h`,title:n,client:r,address:o||`On-site`,status:`Scheduled`,notes:`Scheduled from mobile app.`}),t.selectedDayIndex=i,A(),Y({animateItems:!0}),S(`Job added to schedule`))})}function H(){k(`Send Invoice`,`
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
  `),document.getElementById(`send-invoice-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`inv-client-input`).value.trim(),r=Number(document.getElementById(`inv-amount-input`).value);n&&r&&(t.invoices.unshift({id:`INV-`+(1046+t.invoices.length),client:n,amount:r,status:`unpaid`,date:`Sent Today`}),A(),Y({animateItems:!1}),S(`Invoice sent to ${n}`))})}function U(){k(`Add Contact`,`
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
  `),document.getElementById(`add-contact-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`ct-name-input`).value.trim(),r=document.getElementById(`ct-type-select`).value,i=document.getElementById(`ct-phone-input`).value.trim(),a=document.getElementById(`ct-address-input`).value.trim();n&&(t.contacts.unshift({id:`c-`+Date.now(),name:n,type:r,phone:i,email:n.toLowerCase().replace(/\s+/g,`.`)+`@example.com`,address:a,lastJob:`Added today`}),A(),Y({animateItems:!0}),S(`${n} added to Contacts`))})}function W(){k(`Log New Lead`,`
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
  `),document.getElementById(`add-lead-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`ld-name-input`).value.trim(),r=document.getElementById(`ld-service-input`).value.trim(),i=Number(document.getElementById(`ld-value-input`).value),a=document.getElementById(`ld-source-select`).value;n&&r&&(t.leads.unshift({id:`l-`+Date.now(),name:n,service:r,value:i||0,stage:`New`,source:a,age:`Just now`,phone:`(415) 555-0100`,notes:`Logged via mobile quick action.`}),A(),Y({animateItems:!0}),S(`Lead logged for ${n}`))})}function G(e){let n=t.contacts.find(t=>t.id===e);n&&(k(n.name,`
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Account Type</span>
        <span class="detail-val">${y(n.type)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-val tabular">${y(n.phone)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Email</span>
        <span class="detail-val">${y(n.email)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Address</span>
        <span class="detail-val">${y(n.address)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Recent Activity</span>
        <span class="detail-val">${y(n.lastJob)}</span>
      </div>
    </div>
    <div class="sheet-actions">
      <button type="button" class="btn-full btn-secondary" id="call-contact-btn">Call Client</button>
      <button type="button" class="btn-full btn-primary" id="schedule-for-contact-btn">Schedule Job</button>
    </div>
  `),document.getElementById(`call-contact-btn`)?.addEventListener(`click`,()=>{S(`Calling ${n.phone}`)}),document.getElementById(`schedule-for-contact-btn`)?.addEventListener(`click`,()=>{V(t.selectedDayIndex,n.name)}))}function K(e){let n=t.leads.find(t=>t.id===e);if(!n)return;let r=n.stage===`New`?`Quoted`:n.stage===`Quoted`?`Won`:null;k(n.name,`
    <div class="detail-list">
      <div class="detail-row">
        <span class="detail-label">Requested Service</span>
        <span class="detail-val">${y(n.service)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Estimated Value</span>
        <span class="detail-val tabular">${b(n.value)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Stage</span>
        <span class="detail-val">${y(n.stage)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Source</span>
        <span class="detail-val">${y(n.source)} · ${y(n.age)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Phone</span>
        <span class="detail-val tabular">${y(n.phone)}</span>
      </div>
    </div>
    <div class="detail-notes">${y(n.notes)}</div>
    <div class="sheet-actions">
      ${r?`<button type="button" class="btn-full btn-secondary" id="advance-lead-btn">Move to ${y(r)}</button>`:``}
      <button type="button" class="btn-full btn-primary" id="convert-lead-job-btn">Schedule Job</button>
    </div>
  `),document.getElementById(`advance-lead-btn`)?.addEventListener(`click`,()=>{r&&(n.stage=r,A(),Y({animateItems:!1}),S(`Lead moved to ${r}`))}),document.getElementById(`convert-lead-job-btn`)?.addEventListener(`click`,()=>{V(t.selectedDayIndex,n.name)})}function q(e){let r=e||n;r.querySelector(`#paid-kpi-btn`)?.addEventListener(`click`,()=>z(`paid`)),r.querySelector(`#unpaid-kpi-btn`)?.addEventListener(`click`,()=>z(`unpaid`)),r.querySelector(`#see-calendar-btn`)?.addEventListener(`click`,()=>N(`calendar`)),r.querySelectorAll(`[data-graph-day]`).forEach(e=>{e.addEventListener(`click`,()=>{t.selectedGraphDayIndex=Number(e.getAttribute(`data-graph-day`)),Y({animateItems:!1})})}),r.querySelectorAll(`[data-quick]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-quick`);t===`new-job`?V():t===`send-invoice`?H():t===`add-contact`?U():t===`log-lead`&&W()})}),r.querySelectorAll(`[data-job-id]`).forEach(e=>{e.addEventListener(`click`,()=>{B(e.getAttribute(`data-job-id`))})}),r.querySelector(`#contact-search-input`)?.addEventListener(`input`,e=>{t.contactQuery=e.target.value;let n=e.target.selectionStart;Y({animateItems:!1});let r=document.getElementById(`contact-search-input`);r&&(r.focus(),r.setSelectionRange(n,n))}),r.querySelector(`#contact-search-clear`)?.addEventListener(`click`,()=>{t.contactQuery=``,Y({animateItems:!0}),document.getElementById(`contact-search-input`)?.focus()}),r.querySelectorAll(`[data-contact-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{t.contactFilter=e.getAttribute(`data-contact-filter`),Y({animateItems:!0})})}),r.querySelector(`#contacts-add-btn`)?.addEventListener(`click`,U),r.querySelectorAll(`[data-contact-id]`).forEach(e=>{e.addEventListener(`click`,()=>{G(e.getAttribute(`data-contact-id`))})}),r.querySelector(`#cal-today-btn`)?.addEventListener(`click`,()=>{t.selectedDayIndex=1,Y({animateItems:!0})}),r.querySelector(`#cal-add-btn`)?.addEventListener(`click`,()=>{V(t.selectedDayIndex)}),r.querySelector(`#empty-cal-add-btn`)?.addEventListener(`click`,()=>{V(t.selectedDayIndex)}),r.querySelectorAll(`[data-day-index]`).forEach(e=>{e.addEventListener(`click`,()=>{t.selectedDayIndex=Number(e.getAttribute(`data-day-index`)),Y({animateItems:!0})})}),r.querySelector(`#leads-add-btn`)?.addEventListener(`click`,W),r.querySelectorAll(`[data-lead-filter]`).forEach(e=>{e.addEventListener(`click`,()=>{t.leadFilter=e.getAttribute(`data-lead-filter`),Y({animateItems:!0})})}),r.querySelectorAll(`[data-lead-id]`).forEach(e=>{e.addEventListener(`click`,()=>{K(e.getAttribute(`data-lead-id`))})})}function J(){return t.activeTab===`home`?F():t.activeTab===`contacts`?I():t.activeTab===`calendar`?L():R()}function Y(e={}){if(!n)return;let{wooshDirection:t=0,animateItems:r=!0}=e;clearTimeout(M),n.querySelectorAll(`.page-outgoing`).forEach(e=>e.remove());let i=n.querySelector(`.page-stage:not(.page-outgoing)`);if(t!==0&&i){let e=i.cloneNode(!0);e.querySelectorAll(`[id]`).forEach(e=>e.removeAttribute(`id`)),e.classList.remove(`animate-items`,`page-woosh-in-right`,`page-woosh-in-left`),e.classList.add(`page-outgoing`,t>0?`page-woosh-out-left`:`page-woosh-out-right`),e.setAttribute(`aria-hidden`,`true`),i.replaceWith(e),M=setTimeout(()=>{e.remove()},260)}else n.innerHTML=``;let a=document.createElement(`div`);a.className=`page-stage`,r&&a.classList.add(`animate-items`),t>0?a.classList.add(`page-woosh-in-right`):t<0&&a.classList.add(`page-woosh-in-left`),a.innerHTML=J(),n.appendChild(a),q(a)}document.getElementById(`demo-profile-initials`).textContent=e.profile.initials,document.getElementById(`reset-demo`).addEventListener(`click`,()=>location.reload()),O(),Y({animateItems:!0}),parent!==window&&parent.postMessage({type:`scheduler-demo-ready`},location.origin);