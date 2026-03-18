<template>
  <!--
    pages/portfolio.vue — Visual portfolio (route: "/portfolio")
    ─────────────────────────────────────────────────────────────
    A dedicated page for photography and drone videography.

    HOW TO ADD REAL PHOTOS:
    1. Put your images in /public/gallery/   (e.g. /public/gallery/sunset.jpg)
    2. In the `items` array below, add an object with:
         src: '/gallery/sunset.jpg'
    3. Remove or ignore the `gradient` and `icon` fields — they're
       only used for the placeholder tiles.
    4. In the template, swap <div class="placeholder"> for <img :src="item.src" ...>

    ADDING VIDEOS:
    • Drone videos work great as HTML5 <video> elements or embedded YouTube iframes.
    • Add a `videoUrl` field to an item and render it inside the lightbox.
  -->
  <div class="portfolio-page">
    <AppNav />

    <main>
      <!-- ── Hero ── -->
      <section class="port-hero">
        <div class="blob blob-1" />
        <div class="blob blob-2" />

        <div class="container">
          <NuxtLink to="/" class="back-link">← Back to main site</NuxtLink>

          <h1 class="port-title">
            <span class="gradient-text">Visual</span> Portfolio
          </h1>
          <p class="port-subtitle">
            Photography &amp; drone videography — moments captured from the ground and above.
          </p>

          <!-- Category filter buttons -->
          <div class="filters">
            <button
              v-for="cat in categories"
              :key="cat"
              class="filter-btn"
              :class="{ active: activeFilter === cat }"
              @click="activeFilter = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </section>

      <!-- ── Gallery grid ── -->
      <section class="gallery-section">
        <div class="gallery-grid">

          <!--
            Each item is a grid cell. The `size` class controls
            how many columns / rows it spans (wide = 2 cols, tall = 2 rows).
          -->
          <div
            v-for="(item, i) in filteredItems"
            :key="i"
            class="gallery-cell reveal"
            :class="item.size"
            :style="{ transitionDelay: `${i * 0.04}s` }"
            @click="openLightbox(item)"
          >
            <!--
              PLACEHOLDER: replace this <div> with an <img> when you have real photos.
              <img :src="item.src" :alt="item.title" class="gallery-img" />
            -->
            <div class="gallery-placeholder" :style="{ background: item.gradient }">
              <span class="placeholder-icon">{{ item.icon }}</span>
            </div>

            <!-- Overlay shown on hover -->
            <div class="gallery-overlay">
              <span class="overlay-category">{{ item.category }}</span>
              <p class="overlay-title">{{ item.title }}</p>
            </div>
          </div>

        </div>
      </section>

      <!-- Notice explaining how to add real images -->
      <div class="container notice-wrap">
        <div class="notice glass-card">
          <span class="notice-icon">📸</span>
          <div>
            <strong>Ready to add your photos?</strong>
            Place images in <code>/public/gallery/</code> and update
            the <code>items</code> array in <code>pages/portfolio.vue</code>.
          </div>
        </div>
      </div>
    </main>

    <!-- ── Lightbox overlay ── -->
    <!--
      <Transition> is a built-in Vue component that adds CSS classes
      during enter/leave transitions. We use it to fade the lightbox in/out.
    -->
    <Transition name="fade">
      <div v-if="lightboxItem" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>

        <div class="lightbox-card glass-card">
          <!-- Image area (placeholder for now) -->
          <div
            class="lightbox-img"
            :style="{ background: lightboxItem.gradient }"
          >
            <span style="font-size: 4rem">{{ lightboxItem.icon }}</span>
          </div>

          <!-- Info -->
          <div class="lightbox-info">
            <span class="lightbox-cat">{{ lightboxItem.category }}</span>
            <h2 class="lightbox-title">{{ lightboxItem.title }}</h2>
            <p class="lightbox-desc">{{ lightboxItem.description }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useReveal } from '~/composables/useReveal'

// ── Gallery data ───────────────────────────────────────────────────────────
// When you have real photos, add a `src` field and update the template.
// size options: 'wide' (2 cols), 'tall' (2 rows), 'small' (1x1)
const items = [
  {
    title:       'Golden Hour Fields',
    category:    'Drone',
    icon:        '🌅',
    size:        'wide',
    gradient:    'linear-gradient(135deg, #f59e0b, #ef4444)',
    description: 'Aerial shot at sunset over Dutch farmlands. Taken at 80m altitude with DJI Mini.',
  },
  {
    title:       'City Lights at Night',
    category:    'Photography',
    icon:        '🌆',
    size:        'tall',
    gradient:    'linear-gradient(135deg, #1e1b4b, #7c3aed)',
    description: 'Long-exposure cityscape. 25s at f/8, ISO 100.',
  },
  {
    title:       'Forest Canopy',
    category:    'Drone',
    icon:        '🌲',
    size:        'small',
    gradient:    'linear-gradient(135deg, #065f46, #10b981)',
    description: 'Top-down view of a forest canopy in autumn.',
  },
  {
    title:       'Street Portrait',
    category:    'Photography',
    icon:        '🎭',
    size:        'small',
    gradient:    'linear-gradient(135deg, #1e3a5f, #0ea5e9)',
    description: 'Candid street portrait in Maastricht.',
  },
  {
    title:       'Coastal Cliffs',
    category:    'Drone',
    icon:        '🏔️',
    size:        'wide',
    gradient:    'linear-gradient(135deg, #0ea5e9, #10b981)',
    description: 'Dramatic coastal aerial, 120m altitude.',
  },
  {
    title:       'Abstract Architecture',
    category:    'Photography',
    icon:        '🏛️',
    size:        'small',
    gradient:    'linear-gradient(135deg, #374151, #6b7280)',
    description: 'Geometric architectural detail — Bonnefantenmuseum.',
  },
  {
    title:       'Morning Fog',
    category:    'Photography',
    icon:        '🌫️',
    size:        'tall',
    gradient:    'linear-gradient(135deg, #6b7280, #9ca3af)',
    description: 'Early morning mist rolling over the Meuse river valley.',
  },
  {
    title:       'FPV Flight',
    category:    'Drone',
    icon:        '🚁',
    size:        'small',
    gradient:    'linear-gradient(135deg, #dc2626, #f59e0b)',
    description: 'FPV freestyle run through an abandoned warehouse.',
  },
]

// ── Filter ─────────────────────────────────────────────────────────────────
const categories    = ['All', 'Photography', 'Drone']
const activeFilter  = ref('All')

const filteredItems = computed(() =>
  activeFilter.value === 'All'
    ? items
    : items.filter((i) => i.category === activeFilter.value)
)

// ── Lightbox ───────────────────────────────────────────────────────────────
const lightboxItem = ref(null)

function openLightbox(item) { lightboxItem.value = item }
function closeLightbox()    { lightboxItem.value = null }

// Close on Escape key
function onKeydown(e) { if (e.key === 'Escape') closeLightbox() }
onMounted(()  => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Scroll reveal for gallery cells
useReveal('.gallery-grid')
</script>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* ── Hero ── */
.port-hero {
  position: relative;
  overflow: hidden;
  padding: 8rem 2rem 4rem;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.blob-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%);
  top: -80px; right: 0;
}
.blob-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, transparent 70%);
  bottom: 0; left: 10%;
}

.back-link {
  display: inline-block;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--text-secondary); }

.port-title {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 0.75rem;
}
.port-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2rem;
  max-width: 480px;
}

/* ── Filter buttons ── */
.filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.filter-btn {
  padding: 0.4rem 1rem;
  border-radius: 50px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--ease);
}
.filter-btn.active,
.filter-btn:hover {
  background: rgba(124, 58, 237, 0.2);
  border-color: var(--purple);
  color: #c4b5fd;
}

/* ── Gallery ── */
.gallery-section { padding: 2rem; }
.gallery-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}

/* Size variants */
.gallery-cell        { border-radius: 12px; overflow: hidden; cursor: pointer;
                       transition: transform 0.3s ease, box-shadow 0.3s ease;
                       position: relative; }
.gallery-cell.wide   { grid-column: span 2; }
.gallery-cell.tall   { grid-row: span 2; }
.gallery-cell.small  { grid-column: span 1; }

.gallery-cell:hover {
  transform: scale(1.02);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
  z-index: 2;
}

/* Placeholder gradient tile */
.gallery-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.placeholder-icon { font-size: 2.5rem; opacity: 0.4; }

/* Hover overlay */
.gallery-overlay {
  position: absolute; inset: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.72), transparent);
  display: flex; flex-direction: column; justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.25s ease;
}
.gallery-cell:hover .gallery-overlay { opacity: 1; }

.overlay-category {
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px; color: #c4b5fd;
}
.overlay-title {
  font-size: 0.9rem; font-weight: 600;
  color: var(--text-primary); margin: 0;
}

/* ── Notice ── */
.notice-wrap { padding: 1rem 2rem 3rem; }
.notice {
  display: flex; align-items: flex-start; gap: 1rem;
  padding: 1rem 1.4rem;
  color: var(--text-secondary); font-size: 0.875rem;
}
.notice-icon { font-size: 1.5rem; flex-shrink: 0; }
.notice code {
  background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem;
  border-radius: 4px; font-family: var(--font-mono); font-size: 0.82em;
  color: #c4b5fd;
}

/* ── Lightbox ── */
.lightbox {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.82);
  z-index: 200;
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.lightbox-close {
  position: absolute; top: 1.5rem; right: 1.5rem;
  background: rgba(255,255,255,0.1); border: none;
  color: white; width: 40px; height: 40px;
  border-radius: 50%; font-size: 1rem; cursor: pointer;
  transition: background 0.2s;
}
.lightbox-close:hover { background: rgba(255,255,255,0.22); }

.lightbox-card { max-width: 580px; width: 100%; overflow: hidden; }
.lightbox-img {
  height: 280px;
  display: flex; align-items: center; justify-content: center;
}
.lightbox-info { padding: 1.4rem; }
.lightbox-cat {
  font-size: 0.72rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px;
  color: var(--purple); display: block; margin-bottom: 0.5rem;
}
.lightbox-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
.lightbox-desc  { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6; }

/* Fade transition (uses Vue's <Transition name="fade">) */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }

/* ── Responsive gallery ── */
@media (max-width: 900px) {
  .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
}
@media (max-width: 560px) {
  .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; }
  .gallery-cell.wide, .gallery-cell.tall { grid-column: span 1; grid-row: span 1; }
}
</style>
