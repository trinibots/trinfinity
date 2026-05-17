/* ============================================================
   TRINFINITY — trinfinity-core.js
   Main entry point. Wires all modules together.
   by trinity (trinachronism)
   https://github.com/trinibots/trinfinity
   v0.3.0
   ============================================================ */

(function () {
  'use strict';

  const TF_VERSION = '0.3.0';
  const TF_KEY     = 'trinfinity_settings';

  const TF_STYLES = ['gossamer', 'fade', 'pulse', 'ebb', 'flow', 'void', 'loom'];

  /* ── Default settings ── */
  const DEFAULTS = {
    style:   'gossamer',
    theme:   'ultraviolet',
    font:    'A',
    customDisplayFont: '',
    customBodyFont:    '',
    btnX:    '20px',
    btnY:    '80px',

    portraitW: 120,
    portraitH: 160,

    gossamerBlur:    10,
    gossamerOpacity: 72,
    gossamerFeather: 32,

    fadeStart:   40,
    fadeReach:   70,
    fadeFloor:   8,

    pulseSpeed:     2.4,
    pulseIntensity: 70,
    pulseRadius:    8,
    pulseR:         139,
    pulseG:         92,
    pulseB:         246,
    pulseAuto:      true,

    ebbOpacity:    45,
    ebbDesaturate: 60,

    flowScale:    106,
    flowVibrancy: 115,

    voidLineHeight:    195,
    voidLetterSpacing: 13,

    loomRadius:          3,
    loomVignette:        55,
    loomVignetteSpread:  60,
  };

  /* ── Settings ── */
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

  /* ── CSS variable helper ── */
  function setVar(name, value) {
    document.documentElement.style.setProperty(name, String(value));
  }

  /* ── Apply all CSS vars from cfg ── */
  function applyAllVars() {
    setVar('--tf-portrait-w',            cfg.portraitW + 'px');
    setVar('--tf-portrait-h',            cfg.portraitH + 'px');
    setVar('--tf-gossamer-blur',          cfg.gossamerBlur + 'px');
    setVar('--tf-gossamer-opacity',       (cfg.gossamerOpacity / 100).toFixed(2));
    setVar('--tf-gossamer-feather',       cfg.gossamerFeather + 'px');
    setVar('--tf-fade-start',             cfg.fadeStart + '%');
    setVar('--tf-fade-reach',             cfg.fadeReach + '%');
    setVar('--tf-fade-floor',             (cfg.fadeFloor / 100).toFixed(2));
    setVar('--tf-pulse-speed',            parseFloat(cfg.pulseSpeed).toFixed(1) + 's');
    setVar('--tf-pulse-intensity',        (cfg.pulseIntensity / 100).toFixed(2));
    setVar('--tf-pulse-radius',           cfg.pulseRadius + 'px');
    setVar('--tf-pulse-r',                cfg.pulseR);
    setVar('--tf-pulse-g',                cfg.pulseG);
    setVar('--tf-pulse-b',                cfg.pulseB);
    setVar('--tf-ebb-opacity',            (cfg.ebbOpacity / 100).toFixed(2));
    setVar('--tf-ebb-desaturate',         cfg.ebbDesaturate + '%');
    /* Pre-computed saturate value: 0 desat = saturate(1), 100 desat = saturate(0) */
    setVar('--tf-ebb-saturate',           (1 - cfg.ebbDesaturate / 100).toFixed(2));
    setVar('--tf-flow-scale',             (cfg.flowScale / 100).toFixed(2));
    setVar('--tf-flow-vibrancy',          (cfg.flowVibrancy / 100).toFixed(2));
    setVar('--tf-void-lh',                (cfg.voidLineHeight / 100).toFixed(2));
    setVar('--tf-void-ls',                (cfg.voidLetterSpacing / 100).toFixed(2) + 'em');
    setVar('--tf-loom-radius',            cfg.loomRadius + 'px');
    setVar('--tf-loom-vignette',          (cfg.loomVignette / 100).toFixed(2));
    setVar('--tf-loom-vignette-spread',   cfg.loomVignetteSpread + '%');
  }

  /* ── Style ── */
  function applyStyle(style) {
    const chat = document.getElementById('chat');
    if (chat) chat.setAttribute('data-tf-style', style);
    cfg.style = style;
  }

  /* ── Theme (delegates to tfApplyTheme from trinfinity-themes.js) ── */
  function applyTheme(themeKey) {
    if (typeof tfApplyTheme === 'function') {
      tfApplyTheme(themeKey, cfg, setVar);
    } else {
      /* Fallback: just set the attribute */
      document.documentElement.setAttribute('data-tf-theme', themeKey);
      cfg.theme = themeKey;
    }
  }

  /* ── Font (delegates to tfApplyFont from trinfinity-fonts.js) ── */
  function applyFont(pairKey) {
    if (typeof tfApplyFont === 'function') {
      tfApplyFont(pairKey, cfg, setVar);
    } else {
      document.documentElement.setAttribute('data-tf-font', pairKey);
      cfg.font = pairKey;
    }
  }

  /* ── Load custom fonts ── */
  function loadCustomFonts(c) {
    if (typeof tfLoadGoogleFont === 'function') {
      if (c.customDisplayFont) {
        tfLoadGoogleFont(c.customDisplayFont);
        setVar('--tf-font-display', `'${c.customDisplayFont}', serif`);
      }
      if (c.customBodyFont) {
        tfLoadGoogleFont(c.customBodyFont);
        setVar('--tf-font-body', `'${c.customBodyFont}', sans-serif`);
      }
    }
  }

  /* ── Render sliders (delegates to tfRenderSliders) ── */
  function renderSliders(style) {
    const container = document.getElementById('tf-style-sliders');
    if (typeof tfRenderSliders === 'function') {
      tfRenderSliders(style, cfg, setVar, container, saveSettings);
    }
  }

  /* ── Avatar refresh ── */
  function refreshPortraits() {
    if (typeof tfRefreshPortraits === 'function') {
      tfRefreshPortraits(cfg);
    }
  }

  /* ── Panel toggle ── */
  function togglePanel() {
    if (typeof tfTogglePanel === 'function') {
      tfTogglePanel(cfg);
    }
  }

  /* ── Build the floating button ── */
  function buildButton() {
    if (typeof tfBuildButton === 'function') {
      tfBuildButton(cfg, togglePanel);
    }
  }

  /* ── Build the settings panel ── */
  function buildPanel() {
    if (typeof tfBuildPanel === 'function') {
      tfBuildPanel(cfg, {
        TF_VERSION,
        TF_STYLES,
        TF_THEME_DATA:  (typeof TF_THEME_DATA  !== 'undefined') ? TF_THEME_DATA  : {},
        TF_FONT_PAIRS:  (typeof TF_FONT_PAIRS  !== 'undefined') ? TF_FONT_PAIRS  : {},
        applyTheme,
        applyStyle,
        applyFont,
        setVar,
        renderSliders,
        loadCustomFonts,
        saveSettings,
        refreshPortraits,
      });
    }
  }

  /* ── Add to ST Extensions menu ── */
  function addExtensionMenuEntry() {
    if (typeof tfAddExtensionMenuEntry === 'function') {
      tfAddExtensionMenuEntry(togglePanel);
    }
  }

  /* ── Inline-load all src/ modules then initialise ──
     ST extensions load as a single JS file, so we inline
     the module contents via script tags here. */
  function loadModules(callbacks) {
    const modules = [
      'src/trinfinity-themes.js',
      'src/trinfinity-fonts.js',
      'src/trinfinity-avatar.js',
      'src/trinfinity-sliders.js',
      'src/trinfinity-panel.js',
    ];

    let loaded = 0;
    modules.forEach(src => {
      const script = document.createElement('script');
      /* Resolve relative to this extension's folder */
      const base = (document.currentScript && document.currentScript.src)
        ? document.currentScript.src.replace(/[^/]+$/, '')
        : '/scripts/extensions/third-party/trinfinity/';
      script.src = base + src;
      script.onload  = () => { loaded++; if (loaded === modules.length) callbacks(); };
      script.onerror = () => { loaded++; if (loaded === modules.length) callbacks(); };
      document.head.appendChild(script);
    });
  }

  /* ── Main init ── */
  function init() {
    loadSettings();
    applyAllVars();

    loadModules(() => {
      /* Apply theme + font now modules are ready */
      applyTheme(cfg.theme);
      applyFont(cfg.font);
      loadCustomFonts(cfg);

      const ready = () => {
        applyStyle(cfg.style);
        buildButton();
        buildPanel();
        addExtensionMenuEntry();

        /* Avatar enhancement — slight delay to let ST render chat */
        setTimeout(() => {
          if (typeof tfStartAvatarObserver === 'function') {
            tfStartAvatarObserver(cfg);
          }
        }, 900);
      };

      if (document.body) {
        ready();
      } else {
        document.addEventListener('DOMContentLoaded', ready);
      }
    });
  }

  init();

})();
