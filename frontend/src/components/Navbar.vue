<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="brand">
        <span>Architektúra</span>
      </RouterLink>

      <nav class="nav-links" aria-label="Fő navigáció">
        <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
        <a href="#" class="nav-link" @click.prevent>Projects</a>
        <a href="#" class="nav-link" @click.prevent>Assets</a>
        <RouterLink :to="authStore.isLoggedIn ? '/profile' : '/login'" class="nav-link">Team</RouterLink>
      </nav>

      <div class="nav-actions">
        <form class="nav-search" @submit.prevent>
          <span class="search-mark" aria-hidden="true"></span>
          <input type="search" placeholder="Keresés..." aria-label="Keresés" />
        </form>

        <button type="button" class="icon-btn" aria-label="Nyelv"></button>
        <button type="button" class="icon-btn bell" aria-label="Értesítések"></button>
        <button type="button" class="icon-btn gear" aria-label="Beállítások"></button>

        <template v-if="authStore.isLoggedIn">
          <RouterLink to="/profile" class="avatar-link" aria-label="Profil">{{ initials }}</RouterLink>
          <button class="logout-link" type="button" @click="handleLogout">Kilépés</button>
        </template>

        <template v-else>
          <RouterLink to="/login" class="login-link">Belépés</RouterLink>
          <RouterLink to="/register" class="btn btn-primary nav-cta">Regisztráció</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/auth'
import { logout } from '../services/authService'

const router = useRouter()

const initials = computed(() => {
  const name = authStore.user?.username || 'U'
  return name.slice(0, 1).toUpperCase()
})

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.navbar-inner {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  align-items: center;
  min-height: 56px;
  padding: 0 24px;
  gap: 24px;
}

.brand {
  color: var(--text);
  font-size: 15px;
  font-weight: 900;
  text-decoration: none;
}

.brand:hover {
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 22px;
}

.nav-link {
  position: relative;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text);
  text-decoration: none;
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -19px;
  height: 2px;
  background: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.nav-search {
  display: flex;
  align-items: center;
  width: 230px;
  height: 34px;
  padding: 0 12px;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--surface-2);
}

.nav-search:focus-within {
  border-color: var(--border-strong);
  background: var(--surface);
}

.search-mark {
  width: 11px;
  height: 11px;
  border: 2px solid var(--text-soft);
  border-radius: 50%;
  position: relative;
  flex: 0 0 auto;
}

.search-mark::after {
  content: "";
  position: absolute;
  right: -5px;
  bottom: -4px;
  width: 6px;
  height: 2px;
  background: var(--text-soft);
  transform: rotate(45deg);
  transform-origin: left center;
}

.nav-search input {
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-size: 12px;
}

.icon-btn {
  position: relative;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
}

.icon-btn:hover {
  background: var(--surface-2);
}

.icon-btn::before,
.icon-btn::after {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1.6px solid var(--text-muted);
  border-radius: 50%;
}

.bell::before {
  inset: 7px 9px 8px;
  border-radius: 9px 9px 5px 5px;
  border-bottom-color: transparent;
}

.bell::after {
  inset: auto auto 6px 12px;
  width: 4px;
  height: 4px;
  border: 0;
  background: var(--text-muted);
}

.gear::before {
  inset: 7px;
  border-style: dashed;
}

.gear::after {
  inset: 11px;
  border-width: 1.5px;
}

.avatar-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #23342f;
  color: #ffffff;
  font-size: 12px;
  font-weight: 900;
  text-decoration: none;
}

.avatar-link:hover {
  text-decoration: none;
}

.login-link,
.logout-link {
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
}

.login-link:hover,
.logout-link:hover {
  color: var(--text);
  text-decoration: none;
}

.nav-cta {
  min-height: 32px;
  padding: 0 12px;
  font-size: 12px;
}

@media (max-width: 900px) {
  .navbar-inner {
    grid-template-columns: auto 1fr;
  }

  .nav-links {
    display: none;
  }
}

@media (max-width: 640px) {
  .navbar-inner {
    padding: 0 16px;
    gap: 12px;
  }

  .nav-search,
  .icon-btn,
  .login-link {
    display: none;
  }
}
</style>
