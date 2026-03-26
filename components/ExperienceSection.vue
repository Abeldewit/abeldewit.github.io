<template>
  <!--
    ExperienceSection.vue — Work history & education timeline
    ──────────────────────────────────────────────────────────
    A vertical timeline with:
    • A gradient line down the left side
    • A coloured dot per entry
    • Glass-effect cards that slide in on scroll
    • Skill tags at the bottom of each card
    • A certifications grid below the timeline

    MOBILE NOTES:
    The card header uses a two-row approach:
      Row 1: [logo] [role title + type badge (wraps if needed)]
             [org name]
    This prevents badge/title overlap on narrow screens.
  -->
  <section id="experience" class="section experience-section">

    <!-- Ambient blue glow accent (top-right) -->
    <div class="section-glow" />

    <div class="container">
      <p class="section-tag reveal">My journey</p>
      <h2 class="section-title reveal">
        Experience &amp; <span class="accent-blue">Education</span>
      </h2>
      <p class="section-subtitle reveal">
        From Maastricht lecture halls to forensic labs — a timeline of where I've been.
      </p>

      <!-- Timeline -->
      <div class="timeline">

        <!-- Vertical gradient line running the full height -->
        <div class="timeline-line" />

        <!-- One card per entry -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="timeline-entry reveal"
          :style="{ transitionDelay: `${i * 0.07}s` }"
        >
          <!-- Coloured dot sitting on the line -->
          <div class="timeline-dot" :style="{ background: item.color }" />

          <article class="timeline-card glass-card">

            <!--
              Card header: logo + title group.
              The title group holds BOTH the role+badge row and the org name,
              so on small screens the badge can wrap within the title group
              instead of fighting with the logo for horizontal space.
            -->
            <header class="card-head">
              <!-- Logo image, or a coloured initial badge as fallback -->
              <img
                v-if="item.logo"
                :src="item.logo"
                :alt="item.org"
                class="org-logo"
              />
              <div
                v-else
                class="org-logo org-initials"
                :style="{
                  background: item.color + '18',
                  color: item.color,
                  border: `1.5px solid ${item.color}30`
                }"
              >
                {{ item.org.charAt(0) }}
              </div>

              <!-- Title group: role (+ badge) on top, org name below -->
              <div class="card-title-group">
                <div class="card-title-row">
                  <h3 class="card-role">{{ item.role }}</h3>
                  <!-- Work / Education / Education type badge -->
                  <span
                    class="card-badge"
                    :style="{ background: item.color + '18', color: item.color }"
                  >
                    {{ item.type }}
                  </span>
                </div>
                <p class="card-org" :style="{ color: item.color }">{{ item.org }}</p>
              </div>
            </header>

            <!-- Period and location row -->
            <div class="card-meta">
              <span>{{ item.period }}</span>
              <span>{{ item.location }}</span>
            </div>

            <!-- Description -->
            <p class="card-desc">{{ item.description }}</p>

            <!-- Skill tags -->
            <div class="card-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

          </article>
        </div>
      </div>

      <!-- ── Certifications ── -->
      <div class="certs-wrap reveal">
        <h3 class="certs-heading">Certifications</h3>
        <div class="certs-grid">
          <div
            v-for="cert in certs"
            :key="cert.name"
            class="cert-card glass-card"
          >
            <!-- Coloured left accent stripe -->
            <div class="cert-accent" :style="{ background: cert.color }" />
            <div class="cert-info">
              <p class="cert-name">{{ cert.name }}</p>
              <p class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'
import jobsData from '~/assets/data/jobs.json'

// Activate scroll-reveal for all .reveal elements in this section
useReveal('#experience')

// ── Timeline data + Certifications ─────────────────────────────────────────
// Content is loaded from assets/data/jobs.json — edit via the CMS at /admin
const items = jobsData.items
const certs = jobsData.certs
</script>

<style scoped>
.experience-section {
  background: var(--bg-primary);
  overflow: hidden;
}

/* Blue glow accent in the top-right corner */
.section-glow {
  position: absolute;
  top: -100px; right: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(29, 78, 216, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

/* Small uppercase label above the heading */
.section-tag {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 0.4rem;
}

/* Orange-to-amber gradient on the heading accent word */
.accent-blue {
  background: linear-gradient(135deg, var(--orange), var(--amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Timeline container ── */
.timeline {
  position: relative;
  max-width: 740px;
  margin: 0 auto;
}

/* Vertical gradient line */
.timeline-line {
  position: absolute;
  left: 18px; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--orange) 10%,
    var(--red)    50%,
    var(--teal)   90%,
    transparent
  );
}

/* Each entry is indented so the card clears the dot + line */
.timeline-entry {
  position: relative;
  padding-left: 58px;
  margin-bottom: 1.75rem;
}

/* Coloured dot on the line */
.timeline-dot {
  position: absolute;
  left: 10px; top: 22px;
  width: 18px; height: 18px;
  border-radius: 50%;
  /* The border matches the section background, creating a "cut-out" around the dot */
  border: 3px solid var(--bg-primary);
  z-index: 1;
}

/* ── Card ── */
.timeline-card {
  padding: 1.25rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.timeline-card:hover {
  transform: translateX(4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
}

/* ── Card header ──
   Row 1: [logo]  [role + badge] (badge wraps below role on very narrow screens)
                  [org name]
   Keeping the badge inside the title group prevents it from stealing
   horizontal space from the logo and causing text overlap on small screens. */
.card-head {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 0.65rem;
}

/* Logo image */
.org-logo {
  width: 38px; height: 38px;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 4px;
  flex-shrink: 0;
}

/* Initials badge — shown when no logo image is available */
.org-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 700;
  border-radius: 8px;
  flex-shrink: 0;
}

/* Title group takes all remaining horizontal space */
.card-title-group {
  flex: 1;
  min-width: 0;  /* allows text to truncate rather than overflow */
}

/* Role name + type badge on the same flex row; badge wraps if space is tight */
.card-title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
}
.card-role {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  /* Allow long role titles to wrap naturally */
}

/* Work / Education type badge */
.card-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
  flex-shrink: 0;
}

.card-org {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

/* Date and location row */
.card-meta {
  display: flex;
  gap: 1.25rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
  flex-wrap: wrap;  /* wraps to two lines on narrow screens */
}

/* Description text */
.card-desc {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

/* Skill tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.55rem;
  border-radius: 50px;
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  color: var(--tag-color);
  font-family: var(--font-mono);
}

/* ── Certifications ── */
.certs-wrap {
  max-width: 740px;
  margin: 1rem auto 0;
}
.certs-heading {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  padding-left: 58px;  /* align with timeline cards */
}
.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  padding-left: 58px;
}
.cert-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 1rem;
  overflow: hidden;
  transition: transform 0.2s ease;
}
.cert-card:hover { transform: translateY(-2px); }
.cert-accent {
  width: 3px;
  align-self: stretch;
  border-radius: 2px;
  flex-shrink: 0;
}
.cert-info { min-width: 0; }
.cert-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cert-meta {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0;
  font-family: var(--font-mono);
}

/* ── Mobile breakpoints ── */
@media (max-width: 640px) {
  /* Shrink the timeline indent so cards have more room */
  .timeline-line  { left: 12px; }
  .timeline-entry { padding-left: 42px; }
  .timeline-dot   { left: 4px; width: 16px; height: 16px; top: 20px; }

  /* Align certs with the narrower indent */
  .certs-heading,
  .certs-grid     { padding-left: 0; }

  .card-title-row { gap: 0.3rem; }
}

@media (max-width: 400px) {
  /* Minimal indent on very small screens */
  .timeline-line  { left: 8px; }
  .timeline-entry { padding-left: 32px; }
  .timeline-dot   { left: 0; width: 14px; height: 14px; }

  /* Smaller logo so title gets more space */
  .org-logo,
  .org-initials   { width: 32px; height: 32px; font-size: 0.9rem; }

  .card-head      { gap: 0.6rem; }
}
</style>
