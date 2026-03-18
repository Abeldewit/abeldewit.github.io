<template>
  <!--
    pages/index.vue — Main page (route: "/")
    ─────────────────────────────────────────
    Nuxt automatically maps files in /pages to routes.
    This file handles the "/" URL.

    All components in /components are auto-imported by Nuxt —
    no import statements needed. Just use them by name.
  -->
  <div>
    <AppNav />
    <main>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
