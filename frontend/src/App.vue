<template>
  <div id="layout">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="container">
        <span>© 2025 HaGeDu — Budapest Esemény Kereső</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.site-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1.25rem 0;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}
</style>
