<template>
  <div class="profile-shell">
    <aside class="profile-sidebar">
      <div class="workspace-card">
        <span class="workspace-icon"></span>
        <div>
          <strong>Workspace</strong>
          <small>Enterprise Edition</small>
        </div>
      </div>

      <nav class="side-nav" aria-label="Profil navigáció">
        <RouterLink to="/" class="side-link">Overview</RouterLink>
        <RouterLink to="/profile" class="side-link active">Profile</RouterLink>
        <RouterLink to="/" class="side-link">Saved</RouterLink>
        <RouterLink to="/" class="side-link">History</RouterLink>
        <RouterLink to="/" class="side-link">Inventory</RouterLink>
      </nav>

      <div class="side-bottom">
        <RouterLink to="/" class="side-link">Help Center</RouterLink>
        <button type="button" class="side-link logout" @click="handleLogout">Log Out</button>
      </div>
    </aside>

    <main class="profile-main">
      <section class="profile-card">
        <div class="avatar-wrap">
          <div class="avatar">{{ initials }}</div>
          <span class="online-dot" aria-hidden="true"></span>
        </div>

        <div class="profile-copy">
          <h1>{{ displayName }}</h1>
          <p>{{ displayEmail }}</p>
          <div class="profile-tags">
            <span>{{ roleLabel }}</span>
            <span>Budapest Office</span>
          </div>
        </div>

        <div class="profile-actions">
          <button type="button" class="btn btn-primary">Edit Profile</button>
          <button type="button" class="share-btn" aria-label="Megosztás"></button>
        </div>
      </section>

      <section class="saved-section">
        <div class="saved-heading">
          <h2>Mentett helyszínek</h2>
          <RouterLink to="/">Összes megtekintése</RouterLink>
        </div>

        <div v-if="loading" class="state-box">
          <div class="spinner"></div>
          <p>Betöltés...</p>
        </div>

        <div v-else-if="saved.length === 0" class="empty-state">
          <p>Még nem mentettél el helyszíneket.</p>
          <RouterLink to="/" class="btn btn-primary">Helyszínek böngészése</RouterLink>
        </div>

        <div v-else class="card-grid profile-grid">
          <VenueCard
            v-for="venue in saved"
            :key="venue.id"
            :venue="venue"
            :is-saved="true"
            @toggle-save="removeSaved"
          />
        </div>
      </section>

      <section class="profile-widgets">
        <article class="stats-panel">
          <h2>Profil statisztikák</h2>
          <div class="stats-row">
            <div>
              <strong>{{ saved.length }}</strong>
              <span>Mentés</span>
            </div>
            <div>
              <strong>{{ platformCount }}</strong>
              <span>Platform</span>
            </div>
            <div>
              <strong>{{ saved.length ? 8 : 0 }}</strong>
              <span>Követés</span>
            </div>
          </div>
        </article>

        <article class="verified-panel">
          <span class="verified-icon"></span>
          <div>
            <h2>Ellenőrzött profil</h2>
            <p>Fiókja minden biztonsági ellenőrzésen átment.</p>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/auth'
import { logout } from '../services/authService'
import api from '../services/api'
import VenueCard from '../components/VenueCard.vue'
import { platformLinks } from '../utils/venuePresentation'

const router = useRouter()

const user = computed(() => authStore.user || {})
const saved = ref([])
const loading = ref(false)

const displayName = computed(() => user.value.username || 'Kovács István')
const displayEmail = computed(() => user.value.email || 'istvan.kovacs@architektura.hu')
const roleLabel = computed(() => (user.value.role === 'admin' ? 'Senior Architect' : 'Member'))

const initials = computed(() => {
  const name = displayName.value.trim()
  return name.slice(0, 2).toUpperCase()
})

const platformCount = computed(() => {
  const names = new Set()
  saved.value.forEach(venue => platformLinks(venue).forEach(link => names.add(link.label)))
  return names.size
})

async function fetchSaved() {
  loading.value = true
  try {
    const { data } = await api.get('/venues/favorites')
    saved.value = data
  } catch {
    saved.value = []
  } finally {
    loading.value = false
  }
}

async function removeSaved(venue) {
  try {
    await api.delete(`/venues/favorites/${venue.id}`)
    saved.value = saved.value.filter(item => item.id !== venue.id)
  } catch {
    /* A profil marad használható akkor is, ha a törlés nem sikerül. */
  }
}

function handleLogout() {
  logout()
  router.push('/')
}

onMounted(fetchSaved)
</script>

<style scoped>
.profile-shell {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 720px;
  background: var(--bg);
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 22px;
  border-right: 1px solid var(--border);
  background: var(--surface);
  padding: 28px 14px;
}

.workspace-card {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 10px;
  padding: 0 10px 14px;
}

.workspace-icon {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: #111111;
  position: relative;
}

.workspace-icon::after {
  content: "";
  position: absolute;
  inset: 8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.workspace-card strong {
  display: block;
  color: var(--text);
  font-size: 13px;
  font-weight: 900;
}

.workspace-card small {
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 700;
}

.side-nav,
.side-bottom {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.side-bottom {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.side-link {
  display: flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
  text-align: left;
  text-decoration: none;
}

.side-link:hover,
.side-link.active {
  background: var(--surface-2);
  color: var(--text);
  text-decoration: none;
}

.logout {
  width: 100%;
}

.profile-main {
  padding: 36px;
}

.profile-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  margin: 0 auto;
  max-width: 950px;
  padding: 28px 32px;
  border-radius: var(--radius);
  background: var(--surface);
}

.avatar-wrap {
  position: relative;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background:
    linear-gradient(180deg, #42a69a 0 45%, #111111 45% 46%, #e7a67f 46% 66%, #29342f 66%),
    #42a69a;
  color: transparent;
  font-size: 26px;
  font-weight: 900;
  overflow: hidden;
}

.online-dot {
  position: absolute;
  right: 4px;
  bottom: 8px;
  width: 22px;
  height: 22px;
  border: 4px solid var(--surface);
  border-radius: 50%;
  background: #111111;
}

.profile-copy h1 {
  color: var(--text);
  font-size: 30px;
  font-weight: 900;
  line-height: 1.1;
}

.profile-copy p {
  margin-top: 5px;
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.profile-tags span {
  padding: 5px 9px;
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--text);
  font-size: 11px;
  font-weight: 900;
}

.profile-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  cursor: pointer;
  position: relative;
}

.share-btn::before,
.share-btn::after {
  content: "";
  position: absolute;
  background: var(--text);
}

.share-btn::before {
  left: 11px;
  top: 12px;
  width: 13px;
  height: 2px;
  transform: rotate(-28deg);
}

.share-btn::after {
  left: 20px;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.saved-section {
  max-width: 950px;
  margin: 38px auto 0;
}

.saved-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.saved-heading h2,
.stats-panel h2,
.verified-panel h2 {
  color: var(--text);
  font-size: 18px;
  font-weight: 900;
}

.saved-heading a {
  color: var(--text);
  font-size: 12px;
  font-weight: 900;
  text-decoration: underline;
}

.profile-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.profile-widgets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  max-width: 950px;
  margin: 38px auto 0;
}

.stats-panel,
.verified-panel {
  border-radius: var(--radius);
  background: var(--surface-2);
  padding: 28px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.stats-row div {
  min-height: 68px;
  border-radius: 6px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stats-row strong {
  color: var(--text);
  font-size: 20px;
  font-weight: 900;
}

.stats-row span {
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.verified-panel {
  display: grid;
  grid-template-columns: 42px 1fr;
  align-items: center;
  gap: 18px;
}

.verified-panel p {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
}

.verified-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--surface);
  position: relative;
}

.verified-icon::before {
  content: "";
  position: absolute;
  inset: 11px;
  border: 2px solid var(--text);
  border-radius: 50%;
}

.verified-icon::after {
  content: "";
  position: absolute;
  left: 16px;
  top: 14px;
  width: 8px;
  height: 5px;
  border-left: 2px solid var(--text);
  border-bottom: 2px solid var(--text);
  transform: rotate(-45deg);
}

@media (max-width: 1040px) {
  .profile-grid,
  .profile-widgets {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .profile-shell {
    grid-template-columns: 1fr;
  }

  .profile-sidebar {
    display: none;
  }

  .profile-main {
    padding: 24px 18px;
  }

  .profile-card {
    grid-template-columns: 1fr;
    justify-items: start;
  }
}

@media (max-width: 640px) {
  .profile-grid,
  .profile-widgets {
    grid-template-columns: 1fr;
  }
}
</style>
