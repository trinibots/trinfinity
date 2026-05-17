# TRINFINITY — CHANGELOG
by trinity (trinachronism)
https://github.com/trinibots/trinfinity

## Versioning
```
x.y.z
  x = public release (0 = pre-release)
  y = stage number
  z = save iteration within stage (resets on new stage)
  letters = hotfix rollback within a save (v0.3.0a, v0.3.0b...)
```

---

## v0.3.0 — Stage 3: Full Architecture Rebuild
**Files:** All files restructured and expanded

### Structure
```
trinfinity/
├── .github/ImagePreview/
├── i18n/en.json
├── src/
│   ├── trinfinity-themes.js
│   ├── trinfinity-fonts.js
│   ├── trinfinity-avatar.js
│   ├── trinfinity-sliders.js
│   └── trinfinity-panel.js
├── styles/
│   ├── trinfinity-base.css
│   ├── trinfinity-avatar.css
│   ├── trinfinity-gossamer.css
│   ├── trinfinity-fade.css
│   ├── trinfinity-pulse.css
│   ├── trinfinity-ebb.css
│   ├── trinfinity-flow.css
│   ├── trinfinity-void.css
│   ├── trinfinity-loom.css
│   └── trinfinity-panel.css
├── theme/
│   └── [Trinfinity] *.json  (12 theme presets)
├── trinfinity-core.js
├── trinfinity-styles.css    (compiled from styles/)
├── manifest.json
├── README.md
├── LICENSE
├── .gitignore
└── CHANGELOG.md
```

### Added
- **src/trinfinity-themes.js** — Full theme engine module
  - All 12 theme variable sets as data objects
  - `tfApplyTheme()` function applies full variable set to :root
  - Auto-syncs pulse RGB to theme accent when pulseAuto enabled
- **src/trinfinity-fonts.js** — Font pair system module
  - 4 font pair definitions with Google Fonts URLs
  - `tfApplyFont()` loads correct Google Font and sets variables
  - `tfLoadGoogleFont()` deduplicates font loads
- **src/trinfinity-avatar.js** — Portrait injection module
  - `tfEnhanceMessage()` — injects portrait for single message
  - `tfEnhanceAllMessages()` — runs on all existing messages
  - `tfStartAvatarObserver()` — MutationObserver for new messages
  - `tfRefreshPortraits()` — re-injects after size changes
  - Error fallback: if original fails, tries thumbnail
- **src/trinfinity-sliders.js** — Slider system module
  - All slider definitions separated by style
  - Global sliders: portrait width + height (apply to all styles)
  - Pulse RGB swatch preview + Auto toggle
  - `tfRenderSliders()` builds HTML + wires events
- **src/trinfinity-panel.js** — Panel UI module
  - `tfMakeLemniscateSVG()` — ∞△ icon (lemniscate + bisect line + triangle + eye)
  - `tfBuildButton()` — floating button with drag
  - `tfBuildPanel()` — full settings panel
  - `tfPositionPanel()` — positions panel above button
  - `tfTogglePanel()` / `tfClosePanel()`
  - `tfAddExtensionMenuEntry()` — ST Extensions menu hook
- **styles/** — Each message style in its own CSS file
  - trinfinity-base.css (global, variables, fonts, inline colour fix)
  - trinfinity-avatar.css (portrait system + per-style portrait treatments)
  - trinfinity-gossamer.css
  - trinfinity-fade.css
  - trinfinity-pulse.css
  - trinfinity-ebb.css
  - trinfinity-flow.css
  - trinfinity-void.css
  - trinfinity-loom.css
  - trinfinity-panel.css (button + panel UI)
- **theme/** — 12 ST-importable theme preset JSON files
  `[Trinfinity] Ultraviolet.json` through `[Trinfinity] Dusk.json`
- **i18n/en.json** — All UI strings externalised for future translation
- **README.md** — Full documentation with style table, install guide, config.yaml tip
- **LICENSE** — MIT
- **.gitignore**
- **trinfinity-styles.css** — compiled from all styles/ files in order

### Changed
- trinfinity-core.js refactored as pure entry point
  - Loads src/ modules via dynamic script tags
  - Delegates all logic to module functions
  - Module loading with fallback if any src/ file fails
- Portrait width + height now CSS vars (--tf-portrait-w, --tf-portrait-h)
  controlled via global sliders

---

## v0.2.0 — Stage 2: Avatar Enhancement Layer
**Files:** manifest.json · trinfinity-core.js · trinfinity-styles.css

### Added
- Portrait injection system
  - Reads `data-avatar-original` from every `.mes`
  - Injects 120×160px portrait replacing ST's thumbnail
  - `object-position: top center` for correct face display
- Stats overlay (token count, timer, message ID) in gradient scrim at portrait bottom
- MutationObserver — new messages auto-enhanced
- Per-style portrait treatments in CSS
- `.tf-portrait` and `.tf-portrait-img` classes

### Fixed
- Old `.mesAvatarWrapper .avatar` hidden after portrait injection
- User message portrait flex ordering

---

## v0.1.2 — Stage 1, Save 2: Animation + Layout Fixes
**Files:** trinfinity-core.js · trinfinity-styles.css

### Fixed
- Pulse: replaced travelling dot with static breathing glow
  `tf-pulse-travel` → `tf-pulse-breathe` keyframes
- Fade: `min-height: 80px` so avatar strip has space
- Fade: `mesAvatarWrapper` stretches to fill height
- Duplicate selectors cleaned up (Fade, Ebb)

---

## v0.1.1 — Stage 1, Save 1: Avatar Selector Fix
**Files:** trinfinity-styles.css

### Fixed
- All avatar selectors updated to actual ST 1.17.0 DOM:
  `.mes_avatar` → `.mesAvatarWrapper`
  `.avatar_wrapper` → `.mesAvatarWrapper`
- Base `.mesAvatarWrapper` layout rules added
- `.mesAvatarWrapper .avatar img` sizing added

---

## v0.1.0 — Stage 1: Foundation
**Files:** manifest.json · trinfinity-core.js · trinfinity-styles.css

### Added
- Extension scaffold for ST
- 7 message styles (CSS): Gossamer, Fade, Pulse, Ebb, Flow, Void, Loom
- 12 colour themes with full CSS variable sets
- 4 font pairs + custom Google Fonts input
- Floating ∞△ button (draggable, fade/glow on hover)
- Settings panel (style, theme, font, per-style sliders)
- Pulse RGB colour picker with live swatch
- Extensions menu entry
- `<font color="">` inline colour fix

### Notes
- Confirmed working on ST 1.17.0
- Avatar selectors wrong (fixed v0.1.1)
- Pulse animation wrong type (fixed v0.1.2)
