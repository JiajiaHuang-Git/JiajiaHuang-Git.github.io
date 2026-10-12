(() => {
  'use strict';

  const script = document.currentScript;
  const measurementId = script && script.dataset.measurementId;
  const settingsButton = document.getElementById('analytics-settings');
  const productionHost = 'jiajiahuang-git.github.io';

  // Local files and preview servers must never contact Google Analytics.
  if (location.protocol !== 'https:' || location.hostname !== productionHost ||
      !/^G-[A-Z0-9]+$/.test(measurementId || '')) {
    if (settingsButton) settingsButton.hidden = true;
    return;
  }

  const storageKey = 'jiajiahuang-analytics-consent-v1';
  const disableKey = `ga-disable-${measurementId}`;
  let choice = null;
  let tagStarted = false;
  let choiceSaved = true;
  let priorChoiceMayRemain = false;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'allow' || saved === 'deny') choice = saved;
  } catch (_) {
    // Storage can be unavailable; analytics remains off until explicitly allowed.
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'analytics-dialog';
  dialog.setAttribute('aria-labelledby', 'analytics-dialog-title');
  dialog.innerHTML = `
    <div class="analytics-dialog-heading">
      <h2 id="analytics-dialog-title">Privacy &amp; analytics</h2>
      <button class="analytics-close" type="button" aria-label="Close privacy settings">Close</button>
    </div>
    <p>This personal website is maintained by Jiajia Huang. For privacy questions, contact
      <a href="mailto:jhuangdd@connect.ust.hk">jhuangdd@connect.ust.hk</a>.</p>
    <p>With your permission, Google Analytics helps me understand visits to this website through
      page visits, referring websites, device and browser information, and approximate geographic
      region. It does not tell me your name or GitHub account. Advertising features are disabled.</p>
    <p>Analytics is optional and stays off until you allow it. After you allow it, Google receives
      and processes analytics information and may process it on servers around the world.
      Query strings and URL fragments are excluded from the page and referrer addresses sent by
      this website.</p>
    <p>Analytics cookies expire after 90 days and are not renewed on each visit. Event-level data
      retention is set to two months; aggregate reports may remain available for longer.
      Your preference is stored separately in this browser until you change it or clear site data.</p>
    <p>You can change your choice here at any time. Keeping analytics off stops future collection
      and removes this website’s analytics cookies. It does not remove information already
      processed by Google.</p>
    <p>Read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses information from partner sites</a>
      or learn about the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics opt-out browser add-on</a>.</p>
    <p class="analytics-status" role="status"></p>
    <div class="analytics-actions">
      <button class="analytics-choice" type="button" data-choice="allow">Allow analytics</button>
      <button class="analytics-choice" type="button" data-choice="deny">Keep analytics off</button>
    </div>`;
  document.body.appendChild(dialog);

  const status = dialog.querySelector('.analytics-status');
  const closeDialog = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };
  const openDialog = () => {
    updateStatus();
    if (dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  dialog.querySelector('.analytics-close').addEventListener('click', closeDialog);
  if (settingsButton) {
    settingsButton.hidden = false;
    settingsButton.addEventListener('click', openDialog);
  }

  const notice = document.createElement('div');
  notice.className = 'analytics-notice';
  notice.setAttribute('role', 'region');
  notice.setAttribute('aria-label', 'Optional website analytics');
  notice.innerHTML = `
    <p>Optional analytics helps me understand visits to this website. Google Analytics uses
      cookies to measure page visits and device/browser information. Analytics stays off unless
      you agree. <button class="analytics-details" type="button">Privacy details</button></p>
    <div class="analytics-actions">
      <button class="analytics-choice" type="button" data-choice="allow">Allow analytics</button>
      <button class="analytics-choice" type="button" data-choice="deny">Keep analytics off</button>
    </div>`;
  notice.querySelector('.analytics-details').addEventListener('click', openDialog);

  function updateStatus() {
    status.textContent = choice === 'allow' ? 'Analytics is currently allowed.' : 'Analytics is currently off.';
    if (!choiceSaved) {
      status.textContent += priorChoiceMayRemain
        ? ' Your browser could not update or clear your saved preference. Analytics is off for this visit, but your previous preference may apply next time. Please check this setting again on your next visit.'
        : ' Your browser could not save this choice; it applies to this visit only.';
    }
  }

  function cleanAddress(address) {
    if (!address) return '';
    try {
      const url = new URL(address);
      return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : '';
    } catch (_) {
      return '';
    }
  }

  function startAnalytics() {
    if (tagStarted) return;
    tagStarted = true;
    window[disableKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: productionHost,
      cookie_expires: 7776000,
      cookie_update: false,
      page_location: location.origin + location.pathname,
      page_referrer: cleanAddress(document.referrer)
    });
    const googleTag = document.createElement('script');
    googleTag.async = true;
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(googleTag);
  }

  function clearAnalyticsCookies() {
    const cookieNames = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]);
    const domains = ['', `; domain=${productionHost}`, `; domain=.${productionHost}`];
    for (const name of cookieNames) {
      if (name !== '_ga' && !name.startsWith('_ga_')) continue;
      for (const domain of domains) {
        document.cookie = `${name}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}; SameSite=Lax; Secure`;
      }
    }
  }

  function setChoice(nextChoice) {
    const wasRunning = tagStarted;
    choice = nextChoice;
    try {
      localStorage.setItem(storageKey, choice);
      choiceSaved = true;
      priorChoiceMayRemain = false;
    } catch (_) {
      choiceSaved = false;
      priorChoiceMayRemain = choice === 'deny' && wasRunning;
    }
    notice.remove();
    updateStatus();
    closeDialog();

    if (choice === 'allow') {
      startAnalytics();
      return;
    }

    window[disableKey] = true;
    if (tagStarted && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    clearAnalyticsCookies();
    let safeToReload = choiceSaved;
    if (!choiceSaved) {
      try {
        // Removing a stale opt-in also makes the next document default to off.
        localStorage.removeItem(storageKey);
        safeToReload = true;
        priorChoiceMayRemain = false;
      } catch (_) {
        // Keep this document disabled if storage cannot replace or remove the old opt-in.
      }
    }
    updateStatus();
    // Reload only when an old saved opt-in cannot automatically restart analytics.
    if (wasRunning && safeToReload) location.reload();
    else if (!choiceSaved) openDialog();
  }

  for (const container of [notice, dialog]) {
    for (const button of container.querySelectorAll('[data-choice]')) {
      button.addEventListener('click', () => setChoice(button.dataset.choice));
    }
  }

  updateStatus();
  if (choice === 'allow') {
    startAnalytics();
  } else {
    window[disableKey] = true;
    // Clear leftovers from an earlier opt-in when the saved preference is off.
    clearAnalyticsCookies();
    if (choice === null) {
      const footer = document.querySelector('.site-footer');
      if (footer) footer.before(notice);
      else document.body.appendChild(notice);
    }
  }
})();
