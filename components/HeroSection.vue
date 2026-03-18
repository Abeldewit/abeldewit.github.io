<template>
  <!--
    HeroSection.vue — Full-screen landing section
    ──────────────────────────────────────────────
    Layers (back to front):
      1. Light background (var(--bg-primary), a soft white)
      2. ParticleCanvas (floating coding symbols + connecting lines)
      3. Decorative glowing "blob" divs (blurred colour circles for ambience)
      4. Main text content + CTA buttons
      5. Scroll hint indicator at the bottom
  -->
  <section id="home" class="hero">

    <!-- Layer 1+2: light background + floating coding-symbol particles -->
    <ParticleCanvas />

    <!-- Layer 3: ambient colour blobs for background depth -->
    <div class="blob blob-purple" />
    <div class="blob blob-pink"   />
    <div class="blob blob-cyan"   />

    <!-- Layer 4: content -->
    <div class="hero-content">

      <!-- Small uppercase label -->
      <p class="hero-greeting reveal">Hello, I'm</p>

      <!-- Main name — the blinking _ is a retro cursor touch -->
      <h1 class="hero-name reveal">
        Abel<span class="cursor">_</span>
      </h1>

      <!-- Typing animation: cycles through different roles -->
      <p class="hero-role reveal">
        <span class="role-prefix">I am&nbsp;a&nbsp;</span>
        <!--
          displayedRole is updated by the typing composable below.
          The | character blinks to simulate a real terminal cursor.
        -->
        <span class="role-typed gradient-text">{{ displayedRole }}</span>
        <span class="type-cursor">|</span>
      </p>

      <!-- Short bio -->
      <p class="hero-bio reveal">
        Forensic Data Scientist at the Nederlands Forensisch Instituut.
        MEng in Artificial Intelligence from Maastricht University, with a background in
        data engineering, machine learning, and NLP. Co-founder of Weevi.
        Also: drone pilot &amp; photographer.
      </p>

      <!-- CTA buttons -->
      <div class="hero-buttons reveal">
        <a
          href="#projects"
          class="btn btn-primary"
          @click.prevent="smoothScroll('#projects')"
        >
          View My Work
          <!-- Right arrow SVG icon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a
          href="#contact"
          class="btn btn-outline"
          @click.prevent="smoothScroll('#contact')"
        >
          Get In Touch
        </a>
        <a href="/cv.pdf" download class="btn btn-outline">
          Download CV
        </a>
      </div>

      <!-- Social icon links -->
      <div class="hero-social reveal">

        <!-- GitHub -->
        <a href="https://github.com/abeldewit" target="_blank"
           rel="noopener noreferrer" class="social-btn" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a href="https://linkedin.com/in/abeldewit" target="_blank"
           rel="noopener noreferrer" class="social-btn" title="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        <!-- Email -->
        <a href="mailto:hello@abeldewit.com" class="social-btn" title="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" width="20" height="20">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
          </svg>
        </a>

      </div>
    </div>

    <!-- Layer 5: scroll hint at bottom -->
    <div class="scroll-hint">
      <div class="scroll-mouse">
        <div class="scroll-dot" />
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '~/composables/useReveal'

// ── Typing animation ──────────────────────────────────────────────────────────
// Cycles through `roles` by typing and erasing each string character by character
const roles = [
  'Forensic Data Scientist',
  'Dreamer',
  'Photographer',
  'Founder',
  'Data Engineer',
  'Tinkerer',
  'Drone Pilot',
  'Problem Solver'
]

const displayedRole = ref('')  // Text currently shown on screen

let roleIdx   = 0      // Which role in the array are we on?
let charIdx   = 0      // How many characters are shown?
let deleting  = false  // Are we erasing or typing?
let timer     = null   // setTimeout handle

function typeStep() {
  const current = roles[roleIdx]

  if (!deleting) {
    // Type one more character
    displayedRole.value = current.slice(0, charIdx + 1)
    charIdx++

    if (charIdx === current.length) {
      // Finished typing — pause 1.8s before erasing
      deleting = true
      timer = setTimeout(typeStep, 1800)
      return
    }
  } else {
    // Erase one character
    displayedRole.value = current.slice(0, charIdx - 1)
    charIdx--

    if (charIdx === 0) {
      // Finished erasing — move to next role
      deleting  = false
      roleIdx   = (roleIdx + 1) % roles.length
      timer     = setTimeout(typeStep, 400)  // short pause before next word
      return
    }
  }

  // Variable speed: slightly random typing feels more human, erasing is faster
  const delay = deleting ? 55 : 80 + Math.random() * 40
  timer = setTimeout(typeStep, delay)
}

// ── Smooth scroll helper ────────────────────────────────────────────────────
function smoothScroll(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
// useReveal('#home') sets up IntersectionObserver for all .reveal elements
// inside #home. Elements already in the viewport fire immediately on mount,
// so the hero content animates in on page load.
useReveal('#home')

onMounted(() => {
  // Small delay so the page has painted before the typing starts
  setTimeout(typeStep, 600)
})

onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
/* ── Hero wrapper ── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-primary);
}

/* ── Ambient glow blobs ──
   These are just blurred, coloured div elements that create
   a subtle glow behind the content. The animation is defined in main.css. */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: float 9s ease-in-out infinite;
}
.blob-purple {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(109, 40, 217, 0.18) 0%, transparent 65%);
  top: -140px; left: -140px;
  animation-delay: 0s;
}
.blob-pink {
  width: 420px; height: 420px;
  background: radial-gradient(circle, rgba(219, 39, 119, 0.14) 0%, transparent 65%);
  top: 30%; right: -80px;
  animation-delay: -3.5s;
}
.blob-cyan {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(14, 116, 144, 0.13) 0%, transparent 65%);
  bottom: 8%; left: 25%;
  animation-delay: -6s;
}

/* ── Content ── */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 780px;
  padding: 7rem 2rem 4rem;
  text-align: center;
}

/* "Hello, I'm" label */
.hero-greeting {
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

/* Large name */
.hero-name {
  font-size: clamp(3rem, 9vw, 6.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  margin-bottom: 1.25rem;
}

/* Blinking retro cursor after the name */
.cursor {
  color: var(--purple);
  animation: blink 1.2s ease-in-out infinite;
}

/* Role line with typing text */
.hero-role {
  font-size: clamp(1.15rem, 3vw, 1.65rem);
  font-weight: 500;
  margin-bottom: 1.75rem;
  min-height: 2.4rem;  /* prevents layout shift while typing */
}
.role-prefix   { color: var(--text-secondary); }
.role-typed    { min-width: 1ch; }
.type-cursor   {
  display: inline-block;
  color: var(--pink);
  animation: blink 0.7s ease-in-out infinite;
  font-weight: 300;
  margin-left: 1px;
}

/* Bio paragraph */
.hero-bio {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 540px;
  margin: 0 auto 2.5rem;
}

/* CTA button row */
.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

/* Social icon row */
.hero-social {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
.social-btn {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(109, 40, 217, 0.07);
  border: 1.5px solid rgba(109, 40, 217, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple);
  transition: var(--ease);
}
.social-btn:hover {
  background: rgba(109, 40, 217, 0.14);
  border-color: var(--purple);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(109, 40, 217, 0.2);
}

/* ── Scroll hint ──
   A small mouse icon at the bottom of the hero that bounces
   to hint the user to scroll down. */
.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
.scroll-mouse {
  width: 24px; height: 38px;
  border: 2px solid rgba(109, 40, 217, 0.25);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
.scroll-dot {
  width: 4px; height: 8px;
  background: var(--purple);
  border-radius: 2px;
  animation: scrollBounce 1.6s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%   { transform: translateY(0); opacity: 1; }
  80%  { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 0; }
}

/* ── Stagger hero reveals ── */
/* Each child of hero-content gets a slightly longer delay */
.hero-content .reveal:nth-child(1) { transition-delay: 0.10s; }
.hero-content .reveal:nth-child(2) { transition-delay: 0.20s; }
.hero-content .reveal:nth-child(3) { transition-delay: 0.30s; }
.hero-content .reveal:nth-child(4) { transition-delay: 0.40s; }
.hero-content .reveal:nth-child(5) { transition-delay: 0.50s; }
.hero-content .reveal:nth-child(6) { transition-delay: 0.60s; }

/* ── Mobile adjustments ── */
@media (max-width: 640px) {
  /* Reduce top/bottom padding so content isn't cramped below the navbar */
  .hero-content { padding: 5.5rem 1.25rem 3rem; }

  /* Tighten letter-spacing on the large name at small sizes */
  .hero-name { letter-spacing: -1px; }

  /* Stack CTA buttons vertically on very small screens */
  .hero-buttons { flex-direction: column; align-items: center; }
  .hero-buttons .btn { width: 100%; max-width: 260px; justify-content: center; }
}

@media (max-width: 400px) {
  .hero-content { padding: 5rem 1rem 2.5rem; }
}
</style>
