<template>
  <div id="layout" :class="{ 'auth-layout': isAuthRoute }">
    <Navbar v-if="!isAuthRoute" />

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <strong>Architektúra</strong>
          <p>A város kulturális helyszínei és eseményei egy letisztult térképen.</p>
        </div>

        <div>
          <h2>Navigáció</h2>
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/">Helyszínek</RouterLink>
          <RouterLink to="/register">Regisztráció</RouterLink>
        </div>

        <div>
          <h2>Jogi infó</h2>
          <a href="#" @click.prevent>Privacy Policy</a>
          <a href="#" @click.prevent>Terms of Service</a>
          <a href="#" @click.prevent>Cookie Settings</a>
        </div>

        <div>
          <h2>Kapcsolat</h2>
          <a href="mailto:hello@hagedu.hu">hello@hagedu.hu</a>
          <span>Budapest, Hungary</span>
        </div>
      </div>

      <div class="container footer-bottom">
        <span>© 2024 Architektúra Társaság. Minden jog fenntartva.</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const isAuthRoute = computed(() => ['login', 'register'].includes(route.name))
</script>

<style scoped>
#layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--bg);
}

.main-content {
  flex: 1;
}

.auth-layout {
  background: var(--surface);
}

.site-footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  font-size: 12px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 52px;
  padding-top: 34px;
  padding-bottom: 34px;
}

.footer-brand strong {
  display: block;
  margin-bottom: 12px;
  color: var(--text);
  font-size: 15px;
  font-weight: 900;
}

.footer-brand p {
  max-width: 240px;
}

.site-footer h2 {
  margin-bottom: 12px;
  color: var(--text);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.site-footer a,
.site-footer span {
  display: block;
  color: var(--text-muted);
  line-height: 1.9;
}

.site-footer a:hover {
  color: var(--text);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 18px;
  padding-bottom: 22px;
}

@media (max-width: 760px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
}

@media (max-width: 520px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
