/* ============================================================
   TRINFINITY — src/trinfinity-fonts.js
   Font pair definitions + Google Fonts dynamic loader
   ============================================================ */

const TF_FONT_PAIRS = {
  A: {
    label:   'Cinzel + Calibri',
    display: "'Cinzel', serif",
    body:    "'Calibri', sans-serif",
    displaySize: '11px',
    displayLs:   '0.14em',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap',
  },
  B: {
    label:   'Cormorant Garamond + Georgia',
    display: "'Cormorant Garamond', 'Georgia', serif",
    body:    "'Georgia', serif",
    displaySize: '12px',
    displayLs:   '0.10em',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap',
  },
  C: {
    label:   'Josefin Sans + Lato',
    display: "'Josefin Sans', sans-serif",
    body:    "'Lato', sans-serif",
    displaySize: '10px',
    displayLs:   '0.20em',
    googleUrl: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&family=Lato:wght@400;700&display=swap',
  },
  D: {
    label:   'IM Fell English + Palatino',
    display: "'IM Fell English', 'Palatino Linotype', serif",
    body:    "'Palatino Linotype', 'Book Antiqua', serif",
    displaySize: '12px',
    displayLs:   '0.08em',
    googleUrl: 'https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap',
  },
  custom: {
    label:   'Custom (Google Fonts)',
    display: null,
    body:    null,
    displaySize: '11px',
    displayLs:   '0.14em',
    googleUrl: null,
  },
};

const tf_loadedFonts = new Set();

function tfLoadGoogleFont(family) {
  if (!family || tf_loadedFonts.has(family)) return;
  tf_loadedFonts.add(family);
  const id   = 'tf-gfont-' + family.replace(/\s+/g, '-').toLowerCase();
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id   = id;
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' +
    encodeURIComponent(family) + ':wght@400;500;600&display=swap';
  document.head.appendChild(link);
}

function tfApplyFont(pairKey, cfg, setVar) {
  const pair = TF_FONT_PAIRS[pairKey];
  if (!pair) return;

  /* Load the Google Font if needed */
  if (pair.googleUrl && !tf_loadedFonts.has(pairKey)) {
    tf_loadedFonts.add(pairKey);
    const id = 'tf-fontpair-' + pairKey;
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id   = id;
      link.rel  = 'stylesheet';
      link.href = pair.googleUrl;
      document.head.appendChild(link);
    }
  }

  if (pairKey === 'custom') {
    /* Custom fonts set separately via the input fields */
    if (cfg.customDisplayFont) {
      tfLoadGoogleFont(cfg.customDisplayFont);
      setVar('--tf-font-display',      `'${cfg.customDisplayFont}', serif`);
    }
    if (cfg.customBodyFont) {
      tfLoadGoogleFont(cfg.customBodyFont);
      setVar('--tf-font-body',         `'${cfg.customBodyFont}', sans-serif`);
    }
  } else {
    setVar('--tf-font-display',      pair.display);
    setVar('--tf-font-body',         pair.body);
    setVar('--tf-font-display-size', pair.displaySize);
    setVar('--tf-font-display-ls',   pair.displayLs);
  }

  document.documentElement.setAttribute('data-tf-font', pairKey);
  cfg.font = pairKey;
}
