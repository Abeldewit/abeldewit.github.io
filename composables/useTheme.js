// composables/useTheme.js
// ─────────────────────────────────────────────────────────────
// Shared composable that manages light / dark theme state.
//
// Usage (in any component):
//   const { isDark, toggle } = useTheme()
//
// How it works:
//   1. On mount, reads the user's saved choice from localStorage.
//   2. If no saved choice, falls back to the OS preference
//      (window.matchMedia 'prefers-color-scheme: dark').
//   3. Sets data-theme="dark" | "light" on <html> — the CSS in
//      main.css picks this up and swaps all CSS variables.
//   4. Listens for OS preference changes so the site follows
//      the system if the user hasn't made an explicit choice.
// ─────────────────────────────────────────────────────────────

import { ref, onMounted, onUnmounted } from 'vue'

// Keep a single reactive ref shared across all component instances
// that call useTheme() on the same page.
const isDark = ref(false)

export function useTheme() {
  let mediaQuery = null

  // Apply a theme: update the ref, set the HTML attribute, save to localStorage.
  function apply(dark) {
    isDark.value = dark
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  // Toggle between light and dark.
  function toggle() {
    apply(!isDark.value)
  }

  // Handle OS preference change (only fires if user hasn't saved a choice).
  function onSystemChange(e) {
    if (!localStorage.getItem('theme')) apply(e.matches)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      // Honour the user's explicit choice.
      apply(saved === 'dark')
    } else {
      // No saved choice — follow the OS.
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      // Don't call apply() here (which would write to localStorage);
      // the anti-flash script already set data-theme on <html>.
    }

    // Keep in sync if the OS preference changes while the page is open.
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', onSystemChange)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', onSystemChange)
  })

  return { isDark, toggle }
}
