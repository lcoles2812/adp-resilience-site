# ADP Resilience — The Reset Protocol

A three-page static site for Ash's 12-week 1:1 coaching program, rebuilt from the original single-page [Carrd](https://startyoureset.carrd.co) site.

## Pages

- **`index.html`** — Home: the hook, the problem, and quick outcomes.
- **`program.html`** — The Program: the Body/Mind/Sleep modules, eligibility, offer, and guarantee.
- **`about.html`** — About & FAQ: Ash's story and the six most common questions.

## Structure

```
index.html
program.html
about.html
assets/
  style.css       shared stylesheet (design tokens, layout, components)
  script.js       scroll-progress rail
  favicon.svg
  fonts/          Fraunces (display) + IBM Plex Mono (labels/data), self-hosted woff2
  images/         Ash's photos
```

No build step, no framework, no external requests — open any page directly in a browser or serve the folder as static files.

## Editing

- Copy lives directly in the HTML.
- Colors, type scale, and spacing are CSS custom properties at the top of `assets/style.css`.
- The application link (Notion form) is repeated as plain `<a>` hrefs across all three pages — update all occurrences if it changes.
