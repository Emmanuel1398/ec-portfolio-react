# globals.css — Style Reference

Global stylesheet for the EC Portfolio React app. Covers resets, design tokens, utility classes, and reusable component styles.

---

## Fonts

Imported from Google Fonts:

| Variable | Family | Weights |
|---|---|---|
| `--serif` | Cormorant Garamond | 300, 400, 600 (normal + italic) |
| `--ui` | Chakra Petch | 300, 400, 500 |
| `--body` | DM Sans | 300, 400, 500 |

---

## CSS Custom Properties (`:root`)

### Colors

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#060606` | Primary page background |
| `--bg2` | `#0c0c0c` | Alternate section background |
| `--bg3` | `#111111` | Tertiary background |
| `--gold` | `#c9a96e` | Primary accent color |
| `--gold2` | `#e8d5a8` | Lighter gold (hover states) |
| `--gold-lo` | `rgba(201,169,110,0.08)` | Low-opacity gold tint |
| `--text` | `#ededea` | Primary text |
| `--muted` | `#888580` | Secondary / subdued text |
| `--dim` | `#2f2d2b` | Dimmed elements (borders, placeholders) |
| `--faint` | `rgba(255,255,255,0.05)` | Very subtle white tint |
| `--border` | `rgba(255,255,255,0.07)` | Default border color |
| `--border-bright` | `rgba(255,255,255,0.12)` | Brighter border variant |

### Easing

| Variable | Value |
|---|---|
| `--ease` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## Base / Reset

- Universal `box-sizing: border-box`, `margin: 0`, `padding: 0`, `min-width: 0`
- `html`: smooth scroll, no horizontal overflow
- `body`: dark background, light text, DM Sans 300, `line-height: 1.7`
- `::selection`: gold background, black text
- Custom scrollbar: 2px wide, gold thumb

---

## Cursor

| Class | Description |
|---|---|
| `.c-dot` | Small 5px gold dot, tracks cursor position |
| `.c-ring` | 28px ring, lags behind cursor with eased transition |
| `.c-ring.on` | Scales ring to 1.65× and brightens border on hover targets |

---

## Reveal Animations

Scroll-triggered fade + slide-up transitions. Add `.in` via JS (IntersectionObserver) to activate.

| Class | Behavior |
|---|---|
| `.rv` | Fades in and slides up from 50px over 1.5s |
| `.rv.in` | Triggered state — fully visible, no offset |
| `.rv.d1` – `.rv.d5` | Staggered delays: 0.1s → 0.7s |
| `.rv-img` | Fade-only variant (no translate), 1.8s duration |
| `.rv-img.in` | Triggered state |

---

## Layout

| Class | Description |
|---|---|
| `.page` | Full-height flex column wrapper |
| `.page-content` | `flex: 1` — fills remaining vertical space |
| `.sec` | Section padding: `8rem 5vw` |
| `.sec-alt` | Section with `--bg2` background |

---

## Section Anatomy

Reusable heading and rule components for page sections.

| Class | Description |
|---|---|
| `.cat-label` | Uppercase UI label with gold left-line and optional `.cat-num` counter |
| `.cat-num` | Right-aligned dim number inside `.cat-label` |
| `.sec-title` | Serif heading, fluid size `clamp(2.8rem, 4.8vw, 5.5rem)`, weight 300 |
| `.sec-title em` | Italic gold accent within a title |
| `.sec-rule` | Horizontal rule with top border, wraps descriptive text and a link |
| `.sec-rule p` | Small UI-font caption inside the rule |
| `.sec-link` | Small uppercase link with `→` suffix, muted → gold on hover |

---

## Divider

| Class | Description |
|---|---|
| `.divider` | Simple `1px` top border using `--border` |

---

## Horizontal Drag Row

A horizontally scrollable, draggable card strip. Drag state toggled via JS.

| Class | Description |
|---|---|
| `.h-row` | Flex container, horizontal scroll, no scrollbar, `cursor: grab` |
| `.h-row.dragging` | `cursor: grabbing` while dragging |
| `.h-item` | Individual card — `flex: 0 0 auto`, overflow hidden |
| `.h-item img` | Cover image with subtle scale on hover (`1.04`) |
| `.h-item__info` | Overlay info panel, slides up and fades in on hover |
| `.h-item__title` | Serif card title |
| `.h-item__sub` | Gold uppercase UI-font subtitle |
| `.h-item__num` | Muted item number |

---

## Video Card

| Class | Description |
|---|---|
| `.video-card` | Clickable card with overflow hidden |
| `.video-card img` | Cover image, scales to `1.04` on hover |
| `.video-card__overlay` | Centered play button overlay, fades in on hover |
| `.video-card__play` | Circular bordered play icon button |
| `.video-card:hover .video-card__play` | Gold fill + black icon |
| `.video-card__label` | Gradient label bar at bottom |
| `.video-card__title` | Serif title in label |
| `.video-card__sub` | Gold uppercase subtitle in label |

---

## Video Modal

| Class | Description |
|---|---|
| `.modal-bg` | Fixed full-screen overlay, near-opaque black, fade-in animation |
| `.modal-frame` | Centered `16:9` iframe container, max width `min(90vw, 1200px)` |
| `.modal-frame iframe` | Borderless video embed |
| `.modal-close` | Circular close button positioned top-right of frame |

---

## Ticker

Horizontally scrolling marquee strip.

| Class | Description |
|---|---|
| `.ticker` | 40px tall container with `--bg2` and border |
| `.ticker-t` | Animates via `tick` keyframe — scrolls left continuously over 35s |
| `.ticker-t:hover` | Pauses animation |
| `.t-item` | Individual ticker item — small uppercase UI font, `--dim` color |
| `.t-item.g` | Gold-colored ticker item variant |

`@keyframes tick`: translates from `0%` to `-50%` for seamless loop.

---

## Form

| Class | Description |
|---|---|
| `.form-field` | Flex column wrapper with `0.4rem` gap |
| `.form-label` | Small uppercase UI label |
| `.form-input` | Borderless input — only bottom border, gold on focus |
| `.form-textarea` | Same as input; `min-height: 100px`, no resize |

---

## Buttons

| Class | Description |
|---|---|
| `.btn-primary` | Solid gold background, black text, uppercase, no border-radius |
| `.btn-primary:hover` | Lightens to `--gold2` |
| `.btn-outline` | Transparent with subtle border, muted text |
| `.btn-outline:hover` | Gold border and text |

---

## Volume Slider

| Class | Description |
|---|---|
| `.vol-slider` | Pill-shaped frosted container for a range input |
| `.vol-slider input[type=range]` | 72px wide, 3px track, no default appearance |
| Thumb styles | 10px gold circle (WebKit + Firefox) |

---

## Responsive & Accessibility

| Rule | Behavior |
|---|---|
| `@media (max-width: 960px)` | Hides `.hide-mobile` elements; reduces `.sec` padding to `5rem 5vw` |
| `@media (prefers-reduced-motion: reduce)` | Disables all transitions and animations on `.rv`, `.rv-img`, `.h-item img`, `.video-card img` |
