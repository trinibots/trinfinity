/* ============================================================
   TRINFINITY — trinfinity-core.js
   Floating button · Settings panel · Style + theme switching
   Real-time sliders · Font loader
   by trinity (trinachronism) · v0.1.0
   ============================================================ */

(function () {
  'use strict';

  /* ── Constants ── */
  const TF_VERSION  = '0.1.0';
  const TF_KEY      = 'trinfinity_settings';
  const TF_STYLES   = ['gossamer', 'fade', 'pulse', 'ebb', 'flow', 'void', 'loom'];
  const TF_THEMES   = [
    'ultraviolet', 'viscera', 'undertow', 'opulence', 'ashen',
    'revenant', 'ember', 'venom', 'requiem', 'lacuna', 'blossom', 'dusk'
  ];
  const TF_FONTS    = ['A', 'B', 'C', 'D', 'custom'];
  const TF_FONT_LABELS = {
    A: 'Cinzel + Calibri',
    B: 'Cormorant Garamond + Georgia',
    C: 'Josefin Sans + Lato',
    D: 'IM Fell English + Palatino',
    custom: 'Custom (Google Fonts)'
  };

  /* ── Default settings ── */
  const DEFAULTS = {
    style:   'gossamer',
    theme:   'ultraviolet',
    font:    'A',
    customDisplayFont: '',
    customBodyFont:    '',
    btnX:    '20px',
    btnY:    '80px',
    btnSide: 'right',

    /* Gossamer */
    gossamerBlur:    10,
    gossamerOpacity: 72,
    gossamerFeather: 32,

    /* Fade */
    fadeStart:   40,
    fadeReach:   70,
    fadeFloor:   8,

    /* Pulse */
    pulseSpeed:     2.4,
    pulseIntensity: 70,
    pulseRadius:    8,
    pulseR:         139,
    pulseG:         92,
    pulseB:         246,
    pulseAuto:      true,

    /* Ebb */
    ebbOpacity:    45,
    ebbDesaturate: 60,

    /* Flow */
    flowScale:    106,
    flowVibrancy: 115,

    /* Void */
    voidLineHeight:     195,
    voidLetterSpacing:  13,

    /* Loom */
    loomRadius:          3,
    loomVignette:        55,
    loomVignetteSpread:  60,
  };

  /* ── Load / save settings ── */
  let cfg = Object.assign({}, DEFAULTS);

  function loadSettings() {
    try {
      const raw = localStorage.getItem(TF_KEY);
      if (raw) cfg = Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch(e) {}
  }

  function saveSettings() {
    try { localStorage.setItem(TF_KEY, JSON.stringify(cfg)); } catch(e) {}
  }

  /* ── Apply theme / style / font to DOM ── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-tf-theme', theme);
    cfg.theme = theme;
    saveSettings();
  }

  function applyStyle(style) {
    document.getElementById('chat')?.setAttribute('data-tf-style', style);
    cfg.style = style;
    saveSettings();
  }

  function applyFont(pair) {
    document.documentElement.setAttribute('data-tf-font', pair);
    cfg.font = pair;
    saveSettings();
  }

  /* ── CSS variable helpers ── */
  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function applyAllVars() {
    setVar('--tf-gossamer-blur',    cfg.gossamerBlur + 'px');
    setVar('--tf-gossamer-opacity', (cfg.gossamerOpacity / 100).toFixed(2));
    setVar('--tf-gossamer-feather', cfg.gossamerFeather + 'px');

    setVar('--tf-fade-start',  cfg.fadeStart + '%');
    setVar('--tf-fade-reach',  cfg.fadeReach + '%');
    setVar('--tf-fade-floor',  (cfg.fadeFloor / 100).toFixed(2));

    setVar('--tf-pulse-speed',     cfg.pulseSpeed.toFixed(1) + 's');
    setVar('--tf-pulse-intensity', (cfg.pulseIntensity / 100).toFixed(2));
    setVar('--tf-pulse-radius',    cfg.pulseRadius + 'px');
    setVar('--tf-pulse-r',         cfg.pulseR);
    setVar('--tf-pulse-g',         cfg.pulseG);
    setVar('--tf-pulse-b',         cfg.pulseB);

    setVar('--tf-ebb-opacity',    (cfg.ebbOpacity / 100).toFixed(2));
    setVar('--tf-ebb-desaturate', cfg.ebbDesaturate + '%');

    setVar('--tf-flow-scale',    (cfg.flowScale / 100).toFixed(2));
    setVar('--tf-flow-vibrancy', (cfg.flowVibrancy / 100).toFixed(2));

    setVar('--tf-void-lh', (cfg.voidLineHeight / 100).toFixed(2));
    setVar('--tf-void-ls', (cfg.voidLetterSpacing / 100).toFixed(2) + 'em');

    setVar('--tf-loom-radius',          cfg.loomRadius + 'px');
    setVar('--tf-loom-vignette',        (cfg.loomVignette / 100).toFixed(2));
    setVar('--tf-loom-vignette-spread', cfg.loomVignetteSpread + '%');
  }

  /* ── Google Fonts loader ── */
  function loadGoogleFont(family) {
    if (!family) return;
    const id = 'tf-gfont-' + family.replace(/\s+/g, '-');
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id   = id;
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' +
      encodeURIComponent(family) + ':wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }

  /* ── Build the lemniscate SVG icon ── */
  function makeLemniscateSVG() {
    /* Lemniscate path + bisecting vertical line + triangle formed
       by the intersection points — combination of B and C */
    return `<svg viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 14
        C24 14 18 4 10 4
        C4 4 2 8.5 2 14
        C2 19.5 4 24 10 24
        C18 24 24 14 24 14
        C24 14 30 4 38 4
        C44 4 46 8.5 46 14
        C46 19.5 44 24 38 24
        C30 24 24 14 24 14Z"
        stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="24" y1="4" x2="24" y2="24" stroke-opacity="0.5" stroke-dasharray="2 2"/>
      <polygon points="24,4 19,18 29,18" stroke-opacity="0.8" fill="none"/>
    </svg>`;
  }

  /* ── Build the floating button ── */
  function buildButton() {
    const btn = document.createElement('div');
    btn.id = 'trinfinity-btn';
    btn.title = 'Trinfinity Settings';
    btn.innerHTML = makeLemniscateSVG();

    /* Position from saved settings */
    btn.style.right  = cfg.btnX;
    btn.style.bottom = cfg.btnY;

    /* Toggle panel on click */
    btn.addEventListener('click', (e) => {
      if (btn._dragged) { btn._dragged = false; return; }
      togglePanel();
    });

    /* Drag to reposition */
    makeDraggable(btn);

    document.body.appendChild(btn);
    return btn;
  }

  function makeDraggable(el) {
    let startX, startY, startRight, startBottom, moved;

    el.addEventListener('mousedown', (e) => {
      moved  = false;
      startX = e.clientX;
      startY = e.clientY;
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
          cfg.btnX = el.style.right;
          cfg.btnY = el.style.bottom;
          saveSettings();
        }
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      e.preventDefault();
    });
  }

  /* ── Build the settings panel ── */
  function buildPanel() {
    const panel = document.createElement('div');
    panel.id = 'trinfinity-panel';

    panel.innerHTML = `
      <div class="tf-panel-header">
        <span class="tf-panel-title">∞ Trinfinity</span>
        <button class="tf-panel-close" id="tf-close">✕</button>
      </div>
      <div class="tf-panel-body">

        <!-- Message Style -->
        <div>
          <span class="tf-section-label">Message Style</span>
          <select class="tf-select" id="tf-style-select">
            ${TF_STYLES.map(s => `<option value="${s}" ${cfg.style===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
          </select>
        </div>

        <!-- Colour Theme -->
        <div>
          <span class="tf-section-label">Colour Theme</span>
          <select class="tf-select" id="tf-theme-select">
            ${TF_THEMES.map(t => `<option value="${t}" ${cfg.theme===t?'selected':''}>${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join('')}
          </select>
        </div>

        <!-- Font Pair -->
        <div>
          <span class="tf-section-label">Font Pair</span>
          <select class="tf-select" id="tf-font-select">
            ${TF_FONTS.map(f => `<option value="${f}" ${cfg.font===f?'selected':''}>${TF_FONT_LABELS[f]}</option>`).join('')}
          </select>
          <div id="tf-custom-fonts" style="margin-top:8px;gap:6px;flex-direction:column;display:${cfg.font==='custom'?'flex':'none'}">
            <input class="tf-input" id="tf-font-display" placeholder="Display font (e.g. Playfair Display)" value="${cfg.customDisplayFont}"/>
            <input class="tf-input" id="tf-font-body"    placeholder="Body font (e.g. Lora)" value="${cfg.customBodyFont}"/>
            <button class="tf-select" id="tf-font-apply" style="cursor:pointer">Load Fonts ↗</button>
          </div>
        </div>

        <hr class="tf-divider"/>

        <!-- Style-specific sliders -->
        <div id="tf-style-sliders"></div>

        <hr class="tf-divider"/>

        <div class="tf-about">
          Trinfinity v${TF_VERSION} · by trinity (trinachronism)
        </div>

      </div>
    `;

    document.body.appendChild(panel);

    /* Position panel above button */
    positionPanel();

    /* Events */
    document.getElementById('tf-close').addEventListener('click', closePanel);

    document.getElementById('tf-style-select').addEventListener('change', (e) => {
      applyStyle(e.target.value);
      renderSliders(e.target.value);
    });

    document.getElementById('tf-theme-select').addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });

    document.getElementById('tf-font-select').addEventListener('change', (e) => {
      const val = e.target.value;
      applyFont(val);
      document.getElementById('tf-custom-fonts').style.display = val === 'custom' ? 'flex' : 'none';
    });

    document.getElementById('tf-font-apply').addEventListener('click', () => {
      const display = document.getElementById('tf-font-display').value.trim();
      const body    = document.getElementById('tf-font-body').value.trim();
      cfg.customDisplayFont = display;
      cfg.customBodyFont    = body;
      if (display) loadGoogleFont(display);
      if (body)    loadGoogleFont(body);
      setVar('--tf-custom-display', `'${display}', serif`);
      setVar('--tf-custom-body',    `'${body}', sans-serif`);
      saveSettings();
    });

    renderSliders(cfg.style);
    return panel;
  }

  function positionPanel() {
    const panel = document.getElementById('trinfinity-panel');
    const btn   = document.getElementById('trinfinity-btn');
    if (!panel || !btn) return;
    const btnRight  = parseInt(btn.style.right)  || 20;
    const btnBottom = parseInt(btn.style.bottom) || 80;
    panel.style.right  = btnRight + 'px';
    panel.style.bottom = (btnBottom + 54) + 'px';
  }

  /* ── Slider definitions per style ── */
  const SLIDER_DEFS = {
    gossamer: [
      { key: 'gossamerBlur',    label: 'Blur',           min: 0,  max: 24,  step: 1,  unit: 'px',  varName: '--tf-gossamer-blur',    format: v => v + 'px' },
      { key: 'gossamerOpacity', label: 'Opacity',        min: 0,  max: 95,  step: 1,  unit: '%',   varName: '--tf-gossamer-opacity', format: v => (v/100).toFixed(2) },
      { key: 'gossamerFeather', label: 'Avatar Feather', min: 0,  max: 80,  step: 2,  unit: 'px',  varName: '--tf-gossamer-feather', format: v => v + 'px' },
    ],
    fade: [
      { key: 'fadeStart', label: 'Fade Start',  min: 0,  max: 90,  step: 1,  unit: '%', varName: '--tf-fade-start', format: v => v + '%' },
      { key: 'fadeReach', label: 'Fade Reach',  min: 10, max: 100, step: 1,  unit: '%', varName: '--tf-fade-reach', format: v => v + '%' },
      { key: 'fadeFloor', label: 'Floor Opacity', min: 0, max: 50, step: 1,  unit: '%', varName: '--tf-fade-floor', format: v => (v/100).toFixed(2) },
    ],
    pulse: [
      { key: 'pulseSpeed',     label: 'Beat Speed',   min: 0.5, max: 6,   step: 0.1, unit: 's',  varName: '--tf-pulse-speed',     format: v => parseFloat(v).toFixed(1) + 's' },
      { key: 'pulseIntensity', label: 'Intensity',    min: 0,   max: 100, step: 1,   unit: '%',  varName: '--tf-pulse-intensity', format: v => (v/100).toFixed(2) },
      { key: 'pulseRadius',    label: 'Glow Radius',  min: 0,   max: 28,  step: 1,   unit: 'px', varName: '--tf-pulse-radius',    format: v => v + 'px' },
      { key: 'pulseR', label: 'Red',   min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-r', format: v => v, color: true },
      { key: 'pulseG', label: 'Green', min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-g', format: v => v, color: true },
      { key: 'pulseB', label: 'Blue',  min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-b', format: v => v, color: true },
    ],
    ebb: [
      { key: 'ebbOpacity',    label: 'Portrait Opacity', min: 0,  max: 95, step: 1, unit: '%', varName: '--tf-ebb-opacity',    format: v => (v/100).toFixed(2) },
      { key: 'ebbDesaturate', label: 'Desaturate',       min: 0,  max: 100,step: 1, unit: '%', varName: '--tf-ebb-desaturate', format: v => v + '%' },
    ],
    flow: [
      { key: 'flowScale',    label: 'Portrait Scale',   min: 100, max: 120, step: 1, unit: '%', varName: '--tf-flow-scale',    format: v => (v/100).toFixed(2) },
      { key: 'flowVibrancy', label: 'Colour Vibrancy',  min: 100, max: 140, step: 1, unit: '%', varName: '--tf-flow-vibrancy', format: v => (v/100).toFixed(2) },
    ],
    void: [
      { key: 'voidLineHeight',    label: 'Line Height',      min: 140, max: 220, step: 5,  unit: '',    varName: '--tf-void-lh', format: v => (v/100).toFixed(2) },
      { key: 'voidLetterSpacing', label: 'Name Spacing',     min: 8,   max: 25,  step: 1,  unit: '/100em', varName: '--tf-void-ls', format: v => (v/100).toFixed(2) + 'em' },
    ],
    loom: [
      { key: 'loomRadius',         label: 'Corner Softness', min: 0, max: 6,   step: 1,  unit: 'px', varName: '--tf-loom-radius',          format: v => v + 'px' },
      { key: 'loomVignette',       label: 'Vignette',        min: 0, max: 90,  step: 1,  unit: '%',  varName: '--tf-loom-vignette',        format: v => (v/100).toFixed(2) },
      { key: 'loomVignetteSpread', label: 'Vignette Spread', min: 20,max: 90,  step: 5,  unit: '%',  varName: '--tf-loom-vignette-spread', format: v => v + '%' },
    ],
  };

  function renderSliders(style) {
    const container = document.getElementById('tf-style-sliders');
    if (!container) return;
    const defs = SLIDER_DEFS[style];
    if (!defs || !defs.length) { container.innerHTML = ''; return; }

    const label = style.charAt(0).toUpperCase() + style.slice(1);
    let html = `<span class="tf-section-label">${label} Settings</span>`;

    /* Pulse: RGB preview swatch */
    if (style === 'pulse') {
      html += `<div class="tf-row" style="margin-bottom:6px">
        <span class="tf-slider-label">Pulse Colour</span>
        <div id="tf-pulse-swatch" style="width:36px;height:18px;border-radius:3px;border:1px solid rgba(255,255,255,0.15);background:rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})"></div>
      </div>`;
    }

    defs.forEach(def => {
      const val = cfg[def.key];
      html += `
        <div class="tf-row" style="margin-bottom:6px">
          <span class="tf-slider-label">${def.label}</span>
          <input type="range" class="tf-slider"
            data-key="${def.key}"
            data-var="${def.varName}"
            data-format="${def.key}"
            min="${def.min}" max="${def.max}" step="${def.step}"
            value="${val}"/>
          <span class="tf-slider-val" id="tfv-${def.key}">${val}${def.unit}</span>
        </div>`;
    });

    container.innerHTML = html;

    /* Wire up sliders */
    container.querySelectorAll('.tf-slider').forEach(slider => {
      slider.addEventListener('input', function() {
        const key     = this.dataset.key;
        const varName = this.dataset.var;
        const rawVal  = parseFloat(this.value);
        cfg[key] = rawVal;

        /* Find the def to get the format fn */
        const def = defs.find(d => d.key === key);
        const cssVal = def ? def.format(rawVal) : rawVal;
        setVar(varName, cssVal);

        /* Update the value label */
        const def2 = SLIDER_DEFS[style].find(d => d.key === key);
        const display = def2 ? rawVal + def2.unit : rawVal;
        const valEl = document.getElementById('tfv-' + key);
        if (valEl) valEl.textContent = display;

        /* Update pulse swatch */
        if (['pulseR','pulseG','pulseB'].includes(key)) {
          const swatch = document.getElementById('tf-pulse-swatch');
          if (swatch) swatch.style.background = `rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})`;
        }

        saveSettings();
      });
    });
  }

  /* ── Panel open/close ── */
  function togglePanel() {
    const panel = document.getElementById('trinfinity-panel');
    if (!panel) return;
    panel.classList.toggle('tf-open');
    if (panel.classList.contains('tf-open')) positionPanel();
  }

  function closePanel() {
    document.getElementById('trinfinity-panel')?.classList.remove('tf-open');
  }

  /* ── Also wire into ST's Extensions menu ── */
  function addExtensionMenuEntry() {
    /* ST uses #extensionsMenu or similar — attempt to add a button */
    const tryAdd = () => {
      const menu = document.querySelector('#extensionsMenu, .extensions-menu, #extension-settings');
      if (!menu) return;
      if (document.getElementById('tf-ext-btn')) return;
      const btn = document.createElement('div');
      btn.id = 'tf-ext-btn';
      btn.style.cssText = 'cursor:pointer;padding:8px 16px;color:var(--tf-accent-soft,#a78bfa);font-family:var(--tf-font-display,Cinzel,serif);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;border-bottom:1px solid var(--tf-accent-border-mid,rgba(139,92,246,0.18))';
      btn.textContent = '∞ Trinfinity';
      btn.addEventListener('click', () => { togglePanel(); });
      menu.prepend(btn);
    };
    setTimeout(tryAdd, 2000);
  }

  /* ── Initialise ── */
  function init() {
    loadSettings();
    applyTheme(cfg.theme);
    applyFont(cfg.font);
    applyAllVars();

    /* Load any saved custom fonts */
    if (cfg.customDisplayFont) loadGoogleFont(cfg.customDisplayFont);
    if (cfg.customBodyFont)    loadGoogleFont(cfg.customBodyFont);

    /* Wait for body/chat to be ready */
    const ready = () => {
      applyStyle(cfg.style);
      buildButton();
      buildPanel();
      addExtensionMenuEntry();
    };

    if (document.body) {
      ready();
    } else {
      document.addEventListener('DOMContentLoaded', ready);
    }
  }

  /* ST loads extensions after DOMContentLoaded — run immediately */
  init();

})();
