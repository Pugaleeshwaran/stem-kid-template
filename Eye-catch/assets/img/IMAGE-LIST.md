# Image list — exactly what you need

**Short answer: 15 images are wired up and working right now** (as placeholders).
Swap those 15 and the site is done. A further **19 are optional** — they replace
coloured panels that already look finished, so only do them if you have photos.

Every slot crops with `object-fit: cover`, so a photo that is roughly the right
shape will sit correctly. You never have to touch the CSS.

---

## A · WIRED UP — 15 images (replace these first)

| # | File | Exact size | Ratio | Where it shows | What to shoot |
|---|---|---|---|---|---|
| 1 | `logo.svg` | 260 × 56 | — | Nav, all 9 pages | Your logo, **dark** artwork |
| 2 | `logo-light.svg` | 260 × 56 | — | Footer + dark theme | Same logo, **light** artwork |
| 3 | `hero.svg` | 1000 × 1000 | 1:1 | Home hero | Children building something. Your single most important image |
| 4 | `about-story.svg` | 1000 × 920 | ~1:1 | About → Our Story | Mentor helping a child at the bench |
| 5–10 | `product-1.svg` … `product-6.svg` | 1200 × 750 | 16:10 | Products, 6 cards | Each kit, flat-lay on a plain background |
| 11–14 | `team-1.svg` … `team-4.svg` | 400 × 400 | 1:1 | About → Mentors | Head-and-shoulders, face centred |
| 15 | `og-share.svg` | 1200 × 630 | 1.91:1 | Social preview (all pages) | Logo + one line of text on a plain colour |

### Which product file goes where

| File | Card |
|---|---|
| `product-1` | Robo Starter Bot |
| `product-2` | Junior Arduino Lab |
| `product-3` | Innovator Drone Kit |
| `product-4` | AI Vision Pack |
| `product-5` | 3D Print Parts Pack |
| `product-6` | Spare & Rescue Box |

### Which mentor file goes where

`team-1` Sana Iqbal · `team-2` Omar Farooq · `team-3` Hina Raza · `team-4` Bilal Ahmed

---

## B · OPTIONAL — 19 more (only if you have photos)

These slots currently show coloured panels with an icon. They look intentional,
so this is a genuine choice, not a gap.

| # | File | Exact size | Ratio | Where |
|---|---|---|---|---|
| 16–24 | `project-1.svg` … `project-9.svg` | 1200 × 900 | 4:3 | Gallery, 9 tiles |
| 25–31 | `blog-1.svg` … `blog-7.svg` | 1200 × 675 | 16:9 | Blog, 7 cards (`blog-1` is the wide featured one) |
| 32 | `post-hero.svg` | 1200 × 600 | 2:1 | Blog post, top image |
| 33 | `post-figure.svg` | 1200 × 675 | 16:9 | Blog post, inline figure |
| 34 | `map.svg` | 1000 × 800 | 5:4 | Contact, map panel |

### How to switch one on

Find the coloured panel and drop an `<img>` inside it. Gallery example —
change this:

```html
<div class="gal__art gal__art--a">🏎️</div>
```

to this:

```html
<div class="gal__art">
  <img src="assets/img/project-1.svg" width="1200" height="900"
       alt="Line-follower robot on its track" />
</div>
```

The same pattern works for `.post__art`, `.article__hero` and `.article__fig`.
The CSS to make it fill is already written.

---

## Totals

| | Count |
|---|---|
| Wired up now | **15** |
| Optional | **19** |
| **Full set** | **34** |

Favicon (`favicon.svg`, in the root folder) is separate and already done.

---

## File format

The placeholders are `.svg`. Your photos will be **`.jpg`** (or `.webp`), so you
must **change the file extension in the HTML too**:

```html
<!-- before -->
<img src="assets/img/hero.svg" ... />
<!-- after -->
<img src="assets/img/hero.jpg" ... />
```

Use *Find in Folder* (`Ctrl/Cmd + Shift + F` in VS Code) and replace
`.svg" width` with `.jpg" width` to do them all at once — but leave
`logo.svg`, `logo-light.svg` and `favicon.svg` as SVG if your logo is vector,
because vector logos stay sharp at every size.

---

## Before you upload photos

- **Compress them.** [squoosh.app](https://squoosh.app) is free. Aim for under
  200 KB each; the hero can go to 300 KB.
- **Keep the `width` and `height` attributes** on every `<img>`. They stop the
  page jumping around while images load, and Google measures that.
- **Write a real `alt`.** "Children wiring a robot" — not "image1".
- **Photographs of children need written permission** from a parent or guardian
  before you publish them. Many countries require it.

---

## Icons — nothing to buy

Icons are inline SVG, drawn for this template and defined at the top of each
page. There are no icon files, no font to load and no licence to pay for.

To change one, edit its `<symbol>` in the page, or point the `<use>` at a
different symbol id:

```html
<svg class="ico" aria-hidden="true"><use href="#i-robot"/></svg>
```

Available ids per page: the four cards on that page plus `i-s-photo`,
`i-s-play`, `i-s-chat`, `i-s-wa` for the footer.

Icons inherit their colour from the text around them and size to the parent's
`font-size`, so they follow all five themes automatically.
