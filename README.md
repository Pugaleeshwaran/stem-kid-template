# Curio Maker — STEM & Robotics Template for Kids

A nine-page HTML template for kids' STEM, robotics and coding clubs.
Five colour themes, a scroll-animated hero, and no build step.

**👉 Full guide: open `documentation/index.html` in your browser.**

---

## Quick start

1. Unzip the folder and keep the files together.
2. Double-click **`index.html`** — it opens in your browser. That's the whole setup.
3. Open the folder in a code editor (VS Code is free) and start editing the text.

No installation, no Node.js, no build tools.

> **Tip:** install the *Live Server* extension in VS Code, right-click
> `index.html` → *Open with Live Server*, and the browser reloads as you save.

---

## What's inside

| | |
|---|---|
| **Pages** | Home, About Us, Products, Pricing, Gallery, Blog, Blog Post, Contact, 404 |
| **Themes** | 5 palettes, switchable live — one full dark theme |
| **Responsive** | Desktop, tablet and mobile |
| **Dependencies** | None. No jQuery, no Bootstrap, no frameworks |
| **Images required** | None — all visuals are CSS, emoji and inline SVG |

**Working features:** filterable product, gallery and blog grids, project lightbox,
monthly/termly pricing toggle, validated booking form, FAQ accordions, animated counters, scroll-parallax hero,
sticky nav, mobile menu, scroll progress bar.

---

## File structure

```
curio-maker/
├── index.html            Home page
├── about.html            About Us
├── products.html         Products / kits
├── pricing.html          Membership plans + billing toggle
├── gallery.html          Student project gallery
├── blog.html             Article listing
├── blog-single.html      Single article layout
├── contact.html          Contact + booking form
├── 404.html              Error page
├── favicon.svg           Browser tab icon
│
├── assets/
│   ├── css/
│   │   ├── themes.css    🎨 ALL COLOURS LIVE HERE
│   │   ├── style.css     Shared layout: nav, hero, buttons, footer
│   │   └── pages.css     Inner-page styles: products, gallery, forms
│   ├── js/
│   │   └── main.js       All interactions — one commented file
│   └── img/              Put your own photos here
│
├── documentation/
│   └── index.html        Full guide — start here
│
├── README.md             This file
├── CHANGELOG.md          Version history
└── LICENSE.txt           What you may do with the template
```

---

## The three things most people change first

### 1. Colours

Everything colour-related is in **`assets/css/themes.css`** — nothing else in the
template contains a hard-coded colour. Edit one block and the whole site follows,
including the robot mascot.

To ship with a single fixed theme, add it to the `<html>` tag on every page:

```html
<html lang="en" data-theme="jungle">
```

Available keys: `pop` (default), `bubble`, `jungle`, `space` (dark), `sunset`.

### 2. Text and contact details

Open any `.html` file and type over the words. Look for `EDIT:` comments marking
the spots most people change first.

Use **Find in Folder** (Ctrl/Cmd + Shift + F in VS Code) to replace these across
all pages at once:

- `CurioMaker` → your brand name
- `hello@curiomaker.com` → your email
- `+92 000 000 0000` → your phone
- `24 Maker Street, Your City` → your address
- `href="#"` in the footer → your social links

### 3. The contact form

⚠️ **The form validates but does not send anywhere yet.** HTML alone cannot send
email. Connect Formspree, Web3Forms or your own PHP script — step-by-step
instructions are in the documentation under *"Make the contact form send email"*.

---

## Adding or removing content

Copy an existing block, paste it below, change the words. Delete a block to
remove it. The grids re-flow on their own — you never touch the CSS.

| To add another… | Copy this block |
|---|---|
| Product | `<article class="prod">` … `</article>` |
| Gallery project | `<article class="gal__tile">` … `</article>` |
| Program card | `<article class="card">` … `</article>` |
| Mentor | `<article class="mentor">` … `</article>` |
| FAQ question | `<details class="faq__item">` … `</details>` |
| Blog post card | `<article class="post">` … `</article>` |
| Pricing plan | `<article class="plan">` … `</article>` |

On the Products page, a card's `data-cat` must match one of the `data-filter`
buttons above the grid, or it will disappear when that filter is clicked.

---

## Publishing

Static site — it runs anywhere.

- **Netlify:** drag the folder onto [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages / Vercel / Cloudflare Pages:** deploy with default settings
- **cPanel / FTP:** upload the *contents* of the folder into `public_html`

Before going live, delete `documentation/`, `README.md`, `CHANGELOG.md` and
`LICENSE.txt` from the server — visitors don't need them.

---

## Browser support

Chrome, Edge, Firefox and Safari — 2023 versions onward.
Uses CSS custom properties and `color-mix()`. Internet Explorer is not supported
(it reached end of life in 2022).

---

## Credits

| Item | Source | Licence |
|---|---|---|
| Fredoka, Nunito | Google Fonts | SIL Open Font License 1.1 |
| Icons | Unicode emoji | Rendered by the device — no licence needed |
| Robot mascot | Original inline SVG | Included with the template |

No third-party JavaScript. All names, prices, testimonials and student projects
in the demo are fictional — replace them with your own.

---

## Support

Contact us through the item's support channel on the marketplace where you bought
this. Please include your browser version, the page and section, and a screenshot.
