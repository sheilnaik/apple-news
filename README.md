# Apple News launcher

A single-page launcher for favorite Apple News publications. Every entry uses
a direct `apple.news` link.

## Design: The Newsstand

A printed-paper editorial look:

- **Nameplate.** A broadsheet masthead with a volume and issue dateline (the
  year in Roman numerals, the day of the year as the issue number), set in
  Fraunces with its soft, "wonky" italic. A double rule sits beneath it.
- **Desks.** Each section is a color-block panel in vermilion, cobalt, forest
  or marigold, with a risograph-style ink texture, a title count, and an
  italic section number.
- **Tickets.** Publications sit on paper-colored cards with logo tiles. They
  animate in on load and, on desktop, lift with an arrow on hover.
- **Layout.** Two columns on phones. On desktop the desks form a bento grid:
  current news beside analysis, then technology beside sports.
- **Dark mode.** Ink-dark paper with dark tickets tinted by their desk color.
- **Accessibility.** Every text color meets 4.5:1. Semantic lists within one
  `nav` landmark, visible focus rings, and support for reduced motion,
  increased contrast, and forced colors.

### Type

| Role | Typeface |
|---|---|
| Nameplate, section and publication names | Fraunces (variable: `opsz`, `wght`, `SOFT`, `WONK`) |
| Body text | Instrument Sans |
| Datelines, counts, labels | DM Mono |

Fonts load from Google Fonts. The service worker caches them in a separate
cache, so the installed app keeps its typography offline.

### Adding a publication

Add an `<li>` to the right desk's list. Add `pub__logo--fill` if the logo is
already a filled square. Counts and animation order are computed
automatically. Add the logo to `APP_SHELL` in `sw.js` so it works offline.

The site is an installable progressive web app with standalone display
metadata and custom maskable/app icons.
