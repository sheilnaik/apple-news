# Apple News launcher

A dependency-free, single-page launcher for favorite Apple News publications.

Sources are grouped into current news, analysis and ideas, technology and
science, and sports. Every entry uses a direct `apple.news` link.

## Design

The layout follows the Apple News / iOS "large title" pattern: a date eyebrow
and bold wordmark, color-coded section titles, and publications presented as
rounded cards with app-icon-style logos on a grouped background.

- **Phone first.** Two-column cards with 48px+ tap targets. Spacing scales with
  the small viewport height (`svh`), so all sources fit on one screen on most
  current iPhones.
- **Tablet and desktop.** The same cards reflow into an auto-fill grid and then
  a four-column grid.
- **Light and dark mode.** Colors follow `prefers-color-scheme` and use iOS's
  increased-contrast system tints, so every text color meets WCAG AA (4.5:1).
- **Accessibility.** Semantic lists within a single `nav` landmark, visible
  focus rings, support for reduced motion and increased contrast, and Windows
  high-contrast (forced colors) support.
- **System fonts.** Typography uses the platform font stack (SF Pro on Apple
  devices), so nothing loads from the network.

Logos that are already a filled square use `source__logo--fill` to render
edge-to-edge. Transparent logos sit centered on a white tile.

The site is an installable progressive web app with a cached offline shell,
standalone display metadata, and custom maskable/app icons. The app icon uses
the ISC-licensed Lucide Newspaper glyph.
