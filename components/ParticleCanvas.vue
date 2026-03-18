<template>
  <!--
    ParticleCanvas.vue — Animated coding-symbol background
    ───────────────────────────────────────────────────────
    Renders onto an HTML <canvas> element using the Canvas 2D API.
    No external libraries — pure JavaScript animation loop.

    WHAT IT DOES:
    1. Creates N symbols (code snippets, AI/ML terms, math chars) at random
       positions, velocities, sizes and colours
    2. Each frame: moves them slowly, wraps them at screen edges, draws them
       as text using ctx.fillText() — readable but slightly transparent
    3. Draws fading lines between symbols that drift close to each other
    4. Symbols gently repel from the mouse cursor

    CUSTOMISE:
    Edit the SYMBOLS array to add your own terms, or CFG to tweak speed/count.
  -->
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

let ctx       = null
let animId    = null
let particles = []
let mouse     = { x: -9999, y: -9999 }

// ── Symbols ───────────────────────────────────────────────────────────────
// A mix of:
//   • general coding syntax
//   • AI / ML terms that represent Abel's work
//   • math symbols common in machine learning
const SYMBOLS = [
  // Coding syntax
  '</>',  '{ }',  '( )',  '=>',  '//',  '[ ]',  '&&',
  'def',  'fn()',  'for',  'if', 'while', 'yield',  '+=',  '**',  '0x1',  '?:',
  // AI / ML / data terms
  'AI',  'ML',  'NLP',  'CV',  'ViT',  'CNN', 'GPU',
  'fit()',  'loss',  'epoch',  'grad',  'embed',  'token',
  // Math / stats symbols
  'λ',  '∑',  'μ', '∇',  'argmax',
  // Abel-specific flavour
  'drone', 'photo', 'books', 'git',  'sql',  'api',  '.py', 
]

// ── Configuration ─────────────────────────────────────────────────────────
const CFG = {
  count:           75,     // Number of floating symbols
  maxSpeed:        0.3,    // Max pixels-per-frame velocity
  minFontSize:     11,     // Smallest symbol font size (px)
  maxFontSize:     17,     // Largest symbol font size (px)
  connectDist:     120,    // Draw a line between symbols closer than this
  mouseRepelDist:  130,    // Radius of mouse repulsion effect
  mouseRepelForce: 1.6,    // Repulsion strength
  // Colours — vivid but semi-transparent so they sit lightly on the white bg
  colors: [
    'rgba(109,  40, 217, 0.55)',   // purple  (#6d28d9)
    'rgba(219,  39, 119, 0.50)',   // pink    (#db2777)
    'rgba( 29,  78, 216, 0.50)',   // blue    (#1d4ed8)
    'rgba( 14, 116, 144, 0.50)',   // cyan    (#0e7490)
    'rgba(  4, 120,  87, 0.45)',   // green   (#047857)
  ],
}

// ── Helpers ───────────────────────────────────────────────────────────────

// Pick a random item from an array
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// Create one symbol particle with random properties
function makeParticle(w, h) {
  const fontSize = CFG.minFontSize + Math.random() * (CFG.maxFontSize - CFG.minFontSize)
  return {
    x:        Math.random() * w,
    y:        Math.random() * h,
    vx:       (Math.random() - 0.5) * CFG.maxSpeed * 2,
    vy:       (Math.random() - 0.5) * CFG.maxSpeed * 2,
    symbol:   pick(SYMBOLS),         // which text to draw
    fontSize,                        // font size in px
    color:    pick(CFG.colors),      // rgba color string
    opacity:  0.35 + Math.random() * 0.55,
  }
}

// Initialise canvas dimensions and create all particles
function init() {
  const canvas  = canvasRef.value
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  ctx           = canvas.getContext('2d')
  particles     = Array.from({ length: CFG.count }, () =>
    makeParticle(canvas.width, canvas.height)
  )
}

// ── Animation loop ────────────────────────────────────────────────────────
function loop() {
  const { width, height } = canvasRef.value
  ctx.clearRect(0, 0, width, height)

  // ── Move and draw each symbol ──
  for (const p of particles) {
    // Move
    p.x += p.vx
    p.y += p.vy

    // Wrap around screen edges so symbols never disappear
    if (p.x < -30)          p.x = width  + 30
    if (p.x > width  + 30)  p.x = -30
    if (p.y < -30)          p.y = height + 30
    if (p.y > height + 30)  p.y = -30

    // Mouse repulsion: nudge away from cursor
    const dx   = p.x - mouse.x
    const dy   = p.y - mouse.y
    const dist = Math.hypot(dx, dy)
    if (dist < CFG.mouseRepelDist && dist > 0) {
      const force = (CFG.mouseRepelDist - dist) / CFG.mouseRepelDist
      p.x += (dx / dist) * force * CFG.mouseRepelForce
      p.y += (dy / dist) * force * CFG.mouseRepelForce
    }

    // Draw the symbol as text
    // ctx.font format: "weight size family"
    ctx.font         = `600 ${p.fontSize}px 'Space Mono', monospace`
    ctx.fillStyle    = p.color
    ctx.globalAlpha  = p.opacity
    ctx.fillText(p.symbol, p.x, p.y)
    ctx.globalAlpha  = 1
  }

  // ── Draw connecting lines between nearby symbol pairs ──
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a    = particles[i]
      const b    = particles[j]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)

      if (dist < CFG.connectDist) {
        // Fade the line out as distance increases
        const alpha = (1 - dist / CFG.connectDist) * 0.18
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(109, 40, 217, ${alpha})`
        ctx.lineWidth   = 0.7
        ctx.stroke()
      }
    }
  }

  animId = requestAnimationFrame(loop)
}

// ── Event listeners ───────────────────────────────────────────────────────
function onMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY }
function onResize()     { init() }

onMounted(() => {
  init()
  loop()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize',    onResize,    { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize',    onResize)
})
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;  /* let all clicks pass through to the page */
}
</style>
