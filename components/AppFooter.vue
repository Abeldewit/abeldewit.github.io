<template>
  <!--
    AppFooter.vue — Simple site footer
    ────────────────────────────────────
    Keeps it minimal: brand name, tech credit, copyright.
  -->
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-brand">
        <span class="gradient-text">Abel de Wit</span>
      </p>
      <p class="footer-meta">
        Built with
        <!-- Nuxt logo green -->
        <span style="color: #00dc82">Nuxt.js</span>
        · Hosted on GitHub Pages
      </p>
      <p class="footer-copy">
        © {{ year }} Abel de Wit. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
// Current year — dynamically computed so it stays correct
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 2.5rem 2rem;
  text-align: center;
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}
.footer-brand {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.footer-meta {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.footer-copy {
  font-size: 0.78rem;
  color: var(--text-muted);
}
</style>
