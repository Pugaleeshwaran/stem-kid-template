# Changelog

All notable changes to the STEM Robo Kid’s template.
This project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-09-02

First public release.

### Pages (9)
- Home — animated hero, programs, age groups, stats, how-it-works, testimonials, sign-up
- About Us — story, values, timeline, mentors
- Products — six filterable kit cards, inclusions band, FAQ
- Pricing — three plans, monthly/termly billing toggle, comparison table, FAQ
- Gallery — nine filterable projects with a detail lightbox
- Blog — featured post, category filters, pagination, newsletter band
- Blog Post — full article layout with quotes, callouts, tags, author box, related posts
- Contact — info cards, validated booking form, map panel, hours, FAQ
- 404 — friendly error page with quick links

### Features
- Five colour themes with a live switcher, remembered between visits
- Scroll-parallax hero with pointer-tracking robot mascot
- Reveal-on-scroll animation with staggered timing
- Filterable product, gallery and blog grids
- Monthly / termly pricing toggle
- Animated statistic counters
- Sticky nav, mobile menu, scroll progress bar
- Native FAQ accordions (no JavaScript required)
- Product enquiry links that pre-select the product on the contact form

### Images & icons
- 15 image slots wired up with branded placeholders (logo ×2, hero, about story,
  6 products, 4 mentors, social share) — full spec in `assets/img/IMAGE-LIST.md`
- Two logo files: dark artwork for the light themes, light artwork for Space Cadet
- Icons are inline SVG drawn for this template — no icon font, no external file,
  works when the page is opened directly from disk
- Open Graph and Twitter card tags on every page

### Accessibility & robustness
- Respects `prefers-reduced-motion`
- Keyboard-accessible gallery lightbox with focus return and Escape to close
- `aria-expanded` / `aria-pressed` states on menu, filters and theme switcher
- Content stays visible with JavaScript disabled
- Text contrast verified across all five themes
