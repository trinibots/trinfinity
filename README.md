# Trinfinity

**A sensory UI theme system for SillyTavern.**

Seven message styles. Twelve colour themes. Custom fonts. Real-time controls. Built by trinity (trinachronism).

---

## Message Styles

| Style | Feel |
|---|---|
| **Gossamer** | Frosted glass, feathered portrait edges, background bleeds through bubbles. Soft blur and opacity controls. |
| **Fade** | Full-width strip. Portrait dissolves horizontally into the message. Fader controls: start, reach, floor opacity. |
| **Pulse** | Minimal. A single flatline accent bar that breathes — glow swells and fades like a heartbeat. RGB colour control. |
| **Ebb** | Portrait recedes — desaturated, low opacity, like a memory fading. Hover to bring it forward slightly. |
| **Flow** | Portrait advances — full colour, scaled up, stepping into light. Vivid and forward. |
| **Void** | No borders. No edges. Intentional negative space. Text floats on dark, held only by spatial rhythm. |
| **Loom** | Tight geometric precision. Corner softness slider. Vignette frames the text — centre always the brightest point. |

## Colour Themes

| Theme | Aesthetic |
|---|---|
| **Ultraviolet** | Cold gothic violet — the default |
| **Viscera** | Arterial, raw, organ-dark crimson |
| **Undertow** | Lovecraftian bioluminescent deep |
| **Opulence** | Art deco, 1920s, burnished gold |
| **Ashen** | Monochrome, ash and bone |
| **Revenant** | Cold cobalt, ghost light |
| **Ember** | Smouldering, dying fire |
| **Venom** | Toxic neon-dark green |
| **Requiem** | Deeper purple, funeral lilac |
| **Lacuna** | Absence, cold ice blue |
| **Blossom** | Dark rose, deep pink |
| **Dusk** | Mauve, twilight, between worlds |

## Installation

### Via ST Extension Manager
1. Go to **Extensions → Install extension**
2. Paste: `https://github.com/trinibots/trinfinity`
3. Enable Trinfinity in the extensions list

### Manual
1. Download and unzip this repo
2. Place the `trinfinity` folder in `SillyTavern/public/extensions/`
3. Restart ST — Trinfinity will appear in the extensions list

### Recommended: Update config.yaml for better portrait quality
```yaml
thumbnails:
  enabled: true
  format: png
  quality: 100
  dimensions:
    avatar:
      - 864
      - 1280
```
Delete your thumbnails folder after updating and restart ST to regenerate at full quality.

## Usage

Click the **∞△ button** (bottom-right by default, draggable) to open the settings panel.

- **Message Style** — switch between the seven styles
- **Colour Theme** — 12 presets + full custom colour support (coming)
- **Font Pair** — 4 curated pairs + custom Google Fonts input
- **Style Settings** — real-time sliders specific to the active style
- **Portrait Size** — width and height sliders, global across all styles

## File Structure

```
trinfinity/
├── .github/ImagePreview/     screenshots
├── i18n/en.json              string definitions
├── src/
│   ├── trinfinity-themes.js  colour theme engine
│   ├── trinfinity-fonts.js   font pair loader
│   ├── trinfinity-avatar.js  portrait injection layer
│   ├── trinfinity-sliders.js slider definitions + logic
│   └── trinfinity-panel.js   settings panel UI
├── styles/
│   ├── trinfinity-base.css   global base + CSS variables
│   ├── trinfinity-avatar.css portrait system CSS
│   ├── trinfinity-gossamer.css
│   ├── trinfinity-fade.css
│   ├── trinfinity-pulse.css
│   ├── trinfinity-ebb.css
│   ├── trinfinity-flow.css
│   ├── trinfinity-void.css
│   ├── trinfinity-loom.css
│   └── trinfinity-panel.css
├── theme/                    ST-importable theme preset JSONs
├── trinfinity-core.js        entry point
├── trinfinity-styles.css     compiled CSS (ST loads this)
├── manifest.json
├── README.md
├── LICENSE
└── CHANGELOG.md
```

## Compatibility

- SillyTavern 1.17.0+ (Release or Staging)
- Brave / Chrome recommended
- Does not require Moonlit Echoes — fully standalone

## License

MIT — do whatever you want with it, just credit trinity (trinachronism).

---

*Built with coffee and Claude.*
