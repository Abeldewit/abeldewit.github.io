# abeldewit.github.io

Personal website built with [Nuxt 3](https://nuxt.com). Features a light theme with bold accent colors, animated particle background, scroll-reveal animations, and a typing effect in the hero section.

**Live site:** https://abeldewit.github.io

## Stack

- **Nuxt 3** — Vue.js framework with file-based routing
- **Pure CSS** — CSS custom properties for theming, no CSS framework
- **Canvas 2D API** — particle/symbol background animation
- **IntersectionObserver** — scroll-triggered reveal animations
- **gh-pages** — static site deployment to GitHub Pages

## Project structure

```
├── assets/css/main.css       # Global styles & CSS variables
├── components/
│   ├── AppNav.vue            # Fixed navigation with scrollspy
│   ├── AppFooter.vue         # Footer
│   ├── ParticleCanvas.vue    # Animated canvas background
│   ├── HeroSection.vue       # Hero with typing animation
│   ├── ExperienceSection.vue # Timeline of work & education
│   ├── ProjectsSection.vue   # Project cards
│   └── ContactSection.vue    # Contact links
├── composables/useReveal.js  # Shared scroll-reveal composable
├── pages/
│   ├── index.vue             # Home page
│   └── portfolio.vue         # Photography & drone portfolio
├── public/
│   ├── logos/                # Company/institution logos
│   ├── gallery/              # Portfolio photos (add your own)
│   └── Resume - Abel.pdf                # CV download
└── nuxt.config.js
```

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:3000
npm run generate  # Build static site to .output/public/
npm run preview   # Preview the generated site
```

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

To deploy manually:
```bash
npm run deploy    # Runs nuxt generate && gh-pages -d .output/public
```

Then set the Pages source to the `gh-pages` branch in **Settings → Pages**.

## Customisation

All colours, fonts, and spacing are defined as CSS custom properties in `assets/css/main.css` under `:root`. Changing a value there updates the whole site.

To add portfolio photos, drop images into `public/gallery/` and update the `galleryItems` array in `pages/portfolio.vue`.
