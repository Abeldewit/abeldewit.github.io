// nuxt.config.js
// This file configures the Nuxt.js application.
// Nuxt reads it automatically — no imports needed.

export default defineNuxtConfig({
  // Show the Nuxt devtools overlay during development
  devtools: { enabled: true },

  // Global <head> settings applied to every page
  app: {
    head: {
      title: 'Abel de Wit',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Personal website of Abel de Wit — AI Engineer, MSc student at Maastricht University, drone pilot and photographer.'
        }
      ],
      link: [
        // Preconnect to Google Fonts for faster loading
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Space Grotesk: clean modern sans-serif for body text
        // Space Mono: monospace font for code/tag elements
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
        }
      ]
    }
  },

  // Global CSS file loaded on every page
  css: ['~/assets/css/main.css']
})
