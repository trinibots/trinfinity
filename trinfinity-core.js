/* ============================================================
   TRINFINITY — trinfinity-core.js
   v0.4.0 — by trinity (trinachronism)
   https://github.com/trinibots/trinfinity
   ============================================================ */

(function () {
  'use strict';

  const TF_VERSION = '0.4.0';
  const TF_KEY     = 'trinfinity_settings';
  const TF_CUSTOM_THEMES_KEY = 'trinfinity_custom_themes';

  const TF_STYLES = [
    'gossamer', 'fade', 'pulse', 'ebb', 'flow',
    'void', 'loom', 'reliquary-frame'
  ];

  const TF_STYLE_LABELS = {
    'gossamer':         'Gossamer',
    'fade':             'Fade',
    'pulse':            'Pulse',
    'ebb':              'Ebb',
    'flow':             'Flow',
    'void':             'Void',
    'loom':             'Loom',
    'reliquary-frame':  'Reliquary Frame',
  };

  /* ── Theme data ── */
  const TF_THEMES = {
    ultraviolet: { label:'Ultraviolet', swatch:'#8b5cf6',
      bg:'#0d0b10', bgMid:'#120e1c', bgSurface:'rgba(18,12,36,0.72)', bgUser:'rgba(42,31,74,0.72)',
      accent:'#8b5cf6', accentSoft:'#a78bfa', accentGlow:'rgba(139,92,246,0.35)',
      border:'rgba(139,92,246,0.28)', borderMid:'rgba(139,92,246,0.18)', borderSub:'rgba(139,92,246,0.10)',
      text:'#e8e2f5', textMuted:'#7c7398', textEm:'#a78bfa', textDialogue:'#c27aad',
      nameChar:'#8b5cf6', nameUser:'rgba(184,176,208,0.65)', scrollbar:'#3d3560',
      inputBg:'rgba(16,14,26,0.90)', topbar:'rgba(13,11,16,0.92)', sidebar:'rgba(18,16,26,0.95)',
      button:'rgba(109,40,217,0.50)', pr:139, pg:92, pb:246 },
    viscera:     { label:'Viscera',     swatch:'#c4364d',
      accent:'#8b1a2a', accentSoft:'#c4364d', text:'#f0e6e8', textDialogue:'#e07090',
      bg:'#0a0406', pr:196, pg:54, pb:77 },
    undertow:    { label:'Undertow',    swatch:'#3bab7e',
      accent:'#1a4a3a', accentSoft:'#3bab7e', text:'#d4ece6', textDialogue:'#5ecfb0',
      bg:'#04080a', pr:59, pg:171, pb:126 },
    opulence:    { label:'Opulence',    swatch:'#e2c97e',
      accent:'#b5893a', accentSoft:'#e2c97e', text:'#f5edd8', textDialogue:'#f0d9a8',
      bg:'#090807', pr:226, pg:201, pb:126 },
    ashen:       { label:'Ashen',       swatch:'#c0bdb8',
      accent:'#6b6b6b', accentSoft:'#c0bdb8', text:'#e0ddd8', textDialogue:'#d4d0ca',
      bg:'#080808', pr:192, pg:189, pb:184 },
    revenant:    { label:'Revenant',    swatch:'#6b82d4',
      accent:'#2a3a6b', accentSoft:'#6b82d4', text:'#dce4f8', textDialogue:'#90a8e8',
      bg:'#050508', pr:107, pg:130, pb:212 },
    ember:       { label:'Ember',       swatch:'#d4723a',
      accent:'#8b3a0a', accentSoft:'#d4723a', text:'#f2e0d0', textDialogue:'#e89060',
      bg:'#0a0602', pr:212, pg:114, pb:58 },
    venom:       { label:'Venom',       swatch:'#6bd44a',
      accent:'#2a6b1a', accentSoft:'#6bd44a', text:'#d8f0d0', textDialogue:'#90e070',
      bg:'#040a04', pr:107, pg:212, pb:74 },
    requiem:     { label:'Requiem',     swatch:'#9b4dca',
      accent:'#4a1a5c', accentSoft:'#9b4dca', text:'#ecddf5', textDialogue:'#c080e0',
      bg:'#060408', pr:155, pg:77, pb:202 },
    lacuna:      { label:'Lacuna',      swatch:'#4ab8d4',
      accent:'#1a3a4a', accentSoft:'#4ab8d4', text:'#d8eef5', textDialogue:'#70d0e8',
      bg:'#060608', pr:74, pg:184, pb:212 },
    blossom:     { label:'Blossom',     swatch:'#d46ab0',
      accent:'#8b2a6b', accentSoft:'#d46ab0', text:'#f5ddf0', textDialogue:'#e890c8',
      bg:'#09050a', pr:212, pg:106, pb:176 },
    dusk:        { label:'Dusk',        swatch:'#b09ac8',
      accent:'#6b5a7a', accentSoft:'#b09ac8', text:'#ede8f5', textDialogue:'#c8a8e0',
      bg:'#080709', pr:176, pg:154, pb:200 },
    reliquary:   { label:'Reliquary',   swatch:'#c9a24a',
      accent:'#c9a24a', accentSoft:'#e2c275', text:'#e6d8bd', textDialogue:'#f0d9a8',
      bg:'#100c06', pr:201, pg:162, pb:74 },
    unfathomed:  { label:'Unfathomed',  swatch:'#8fd6cf',
      accent:'#5fb0ad', accentSoft:'#8fd6cf', text:'#dde6e3', textDialogue:'#c27aad',
      bg:'#08060e', pr:95, pg:176, pb:173 },
  };

  /* ── Font pairs ── */
  const TF_FONTS = {
    A: { label:'Cinzel + Calibri', url: null },
    B: { label:'Cormorant Garamond + Georgia', url:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap' },
    C: { label:'Josefin Sans + Lato', url:'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&family=Lato:wght@400;700&display=swap' },
    D: { label:'IM Fell English + Palatino', url:'https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap' },
    E: { label:'IM Fell SC + EB Garamond', url:'https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap' },
    custom: { label:'Custom (Google Fonts)', url: null },
  };

  /* ── Frame corners + symbols ── */
  const TF_CORNERS = [
    { id:'l-bracket', label:'⌐ L-bracket' },
    { id:'double',    label:'⊓ Double' },
    { id:'arc',       label:'◜ Arc' },
    { id:'dot',       label:'· Dot' },
    { id:'none',      label:'— None' },
  ];
  const TF_SYMBOLS = ['✦','❧','✿','⚜','∞','△','◈','—'];

  /* ── Defaults ── */
  const DEFAULTS = {
    style:   'gossamer',
    theme:   'ultraviolet',
    font:    'A',
    customDisplayFont: '',
    customBodyFont:    '',
    btnX: '20px', btnY: '80px',

    /* Global text */
    fontSize:   15,
    lineHeight: 175,

    /* Dialogue */
    dialogueOn:      true,
    dialogueGlow:    45,
    dialogueSize:    108,
    dialogueWash:    0,
    dialogueColour:  '',

    /* Portrait */
    portraitW: 120,
    portraitH: 160,

    /* Gossamer */
    gossamerBlur:    10,
    gossamerOpacity: 72,
    gossamerFeather: 32,
    gossamerRim:     false,
    gossamerRimAngle: 135,
    gossamerRimW:    1,
    gossamerRimStops: ['#8b5cf6','#3bab7e'],

    /* Fade */
    fadeStart:   40,
    fadeReach:   70,
    fadeFloor:   8,
    fadeFrame:   false,
    fadeFrameColour: '#c9a24a',
    fadeFrameCorner: 'l-bracket',
    fadeFrameSymbol: '✦',

    /* Pulse */
    pulseSpeed:     2.4,
    pulseIntensity: 70,
    pulseRadius:    8,
    pulseR: 139, pulseG: 92, pulseB: 246,
    pulseAuto: true,

    /* Ebb */
    ebbOpacity:    45,
    ebbDesaturate: 60,

    /* Flow */
    flowScale:    106,
    flowVibrancy: 115,

    /* Void */
    voidLineHeight:    195,
    voidLetterSpacing: 13,

    /* Loom */
    loomRadius:         3,
    loomVignette:       55,
    loomVignetteSpread: 60,
  };

  let cfg = Object.assign({}, DEFAULTS);
  let customThemes = {};

  /* ── Persist ── */
  function loadSettings() {
    try {
      const raw = localStorage.getItem(TF_KEY);
      if (raw) cfg = Object.assign({}, DEFAULTS, JSON.parse(raw));
      const ct = localStorage.getItem(TF_CUSTOM_THEMES_KEY);
      if (ct) customThemes = JSON.parse(ct);
    } catch(e) {}
  }
  function saveSettings() {
    try { localStorage.setItem(TF_KEY, JSON.stringify(cfg)); } catch(e) {}
  }
  function saveCustomThemes() {
    try { localStorage.setItem(TF_CUSTOM_THEMES_KEY, JSON.stringify(customThemes)); } catch(e) {}
  }

  /* ── CSS var helper ── */
  function setVar(k, v) {
    document.documentElement.style.setProperty(k, String(v));
  }

  /* ── Apply all vars from cfg ── */
  function applyAllVars() {
    setVar('--tf-font-size',            cfg.fontSize + 'px');
    setVar('--tf-line-height',          (cfg.lineHeight / 100).toFixed(2));
    setVar('--tf-dialogue-glow',        (cfg.dialogueGlow / 100).toFixed(2));
    setVar('--tf-dialogue-size',        (cfg.dialogueSize / 100).toFixed(2) + 'em');
    setVar('--tf-dialogue-wash',        (cfg.dialogueWash / 100).toFixed(2));
    setVar('--tf-portrait-w',           cfg.portraitW + 'px');
    setVar('--tf-portrait-h',           cfg.portraitH + 'px');
    setVar('--tf-gossamer-blur',        cfg.gossamerBlur + 'px');
    setVar('--tf-gossamer-opacity',     (cfg.gossamerOpacity / 100).toFixed(2));
    setVar('--tf-gossamer-feather',     cfg.gossamerFeather + 'px');
    setVar('--tf-gossamer-rim-angle',   cfg.gossamerRimAngle + 'deg');
    setVar('--tf-gossamer-rim-w',       cfg.gossamerRimW + 'px');
    setVar('--tf-gossamer-rim-stops',   cfg.gossamerRimStops.join(', '));
    setVar('--tf-fade-start',           cfg.fadeStart + '%');
    setVar('--tf-fade-reach',           cfg.fadeReach + '%');
    setVar('--tf-fade-floor',           (cfg.fadeFloor / 100).toFixed(2));
    setVar('--tf-fade-frame-colour',    cfg.fadeFrameColour);
    setVar('--tf-pulse-speed',          parseFloat(cfg.pulseSpeed).toFixed(1) + 's');
    setVar('--tf-pulse-intensity',      (cfg.pulseIntensity / 100).toFixed(2));
    setVar('--tf-pulse-radius',         cfg.pulseRadius + 'px');
    setVar('--tf-pulse-r',              cfg.pulseR);
    setVar('--tf-pulse-g',              cfg.pulseG);
    setVar('--tf-pulse-b',              cfg.pulseB);
    setVar('--tf-ebb-opacity',          (cfg.ebbOpacity / 100).toFixed(2));
    setVar('--tf-ebb-desaturate',       cfg.ebbDesaturate + '%');
    setVar('--tf-flow-scale',           (cfg.flowScale / 100).toFixed(2));
    setVar('--tf-flow-vibrancy',        (cfg.flowVibrancy / 100).toFixed(2));
    setVar('--tf-void-lh',              (cfg.voidLineHeight / 100).toFixed(2));
    setVar('--tf-void-ls',              (cfg.voidLetterSpacing / 100).toFixed(2) + 'em');
    setVar('--tf-loom-radius',          cfg.loomRadius + 'px');
    setVar('--tf-loom-vignette',        (cfg.loomVignette / 100).toFixed(2));
    setVar('--tf-loom-vignette-spread', cfg.loomVignetteSpread + '%');

    /* Dialogue colour — use custom or theme default */
    if (cfg.dialogueColour) {
      setVar('--tf-text-dialogue', cfg.dialogueColour);
    }

    /* Dialogue toggle — show/hide via opacity on .tf-dialogue elements */
    const dialogueEl = document.createElement('style');
    dialogueEl.id = 'tf-dialogue-toggle';
    const existing = document.getElementById('tf-dialogue-toggle');
    if (existing) existing.remove();
    if (!cfg.dialogueOn) {
      dialogueEl.textContent = '.mes_text q, .mes_text .tf-dialogue { color: var(--tf-text) !important; font-size: 1em !important; text-shadow: none !important; }';
    }
    document.head.appendChild(dialogueEl);
  }

  /* ── Apply theme ── */
  function applyTheme(key) {
    /* Custom theme */
    if (key === 'custom' || customThemes[key]) {
      const t = customThemes[key] || {};
      document.documentElement.setAttribute('data-tf-theme', '');
      if (t.bg)           setVar('--tf-bg-deep',       t.bg);
      if (t.accent)       setVar('--tf-accent',         t.accent);
      if (t.accentSoft)   setVar('--tf-accent-soft',    t.accentSoft);
      if (t.text)         setVar('--tf-text',            t.text);
      if (t.textEm)       setVar('--tf-text-em',         t.textEm);
      if (t.textDialogue) setVar('--tf-text-dialogue',   t.textDialogue);
      cfg.theme = key;
      return;
    }
    /* Preset theme — attribute swap, CSS handles the rest */
    document.documentElement.setAttribute('data-tf-theme', key);
    const t = TF_THEMES[key];
    if (t && cfg.pulseAuto) {
      setVar('--tf-pulse-r', t.pr || 139);
      setVar('--tf-pulse-g', t.pg || 92);
      setVar('--tf-pulse-b', t.pb || 246);
      cfg.pulseR = t.pr || 139;
      cfg.pulseG = t.pg || 92;
      cfg.pulseB = t.pb || 246;
    }
    cfg.theme = key;
  }

  /* ── Apply style ── */
  function applyStyle(style) {
    const chat = document.getElementById('chat');
    if (chat) chat.setAttribute('data-tf-style', style);
    cfg.style = style;
    /* Re-run frame injection if switching to/from fade */
    if (style === 'fade') applyFrameOverlay();
    else removeFrameOverlay();
  }

  /* ── Apply font ── */
  function applyFont(key) {
    document.documentElement.setAttribute('data-tf-font', key);
    const f = TF_FONTS[key];
    if (f && f.url) loadGoogleFont(key, f.url);
    if (key === 'custom') {
      if (cfg.customDisplayFont) {
        loadGoogleFontFamily(cfg.customDisplayFont);
        setVar('--tf-font-display', `'${cfg.customDisplayFont}', serif`);
      }
      if (cfg.customBodyFont) {
        loadGoogleFontFamily(cfg.customBodyFont);
        setVar('--tf-font-body', `'${cfg.customBodyFont}', sans-serif`);
      }
    }
    cfg.font = key;
  }

  const loadedFonts = new Set();
  function loadGoogleFont(id, url) {
    if (loadedFonts.has(id)) return;
    loadedFonts.add(id);
    const link = document.createElement('link');
    link.id = 'tf-font-' + id;
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
  function loadGoogleFontFamily(family) {
    const id = 'custom-' + family.replace(/\s+/g,'-').toLowerCase();
    loadGoogleFont(id, `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600&display=swap`);
  }

  /* ── Gossamer gradient rim ── */
  function applyGossamerRim() {
    document.querySelectorAll('[data-tf-style="gossamer"] .mes_block').forEach(block => {
      if (cfg.gossamerRim) {
        block.classList.add('tf-rim');
        if (!block.querySelector('.tf-rim-inner')) {
          const inner = document.createElement('div');
          inner.className = 'tf-rim-inner';
          while (block.firstChild) inner.appendChild(block.firstChild);
          block.appendChild(inner);
        }
      } else {
        if (block.classList.contains('tf-rim')) {
          const inner = block.querySelector('.tf-rim-inner');
          if (inner) {
            while (inner.firstChild) block.insertBefore(inner.firstChild, inner);
            inner.remove();
          }
          block.classList.remove('tf-rim');
        }
      }
    });
  }

  /* ── Fade frame overlay ── */
  function applyFrameOverlay() {
    if (cfg.style !== 'fade' || !cfg.fadeFrame) {
      removeFrameOverlay();
      return;
    }
    document.querySelectorAll('[data-tf-style="fade"] .mes_block').forEach(block => {
      if (block.classList.contains('tf-frame')) return;
      block.classList.add('tf-frame');
      block.style.position = 'relative';

      /* Corner elements */
      ['tl','tr','bl','br'].forEach(pos => {
        const c = document.createElement('div');
        c.className = 'tf-frame-corner ' + pos;

        /* Corner style variants */
        if (cfg.fadeFrameCorner === 'double') {
          c.style.width = '14px'; c.style.height = '14px';
          const inner = document.createElement('div');
          inner.style.cssText = `position:absolute;inset:3px;border-color:${cfg.fadeFrameColour};border-style:solid;`;
          if (pos === 'tl') inner.style.borderWidth = '1px 0 0 1px';
          if (pos === 'tr') inner.style.borderWidth = '1px 1px 0 0';
          if (pos === 'bl') inner.style.borderWidth = '0 0 1px 1px';
          if (pos === 'br') inner.style.borderWidth = '0 1px 1px 0';
          c.appendChild(inner);
        }
        if (cfg.fadeFrameCorner === 'arc') {
          c.style.borderRadius = pos === 'tl' ? '50% 0 0 0' : pos === 'tr' ? '0 50% 0 0' : pos === 'bl' ? '0 0 0 50%' : '0 0 50% 0';
        }
        if (cfg.fadeFrameCorner === 'dot') {
          c.style.width = '4px'; c.style.height = '4px';
          c.style.borderRadius = '50%';
          c.style.background = cfg.fadeFrameColour;
          c.style.border = 'none';
        }
        if (cfg.fadeFrameCorner !== 'none') block.appendChild(c);
      });

      /* Symbol */
      if (cfg.fadeFrameSymbol && cfg.fadeFrameSymbol !== '—') {
        const sym = document.createElement('div');
        sym.className = 'tf-frame-symbol';
        sym.textContent = cfg.fadeFrameSymbol;
        sym.style.color = cfg.fadeFrameColour;
        block.appendChild(sym);
      }
    });
  }

  function removeFrameOverlay() {
    document.querySelectorAll('.tf-frame').forEach(block => {
      block.classList.remove('tf-frame');
      block.querySelectorAll('.tf-frame-corner, .tf-frame-symbol').forEach(el => el.remove());
    });
  }


  /* ============================================================
     AVATAR PORTRAIT INJECTION
     ============================================================ */

  const tf_enhanced = new WeakSet();
  let tf_observer = null;

  function tfGetAvatarUrl(mes) {
    /* Read from the img inside mesAvatarWrapper — the reliable source */
    const img = mes.querySelector('.mesAvatarWrapper .avatar img');
    if (img && img.src && !img.src.endsWith('/undefined')) return img.src;
    /* Fallback to CSS variable on .mes */
    const style = mes.getAttribute('style') || '';
    const match = style.match(/--mes-avatar-url:\s*url\(['"]?([^'")\s]+)['"]?\)/);
    if (match) return match[1];
    return '';
  }

  function tfEnhanceMessage(mes) {
    if (tf_enhanced.has(mes)) return;
    const url = tfGetAvatarUrl(mes);
    if (!url) return;

    const wrapper = mes.querySelector('.mesAvatarWrapper');
    if (!wrapper) return;

    tf_enhanced.add(mes);

    const oldAvatar = wrapper.querySelector('.avatar');
    const mesId  = wrapper.querySelector('.mesIDDisplay');
    const timer  = wrapper.querySelector('.mes_timer');
    const tokens = wrapper.querySelector('.tokenCounterDisplay');

    const portrait = document.createElement('div');
    portrait.className = 'tf-portrait';

    const img = document.createElement('img');
    img.className = 'tf-portrait-img';
    img.src = url;
    img.alt = '';
    img.draggable = false;
    img.onerror = function() {
      /* Try thumbnail as fallback */
      const thumb = mes.querySelector('.mesAvatarWrapper .avatar img');
      if (thumb && thumb.src !== url) img.src = thumb.src;
    };

    const stats = document.createElement('div');
    stats.className = 'tf-portrait-stats';
    if (mesId)  { mesId.className  += ' tf-stat'; stats.appendChild(mesId); }
    if (timer)  { timer.className  += ' tf-stat'; stats.appendChild(timer); }
    if (tokens) { tokens.className += ' tf-stat'; stats.appendChild(tokens); }

    portrait.appendChild(img);
    portrait.appendChild(stats);

    if (oldAvatar) oldAvatar.remove();
    wrapper.prepend(portrait);
  }

  function tfEnhanceAll() {
    document.querySelectorAll('#chat .mes').forEach(tfEnhanceMessage);
  }

  function tfStartObserver() {
    const chat = document.getElementById('chat');
    if (!chat) { setTimeout(tfStartObserver, 500); return; }

    tfEnhanceAll();

    if (tf_observer) tf_observer.disconnect();
    tf_observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(n => {
          if (n.nodeType !== 1) return;
          if (n.classList?.contains('mes')) tfEnhanceMessage(n);
          else n.querySelectorAll?.('.mes').forEach(tfEnhanceMessage);
        });
      });
    });
    tf_observer.observe(chat, { childList: true, subtree: true });
  }


  /* ============================================================
     SETTINGS PANEL
     ============================================================ */

  function makeSVG() {
    return `<svg viewBox="0 0 52 30" xmlns="http://www.w3.org/2000/svg" class="tf-btn-svg">
      <path d="M26 15 C26 15 20 4 11 4 C4.5 4 2 8.8 2 15 C2 21.2 4.5 26 11 26 C20 26 26 15 26 15 C26 15 32 4 41 4 C47.5 4 50 8.8 50 15 C50 21.2 47.5 26 41 26 C32 26 26 15 26 15Z" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="5" x2="26" y2="25" stroke-opacity="0.45" stroke-dasharray="1.5 2.5"/>
      <polygon points="26,5 20,20 32,20" stroke-opacity="0.75" fill="none" stroke-linejoin="round"/>
      <circle cx="26" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>`;
  }

  function buildButton() {
    const existing = document.getElementById('trinfinity-btn');
    if (existing) existing.remove();
    const btn = document.createElement('div');
    btn.id = 'trinfinity-btn';
    btn.title = 'Trinfinity';
    btn.innerHTML = makeSVG();
    btn.style.right  = cfg.btnX;
    btn.style.bottom = cfg.btnY;
    btn.addEventListener('click', e => {
      if (btn._dragged) { btn._dragged = false; return; }
      togglePanel();
    });
    makeDraggable(btn);
    document.body.appendChild(btn);
  }

  function makeDraggable(el) {
    let sx, sy, sr, sb, moved;
    el.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      moved = false;
      sx = e.clientX; sy = e.clientY;
      sr = parseInt(el.style.right)  || 20;
      sb = parseInt(el.style.bottom) || 80;
      const onMove = e => {
        const dx = sx - e.clientX, dy = sy - e.clientY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
        el.style.right  = Math.max(0, sr + dx) + 'px';
        el.style.bottom = Math.max(0, sb + dy) + 'px';
      };
      const onUp = () => {
        if (moved) { el._dragged = true; cfg.btnX = el.style.right; cfg.btnY = el.style.bottom; saveSettings(); }
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      e.preventDefault();
    });
  }

  /* ── Slider definitions ── */
  const SLIDERS = {
    gossamer: [
      { key:'gossamerBlur',    label:'Blur',          min:0,  max:24,  step:1,   unit:'px', var:'--tf-gossamer-blur',    fmt:v=>v+'px' },
      { key:'gossamerOpacity', label:'Opacity',       min:0,  max:95,  step:1,   unit:'%',  var:'--tf-gossamer-opacity', fmt:v=>(v/100).toFixed(2) },
      { key:'gossamerFeather', label:'Feather',       min:0,  max:80,  step:2,   unit:'px', var:'--tf-gossamer-feather', fmt:v=>v+'px' },
    ],
    fade: [
      { key:'fadeStart', label:'Fade Start',  min:0,  max:90,  step:1, unit:'%', var:'--tf-fade-start', fmt:v=>v+'%' },
      { key:'fadeReach', label:'Fade Reach',  min:10, max:100, step:1, unit:'%', var:'--tf-fade-reach', fmt:v=>v+'%' },
      { key:'fadeFloor', label:'Floor Opacity', min:0, max:50, step:1, unit:'%', var:'--tf-fade-floor', fmt:v=>(v/100).toFixed(2) },
    ],
    pulse: [
      { key:'pulseSpeed',     label:'Beat Speed',  min:0.5, max:8,   step:0.1, unit:'s',  var:'--tf-pulse-speed',     fmt:v=>parseFloat(v).toFixed(1)+'s' },
      { key:'pulseIntensity', label:'Intensity',   min:0,   max:100, step:1,   unit:'%',  var:'--tf-pulse-intensity', fmt:v=>(v/100).toFixed(2) },
      { key:'pulseRadius',    label:'Glow Radius', min:0,   max:28,  step:1,   unit:'px', var:'--tf-pulse-radius',    fmt:v=>v+'px' },
      { key:'pulseR', label:'Red',   min:0, max:255, step:1, unit:'', var:'--tf-pulse-r', fmt:v=>v, isRGB:true },
      { key:'pulseG', label:'Green', min:0, max:255, step:1, unit:'', var:'--tf-pulse-g', fmt:v=>v, isRGB:true },
      { key:'pulseB', label:'Blue',  min:0, max:255, step:1, unit:'', var:'--tf-pulse-b', fmt:v=>v, isRGB:true },
    ],
    ebb: [
      { key:'ebbOpacity',    label:'Portrait Opacity', min:0, max:95,  step:1, unit:'%', var:'--tf-ebb-opacity',    fmt:v=>(v/100).toFixed(2) },
      { key:'ebbDesaturate', label:'Desaturate',       min:0, max:100, step:1, unit:'%', var:'--tf-ebb-desaturate', fmt:v=>v+'%' },
    ],
    flow: [
      { key:'flowScale',    label:'Portrait Scale',  min:100, max:120, step:1, unit:'%', var:'--tf-flow-scale',    fmt:v=>(v/100).toFixed(2) },
      { key:'flowVibrancy', label:'Colour Vibrancy', min:100, max:140, step:1, unit:'%', var:'--tf-flow-vibrancy', fmt:v=>(v/100).toFixed(2) },
    ],
    void: [
      { key:'voidLineHeight',    label:'Line Height',   min:140, max:220, step:5, unit:'', var:'--tf-void-lh', fmt:v=>(v/100).toFixed(2) },
      { key:'voidLetterSpacing', label:'Name Spacing',  min:8,   max:25,  step:1, unit:'/100em', var:'--tf-void-ls', fmt:v=>(v/100).toFixed(2)+'em' },
    ],
    loom: [
      { key:'loomRadius',         label:'Corner Softness',  min:0, max:6,  step:1, unit:'px', var:'--tf-loom-radius',          fmt:v=>v+'px' },
      { key:'loomVignette',       label:'Vignette',         min:0, max:90, step:1, unit:'%',  var:'--tf-loom-vignette',        fmt:v=>(v/100).toFixed(2) },
      { key:'loomVignetteSpread', label:'Vignette Spread',  min:20,max:90, step:5, unit:'%',  var:'--tf-loom-vignette-spread', fmt:v=>v+'%' },
    ],
    'reliquary-frame': [],
  };

  const GLOBAL_SLIDERS = [
    { key:'portraitW', label:'Portrait Width',  min:60,  max:220, step:5,  unit:'px', var:'--tf-portrait-w', fmt:v=>v+'px' },
    { key:'portraitH', label:'Portrait Height', min:80,  max:340, step:10, unit:'px', var:'--tf-portrait-h', fmt:v=>v+'px' },
  ];

  function renderSliders(style, container) {
    if (!container) return;
    const defs = [...(SLIDERS[style] || []), ...GLOBAL_SLIDERS];
    const label = TF_STYLE_LABELS[style] || style;
    let html = `<span class="tf-section-label">${label} Settings</span>`;

    if (style === 'pulse') {
      html += `<div class="tf-row" style="margin-bottom:8px">
        <span class="tf-slider-label">Pulse colour</span>
        <div id="tf-pulse-swatch" style="width:38px;height:16px;border-radius:3px;border:1px solid rgba(255,255,255,0.15);background:rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})"></div>
        <label style="display:flex;align-items:center;gap:4px;font-size:10px;color:var(--tf-text-muted);cursor:pointer">
          <input type="checkbox" id="tf-pulse-auto" ${cfg.pulseAuto?'checked':''}/> Auto
        </label>
      </div>`;
    }

    defs.forEach(d => {
      const val = cfg[d.key] ?? 0;
      html += `<div class="tf-row" style="margin-bottom:7px">
        <span class="tf-slider-label">${d.label}</span>
        <input type="range" class="tf-slider" data-key="${d.key}" data-var="${d.var}" min="${d.min}" max="${d.max}" step="${d.step}" value="${val}"/>
        <span class="tf-slider-val" id="tfv-${d.key}">${val}${d.unit}</span>
      </div>`;
    });

    /* Gossamer rim toggle + controls */
    if (style === 'gossamer') {
      html += `<div class="tf-toggle-row" style="margin-top:4px">
        <div><div class="tf-toggle-label">Gradient rim</div><div class="tf-toggle-sub">Replaces solid border</div></div>
        <button class="tf-toggle ${cfg.gossamerRim?'on':'off'}" id="tf-rim-toggle"><div class="tf-toggle-dot"></div></button>
      </div>
      <div id="tf-rim-controls" style="display:${cfg.gossamerRim?'block':'none'};margin-top:8px">
        <div class="tf-row" style="margin-bottom:6px">
          <span class="tf-slider-label">Angle</span>
          <input type="range" class="tf-slider" data-key="gossamerRimAngle" data-var="--tf-gossamer-rim-angle" min="0" max="360" step="5" value="${cfg.gossamerRimAngle}"/>
          <span class="tf-slider-val" id="tfv-gossamerRimAngle">${cfg.gossamerRimAngle}°</span>
        </div>
        <div class="tf-row" style="margin-bottom:6px">
          <span class="tf-slider-label">Width</span>
          <input type="range" class="tf-slider" data-key="gossamerRimW" data-var="--tf-gossamer-rim-w" min="1" max="4" step="1" value="${cfg.gossamerRimW}"/>
          <span class="tf-slider-val" id="tfv-gossamerRimW">${cfg.gossamerRimW}px</span>
        </div>
        <div style="margin-bottom:4px"><span class="tf-slider-label" style="display:block;margin-bottom:4px">Colour stops</span>
          <div class="tf-stop-row" id="tf-rim-stops">
            ${cfg.gossamerRimStops.map((c,i)=>`<div class="tf-stop" data-idx="${i}" style="background:${c}" title="${c}"></div>`).join('')}
            <div class="tf-stop-add" id="tf-rim-add">+</div>
          </div>
        </div>
      </div>`;
    }

    /* Fade frame toggle + controls */
    if (style === 'fade') {
      html += `<div class="tf-toggle-row" style="margin-top:4px">
        <div><div class="tf-toggle-label">Reliquary frame</div><div class="tf-toggle-sub">Ornamental overlay</div></div>
        <button class="tf-toggle ${cfg.fadeFrame?'on':'off'}" id="tf-frame-toggle"><div class="tf-toggle-dot"></div></button>
      </div>
      <div id="tf-frame-controls" style="display:${cfg.fadeFrame?'block':'none'};margin-top:8px">
        <div style="margin-bottom:6px">
          <span class="sub-label" style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(139,92,246,0.45);display:block;margin-bottom:4px">Corner style</span>
          <div class="tf-corner-grid">
            ${TF_CORNERS.map(c=>`<div class="tf-corner-opt ${cfg.fadeFrameCorner===c.id?'active':''}" data-corner="${c.id}">${c.label}</div>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:6px">
          <span class="sub-label" style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(139,92,246,0.45);display:block;margin-bottom:4px">Top symbol</span>
          <div class="tf-symbol-row">
            ${TF_SYMBOLS.map(s=>`<div class="tf-symbol-opt ${cfg.fadeFrameSymbol===s?'active':''}" data-symbol="${s}">${s}</div>`).join('')}
          </div>
        </div>
        <div class="tf-row">
          <span class="tf-slider-label">Frame colour</span>
          <input class="tf-input-hex" id="tf-frame-colour" value="${cfg.fadeFrameColour}" style="width:75px"/>
          <div id="tf-frame-swatch" style="width:18px;height:18px;border-radius:3px;border:1px solid rgba(255,255,255,0.15);background:${cfg.fadeFrameColour}"></div>
        </div>
      </div>`;
    }

    container.innerHTML = html;

    /* Wire sliders */
    container.querySelectorAll('.tf-slider').forEach(slider => {
      slider.addEventListener('input', function() {
        const key = this.dataset.key, varName = this.dataset.var;
        const raw = parseFloat(this.value);
        cfg[key] = raw;
        const def = [...defs, {key:'gossamerRimAngle',fmt:v=>v+'deg',unit:'°'}, {key:'gossamerRimW',fmt:v=>v+'px',unit:'px'}].find(d=>d.key===key);
        if (def) setVar(varName, def.fmt(raw));
        const valEl = document.getElementById('tfv-' + key);
        if (valEl) valEl.textContent = raw + (def?.unit||'');
        if (['pulseR','pulseG','pulseB'].includes(key)) {
          const sw = document.getElementById('tf-pulse-swatch');
          if (sw) sw.style.background = `rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})`;
        }
        saveSettings();
      });
    });

    /* Pulse auto */
    const autoChk = container.querySelector('#tf-pulse-auto');
    if (autoChk) autoChk.addEventListener('change', function() {
      cfg.pulseAuto = this.checked; saveSettings();
    });

    /* Rim toggle */
    const rimToggle = container.querySelector('#tf-rim-toggle');
    if (rimToggle) rimToggle.addEventListener('click', function() {
      cfg.gossamerRim = !cfg.gossamerRim;
      this.className = 'tf-toggle ' + (cfg.gossamerRim ? 'on' : 'off');
      const ctrl = document.getElementById('tf-rim-controls');
      if (ctrl) ctrl.style.display = cfg.gossamerRim ? 'block' : 'none';
      applyGossamerRim(); saveSettings();
    });

    /* Frame toggle */
    const frameToggle = container.querySelector('#tf-frame-toggle');
    if (frameToggle) frameToggle.addEventListener('click', function() {
      cfg.fadeFrame = !cfg.fadeFrame;
      this.className = 'tf-toggle ' + (cfg.fadeFrame ? 'on' : 'off');
      const ctrl = document.getElementById('tf-frame-controls');
      if (ctrl) ctrl.style.display = cfg.fadeFrame ? 'block' : 'none';
      applyFrameOverlay(); saveSettings();
    });

    /* Corner opts */
    container.querySelectorAll('.tf-corner-opt').forEach(el => {
      el.addEventListener('click', function() {
        container.querySelectorAll('.tf-corner-opt').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
        cfg.fadeFrameCorner = this.dataset.corner;
        removeFrameOverlay(); applyFrameOverlay(); saveSettings();
      });
    });

    /* Symbol opts */
    container.querySelectorAll('.tf-symbol-opt').forEach(el => {
      el.addEventListener('click', function() {
        container.querySelectorAll('.tf-symbol-opt').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
        cfg.fadeFrameSymbol = this.dataset.symbol;
        removeFrameOverlay(); applyFrameOverlay(); saveSettings();
      });
    });

    /* Frame colour hex */
    const frameCol = container.querySelector('#tf-frame-colour');
    if (frameCol) frameCol.addEventListener('input', function() {
      cfg.fadeFrameColour = this.value;
      setVar('--tf-fade-frame-colour', this.value);
      const sw = document.getElementById('tf-frame-swatch');
      if (sw) sw.style.background = this.value;
      removeFrameOverlay(); applyFrameOverlay(); saveSettings();
    });

    /* Rim stop colours — click to edit via prompt */
    container.querySelectorAll('.tf-stop[data-idx]').forEach(el => {
      el.addEventListener('click', function() {
        const idx = parseInt(this.dataset.idx);
        const newCol = prompt('Enter hex colour for stop ' + (idx+1) + ':', cfg.gossamerRimStops[idx]);
        if (newCol) {
          cfg.gossamerRimStops[idx] = newCol;
          this.style.background = newCol;
          setVar('--tf-gossamer-rim-stops', cfg.gossamerRimStops.join(', '));
          saveSettings();
        }
      });
    });

    const rimAdd = container.querySelector('#tf-rim-add');
    if (rimAdd) rimAdd.addEventListener('click', function() {
      const newCol = prompt('Enter hex colour for new stop:', '#ffffff');
      if (newCol) {
        cfg.gossamerRimStops.push(newCol);
        setVar('--tf-gossamer-rim-stops', cfg.gossamerRimStops.join(', '));
        renderSliders(cfg.style, container); saveSettings();
      }
    });
  }

  /* ── Build panel ── */
  function buildPanel() {
    const existing = document.getElementById('trinfinity-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'trinfinity-panel';

    const styleOpts = TF_STYLES.map(s =>
      `<option value="${s}" ${cfg.style===s?'selected':''}>${TF_STYLE_LABELS[s]}</option>`
    ).join('');

    const fontOpts = Object.entries(TF_FONTS).map(([k,v]) =>
      `<option value="${k}" ${cfg.font===k?'selected':''}>${v.label}</option>`
    ).join('');

    const themeSwatches = Object.entries(TF_THEMES).map(([k,v]) =>
      `<div class="tf-swatch ${cfg.theme===k?'active':''}" data-theme="${k}" style="background:${v.swatch}" title="${v.label}"></div>`
    ).join('');

    panel.innerHTML = `
      <div class="tf-panel-header">
        <span class="tf-panel-title">∞ Trinfinity</span>
        <button class="tf-panel-close" id="tf-close">✕</button>
      </div>
      <div class="tf-panel-body">

        <div class="tf-panel-section">
          <span class="tf-section-label">Message Style</span>
          <select class="tf-select" id="tf-style-select">${styleOpts}</select>
        </div>

        <div class="tf-panel-section">
          <span class="tf-section-label">Colour Theme</span>
          <div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.14);border-radius:6px;padding:10px 12px">
            <div class="tf-mode-tabs">
              <div class="tf-mode-tab ${cfg.theme!=='custom'?'active':''}" id="tf-tab-presets">Presets</div>
              <div class="tf-mode-tab ${cfg.theme==='custom'?'active':''}" id="tf-tab-custom">Custom</div>
            </div>
            <div id="tf-theme-presets" style="display:${cfg.theme!=='custom'?'block':'none'}">
              <div class="tf-swatch-grid">${themeSwatches}</div>
              <div style="font-size:10px;color:var(--tf-text-muted);margin-top:6px;text-align:center" id="tf-theme-label">${TF_THEMES[cfg.theme]?.label||cfg.theme}</div>
            </div>
            <div id="tf-theme-custom" style="display:${cfg.theme==='custom'?'block':'none'}">
              ${[
                ['bg',         '--tf-bg-deep',       'Background'],
                ['accent',     '--tf-accent',        'Accent'],
                ['accentSoft', '--tf-accent-soft',   'Accent soft'],
                ['text',       '--tf-text',          'Text'],
                ['textEm',     '--tf-text-em',       'Italic / em'],
                ['textDialogue','--tf-text-dialogue','Dialogue'],
              ].map(([k,v,lbl]) => {
                const cur = (customThemes.custom||{})[k] || '';
                return `<div class="tf-colour-row">
                  <div class="tf-colour-dot" id="tfd-${k}" style="background:${cur||'#888'}"></div>
                  <span class="tf-colour-name">${lbl}</span>
                  <input class="tf-input-hex" data-ckey="${k}" data-cvar="${v}" value="${cur}" placeholder="#hex"/>
                </div>`;
              }).join('')}
              <div style="display:flex;gap:6px;margin-top:8px">
                <button class="tf-btn-small" id="tf-custom-preview" style="flex:1">Preview</button>
                <button class="tf-btn-small" id="tf-custom-apply" style="flex:1">Apply</button>
              </div>
              <div style="margin-top:6px;display:flex;gap:6px;align-items:center">
                <input class="tf-input" id="tf-custom-name" placeholder="Name your theme" style="flex:1;padding:4px 8px;font-size:11px"/>
                <button class="tf-btn-small" id="tf-custom-save">Save ✦</button>
              </div>
            </div>
          </div>
        </div>

        <div class="tf-panel-section">
          <span class="tf-section-label">Font Pair</span>
          <select class="tf-select" id="tf-font-select">${fontOpts}</select>
          <div id="tf-custom-fonts" style="display:${cfg.font==='custom'?'flex':'none'};flex-direction:column;gap:6px;margin-top:6px">
            <input class="tf-input" id="tf-font-display-in" placeholder="Display font (e.g. Playfair Display)" value="${cfg.customDisplayFont}"/>
            <input class="tf-input" id="tf-font-body-in"    placeholder="Body font (e.g. Lora)" value="${cfg.customBodyFont}"/>
            <button class="tf-btn-small" id="tf-font-load">Load Fonts ↗</button>
          </div>
        </div>

        <hr class="tf-divider"/>

        <div class="tf-panel-section">
          <span class="tf-section-label">Global Text</span>
          <div class="tf-row" style="margin-bottom:7px">
            <span class="tf-slider-label">Font size</span>
            <input type="range" class="tf-slider" id="tf-fs" min="12" max="20" step="1" value="${cfg.fontSize}"/>
            <span class="tf-slider-val" id="tfv-fontSize">${cfg.fontSize}px</span>
          </div>
          <div class="tf-row">
            <span class="tf-slider-label">Line height</span>
            <input type="range" class="tf-slider" id="tf-lh" min="140" max="220" step="5" value="${cfg.lineHeight}"/>
            <span class="tf-slider-val" id="tfv-lineHeight">${(cfg.lineHeight/100).toFixed(2)}</span>
          </div>
        </div>

        <div class="tf-panel-section">
          <span class="tf-section-label">Dialogue</span>
          <div class="tf-toggle-row">
            <div><div class="tf-toggle-label">Dialogue styling</div><div class="tf-toggle-sub">Colour + glow on spoken text</div></div>
            <button class="tf-toggle ${cfg.dialogueOn?'on':'off'}" id="tf-dial-toggle"><div class="tf-toggle-dot"></div></button>
          </div>
          <div class="tf-row" style="margin-top:6px">
            <span class="tf-slider-label">Glow intensity</span>
            <input type="range" class="tf-slider" id="tf-dg" min="0" max="100" step="1" value="${cfg.dialogueGlow}"/>
            <span class="tf-slider-val" id="tfv-dialogueGlow">${cfg.dialogueGlow}%</span>
          </div>
          <div class="tf-row">
            <span class="tf-slider-label">Size boost</span>
            <input type="range" class="tf-slider" id="tf-ds" min="100" max="115" step="1" value="${cfg.dialogueSize}"/>
            <span class="tf-slider-val" id="tfv-dialogueSize">${(cfg.dialogueSize/100).toFixed(2)}×</span>
          </div>
          <div class="tf-row">
            <span class="tf-slider-label">Wash tint</span>
            <input type="range" class="tf-slider" id="tf-dw" min="0" max="100" step="1" value="${cfg.dialogueWash}"/>
            <span class="tf-slider-val" id="tfv-dialogueWash">${cfg.dialogueWash}%</span>
          </div>
          <div class="tf-row" style="margin-top:4px">
            <span class="tf-slider-label">Override colour</span>
            <input class="tf-input-hex" id="tf-dial-colour" value="${cfg.dialogueColour}" placeholder="(theme default)" style="flex:1"/>
          </div>
        </div>

        <hr class="tf-divider"/>

        <div class="tf-panel-section" id="tf-style-sliders"></div>

        <hr class="tf-divider"/>

        <div class="tf-about">
          <span>Trinfinity v${TF_VERSION}</span>
          <span>by trinity (trinachronism)</span>
          <a href="https://github.com/trinibots/trinfinity" target="_blank" rel="noopener">github.com/trinibots/trinfinity</a>
        </div>

      </div>
    `;

    document.body.appendChild(panel);
    positionPanel();
    renderSliders(cfg.style, document.getElementById('tf-style-sliders'));
    wirePanel();
  }

  function wirePanel() {
    document.getElementById('tf-close')?.addEventListener('click', closePanel);

    /* Style select */
    document.getElementById('tf-style-select')?.addEventListener('change', function() {
      applyStyle(this.value);
      renderSliders(this.value, document.getElementById('tf-style-sliders'));
      saveSettings();
    });

    /* Theme swatches */
    document.querySelectorAll('.tf-swatch[data-theme]').forEach(sw => {
      sw.addEventListener('click', function() {
        document.querySelectorAll('.tf-swatch').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        const key = this.dataset.theme;
        applyTheme(key);
        const lbl = document.getElementById('tf-theme-label');
        if (lbl) lbl.textContent = TF_THEMES[key]?.label || key;
        saveSettings();
      });
    });

    /* Theme tabs */
    document.getElementById('tf-tab-presets')?.addEventListener('click', function() {
      this.classList.add('active');
      document.getElementById('tf-tab-custom')?.classList.remove('active');
      document.getElementById('tf-theme-presets').style.display = 'block';
      document.getElementById('tf-theme-custom').style.display = 'none';
    });
    document.getElementById('tf-tab-custom')?.addEventListener('click', function() {
      this.classList.add('active');
      document.getElementById('tf-tab-presets')?.classList.remove('active');
      document.getElementById('tf-theme-presets').style.display = 'none';
      document.getElementById('tf-theme-custom').style.display = 'block';
    });

    /* Custom colour hex inputs — live dot update */
    document.querySelectorAll('.tf-input-hex[data-ckey]').forEach(input => {
      input.addEventListener('input', function() {
        const dot = document.getElementById('tfd-' + this.dataset.ckey);
        if (dot && /^#[0-9a-fA-F]{6}$/.test(this.value)) dot.style.background = this.value;
      });
    });

    /* Custom preview */
    document.getElementById('tf-custom-preview')?.addEventListener('click', function() {
      const vals = {};
      document.querySelectorAll('.tf-input-hex[data-ckey]').forEach(i => {
        if (i.value) { vals[i.dataset.ckey] = i.value; setVar(i.dataset.cvar, i.value); }
      });
      customThemes['_preview'] = vals;
    });

    /* Custom apply */
    document.getElementById('tf-custom-apply')?.addEventListener('click', function() {
      const vals = {};
      document.querySelectorAll('.tf-input-hex[data-ckey]').forEach(i => {
        if (i.value) { vals[i.dataset.ckey] = i.value; setVar(i.dataset.cvar, i.value); }
      });
      customThemes['custom'] = vals;
      cfg.theme = 'custom';
      saveSettings(); saveCustomThemes();
    });

    /* Custom save as */
    document.getElementById('tf-custom-save')?.addEventListener('click', function() {
      const name = document.getElementById('tf-custom-name')?.value?.trim();
      if (!name) return;
      const vals = {};
      document.querySelectorAll('.tf-input-hex[data-ckey]').forEach(i => {
        if (i.value) vals[i.dataset.ckey] = i.value;
      });
      customThemes[name] = vals;
      saveCustomThemes();
      alert(`Theme "${name}" saved.`);
    });

    /* Font select */
    document.getElementById('tf-font-select')?.addEventListener('change', function() {
      applyFont(this.value);
      document.getElementById('tf-custom-fonts').style.display = this.value === 'custom' ? 'flex' : 'none';
      saveSettings();
    });

    document.getElementById('tf-font-load')?.addEventListener('click', function() {
      cfg.customDisplayFont = document.getElementById('tf-font-display-in')?.value?.trim() || '';
      cfg.customBodyFont    = document.getElementById('tf-font-body-in')?.value?.trim()    || '';
      applyFont('custom');
      saveSettings();
    });

    /* Global text sliders */
    document.getElementById('tf-fs')?.addEventListener('input', function() {
      cfg.fontSize = parseInt(this.value);
      setVar('--tf-font-size', cfg.fontSize + 'px');
      const el = document.getElementById('tfv-fontSize');
      if (el) el.textContent = cfg.fontSize + 'px';
      saveSettings();
    });
    document.getElementById('tf-lh')?.addEventListener('input', function() {
      cfg.lineHeight = parseInt(this.value);
      setVar('--tf-line-height', (cfg.lineHeight/100).toFixed(2));
      const el = document.getElementById('tfv-lineHeight');
      if (el) el.textContent = (cfg.lineHeight/100).toFixed(2);
      saveSettings();
    });

    /* Dialogue toggle */
    document.getElementById('tf-dial-toggle')?.addEventListener('click', function() {
      cfg.dialogueOn = !cfg.dialogueOn;
      this.className = 'tf-toggle ' + (cfg.dialogueOn ? 'on' : 'off');
      applyAllVars(); saveSettings();
    });

    /* Dialogue sliders */
    ['dg','ds','dw'].forEach((id, i) => {
      const keys   = ['dialogueGlow','dialogueSize','dialogueWash'];
      const vars   = ['--tf-dialogue-glow','--tf-dialogue-size','--tf-dialogue-wash'];
      const fmts   = [v=>(v/100).toFixed(2), v=>(v/100).toFixed(2)+'em', v=>(v/100).toFixed(2)];
      const units  = ['%','×','%'];
      const displays = [v=>v+'%', v=>(v/100).toFixed(2)+'×', v=>v+'%'];
      const el = document.getElementById('tf-' + id);
      if (!el) return;
      el.addEventListener('input', function() {
        const raw = parseInt(this.value);
        cfg[keys[i]] = raw;
        setVar(vars[i], fmts[i](raw));
        const valEl = document.getElementById('tfv-' + keys[i]);
        if (valEl) valEl.textContent = displays[i](raw);
        saveSettings();
      });
    });

    /* Dialogue colour override */
    document.getElementById('tf-dial-colour')?.addEventListener('input', function() {
      cfg.dialogueColour = this.value;
      if (/^#[0-9a-fA-F]{6}$/.test(this.value)) setVar('--tf-text-dialogue', this.value);
      saveSettings();
    });
  }

  function positionPanel() {
    const panel = document.getElementById('trinfinity-panel');
    const btn   = document.getElementById('trinfinity-btn');
    if (!panel || !btn) return;
    panel.style.right  = (parseInt(btn.style.right)  || 20) + 'px';
    panel.style.bottom = (parseInt(btn.style.bottom) || 80) + 56 + 'px';
  }

  function togglePanel() {
    const panel = document.getElementById('trinfinity-panel');
    if (!panel) return;
    const open = panel.classList.toggle('tf-open');
    if (open) positionPanel();
  }

  function closePanel() {
    document.getElementById('trinfinity-panel')?.classList.remove('tf-open');
  }

  /* ── Extensions menu entry ── */
  function addExtMenuEntry() {
    setTimeout(() => {
      const menu = document.querySelector('#extensionsMenu, .extensions-menu, #extension-settings');
      if (!menu || document.getElementById('tf-ext-btn')) return;
      const btn = document.createElement('div');
      btn.id = 'tf-ext-btn';
      btn.className = 'tf-ext-menu-btn';
      btn.textContent = '∞ Trinfinity';
      btn.addEventListener('click', togglePanel);
      menu.prepend(btn);
    }, 2000);
  }

  /* ── Init ── */
  function init() {
    loadSettings();
    applyAllVars();
    applyTheme(cfg.theme);
    applyFont(cfg.font);

    const ready = () => {
      applyStyle(cfg.style);
      buildButton();
      buildPanel();
      addExtMenuEntry();
      setTimeout(() => {
        tfStartObserver();
        if (cfg.gossamerRim) applyGossamerRim();
        if (cfg.fadeFrame && cfg.style === 'fade') applyFrameOverlay();
      }, 900);
    };

    if (document.body) ready();
    else document.addEventListener('DOMContentLoaded', ready);
  }

  init();

})();
