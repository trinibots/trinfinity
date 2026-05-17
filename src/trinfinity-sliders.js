/* ============================================================
   TRINFINITY — src/trinfinity-sliders.js
   Per-style slider definitions + real-time CSS var updates
   ============================================================ */

const TF_SLIDER_DEFS = {
  gossamer: [
    { key: 'gossamerBlur',    label: 'Blur',          min: 0,   max: 24,  step: 1,   unit: 'px', varName: '--tf-gossamer-blur',    format: v => v + 'px' },
    { key: 'gossamerOpacity', label: 'Opacity',       min: 0,   max: 95,  step: 1,   unit: '%',  varName: '--tf-gossamer-opacity', format: v => (v / 100).toFixed(2) },
    { key: 'gossamerFeather', label: 'Avatar Feather',min: 0,   max: 80,  step: 2,   unit: 'px', varName: '--tf-gossamer-feather', format: v => v + 'px' },
  ],
  fade: [
    { key: 'fadeStart', label: 'Fade Start',    min: 0,   max: 90,  step: 1,   unit: '%', varName: '--tf-fade-start',  format: v => v + '%' },
    { key: 'fadeReach', label: 'Fade Reach',    min: 10,  max: 100, step: 1,   unit: '%', varName: '--tf-fade-reach',  format: v => v + '%' },
    { key: 'fadeFloor', label: 'Floor Opacity', min: 0,   max: 50,  step: 1,   unit: '%', varName: '--tf-fade-floor',  format: v => (v / 100).toFixed(2) },
  ],
  pulse: [
    { key: 'pulseSpeed',     label: 'Beat Speed', min: 0.5, max: 8,   step: 0.1, unit: 's',  varName: '--tf-pulse-speed',     format: v => parseFloat(v).toFixed(1) + 's' },
    { key: 'pulseIntensity', label: 'Intensity',  min: 0,   max: 100, step: 1,   unit: '%',  varName: '--tf-pulse-intensity', format: v => (v / 100).toFixed(2) },
    { key: 'pulseRadius',    label: 'Glow Radius',min: 0,   max: 28,  step: 1,   unit: 'px', varName: '--tf-pulse-radius',    format: v => v + 'px' },
    { key: 'pulseR', label: 'Red',   min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-r', format: v => v, isRGB: true },
    { key: 'pulseG', label: 'Green', min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-g', format: v => v, isRGB: true },
    { key: 'pulseB', label: 'Blue',  min: 0, max: 255, step: 1, unit: '', varName: '--tf-pulse-b', format: v => v, isRGB: true },
  ],
  ebb: [
    { key: 'ebbOpacity',    label: 'Portrait Opacity', min: 0,  max: 95,  step: 1, unit: '%', varName: '--tf-ebb-opacity',    format: v => (v / 100).toFixed(2) },
    { key: 'ebbDesaturate', label: 'Desaturate',       min: 0,  max: 100, step: 1, unit: '%', varName: '--tf-ebb-desaturate', format: v => v + '%' },
  ],
  flow: [
    { key: 'flowScale',    label: 'Portrait Scale',  min: 100, max: 120, step: 1, unit: '%', varName: '--tf-flow-scale',    format: v => (v / 100).toFixed(2) },
    { key: 'flowVibrancy', label: 'Colour Vibrancy', min: 100, max: 140, step: 1, unit: '%', varName: '--tf-flow-vibrancy', format: v => (v / 100).toFixed(2) },
  ],
  void: [
    { key: 'voidLineHeight',    label: 'Line Height',   min: 140, max: 220, step: 5, unit: '',      varName: '--tf-void-lh', format: v => (v / 100).toFixed(2) },
    { key: 'voidLetterSpacing', label: 'Name Spacing',  min: 8,   max: 25,  step: 1, unit: '/100em', varName: '--tf-void-ls', format: v => (v / 100).toFixed(2) + 'em' },
  ],
  loom: [
    { key: 'loomRadius',         label: 'Corner Softness', min: 0,  max: 6,  step: 1, unit: 'px', varName: '--tf-loom-radius',          format: v => v + 'px' },
    { key: 'loomVignette',       label: 'Vignette',        min: 0,  max: 90, step: 1, unit: '%',  varName: '--tf-loom-vignette',        format: v => (v / 100).toFixed(2) },
    { key: 'loomVignetteSpread', label: 'Vignette Spread', min: 20, max: 90, step: 5, unit: '%',  varName: '--tf-loom-vignette-spread', format: v => v + '%' },
  ],
};

const TF_GLOBAL_SLIDERS = [
  { key: 'portraitW', label: 'Portrait Width',  min: 60, max: 220, step: 5,  unit: 'px', varName: '--tf-portrait-w', format: v => v + 'px' },
  { key: 'portraitH', label: 'Portrait Height', min: 80, max: 340, step: 10, unit: 'px', varName: '--tf-portrait-h', format: v => v + 'px' },
];

function tfRenderSliders(style, cfg, setVar, container, onSave) {
  if (!container) return;

  const styleDefs = TF_SLIDER_DEFS[style] || [];
  const allDefs   = [...styleDefs, ...TF_GLOBAL_SLIDERS];

  const label = style.charAt(0).toUpperCase() + style.slice(1);
  let html = `<span class="tf-section-label">${label} Settings</span>`;

  if (style === 'pulse') {
    html += `
      <div class="tf-row" style="margin-bottom:8px">
        <span class="tf-slider-label">Pulse Colour</span>
        <div id="tf-pulse-swatch" style="width:40px;height:18px;border-radius:3px;
          border:1px solid rgba(255,255,255,0.15);
          background:rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})"></div>
        <label class="tf-row" style="gap:4px;font-size:11px;color:var(--tf-text-muted)">
          <input type="checkbox" id="tf-pulse-auto" ${cfg.pulseAuto ? 'checked' : ''}/>
          Auto
        </label>
      </div>`;
  }

  allDefs.forEach(def => {
    const val = cfg[def.key] ?? 0;
    html += `
      <div class="tf-row" style="margin-bottom:8px">
        <span class="tf-slider-label">${def.label}</span>
        <input type="range" class="tf-slider"
          data-key="${def.key}" data-var="${def.varName}"
          min="${def.min}" max="${def.max}" step="${def.step}" value="${val}"/>
        <span class="tf-slider-val" id="tfv-${def.key}">${val}${def.unit}</span>
      </div>`;
  });

  container.innerHTML = html;

  const autoCheck = container.querySelector('#tf-pulse-auto');
  if (autoCheck) {
    autoCheck.addEventListener('change', function() {
      cfg.pulseAuto = this.checked;
      onSave();
    });
  }

  container.querySelectorAll('.tf-slider').forEach(slider => {
    slider.addEventListener('input', function() {
      const key     = this.dataset.key;
      const varName = this.dataset.var;
      const raw     = parseFloat(this.value);
      cfg[key]      = raw;

      const def    = allDefs.find(d => d.key === key);
      const cssVal = def ? def.format(raw) : raw;
      setVar(varName, cssVal);

      /* Also update --tf-ebb-saturate when desaturate slider moves */
      if (key === 'ebbDesaturate') {
        setVar('--tf-ebb-saturate', (1 - raw / 100).toFixed(2));
      }

      const valEl = document.getElementById('tfv-' + key);
      if (valEl) valEl.textContent = raw + (def?.unit || '');

      if (['pulseR', 'pulseG', 'pulseB'].includes(key)) {
        const swatch = document.getElementById('tf-pulse-swatch');
        if (swatch) swatch.style.background =
          `rgb(${cfg.pulseR},${cfg.pulseG},${cfg.pulseB})`;
      }

      onSave();
    });
  });
}
