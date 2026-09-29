# Apple News launcher

A dependency-free, single-page launcher for favorite Apple News publications.
Every entry uses a direct `apple.news` link.

## Design: a "Liquid Glass" newsstand

- **Masthead.** A serif headline names the edition by time of day: Morning,
  Afternoon, Evening, or Late Edition. It is set in New York, Apple's serif,
  on Apple devices.
- **Wallpaper.** Four soft color fields (Apple News red, orange, violet, blue)
  drift slowly behind the page, with a fine film grain to prevent banding.
- **Widgets.** Each section is a frosted-glass panel with a specular rim, a
  gradient glyph, and a source count, styled like an iPhone home-screen widget.
  On desktop the panels form two balanced columns, like an iPad home screen.
- **Tiles.** Publication logos are styled as app icons with a halo in each
  publication's brand color (`--brand` on each tile), which intensifies on
  hover.
- **Light and dark.** Both themes are tuned separately. Every text color is
  checked to at least 4.5:1 against the most saturated wallpaper color that
  can sit behind the glass.
- **Accessibility.** Semantic lists within one `nav` landmark, visible focus
  rings, and support for reduced motion (the animation stops), reduced
  transparency (solid panels), increased contrast, and forced colors.
- **System fonts.** Nothing loads from the network. All sources fit on one
  screen on current standard and Pro Max iPhones.

### Adding a source

Add an `<li>` to the right section's list with a `--brand` color. Add
`tile__icon--fill` if the logo is already a filled square. Section counts and
entrance animation order are computed automatically. Add the logo to the
`APP_SHELL` list in `sw.js` so it works offline.

The site is an installable progressive web app with a cached offline shell,
standalone display metadata, and custom maskable/app icons. Icons use
ISC-licensed Lucide glyphs.
