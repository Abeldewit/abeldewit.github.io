<template>
  <!--
    ProjectsSection.vue — Featured project cards
    ─────────────────────────────────────────────
    A responsive grid of glass cards, each with:
    • A coloured gradient top bar (like a bookmark)
    • An emoji icon for quick visual scanning
    • Links to GitHub repo and/or live demo
    • A description and list of tech tags
    Cards lift on hover with a smooth shadow animation.
  -->
  <section id="projects" class="section projects-section">

    <div class="section-glow" />

    <div class="container">
      <p class="section-tag reveal">What I've built</p>
      <h2 class="section-title reveal">
        Featured <span class="accent-green">Projects</span>
      </h2>
      <p class="section-subtitle reveal">
        Research prototypes, engineering tools, and side explorations.
      </p>

      <div class="projects-grid">
        <article
          v-for="(proj, i) in projects"
          :key="i"
          class="project-card glass-card reveal"
          :style="{ transitionDelay: `${i * 0.09}s` }"
        >
          <!-- Thin gradient stripe at the top — the card's "colour accent" -->
          <div class="card-stripe" :style="{ background: proj.gradient }" />

          <!-- Icon + external links -->
          <div class="card-top">
            <span class="card-icon" role="img" :aria-label="proj.title">{{ proj.icon }}</span>
            <div class="card-links">
              <a
                v-if="proj.github"
                :href="proj.github"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-link"
                title="View source code"
              >
                <!-- GitHub icon -->
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                v-if="proj.demo"
                :href="proj.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="icon-link"
                title="View live demo"
              >
                <!-- External link icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" width="17" height="17">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          <h3 class="card-title">{{ proj.title }}</h3>
          <p class="card-desc">{{ proj.description }}</p>

          <!-- Tech stack tags -->
          <div class="card-tags">
            <span v-for="tag in proj.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '~/composables/useReveal'

useReveal('#projects')

// ── Projects data ──────────────────────────────────────────────────────────
// Add or edit entries here. `github` and `demo` can be null if not applicable.
const projects = [
    {
    icon:        '🧬',
    title:       'DNANet',
    description: "Novel application of traditional U-Net on DNA EPG profiles for allele calling.",
    gradient:    'linear-gradient(90deg, #c2410c, #b45309)',
    github:      null,
    demo:        null,
    tags:        ['Machine Learning', 'DNA', 'Pytorch'],
  },
  {
    icon:        '🛰️',
    title:       'Image Segmentation for Remote Sensing, Crop detection using Visual Transformers',
    description: 'Dit artikel onderzoekt de mogelijkheid van Vision Transformers om het probleem van gewas herkenning in satellietbeelden op te lossen. Met de toenemende behoefte aan verbetering van voedselproductie kunnen remote sensing technieken boeren beter inzicht geven in hun landgebruik. Een basismodel, het huidige best presterende model en het nieuwe Segmenter-model zijn getraind en geëvalueerd met behulp van een benchmark dataset, wat inzicht geeft in hun leervermogen en de valkuilen die sommige gewassoorten voor een model kunnen vormen.',
    gradient:    'linear-gradient(90deg, #dc2626, #ca8a04)',
    github:      null,
    demo:        null,
    tags:        ['PyTorch', 'ViT', 'CNN', 'Satellite Imagery', 'Python'],
  },
  {
    icon:        '📄',
    title:       'Patent Intelligence Dashboard',
    description: "Business intelligence tool that automates patent search, semantic clustering, and competitive landscape analysis. Built for Lightyear's internal innovation team.",
    gradient:    'linear-gradient(90deg, #c2410c, #b45309)',
    github:      null,
    demo:        null,
    tags:        ['NLP', 'Data Visualisation', 'BI', 'Python'],
  },
  {
    icon:        '👇',
    title:       'Deep Learning Model for Artificial Skin Data Interpretation',
    description: "In dit onderzoeksproject, met een team van 6, was het doel een end-to-end pipeline te ontwikkelen om een model te trainen in het herkennen van schadelijke aanrakingen op een siliconenhuid. De helft van het project bestond uit het creëren van een realistische simulatie van de huid waarin krachtsensoren waren ingebed. Met deze simulatie konden scenario's worden gecreëerd om trainingsgegevens en labels voor het model te genereren.",
    gradient:    'linear-gradient(90deg, #dc2626, #ca8a04)',
    github:      null,
    demo:        null,
    tags:        ['Finite Element Modelling', 'Simulation', 'Robotics'],
  },
  {
    icon:        '♟️',
    title:       'Automatic Visual Tutorial Generation for Board Games',
    description: '',
    gradient:    'linear-gradient(90deg, #b45309, #ca8a04)',
    github:      null,
    demo:        null,
    tags:        ['Ludii General Game System', 'Rulebook', 'Visual Explanation'],
  },
  {
    icon:        '🚁',
    title:       'Drone Aerial Projects',
    description: 'Personal aerial photography and videography projects. Check the Portfolio page for footage and shots from various locations around the Netherlands.',
    gradient:    'linear-gradient(90deg, #0f766e, #ca8a04)',
    github:      null,
    demo:        '/portfolio',
    tags:        ['DJI', 'Aerial Photography', 'Video Editing', 'Creative'],
  },
]
</script>

<style scoped>
.projects-section {
  background: var(--bg-secondary);
  overflow: hidden;
}

/* Orange glow in the bottom-left */
.section-glow {
  position: absolute;
  bottom: -80px; left: -180px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(194, 65, 12, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.section-tag {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 0.4rem;
}

/* Orange-amber gradient on heading accent */
.accent-green {
  background: linear-gradient(135deg, var(--orange), var(--amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Grid ── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.4rem;
}

/* ── Card ── */
.project-card {
  display: flex;
  flex-direction: column;
  padding: 0;            /* padding is on inner elements so stripe bleeds edge-to-edge */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.5);
}

/* Top gradient stripe */
.card-stripe {
  height: 3px;
  flex-shrink: 0;
}

/* Icon + links row */
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.4rem 0.5rem;
}
.card-icon { font-size: 2rem; }

.card-links {
  display: flex;
  gap: 0.5rem;
}
.icon-link {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(194, 65, 12, 0.06);
  border: 1px solid rgba(194, 65, 12, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--orange);
  transition: var(--ease);
}
.icon-link:hover {
  color: white;
  background: var(--orange);
  border-color: var(--orange);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  padding: 0 1.4rem;
  margin-bottom: 0.55rem;
}
.card-desc {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.65;
  padding: 0 1.4rem;
  margin-bottom: 1.2rem;
  flex: 1;
}

/* Tags */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0 1.4rem 1.4rem;
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
</style>
