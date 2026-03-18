<template>
  <!--
    ExperienceSection.vue — Work history & education timeline
    ──────────────────────────────────────────────────────────
    Renders a vertical timeline with:
    • A gradient line down the left side
    • A coloured dot for each entry
    • A glass-effect card that slides in on scroll
    • Tech skill tags at the bottom of each card
  -->
  <section id="experience" class="section experience-section">

    <!-- Ambient glow accent (top-right of this section) -->
    <div class="section-glow" />

    <div class="container">
      <p class="section-tag reveal">My journey</p>
      <h2 class="section-title reveal">
        Experience &amp; <span class="accent-blue">Education</span>
      </h2>
      <p class="section-subtitle reveal">
        From Maastricht lecture halls to start-up offices — a timeline of where I've been.
      </p>

      <!-- Timeline -->
      <div class="timeline">

        <!-- Vertical gradient line -->
        <div class="timeline-line" />

        <!-- One entry per item -->
        <div
          v-for="(item, i) in items"
          :key="i"
          class="timeline-entry reveal"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <!-- Coloured dot on the line -->
          <div class="timeline-dot" :style="{ background: item.color }" />

          <!-- Card -->
          <article class="timeline-card glass-card">

            <!-- Card top row: logo + title + badge -->
            <header class="card-head">
              <img
                v-if="item.logo"
                :src="item.logo"
                :alt="item.org"
                class="org-logo"
              />
              <div class="card-title-group">
                <h3 class="card-role">{{ item.role }}</h3>
                <p class="card-org" :style="{ color: item.color }">{{ item.org }}</p>
              </div>
              <!-- Work / Education badge -->
              <span
                class="card-badge"
                :style="{ background: item.color + '20', color: item.color }"
              >
                {{ item.type }}
              </span>
            </header>

            <!-- Date + location -->
            <div class="card-meta">
              <span>📅 {{ item.period }}</span>
              <span>📍 {{ item.location }}</span>
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
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'

// Activate scroll-reveal for all .reveal elements in this section
useReveal('#experience')

// ── Timeline data ──────────────────────────────────────────────────────────
// Edit this array to update your experience and education.
// Items are shown top to bottom — put newest first.
const items = [
  {
    type:        'Education',
    role:        'MSc Artificial Intelligence',
    org:         'Maastricht University',
    period:      '2021 – Present',
    location:    'Maastricht, Netherlands',
    color:       '#10b981',
    logo:        '/logos/maastricht.jpeg',
    description: "Master's programme focusing on NLP, Computer Vision, and Anomaly Detection. My thesis investigated crop classification in satellite imagery using deep learning.",
    tags:        ['NLP', 'Computer Vision', 'Machine Learning', 'Research', 'Python'],
  },
  {
    type:        'Work',
    role:        'Master Thesis Intern',
    org:         'Capgemini',
    period:      'Feb 2022 – Jul 2022',
    location:    'Utrecht, Netherlands',
    color:       '#3b82f6',
    logo:        '/logos/capgemini.jpeg',
    description: 'Researched multi-label crop classification in Sentinel-2 satellite imagery using Deep Learning. Benchmarked Vision Transformers (ViT) against CNN baselines, exploring few-shot generalisation.',
    tags:        ['Deep Learning', 'Vision Transformers', 'PyTorch', 'Satellite Imagery', 'Python'],
  },
  {
    type:        'Work',
    role:        'Working Student — Data Engineering & ML',
    org:         'Lightyear',
    period:      'Feb 2022 – Jul 2022',
    location:    'Helmond, Netherlands',
    color:       '#ec4899',
    logo:        '/logos/lightyear.jpeg',
    description: 'Built a weather-data API and developed ML models to detect optimal parking orientation for solar EVs, maximising solar energy capture.',
    tags:        ['Machine Learning', 'Data Engineering', 'REST APIs', 'SQL', 'Python'],
  },
  {
    type:        'Work',
    role:        'Business Development Intern',
    org:         'Lightyear',
    period:      'Sep 2021 – Jan 2022',
    location:    'Helmond, Netherlands',
    color:       '#ec4899',
    logo:        '/logos/lightyear.jpeg',
    description: 'Created a Business Intelligence tool that automated patent search, clustering, and competitive landscape analysis. Built interactive dashboards for the innovation team.',
    tags:        ['Business Intelligence', 'NLP', 'Data Visualisation', 'Dashboards', 'Python'],
  },
  {
    type:        'Education',
    role:        'Teaching Assistant',
    org:         'Maastricht University',
    period:      'Nov 2020 – Dec 2021',
    location:    'Maastricht, Netherlands',
    color:       '#10b981',
    logo:        '/logos/maastricht.jpeg',
    description: 'Led tutorial sessions and graded assignments for undergraduate courses in Data Science and Knowledge Engineering.',
    tags:        ['Teaching', 'Data Science', 'Python', 'Mentoring'],
  },
]
</script>

<style scoped>
.experience-section {
  background: var(--bg-primary);
  overflow: hidden;
}

/* Blue glow accent in the top-right */
.section-glow {
  position: absolute;
  top: -100px; right: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.11) 0%, transparent 70%);
  pointer-events: none;
}

/* Section tag (small uppercase label above the heading) */
.section-tag {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.4rem;
}

/* Blue-cyan gradient on the heading accent word */
.accent-blue {
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Timeline ── */
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
    var(--purple) 10%,
    var(--blue)   50%,
    var(--green)  90%,
    transparent
  );
}

/* Each entry: indented so card clears the line + dot */
.timeline-entry {
  position: relative;
  padding-left: 58px;
  margin-bottom: 2rem;
}

/* Dot on the line */
.timeline-dot {
  position: absolute;
  left: 10px; top: 22px;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 3px solid var(--bg-primary);  /* punches through the line */
  z-index: 1;
}

/* ── Card internals ── */
.timeline-card {
  padding: 1.4rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.timeline-card:hover {
  transform: translateX(5px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-bottom: 0.65rem;
}

.org-logo {
  width: 38px; height: 38px;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 4px;
  flex-shrink: 0;
}

.card-title-group { flex: 1; min-width: 0; }
.card-role {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}
.card-org {
  font-size: 0.88rem;
  font-weight: 500;
  margin: 0;
}

.card-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  gap: 1.25rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.card-desc {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

/* ── Skill tags ── */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-size: 0.72rem;
  padding: 0.22rem 0.6rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

@media (max-width: 560px) {
  .timeline-line  { left: 8px; }
  .timeline-entry { padding-left: 36px; }
  .timeline-dot   { left: 0; width: 14px; height: 14px; }
}
</style>
