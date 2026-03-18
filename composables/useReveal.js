// composables/useReveal.js
//
// A composable is a reusable piece of logic in Vue 3.
// This one sets up a scroll-reveal IntersectionObserver for a section.
//
// HOW IT WORKS:
//   The browser's IntersectionObserver watches elements and fires a callback
//   when they enter or exit the viewport. We add the CSS class "visible"
//   when an element scrolls into view, which triggers a CSS transition.
//
// USAGE:
//   In any section component:
//     import { useReveal } from '~/composables/useReveal'
//     useReveal('#my-section-id')

import { onMounted, onUnmounted } from 'vue'

export function useReveal(sectionSelector) {
  let observer = null

  onMounted(() => {
    // Create an observer that fires when elements cross the 10% visibility threshold
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Stop watching after reveal — saves memory
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    // Find the container section (or the whole document if no selector given)
    const scope = sectionSelector
      ? document.querySelector(sectionSelector)
      : document

    if (scope) {
      // Watch every element with a reveal class inside this section
      scope.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
        observer.observe(el)
      })
    }
  })

  // Clean up when the component is destroyed
  onUnmounted(() => observer?.disconnect())
}
