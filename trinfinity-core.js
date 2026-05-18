/* ============================================================
   TRINFINITY — trinfinity-core.js
   Monolithic build — all modules inlined
   by trinity (trinachronism)
   https://github.com/trinibots/trinfinity
   v0.3.1
   ============================================================ */

'use strict';
console.log('TRINFINITY LOADING');

(function() {

  const TF_VERSION = '0.3.1d';
  const TF_KEY     = 'trinfinity_settings';
  const TF_STYLES  = ['gossamer', 'fade', 'pulse', 'ebb', 'flow', 'void', 'loom'];

  const DEFAULTS = {
    style: 'gossamer', theme: 'ultraviolet', font: 'A',
    customDisplayFont: '', customBodyFont: '',
    btnX: '20px', btnY: '80px',
    portraitW: 120, portraitH: 160,
    gossamerBlur: 10, gossamerOpacity: 72, gossamerFeatherX: 20, gossamerFeatherY: 15,
    fadeStart: 40, fadeReach: 70, fadeFloor: 8,
    pulseSpeed: 2.4, pulseIntensity: 70, pulseRadius: 8,
    pulseR: 139, pulseG: 92, pulseB: 246, pulseAuto: true,
    ebbOpacity: 45, ebbDesaturate: 60,
    flowScale: 106, flowVibrancy: 115,
    voidLineHeight: 195, voidLetterSpacing: 13,
    loomRadius: 3, loomVignette: 55, loomVignetteSpread: 60,
  };

  let cfg = Object.assign({}, DEFAULTS);

  function loadSettings() {
    try { const raw = localStorage.getItem(TF_KEY); if (raw) cfg = Object.assign({}, DEFAULTS, JSON.parse(raw)); } catch(e) {}
  }
  function saveSettings() {
    try { localStorage.setItem(TF_KEY, JSON.stringify(cfg)); } catch(e) {}
  }
  function setVar(name, value) {
    document.documentElement.style.setProperty(name, String(value));
  }
  function applyAllVars() {
    setVar('--tf-portrait-w',          cfg.portraitW + 'px');
    setVar('--tf-portrait-h',          cfg.portraitH + 'px');
    setVar('--tf-gossamer-blur',        cfg.gossamerBlur + 'px');
    setVar('--tf-gossamer-opacity',     (cfg.gossamerOpacity / 100).toFixed(2));
    setVar('--tf-gossamer-feather-x',   cfg.gossamerFeatherX + '%');
    setVar('--tf-gossamer-feather-y',   cfg.gossamerFeatherY + '%');
    setVar('--tf-fade-start',           cfg.fadeStart + '%');
    setVar('--tf-fade-reach',           cfg.fadeReach + '%');
    setVar('--tf-fade-floor',           (cfg.fadeFloor / 100).toFixed(2));
    setVar('--tf-pulse-speed',          parseFloat(cfg.pulseSpeed).toFixed(1) + 's');
    setVar('--tf-pulse-intensity',      (cfg.pulseIntensity / 100).toFixed(2));
    setVar('--tf-pulse-radius',         cfg.pulseRadius + 'px');
    setVar('--tf-pulse-r',              cfg.pulseR);
    setVar('--tf-pulse-g',              cfg.pulseG);
    setVar('--tf-pulse-b',              cfg.pulseB);
    setVar('--tf-ebb-opacity',          (cfg.ebbOpacity / 100).toFixed(2));
    setVar('--tf-ebb-desaturate',       cfg.ebbDesaturate + '%');
    setVar('--tf-ebb-saturate',         (1 - cfg.ebbDesaturate / 100).toFixed(2));
    setVar('--tf-flow-scale',           (cfg.flowScale / 100).toFixed(2));
    setVar('--tf-flow-vibrancy',        (cfg.flowVibrancy / 100).toFixed(2));
    setVar('--tf-void-lh',              (cfg.voidLineHeight / 100).toFixed(2));
    setVar('--tf-void-ls',              (cfg.voidLetterSpacing / 100).toFixed(2) + 'em');
    setVar('--tf-loom-radius',          cfg.loomRadius + 'px');
    setVar('--tf-loom-vignette',        (cfg.loomVignette / 100).toFixed(2));
    setVar('--tf-loom-vignette-spread', cfg.loomVignetteSpread + '%');
  }

  /* ── Style ── */
  function applyStyle(style) {
    const chat = document.getElementById('chat');
    if (chat) chat.setAttribute('data-tf-style', style);
    cfg.style = style;
  }


  /* ============================================================
     THEMES
     ============================================================ */

  const TF_THEME_DATA = {
    ultraviolet: { label:'Ultraviolet', bg:'#0d0b10', bgMid:'#120e1c', bgSurface:'rgba(18,12,36,0.72)', bgUser:'rgba(42,31,74,0.72)', accent:'#8b5cf6', accentSoft:'#a78bfa', accentGlow:'rgba(139,92,246,0.35)', border:'rgba(139,92,246,0.28)', borderMid:'rgba(139,92,246,0.18)', borderSub:'rgba(139,92,246,0.10)', text:'#e8e2f5', textMuted:'#7c7398', textEm:'#a78bfa', nameChar:'#8b5cf6', nameUser:'rgba(184,176,208,0.65)', scrollbar:'#3d3560', inputBg:'rgba(16,14,26,0.90)', topbar:'rgba(13,11,16,0.92)', sidebar:'rgba(18,16,26,0.95)', selectBg:'rgba(34,31,51,0.95)', button:'rgba(109,40,217,0.50)', pulseR:139, pulseG:92, pulseB:246 },
    viscera:     { label:'Viscera',     bg:'#0a0406', bgMid:'#140609', bgSurface:'rgba(30,6,10,0.75)',  bgUser:'rgba(60,12,20,0.72)', accent:'#8b1a2a', accentSoft:'#c4364d', accentGlow:'rgba(139,26,42,0.40)',  border:'rgba(196,54,77,0.30)',  borderMid:'rgba(196,54,77,0.18)',  borderSub:'rgba(196,54,77,0.10)',  text:'#f0e6e8', textMuted:'#7a5a60', textEm:'#c4364d', nameChar:'#c4364d', nameUser:'rgba(200,170,175,0.65)', scrollbar:'#5a1a22', inputBg:'rgba(20,6,9,0.92)',   topbar:'rgba(10,4,6,0.94)',   sidebar:'rgba(16,6,9,0.96)',   selectBg:'rgba(40,10,15,0.96)',  button:'rgba(139,26,42,0.55)',  pulseR:196, pulseG:54,  pulseB:77  },
    undertow:    { label:'Undertow',    bg:'#04080a', bgMid:'#060e10', bgSurface:'rgba(4,20,22,0.78)',  bgUser:'rgba(8,35,32,0.72)',  accent:'#1a4a3a', accentSoft:'#3bab7e', accentGlow:'rgba(59,171,126,0.30)', border:'rgba(59,171,126,0.25)', borderMid:'rgba(59,171,126,0.15)', borderSub:'rgba(59,171,126,0.08)', text:'#d4ece6', textMuted:'#4a7a6a', textEm:'#3bab7e', nameChar:'#3bab7e', nameUser:'rgba(150,200,185,0.60)', scrollbar:'#1a4a3a', inputBg:'rgba(4,14,12,0.92)',  topbar:'rgba(4,8,10,0.94)',   sidebar:'rgba(4,12,14,0.96)',  selectBg:'rgba(6,22,20,0.96)',   button:'rgba(26,74,58,0.55)',   pulseR:59,  pulseG:171, pulseB:126 },
    opulence:    { label:'Opulence',    bg:'#090807', bgMid:'#120f08', bgSurface:'rgba(24,18,8,0.78)',  bgUser:'rgba(48,36,10,0.72)', accent:'#b5893a', accentSoft:'#e2c97e', accentGlow:'rgba(181,137,58,0.35)', border:'rgba(226,201,126,0.28)',borderMid:'rgba(226,201,126,0.18)',borderSub:'rgba(226,201,126,0.10)',text:'#f5edd8', textMuted:'#8a7a52', textEm:'#e2c97e', nameChar:'#e2c97e', nameUser:'rgba(210,190,140,0.65)', scrollbar:'#5a4420', inputBg:'rgba(18,13,6,0.92)',  topbar:'rgba(9,8,7,0.94)',    sidebar:'rgba(14,12,8,0.96)',  selectBg:'rgba(32,24,8,0.96)',   button:'rgba(181,137,58,0.50)', pulseR:226, pulseG:201, pulseB:126 },
    ashen:       { label:'Ashen',       bg:'#080808', bgMid:'#101010', bgSurface:'rgba(20,20,20,0.75)', bgUser:'rgba(38,38,38,0.70)', accent:'#6b6b6b', accentSoft:'#c0bdb8', accentGlow:'rgba(192,189,184,0.25)',border:'rgba(192,189,184,0.22)',borderMid:'rgba(192,189,184,0.14)',borderSub:'rgba(192,189,184,0.08)',text:'#e0ddd8', textMuted:'#686560', textEm:'#c0bdb8', nameChar:'#b0ada8', nameUser:'rgba(160,157,152,0.60)', scrollbar:'#404040', inputBg:'rgba(14,14,14,0.92)', topbar:'rgba(8,8,8,0.94)',    sidebar:'rgba(12,12,12,0.96)', selectBg:'rgba(24,24,24,0.96)',  button:'rgba(107,107,107,0.45)',pulseR:192, pulseG:189, pulseB:184 },
    revenant:    { label:'Revenant',    bg:'#050508', bgMid:'#080a12', bgSurface:'rgba(10,12,28,0.76)', bgUser:'rgba(20,28,60,0.70)', accent:'#2a3a6b', accentSoft:'#6b82d4', accentGlow:'rgba(107,130,212,0.30)',border:'rgba(107,130,212,0.26)',borderMid:'rgba(107,130,212,0.16)',borderSub:'rgba(107,130,212,0.09)',text:'#dce4f8', textMuted:'#5060a0', textEm:'#6b82d4', nameChar:'#6b82d4', nameUser:'rgba(150,165,210,0.62)', scrollbar:'#2a3a6b', inputBg:'rgba(8,10,22,0.92)',  topbar:'rgba(5,5,10,0.94)',   sidebar:'rgba(8,8,18,0.96)',   selectBg:'rgba(14,18,40,0.96)',  button:'rgba(42,58,107,0.55)',  pulseR:107, pulseG:130, pulseB:212 },
    ember:       { label:'Ember',       bg:'#0a0602', bgMid:'#120804', bgSurface:'rgba(26,14,4,0.76)',  bgUser:'rgba(50,26,6,0.72)',  accent:'#8b3a0a', accentSoft:'#d4723a', accentGlow:'rgba(212,114,58,0.32)', border:'rgba(212,114,58,0.26)', borderMid:'rgba(212,114,58,0.16)', borderSub:'rgba(212,114,58,0.09)', text:'#f2e0d0', textMuted:'#7a5030', textEm:'#d4723a', nameChar:'#d4723a', nameUser:'rgba(200,160,120,0.62)', scrollbar:'#5a2a08', inputBg:'rgba(16,10,4,0.92)',  topbar:'rgba(10,6,2,0.94)',   sidebar:'rgba(14,8,4,0.96)',   selectBg:'rgba(28,14,4,0.96)',   button:'rgba(139,58,10,0.55)',  pulseR:212, pulseG:114, pulseB:58  },
    venom:       { label:'Venom',       bg:'#040a04', bgMid:'#060e06', bgSurface:'rgba(6,18,6,0.76)',   bgUser:'rgba(10,36,10,0.70)', accent:'#2a6b1a', accentSoft:'#6bd44a', accentGlow:'rgba(107,212,74,0.28)', border:'rgba(107,212,74,0.24)', borderMid:'rgba(107,212,74,0.14)', borderSub:'rgba(107,212,74,0.08)', text:'#d8f0d0', textMuted:'#4a7a3a', textEm:'#6bd44a', nameChar:'#6bd44a', nameUser:'rgba(140,200,120,0.60)', scrollbar:'#1a4a0a', inputBg:'rgba(4,12,4,0.92)',   topbar:'rgba(4,10,4,0.94)',   sidebar:'rgba(4,12,4,0.96)',   selectBg:'rgba(8,22,8,0.96)',    button:'rgba(42,107,26,0.55)',  pulseR:107, pulseG:212, pulseB:74  },
    requiem:     { label:'Requiem',     bg:'#060408', bgMid:'#0c080e', bgSurface:'rgba(16,8,22,0.76)',  bgUser:'rgba(32,14,46,0.72)', accent:'#4a1a5c', accentSoft:'#9b4dca', accentGlow:'rgba(155,77,202,0.32)', border:'rgba(155,77,202,0.26)', borderMid:'rgba(155,77,202,0.16)', borderSub:'rgba(155,77,202,0.09)', text:'#ecddf5', textMuted:'#6a3a80', textEm:'#9b4dca', nameChar:'#9b4dca', nameUser:'rgba(175,140,200,0.62)', scrollbar:'#3a1a4a', inputBg:'rgba(10,6,16,0.92)',  topbar:'rgba(6,4,10,0.94)',   sidebar:'rgba(10,6,14,0.96)',  selectBg:'rgba(20,10,30,0.96)',  button:'rgba(74,26,92,0.55)',   pulseR:155, pulseG:77,  pulseB:202 },
    lacuna:      { label:'Lacuna',      bg:'#060608', bgMid:'#0a0c12', bgSurface:'rgba(8,12,24,0.78)',  bgUser:'rgba(14,22,42,0.70)', accent:'#1a3a4a', accentSoft:'#4ab8d4', accentGlow:'rgba(74,184,212,0.28)', border:'rgba(74,184,212,0.24)', borderMid:'rgba(74,184,212,0.14)', borderSub:'rgba(74,184,212,0.08)', text:'#d8eef5', textMuted:'#3a6a7a', textEm:'#4ab8d4', nameChar:'#4ab8d4', nameUser:'rgba(130,185,200,0.60)', scrollbar:'#1a3a4a', inputBg:'rgba(6,10,18,0.92)',  topbar:'rgba(6,6,10,0.94)',   sidebar:'rgba(8,8,14,0.96)',   selectBg:'rgba(10,16,28,0.96)',  button:'rgba(26,58,74,0.55)',   pulseR:74,  pulseG:184, pulseB:212 },
    blossom:     { label:'Blossom',     bg:'#090508', bgMid:'#110810', bgSurface:'rgba(22,10,20,0.76)', bgUser:'rgba(46,16,42,0.70)', accent:'#7a1a5a', accentSoft:'#d46aaa', accentGlow:'rgba(212,106,170,0.30)',border:'rgba(212,106,170,0.26)',borderMid:'rgba(212,106,170,0.16)',borderSub:'rgba(212,106,170,0.09)',text:'#f5e0ee', textMuted:'#7a4068', textEm:'#d46aaa', nameChar:'#d46aaa', nameUser:'rgba(200,155,185,0.62)', scrollbar:'#4a1a3a', inputBg:'rgba(14,8,12,0.92)',  topbar:'rgba(9,5,8,0.94)',    sidebar:'rgba(12,6,11,0.96)',  selectBg:'rgba(26,12,22,0.96)',  button:'rgba(122,26,90,0.55)',  pulseR:212, pulseG:106, pulseB:170 },
    dusk:        { label:'Dusk',        bg:'#080709', bgMid:'#0f0c12', bgSurface:'rgba(20,16,28,0.76)', bgUser:'rgba(40,32,56,0.70)', accent:'#6b5a7a', accentSoft:'#b09ac8', accentGlow:'rgba(176,154,200,0.28)',border:'rgba(176,154,200,0.24)',borderMid:'rgba(176,154,200,0.14)',borderSub:'rgba(176,154,200,0.08)',text:'#ede8f5', textMuted:'#6a607a', textEm:'#b09ac8', nameChar:'#b09ac8', nameUser:'rgba(175,165,195,0.60)', scrollbar:'#3a3048', inputBg:'rgba(12,10,18,0.92)', topbar:'rgba(8,7,10,0.94)',   sidebar:'rgba(10,8,14,0.96)',  selectBg:'rgba(22,18,32,0.96)',  button:'rgba(107,90,122,0.50)', pulseR:176, pulseG:154, pulseB:200 },
  };

  function applyTheme(themeKey) {
    const t = TF_THEME_DATA[themeKey];
    if (!t) return;
    document.documentElement.setAttribute('data-tf-theme', themeKey);
    setVar('--tf-bg-deep',           t.bg);
    setVar('--tf-bg-mid',            t.bgMid);
    setVar('--tf-bg-surface',        t.bgSurface);
    setVar('--tf-bg-user',           t.bgUser);
    setVar('--tf-accent',            t.accent);
    setVar('--tf-accent-soft',       t.accentSoft);
    setVar('--tf-accent-glow',       t.accentGlow);
    setVar('--tf-accent-border',     t.border);
    setVar('--tf-accent-border-mid', t.borderMid);
    setVar('--tf-accent-border-sub', t.borderSub);
    setVar('--tf-text',              t.text);
    setVar('--tf-text-muted',        t.textMuted);
    setVar('--tf-text-em',           t.textEm);
    setVar('--tf-name-char',         t.nameChar);
    setVar('--tf-name-user',         t.nameUser);
    setVar('--tf-scrollbar',         t.scrollbar);
    setVar('--tf-input-bg',          t.inputBg);
    setVar('--tf-topbar',            t.topbar);
    setVar('--tf-sidebar',           t.sidebar);
    setVar('--tf-select-bg',         t.selectBg);
    setVar('--tf-button',            t.button);
    if (cfg.pulseAuto) {
      setVar('--tf-pulse-r', t.pulseR); setVar('--tf-pulse-g', t.pulseG); setVar('--tf-pulse-b', t.pulseB);
      cfg.pulseR = t.pulseR; cfg.pulseG = t.pulseG; cfg.pulseB = t.pulseB;
    }
    cfg.theme = themeKey;
  }


  /* ============================================================
     FONTS
     ============================================================ */

  const TF_FONT_PAIRS = {
    A:      { label:'Cinzel + Calibri',               display:"'Cinzel', serif",                        body:"'Calibri', sans-serif",                     displaySize:'11px', displayLs:'0.14em', googleUrl:'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap' },
    B:      { label:'Cormorant Garamond + Georgia',   display:"'Cormorant Garamond', 'Georgia', serif",  body:"'Georgia', serif",                          displaySize:'12px', displayLs:'0.10em', googleUrl:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap' },
    C:      { label:'Josefin Sans + Lato',            display:"'Josefin Sans', sans-serif",              body:"'Lato', sans-serif",                         displaySize:'10px', displayLs:'0.20em', googleUrl:'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&family=Lato:wght@400;700&display=swap' },
    D:      { label:'IM Fell English + Palatino',     display:"'IM Fell English', 'Palatino Linotype', serif", body:"'Palatino Linotype', 'Book Antiqua', serif", displaySize:'12px', displayLs:'0.08em', googleUrl:'https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap' },
    custom: { label:'Custom (Google Fonts)',           display:null, body:null, displaySize:'11px', displayLs:'0.14em', googleUrl:null },
  };

  const tf_loadedFonts = new Set();

  function loadGoogleFont(family) {
    if (!family || tf_loadedFonts.has(family)) return;
    tf_loadedFonts.add(family);
    const id = 'tf-gfont-' + family.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id; link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(family) + ':wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }

  function applyFont(pairKey) {
    const pair = TF_FONT_PAIRS[pairKey];
    if (!pair) return;
    if (pair.googleUrl && !tf_loadedFonts.has(pairKey)) {
      tf_loadedFonts.add(pairKey);
      const id = 'tf-fontpair-' + pairKey;
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id; link.rel = 'stylesheet'; link.href = pair.googleUrl;
        document.head.appendChild(link);
      }
    }
    if (pairKey === 'custom') {
      if (cfg.customDisplayFont) { loadGoogleFont(cfg.customDisplayFont); setVar('--tf-font-display', `'${cfg.customDisplayFont}', serif`); }
      if (cfg.customBodyFont)    { loadGoogleFont(cfg.customBodyFont);    setVar('--tf-font-body',    `'${cfg.customBodyFont}', sans-serif`); }
    } else {
      setVar('--tf-font-display',      pair.display);
      setVar('--tf-font-body',         pair.body);
      setVar('--tf-font-display-size', pair.displaySize);
      setVar('--tf-font-display-ls',   pair.displayLs);
    }
    document.documentElement.setAttribute('data-tf-font', pairKey);
    cfg.font = pairKey;
  }


  /* ============================================================
     PORTRAIT INJECTION
     ============================================================ */

  const tf_enhanced = new WeakSet();
  let tf_avatarObserver = null;

  function toFullAvatarUrl(url) {
    if (!url) return url;
    /* Persona images — served from /User Avatars/ directly */
    if (url.includes('type=persona')) {
      const match = url.match(/file=([^&]+)/);
      if (match) return '/User%20Avatars/' + match[1];
    }
    /* Character avatars — use direct file path */
    return url.replace(/thumbnail\?type=avatar&file=/, 'characters/');
  }

  function tfMakePortrait(avatarUrl, w, h, isMain) {
    const portrait = document.createElement('div');
    portrait.className = isMain ? 'tf-portrait' : 'tf-portrait tf-portrait-ghost';
    const img = document.createElement('img');
    img.className = 'tf-portrait-img'; img.src = avatarUrl; img.alt = ''; img.draggable = false;
    img.style.minHeight = h + 'px';
    img.onerror = function() { portrait.style.display = 'none'; };
    portrait.appendChild(img);
    return portrait;
  }

  function enhanceMessage(mes) {
    if (tf_enhanced.has(mes)) return;
    const wrapper = mes.querySelector('.mesAvatarWrapper');
    if (!wrapper) return;
    /* Read URL before we replace the img, then cache it */
    const existingImg = wrapper.querySelector('img');
    const avatarUrl = toFullAvatarUrl(mes.dataset.tfAvatar || mes.dataset.avatarOriginal || mes.dataset.avatarThumb || mes.dataset.avatar || existingImg?.src || '');
    if (!avatarUrl) return;
    mes.dataset.tfAvatar = avatarUrl; /* cache for ghost lookups */
    tf_enhanced.add(mes);

    const mesId  = wrapper.querySelector('.mesIDDisplay');
    const timer  = wrapper.querySelector('.mes_timer');
    const tokens = wrapper.querySelector('.tokenCounterDisplay');
    const oldThumb = wrapper.querySelector('.avatar');
    const w = cfg.portraitW || 120, h = cfg.portraitH || 160;

    const portrait = tfMakePortrait(avatarUrl, w, h, true);
    const stats = document.createElement('div');
    stats.className = 'tf-portrait-stats';
    if (mesId)  { mesId.className  += ' tf-stat'; stats.appendChild(mesId); }
    if (timer)  { timer.className  += ' tf-stat'; stats.appendChild(timer); }
    if (tokens) { tokens.className += ' tf-stat'; stats.appendChild(tokens); }
    portrait.appendChild(stats);

    if (oldThumb) oldThumb.remove();
    wrapper.classList.add('tf-avatar-wrapper');
    wrapper.innerHTML = '';
    wrapper.appendChild(portrait);
  }

  function enhanceAllMessages() {
    document.querySelectorAll('#chat .mes').forEach(mes => enhanceMessage(mes));
  }

  function startAvatarObserver() {
    const chat = document.getElementById('chat');
    if (!chat) { setTimeout(startAvatarObserver, 500); return; }
    enhanceAllMessages();
    if (tf_avatarObserver) tf_avatarObserver.disconnect();
    tf_avatarObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('mes')) enhanceMessage(node);
          else node.querySelectorAll?.('.mes').forEach(m => enhanceMessage(m));
        });
        if (mutation.type === 'attributes' && mutation.target.classList?.contains('mes')) {
          tf_enhanced.delete(mutation.target); enhanceMessage(mutation.target);
        }
      });
    });
    tf_avatarObserver.observe(chat, { childList:true, subtree:true, attributes:true, attributeFilter:['data-avatar-original','data-avatar','data-avatar-thumb'] });
  }


  /* ============================================================
     SLIDERS
     ============================================================ */

  const TF_SLIDER_DEFS = {
    gossamer: [
      { key:'gossamerBlur',     label:'Blur',          min:0,  max:24, step:1, unit:'px', varName:'--tf-gossamer-blur',      format:v=>v+'px' },
      { key:'gossamerOpacity',  label:'Opacity',       min:0,  max:95, step:1, unit:'%',  varName:'--tf-gossamer-opacity',   format:v=>(v/100).toFixed(2) },
      { key:'gossamerFeatherX', label:'Feather X',     min:0,  max:45, step:1, unit:'%',  varName:'--tf-gossamer-feather-x', format:v=>v+'%' },
      { key:'gossamerFeatherY', label:'Feather Y',     min:0,  max:45, step:1, unit:'%',  varName:'--tf-gossamer-feather-y', format:v=>v+'%' },
    ],
    fade: [
      { key:'fadeStart', label:'Fade Start',    min:0,  max:90,  step:1, unit:'%', varName:'--tf-fade-start',  format:v=>v+'%' },
      { key:'fadeReach', label:'Fade Reach',    min:10, max:100, step:1, unit:'%', varName:'--tf-fade-reach',  format:v=>v+'%' },
      { key:'fadeFloor', label:'Floor Opacity', min:0,  max:50,  step:1, unit:'%', varName:'--tf-fade-floor',  format:v=>(v/100).toFixed(2) },
    ],
    pulse: [
      { key:'pulseSpeed',     label:'Beat Speed', min:0.5, max:8,   step:0.1, unit:'s',  varName:'--tf-pulse-speed',     format:v=>parseFloat(v).toFixed(1)+'s' },
      { key:'pulseIntensity', label:'Intensity',  min:0,   max:100, step:1,   unit:'%',  varName:'--tf-pulse-intensity', format:v=>(v/100).toFixed(2) },
      { key:'pulseRadius',    label:'Glow Radius',min:0,   max:28,  step:1,   unit:'px', varName:'--tf-pulse-radius',    format:v=>v+'px' },
      { key:'pulseR', label:'Red',   min:0, max:255, step:1, unit:'', varName:'--tf-pulse-r', format:v=>v, isRGB:true },
      { key:'pulseG', label:'Green', min:0, max:255, step:1, unit:'', varName:'--tf-pulse-g', format:v=>v, isRGB:true },
      { key:'pulseB', label:'Blue',  min:0, max:255, step:1, unit:'', varName:'--tf-pulse-b', format:v=>v, isRGB:true },
    ],
    ebb: [
      { key:'ebbOpacity',    label:'Portrait Opacity', min:0,  max:95,  step:1, unit:'%', varName:'--tf-ebb-opacity',    format:v=>(v/100).toFixed(2) },
      { key:'ebbDesaturate', label:'Desaturate',       min:0,  max:100, step:1, unit:'%', varName:'--tf-ebb-desaturate', format:v=>v+'%' },
    ],
    flow: [
      { key:'flowScale',    label:'Portrait Scale',  min:100, max:120, step:1, unit:'%', varName:'--tf-flow-scale',    format:v=>(v/100).toFixed(2) },
      { key:'flowVibrancy', label:'Colour Vibrancy', min:100, max:140, step:1, unit:'%', varName:'--tf-flow-vibrancy', format:v=>(v/100).toFixed(2) },
    ],
    void: [
      { key:'voidLineHeight',    label:'Line Height',  min:140, max:220, step:5, unit:'',       varName:'--tf-void-lh', format:v=>(v/100).toFixed(2) },
      { key:'voidLetterSpacing', label:'Name Spacing', min:8,   max:25,  step:1, unit:'/100em', varName:'--tf-void-ls', format:v=>(v/100).toFixed(2)+'em' },
    ],
    loom: [
      { key:'loomRadius',         label:'Corner Softness', min:0,  max:6,  step:1, unit:'px', varName:'--tf-loom-radius',          format:v=>v+'px' },
      { key:'loomVignette',       label:'Vignette',        min:0,  max:90, step:1, unit:'%',  varName:'--tf-loom-vignette',        format:v=>(v/100).toFixed(2) },
      { key:'loomVignetteSpread', label:'Vignette Spread', min:20, max:90, step:5, unit:'%',  varName:'--tf-loom-vignette-spread', format:v=>v+'%' },
    ],
  };

  const TF_GLOBAL_SLIDERS = [
    { key:'portraitW', label:'Portrait Width',  min:60, max:220, step:5,  unit:'px', varName:'--tf-portrait-w', format:v=>v+'px' },
    { key:'portraitH', label:'Portrait Height', min:80, max:340, step:10, unit:'px', varName:'--tf-portrait-h', format:v=>v+'px' },
  ];

  function renderSliders(style) {
    const container = document.getElementById('tf-style-sliders');
    if (!container) return;
    const styleDefs = TF_SLIDER_DEFS[style] || [];
    const allDefs   = [...styleDefs, ...TF_GLOBAL_SLIDERS];
    const label = style.charAt(0).toUpperCase() + style.slice(1);
    let html = `<span class="tf-section-label">${label} Settings</span>`;

    if (style === 'pulse') {
      html += `<div class="tf-row" style="margin-bottom:8px">
        <span class="tf-slider-label">Pulse Colour</span>
        <div id="tf-pulse-swatch" style="width:40px;height:18px;border-radius:3px;border:1px solid rgba(255,255,255,0.15);background:rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})"></div>
        <label class="tf-row" style="gap:4px;font-size:11px;color:var(--tf-text-muted)">
          <input type="checkbox" id="tf-pulse-auto" ${cfg.pulseAuto ? 'checked' : ''}/> Auto
        </label></div>`;
    }

    allDefs.forEach(def => {
      const val = cfg[def.key] ?? 0;
      html += `<div class="tf-row" style="margin-bottom:8px">
        <span class="tf-slider-label">${def.label}</span>
        <input type="range" class="tf-slider" data-key="${def.key}" data-var="${def.varName}" min="${def.min}" max="${def.max}" step="${def.step}" value="${val}"/>
        <span class="tf-slider-val" id="tfv-${def.key}">${val}${def.unit}</span></div>`;
    });

    container.innerHTML = html;

    const autoCheck = container.querySelector('#tf-pulse-auto');
    if (autoCheck) autoCheck.addEventListener('change', function() { cfg.pulseAuto = this.checked; saveSettings(); });

    container.querySelectorAll('.tf-slider').forEach(slider => {
      slider.addEventListener('input', function() {
        const key = this.dataset.key, varName = this.dataset.var, raw = parseFloat(this.value);
        cfg[key] = raw;
        const def = allDefs.find(d => d.key === key);
        setVar(varName, def ? def.format(raw) : raw);
        if (key === 'ebbDesaturate') setVar('--tf-ebb-saturate', (1 - raw/100).toFixed(2));
        const valEl = document.getElementById('tfv-' + key);
        if (valEl) valEl.textContent = raw + (def?.unit || '');
        if (['pulseR','pulseG','pulseB'].includes(key)) {
          const swatch = document.getElementById('tf-pulse-swatch');
          if (swatch) swatch.style.background = `rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})`;
        }
        saveSettings();
      });
    });
  }


  /* ============================================================
     PANEL UI
     ============================================================ */

  function makeLemniscateSVG() {
    return `<svg viewBox="0 0 52 30" xmlns="http://www.w3.org/2000/svg" class="tf-btn-svg">
      <path d="M26 15 C26 15 20 4 11 4 C4.5 4 2 8.8 2 15 C2 21.2 4.5 26 11 26 C20 26 26 15 26 15 C26 15 32 4 41 4 C47.5 4 50 8.8 50 15 C50 21.2 47.5 26 41 26 C32 26 26 15 26 15Z" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="5" x2="26" y2="25" stroke-opacity="0.45" stroke-dasharray="1.5 2.5"/>
      <polygon points="26,5 20,20 32,20" stroke-opacity="0.75" fill="none" stroke-linejoin="round"/>
      <circle cx="26" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>`;
  }

  function togglePanel() {
    const panel = document.getElementById('trinfinity-panel');
    if (!panel) return;
    const isOpen = panel.classList.toggle('tf-open');
    if (isOpen) positionPanel();
  }

  function positionPanel() {
    const panel = document.getElementById('trinfinity-panel');
    const btn   = document.getElementById('trinfinity-btn');
    if (!panel || !btn) return;
    panel.style.right  = (parseInt(btn.style.right)  || 20) + 'px';
    panel.style.bottom = ((parseInt(btn.style.bottom) || 80) + 56) + 'px';
  }

  function buildButton() {
    const existing = document.getElementById('trinfinity-btn');
    if (existing) existing.remove();

    const btn = document.createElement('button');
    btn.id = 'trinfinity-btn';
    btn.title = 'Trinfinity';
    btn.textContent = '∞';
    btn.style.cssText = `
      position: fixed !important;
      right: 20px !important;
      bottom: 80px !important;
      z-index: 99999 !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      border: 1px solid rgba(255,255,255,0.2) !important;
      background: rgba(0,0,0,0.6) !important;
      color: var(--tf-accent-soft, #a78bfa) !important;
      font-size: 20px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    `;
    btn.addEventListener('click', togglePanel);
    document.body.appendChild(btn);
  }

  function buildPanel() {
    const existing = document.getElementById('trinfinity-panel');
    if (existing) existing.remove();

    const themeOptions = Object.entries(TF_THEME_DATA).map(([k,v]) => `<option value="${k}" ${cfg.theme===k?'selected':''}>${v.label}</option>`).join('');
    const styleOptions = TF_STYLES.map(s => `<option value="${s}" ${cfg.style===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('');
    const fontOptions  = Object.entries(TF_FONT_PAIRS).map(([k,v]) => `<option value="${k}" ${cfg.font===k?'selected':''}>${v.label}</option>`).join('');

    const panel = document.createElement('div');
    panel.id = 'trinfinity-panel';
    panel.innerHTML = `
      <div class="tf-panel-header">
        <span class="tf-panel-title">∞ Trinfinity</span>
        <button class="tf-panel-close" id="tf-close">✕</button>
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
          <div id="tf-custom-fonts" class="tf-custom-fonts" style="display:${cfg.font==='custom'?'flex':'none'}">
            <input class="tf-input" id="tf-font-display-input" placeholder="Display font (e.g. Playfair Display)" value="${cfg.customDisplayFont||''}"/>
            <input class="tf-input" id="tf-font-body-input" placeholder="Body font (e.g. Lora)" value="${cfg.customBodyFont||''}"/>
            <button class="tf-btn-small" id="tf-font-load-btn">Load Fonts ↗</button>
          </div>
        </div>
        <hr class="tf-divider"/>
        <div class="tf-panel-section" id="tf-style-sliders"></div>
        <hr class="tf-divider"/>
        <div class="tf-panel-section tf-about">
          <span>Trinfinity v${TF_VERSION}</span>
          <span>by trinity (trinachronism)</span>
          <a href="https://github.com/trinibots/trinfinity" target="_blank" rel="noopener">github.com/trinibots/trinfinity</a>
        </div>
      </div>`;

    document.body.appendChild(panel);
    positionPanel();

    document.getElementById('tf-close').addEventListener('click', () => panel.classList.remove('tf-open'));
    document.getElementById('tf-style-select').addEventListener('change', (e) => { applyStyle(e.target.value); renderSliders(e.target.value); saveSettings(); });
    document.getElementById('tf-theme-select').addEventListener('change', (e) => { applyTheme(e.target.value); saveSettings(); });
    document.getElementById('tf-font-select').addEventListener('change', (e) => {
      applyFont(e.target.value);
      document.getElementById('tf-custom-fonts').style.display = e.target.value === 'custom' ? 'flex' : 'none';
      saveSettings();
    });
    document.getElementById('tf-font-load-btn').addEventListener('click', () => {
      cfg.customDisplayFont = document.getElementById('tf-font-display-input').value.trim();
      cfg.customBodyFont    = document.getElementById('tf-font-body-input').value.trim();
      if (cfg.customDisplayFont) { loadGoogleFont(cfg.customDisplayFont); setVar('--tf-font-display', `'${cfg.customDisplayFont}', serif`); }
      if (cfg.customBodyFont)    { loadGoogleFont(cfg.customBodyFont);    setVar('--tf-font-body',    `'${cfg.customBodyFont}', sans-serif`); }
      saveSettings();
    });

    renderSliders(cfg.style);
  }

  function addExtensionMenuEntry() {
    function tryAdd() {
      const menu = document.getElementById('extensionsMenu');
      if (!menu || document.getElementById('tf-ext-btn')) return;
      const btn = document.createElement('div');
      btn.id = 'tf-ext-btn'; btn.className = 'tf-ext-menu-btn';
      btn.textContent = '∞ Trinfinity';
      btn.style.cssText = 'padding:8px 16px;cursor:pointer;color:var(--tf-accent-soft,#a78bfa);font-size:13px;';
      btn.addEventListener('click', togglePanel);
      menu.prepend(btn);
    }

    /* Try immediately, then watch for menu to appear */
    tryAdd();
    const observer = new MutationObserver(() => tryAdd());
    observer.observe(document.body, { childList: true, subtree: true });

    /* Stop watching after 30s */
    setTimeout(() => observer.disconnect(), 30000);
  }


  /* ============================================================
     INIT
     ============================================================ */

  function init() {
    loadSettings();
    applyAllVars();
    applyTheme(cfg.theme);
    applyFont(cfg.font);

    function ready() {
      applyStyle(cfg.style);
      buildButton();
      buildPanel();
      addExtensionMenuEntry();
      setTimeout(startAvatarObserver, 900);
    }

    /* Use setTimeout(0) to guarantee body exists regardless of module load timing */
    if (document.body) {
      setTimeout(ready, 500);
    } else {
      document.addEventListener('DOMContentLoaded', () => setTimeout(ready, 500));
    }
  }

  init();

})();
