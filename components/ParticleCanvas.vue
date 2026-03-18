<template>
  <!--
    ParticleCanvas.vue — Animated particle background
    ──────────────────────────────────────────────────
    Renders onto an HTML <canvas> element using the Canvas 2D API.
    No external libraries — pure JavaScript animation loop.

    WHAT IT DOES:
    1. Creates N coloured particles at random positions/velocities
    2. Each frame: moves them, wraps them at screen edges, draws them as glowing dots
    3. Draws fading lines between any two particles that are close to each other
    4. Particles gently repel from the mouse cursor for interactivity

    PERFORMANCE NOTE:
    Uses requestAnimationFrame which only runs when the tab is visible,
    and onUnmounted cancels the loop to prevent memory leaks.
  -->
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Reference to the <canvas> DOM element
const canvasRef = ref(null)

// Internal variables (not reactive — we don't need Vue to track these)
let ctx         = null    // Canvas 2D context
let animId      = null    // requestAnimationFrame handle (for cancellation)
let particles   = []      // Array of particle objects
let mouse       = { x: -9999, y: -9999 }  // Current mouse position

// ── Configuration ──────────────────────────────────────────────────────────
// Edit these numbers to tune the effect
const CFG = {
  count:           75,     // How many particles
  maxSpeed:        0.4,    // Maximum velocity (pixels per frame)
  minSize:         1,      // Smallest dot radius (px)
  maxSize:         2.5,    // Largest dot radius (px)
  connectDist:     130,    // Draw a line if two particles are within this many px
  mouseRepelDist:  140,    // Distance at which particles flee the mouse
  mouseRepelForce: 1.8,    // How strongly they flee
  // Particle colours — semi-transparent so they layer nicely
  colors: [
    'rgba(124, 58, 237, 0.9)',   // purple
    'rgba(236, 72, 153, 0.9)',   // pink
    'rgba(59, 130, 246, 0.9)',   // blue
    'rgba(6, 182, 212, 0.8)',    // cyan
    'rgba(16, 185, 129, 0.8)',   // green
  ],
}

// ── Helpers ────────────────────────────────────────────────────────────────

// Create one particle with random properties
function makeParticle(w, h) {
  return {
    x:       Math.random() * w,
    y:       Math.random() * h,
    vx:      (Math.random() - 0.5) * CFG.maxSpeed * 2,
    vy:      (Math.random() - 0.5) * CFG.maxSpeed * 2,
    r:       CFG.minSize + Math.random() * (CFG.maxSize - CFG.minSize),
    color:   CFG.colors[Math.floor(Math.random() * CFG.colors.length)],
    opacity: 0.4 + Math.random() * 0.6,
  }
}

// Initialise canvas size and create particles
function init() {
  const canvas  = canvasRef.value
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
  ctx           = canvas.getContext('2d')
  particles     = Array.from({ length: CFG.count }, () =>
    makeParticle(canvas.width, canvas.height)
  )
}

// ── Animation loop ─────────────────────────────────────────────────────────
function loop() {
  const { width, height } = canvasRef.value

  // Clear the previous frame
  ctx.clearRect(0, 0, width, height)

  // ── Update and draw each particle ──
  for (const p of particles) {
    // Move
    p.x += p.vx
    p.y += p.vy

    // Wrap around screen edges (particles re-enter from the opposite side)
    if (p.x < 0) p.x = width
    if (p.x > width)  p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    // Mouse repulsion: push particle away if cursor is nearby
    const dx   = p.x - mouse.x
    const dy   = p.y - mouse.y
    const dist = Math.hypot(dx, dy)  // Math.hypot = √(dx²+dy²)
    if (dist < CFG.mouseRepelDist && dist > 0) {
      const strength = (CFG.mouseRepelDist - dist) / CFG.mouseRepelDist
      p.x += (dx / dist) * strength * CFG.mouseRepelForce
      p.y += (dy / dist) * strength * CFG.mouseRepelForce
    }

    // Draw dot
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle   = p.color
    ctx.globalAlpha = p.opacity
    ctx.fill()
    ctx.globalAlpha = 1
  }

  // ── Draw connecting lines between nearby pairs ──
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a    = particles[i]
      const b    = particles[j]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)

      if (dist < CFG.connectDist) {
        // Line fades as particles move apart
        const alpha = (1 - dist / CFG.connectDist) * 0.25
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
        ctx.lineWidth   = 0.8
        ctx.stroke()
      }
    }
  }

  animId = requestAnimationFrame(loop)
}

// ── Event listeners ────────────────────────────────────────────────────────
function onMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY }
function onResize()     { init() /* re-init keeps particle count correct */ }

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
  inset: 0;           /* shorthand for top/right/bottom/left: 0 */
  width: 100%;
  height: 100%;
  pointer-events: none;  /* clicks pass through to the content below */
}
</style>
