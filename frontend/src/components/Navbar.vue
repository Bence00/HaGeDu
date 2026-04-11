<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">🗺</span>
        <span class="brand-name">HaGeDu</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Főoldal</RouterLink>

        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/profile" class="nav-link">Profilom</RouterLink>
          <button class="btn btn-ghost btn-sm" @click="handleLogout">Kijelentkezés</button>
        </template>

        <template v-else>
          <RouterLink to="/login"    class="btn btn-ghost btn-sm">Bejelentkezés</RouterLink>
          <RouterLink to="/register" class="btn btn-primary btn-sm">Regisztráció</RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { authStore } from '../stores/auth'
import { logout } from '../services/authService'

const router = useRouter()

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}
.brand:hover { text-decoration: none; }
.brand-icon { font-size: 1.4rem; }
.brand-name { color: var(--color-primary); }

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius);
  transition: color 0.15s, background 0.15s;
  text-decoration: none;
}
.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg);
  text-decoration: none;
}
.nav-link.router-link-active {
  color: var(--color-primary);
}

.btn-sm {
  padding: 0.45rem 1rem;
  font-size: 0.875rem;
}
</style>
