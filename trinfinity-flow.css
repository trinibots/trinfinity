/* ============================================================
   TRINFINITY — src/trinfinity-panel.js
   Floating lemniscate button + settings panel UI
   ============================================================ */

function tfMakeLemniscateSVG() {
  /* Lemniscate with bisecting line + triangle at intersection —
     combination of the inside-eye and bisect-line concepts */
  return `<svg viewBox="0 0 52 30" xmlns="http://www.w3.org/2000/svg" class="tf-btn-svg">
    <!-- Lemniscate curve -->
    <path d="M26 15
      C26 15 20 4 11 4
      C4.5 4 2 8.8 2 15
      C2 21.2 4.5 26 11 26
      C20 26 26 15 26 15
      C26 15 32 4 41 4
      C47.5 4 50 8.8 50 15
      C50 21.2 47.5 26 41 26
      C32 26 26 15 26 15Z"
      stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Vertical bisect line through centre crossing point -->
    <line x1="26" y1="5" x2="26" y2="25"
      stroke-opacity="0.45" stroke-dasharray="1.5 2.5"/>
    <!-- Triangle: apex up, base formed by the two crossing tangent points -->
    <polygon points="26,5 20,20 32,20"
      stroke-opacity="0.75" fill="none" stroke-linejoin="round"/>
    <!-- Eye pupil — small circle at centre crossing -->
    <circle cx="26" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
  </svg>`;
}

function tfBuildButton(cfg, onToggle) {
  const existing = document.getElementById('trinfinity-btn');
  if (existing) existing.remove();

  const btn = document.createElement('div');
  btn.id        = 'trinfinity-btn';
  btn.title     = 'Trinfinity';
  btn.innerHTML = tfMakeLemniscateSVG();
  btn.style.right  = cfg.btnX || '20px';
  btn.style.bottom = cfg.btnY || '80px';

  btn.addEventListener('click', (e) => {
    if (btn._dragged) { btn._dragged = false; return; }
    onToggle();
  });

  tfMakeDraggable(btn, cfg);
  document.body.appendChild(btn);
  return btn;
}

function tfMakeDraggable(el, cfg) {
  let startX, startY, startRight, startBottom, moved;

  el.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    moved       = false;
    startX      = e.clientX;
    startY      = e.clientY;
    startRight  = parseInt(el.style.right)  || 20;
    startBottom = parseInt(el.style.bottom) || 80;

    function onMove(e) {
      const dx = startX - e.clientX;
      const dy = startY - e.clientY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
      el.style.right  = Math.max(0, startRight  + dx) + 'px';
      el.style.bottom = Math.max(0, startBottom + dy) + 'px';
    }

    function onUp() {
      if (moved) {
        el._dragged = true;
        cfg.btnX    = el.style.right;
        cfg.btnY    = el.style.bottom;
      }
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    e.preventDefault();
  });
}

function tfBuildPanel(cfg, deps) {
  const {
    TF_VERSION, TF_STYLES, TF_THEME_DATA, TF_FONT_PAIRS,
    applyTheme, applyStyle, applyFont, setVar,
    renderSliders, loadCustomFonts, saveSettings,
    refreshPortraits,
  } = deps;

  const existing = document.getElementById('trinfinity-panel');
  if (existing) existing.remove();

  const panel = document.createElement('div');
  panel.id = 'trinfinity-panel';

  const themeOptions = Object.entries(TF_THEME_DATA)
    .map(([k, v]) => `<option value="${k}" ${cfg.theme === k ? 'selected' : ''}>${v.label}</option>`)
    .join('');

  const styleOptions = TF_STYLES
    .map(s => `<option value="${s}" ${cfg.style === s ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`)
    .join('');

  const fontOptions = Object.entries(TF_FONT_PAIRS)
    .map(([k, v]) => `<option value="${k}" ${cfg.font === k ? 'selected' : ''}>${v.label}</option>`)
    .join('');

  panel.innerHTML = `
    <div class="tf-panel-header">
      <span class="tf-panel-title">∞ Trinfinity</span>
      <button class="tf-panel-close" id="tf-close" title="Close">✕</button>
    </div>
    <div class="tf-panel-body">

      <div class="tf-panel-section">
        <span class="tf-section-label">Message Style</span>
        <select class="tf-select" id="tf-style-select">${styleOptions}</select>
      </div>

      <div class="tf-panel-section">
        <span class="tf-section-label">Colour Theme</span>
        <select class="tf-select" id="tf-theme-select">${themeOptions}</select>
      </div>

      <div class="tf-panel-section">
        <span class="tf-section-label">Font Pair</span>
        <select class="tf-select" id="tf-font-select">${fontOptions}</select>
        <div id="tf-custom-fonts" class="tf-custom-fonts"
          style="display:${cfg.font === 'custom' ? 'flex' : 'none'}">
          <input class="tf-input" id="tf-font-display-input"
            placeholder="Display font (e.g. Playfair Display)"
            value="${cfg.customDisplayFont || ''}"/>
          <input class="tf-input" id="tf-font-body-input"
            placeholder="Body font (e.g. Lora)"
            value="${cfg.customBodyFont || ''}"/>
          <button class="tf-btn-small" id="tf-font-load-btn">Load Fonts ↗</button>
        </div>
      </div>

      <hr class="tf-divider"/>

      <div class="tf-panel-section" id="tf-style-sliders"></div>

      <hr class="tf-divider"/>

      <div class="tf-panel-section tf-about">
        <span>Trinfinity v${TF_VERSION}</span>
        <span>by trinity (trinachronism)</span>
        <a href="https://github.com/trinibots/trinfinity"
          target="_blank" rel="noopener">github.com/trinibots/trinfinity</a>
      </div>

    </div>
  `;

  document.body.appendChild(panel);
  tfPositionPanel(panel, cfg);

  /* ── Events ── */

  document.getElementById('tf-close')
    .addEventListener('click', () => tfClosePanel());

  document.getElementById('tf-style-select')
    .addEventListener('change', (e) => {
      applyStyle(e.target.value);
      renderSliders(e.target.value);
      saveSettings();
    });

  document.getElementById('tf-theme-select')
    .addEventListener('change', (e) => {
      applyTheme(e.target.value);
      saveSettings();
    });

  document.getElementById('tf-font-select')
    .addEventListener('change', (e) => {
      const val = e.target.value;
      applyFont(val);
      document.getElementById('tf-custom-fonts').style.display =
        val === 'custom' ? 'flex' : 'none';
      saveSettings();
    });

  document.getElementById('tf-font-load-btn')
    .addEventListener('click', () => {
      cfg.customDisplayFont =
        document.getElementById('tf-font-display-input').value.trim();
      cfg.customBodyFont =
        document.getElementById('tf-font-body-input').value.trim();
      loadCustomFonts(cfg);
      saveSettings();
    });

  /* Initial slider render */
  renderSliders(cfg.style);

  return panel;
}

function tfPositionPanel(panel, cfg) {
  if (!panel) return;
  const btn = document.getElementById('trinfinity-btn');
  if (!btn) return;
  const bRight  = parseInt(btn.style.right)  || 20;
  const bBottom = parseInt(btn.style.bottom) || 80;
  panel.style.right  = bRight + 'px';
  panel.style.bottom = (bBottom + 56) + 'px';
}

function tfTogglePanel(cfg) {
  const panel = document.getElementById('trinfinity-panel');
  if (!panel) return;
  const isOpen = panel.classList.toggle('tf-open');
  if (isOpen) tfPositionPanel(panel, cfg);
}

function tfClosePanel() {
  document.getElementById('trinfinity-panel')?.classList.remove('tf-open');
}

function tfAddExtensionMenuEntry(onToggle) {
  const tryAdd = () => {
    const menu = document.querySelector(
      '#extensionsMenu, .extensions-menu, #extension-settings'
    );
    if (!menu) return;
    if (document.getElementById('tf-ext-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'tf-ext-btn';
    btn.className = 'tf-ext-menu-btn';
    btn.textContent = '∞ Trinfinity';
    btn.addEventListener('click', onToggle);
    menu.prepend(btn);
  };
  setTimeout(tryAdd, 2000);
}
