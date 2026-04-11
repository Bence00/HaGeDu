<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink to="/" class="brand">
        <div class="brand-logo">H</div>
        <span class="brand-name">HaGeDu</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Főoldal</RouterLink>

        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/profile" class="nav-link">Profilom</RouterLink>
          <button class="btn btn-logout" @click="handleLogout">Kijelentkezés</button>
        </template>

        <template v-else>
          <RouterLink to="/login" class="nav-link">Bejelentkezés</RouterLink>
          <RouterLink to="/register" class="btn btn-nav-cta">Regisztráció</RouterLink>
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
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}
.brand:hover { text-decoration: none; }

.brand-logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.45rem 0.85rem;
  border-radius: 99px;
  transition: all 0.15s;
  text-decoration: none;
}
.nav-link:hover {
  color: var(--text);
  background: var(--surface-2);
  text-decoration: none;
}
.nav-link.router-link-active {
  color: var(--primary);
  background: var(--primary-light);
}

.btn-nav-cta {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff;
  padding: 0.45rem 1.1rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(99,102,241,0.3);
  transition: all 0.2s;
}
.btn-nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(99,102,241,0.4);
  text-decoration: none;
}

.btn-logout {
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.45rem 0.85rem;
  border-radius: 99px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-logout:hover {
  color: var(--danger);
  background: #fef2f2;
}
</style>
