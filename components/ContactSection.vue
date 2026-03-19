<template>
  <!--
    ContactSection.vue — Get in touch
    ──────────────────────────────────
    A clean set of clickable contact cards (email, LinkedIn, GitHub)
    plus a large call-to-action button.
  -->
  <section id="contact" class="section contact-section">

    <div class="section-glow" />

    <div class="container">
      <p class="section-tag reveal">Get in touch</p>
      <h2 class="section-title reveal">
        Let's <span class="accent-pink">Connect</span>
      </h2>
      <p class="section-subtitle reveal">
        Whether you want to collaborate, talk AI, or just say hello — my inbox is always open.
      </p>

      <!-- Contact cards -->
      <div class="contact-grid">

        <!-- Email -->
        <a href="mailto:hello@abeldewit.com" class="contact-card glass-card reveal">
          <div class="card-icon" style="background: var(--grad-orange-amber)">
            <!-- Envelope icon -->
            <svg viewBox="0 0 24 24" fill="none" stroke="white"
                 stroke-width="2" stroke-linecap="round" width="22" height="22">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
            </svg>
          </div>
          <div class="card-text">
            <p class="card-label">Email</p>
            <p class="card-value">hello@abeldewit.com</p>
          </div>
          <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          href="https://linkedin.com/in/abeldewit"
          target="_blank" rel="noopener noreferrer"
          class="contact-card glass-card reveal"
          style="transition-delay: 0.08s"
        >
          <div class="card-icon" style="background: linear-gradient(135deg, #0077b5, #00a0dc)">
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div class="card-text">
            <p class="card-label">LinkedIn</p>
            <p class="card-value">linkedin.com/in/abeldewit</p>
          </div>
          <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        <!-- GitHub -->
        <a
          href="https://github.com/abeldewit"
          target="_blank" rel="noopener noreferrer"
          class="contact-card glass-card reveal"
          style="transition-delay: 0.16s"
        >
          <div class="card-icon" style="background: linear-gradient(135deg, #24292e, #57606a)">
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <div class="card-text">
            <p class="card-label">GitHub</p>
            <p class="card-value">github.com/abeldewit</p>
          </div>
          <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

      </div>

      <!-- Large CTA -->
      <div class="cta-block reveal">
        <p class="cta-text">Or send me an email directly</p>
        <a href="mailto:hello@abeldewit.com" class="btn btn-primary cta-btn">
          Say Hello 👋
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'
useReveal('#contact')
</script>

<style scoped>
.contact-section {
  background: var(--bg-primary);
  overflow: hidden;
}

/* Orange glow centred in section */
.section-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 600px; height: 400px;
  background: radial-gradient(circle, rgba(194, 65, 12, 0.09) 0%, transparent 70%);
  pointer-events: none;
}

.section-tag {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 0.4rem;
}

/* Orange-amber gradient on heading accent */
.accent-pink {
  background: linear-gradient(135deg, var(--amber), var(--orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Contact cards grid ── */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.2rem;
  max-width: 900px;
  margin: 0 auto 3rem;
}

/* Each contact card is a flex row */
.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.4rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
}

/* Coloured icon circle */
.card-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-text { flex: 1; min-width: 0; }
.card-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.1rem;
}
.card-value {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Arrow shifts right on hover */
.card-arrow {
  color: var(--text-muted);
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}
.contact-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--orange);
}

/* ── Big CTA ── */
.cta-block {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
.cta-text {
  color: var(--text-secondary);
  font-size: 1.05rem;
}
.cta-btn {
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
}
</style>
