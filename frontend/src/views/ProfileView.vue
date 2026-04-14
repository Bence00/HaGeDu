<template>
  <div class="container profile-page">

    <!-- User info card -->
    <div class="profile-header card">
      <div class="avatar">{{ initials }}</div>
      <div class="user-info">
        <h1 class="username">{{ user.username }}</h1>
        <p class="email">{{ user.email }}</p>
        <span class="badge" :class="user.role">{{ user.role }}</span>
      </div>
    </div>

    <!-- Tab switcher -->
    <div class="tab-bar">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'venues' }"
        @click="activeTab = 'venues'"
      >
        🏛 Mentett helyszínek
        <span class="tab-count" v-if="savedVenues.length > 0">{{ savedVenues.length }}</span>
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'events' }"
        @click="activeTab = 'events'"
      >
        ❤ Érdekel
        <span class="tab-count" v-if="likedEvents.length > 0">{{ likedEvents.length }}</span>
      </button>
    </div>

    <!-- ── Saved venues ──────────────────────────────────────── -->
    <section v-if="activeTab === 'venues'" class="saved-section">

      <div v-if="venuesLoading" class="state-box">
        <div class="spinner"></div>
        <p>Betöltés...</p>
      </div>

      <div v-else-if="savedVenues.length === 0" class="empty-state">
        <div class="empty-icon">🏛</div>
        <p class="empty-title">Még nem mentettél el helyszíneket.</p>
        <RouterLink to="/" class="btn btn-primary" style="margin-top:1rem">
          Helyszínek böngészése
        </RouterLink>
      </div>

      <div v-else class="card-grid">
        <VenueCard
          v-for="venue in savedVenues"
          :key="venue.id"
          :venue="venue"
          :is-saved="true"
          @toggle-save="removeSavedVenue"
        />
      </div>
    </section>

    <!-- ── Liked events ──────────────────────────────────────── -->
    <section v-else class="saved-section">

      <div v-if="eventsLoading" class="state-box">
        <div class="spinner"></div>
        <p>Betöltés...</p>
      </div>

      <div v-else-if="likedEvents.length === 0" class="empty-state">
        <div class="empty-icon">🎭</div>
        <p class="empty-title">Még nincs jelölt eseményed.</p>
        <RouterLink to="/" class="btn btn-primary" style="margin-top:1rem">
          Események böngészése
        </RouterLink>
      </div>

      <div v-else class="card-grid">
        <EventCard
          v-for="ev in likedEvents"
          :key="ev.id"
          :event="ev"
          :is-liked="true"
          :show-like="true"
          @toggle-like="removeLikedEvent"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authStore } from '../stores/auth'
import api from '../services/api'
import VenueCard from '../components/VenueCard.vue'
import EventCard from '../components/EventCard.vue'

const user    = computed(() => authStore.user)
const activeTab = ref('venues')

const initials = computed(() => {
  const name = user.value?.username || ''
  return name.slice(0, 2).toUpperCase()
})

// ── Saved venues ──────────────────────────────────────────────────────────
const savedVenues  = ref([])
const venuesLoading = ref(false)

async function fetchSavedVenues() {
  venuesLoading.value = true
  try {
    const { data } = await api.get('/venues/favorites')
    savedVenues.value = data
  } catch {
    savedVenues.value = []
  } finally {
    venuesLoading.value = false
  }
}

async function removeSavedVenue(venue) {
  try {
    await api.delete(`/venues/favorites/${venue.id}`)
    savedVenues.value = savedVenues.value.filter(v => v.id !== venue.id)
  } catch { /* silently ignore */ }
}

// ── Liked events ──────────────────────────────────────────────────────────
const likedEvents  = ref([])
const eventsLoading = ref(false)

async function fetchLikedEvents() {
  eventsLoading.value = true
  try {
    const { data } = await api.get('/events/liked')
    likedEvents.value = data
  } catch {
    likedEvents.value = []
  } finally {
    eventsLoading.value = false
  }
}

async function removeLikedEvent(event) {
  try {
    await api.delete(`/events/liked/${event.id}`)
    likedEvents.value = likedEvents.value.filter(e => e.id !== event.id)
  } catch { /* silently ignore */ }
}

onMounted(() => {
  fetchSavedVenues()
  fetchLikedEvents()
})
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Profile header */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-info { display: flex; flex-direction: column; gap: 0.25rem; }
.username { font-size: 1.3rem; font-weight: 700; }
.email { color: var(--text-muted); font-size: 0.9rem; }
.badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  width: fit-content;
}
.badge.user  { background: #dbeafe; color: #1e40af; }
.badge.admin { background: #fef9c3; color: #713f12; }

/* Tabs */
.tab-bar {
  display: flex;
  gap: 0.25rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.25rem;
  width: fit-content;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.4rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.tab-btn:hover { color: var(--text); }
.tab-btn.active {
  background: var(--surface);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}
.tab-count {
  background: var(--primary-light);
  color: var(--primary);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
  min-width: 18px;
  text-align: center;
}

/* Sections */
.saved-section { display: flex; flex-direction: column; gap: 1.25rem; }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-muted);
  text-align: center;
  gap: 0.35rem;
}
.empty-icon { font-size: 2rem; margin-bottom: 0.25rem; }
.empty-title { font-size: 0.95rem; font-weight: 500; }

.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--text-muted);
}
</style>
