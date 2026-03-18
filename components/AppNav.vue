<template>
  <!--
    AppNav.vue — Sticky navigation bar
    ─────────────────────────────────
    Features:
    • Glassmorphism blur effect after scrolling
    • Highlights the active section as you scroll (scrollspy)
    • Smooth-scrolls to anchors on click
    • Collapses into a hamburger menu on mobile
  -->
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">

      <!-- Brand / Logo -->
      <NuxtLink to="/" class="nav-brand">
        <span class="gradient-text">Abel</span><span class="nav-dot">.</span>
      </NuxtLink>

      <!-- Desktop navigation links -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.anchor">
          <a
            :href="link.anchor"
            class="nav-link"
            :class="{ active: activeSection === link.section }"
            @click.prevent="smoothScroll(link.anchor)"
          >
            {{ link.label }}
          </a>
        </li>
        <!-- Portfolio goes to its own page -->
        <li>
          <NuxtLink to="/portfolio" class="nav-link">Portfolio</NuxtLink>
        </li>
      </ul>

      <!-- CV download button (desktop) -->
      <a href="/cv.pdf" download class="btn btn-primary nav-cta">
        Download CV
      </a>

      <!-- Hamburger toggle (mobile only) -->
      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle navigation menu"
      >
        <span /><span /><span />
      </button>
    </div>

    <!-- Mobile slide-down menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a
        v-for="link in navLinks"
        :key="link.anchor"
        :href="link.anchor"
        class="mobile-link"
        @click="smoothScroll(link.anchor); menuOpen = false"
      >
        {{ link.label }}
      </a>
      <NuxtLink to="/portfolio" class="mobile-link" @click="menuOpen = false">
        Portfolio
      </NuxtLink>
      <a href="/cv.pdf" download class="mobile-link">Download CV</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── Navigation link definitions ──────────────────────────────────────────────
// anchor: the href to scroll to   |   section: the element id to watch
const navLinks = [
  { label: 'Home',       anchor: '#home',       section: 'home'       },
  { label: 'Experience', anchor: '#experience', section: 'experience' },
  { label: 'Projects',   anchor: '#projects',   section: 'projects'   },
  { label: 'Contact',    anchor: '#contact',    section: 'contact'    },
]

// ── Reactive state ────────────────────────────────────────────────────────────
const isScrolled     = ref(false)    // true when page has been scrolled
const menuOpen       = ref(false)    // mobile menu visibility
const activeSection  = ref('home')   // which section is currently in view

// ── Smooth scroll ─────────────────────────────────────────────────────────────
function smoothScroll(anchor) {
  const target = document.querySelector(anchor)
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

// ── Scroll handler ────────────────────────────────────────────────────────────
// Updates the background blur and the active nav link on scroll
function onScroll() {
  // Show glassmorphism background after 60px of scroll
  isScrolled.value = window.scrollY > 60

  // Determine which section is centred in the viewport
  const sectionIds = navLinks.map(l => l.section)
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue
    const { top, bottom } = el.getBoundingClientRect()
    const mid = window.innerHeight / 2
    if (top <= mid && bottom >= mid) {
      activeSection.value = id
      break
    }
  }
}

onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Base nav ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1rem 0;
  transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
}

/* Glassmorphism: kicks in after user scrolls */
.nav.scrolled {
  background: rgba(255, 251, 247, 0.88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding: 0.55rem 0;
}

/* Inner flex row */
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* ── Brand ── */
.nav-brand {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}
.nav-dot { color: var(--orange); }

/* ── Desktop links ── */
.nav-links {
  display: flex;
  list-style: none;
  gap: 0.2rem;
  flex: 1;
}
.nav-link {
  display: block;
  padding: 0.4rem 0.85rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--ease);
}
.nav-link:hover,
.nav-link.active {
  color: var(--orange);
  background: rgba(194, 65, 12, 0.08);
}
.nav-link.active { color: var(--orange); font-weight: 600; }

/* ── CTA button ── */
.nav-cta {
  flex-shrink: 0;
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
}

/* ── Hamburger ── */
.hamburger {
  display: none;           /* hidden on desktop */
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: var(--orange);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
/* Animate to X when open */
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile menu ── */
.mobile-menu {
  display: flex;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  background: rgba(255, 251, 247, 0.97);
  transition: max-height 0.35s ease, padding 0.35s ease;
}
.mobile-menu.open {
  max-height: 320px;
  padding: 0.5rem 0 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}
.mobile-link {
  padding: 0.8rem 2rem;
  color: var(--text-secondary);
  font-size: 1rem;
  transition: color 0.2s;
}
.mobile-link:hover { color: var(--orange); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
}
</style>
