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

    <!-- Saved venues -->
    <section class="saved-section">
      <h2 class="section-title">Mentett helyszínek</h2>

      <div v-if="loading" class="state-box">
        <div class="spinner"></div>
        <p>Betöltés...</p>
      </div>

      <div v-else-if="saved.length === 0" class="empty-state">
        <p>Még nem mentettél el helyszíneket.</p>
        <RouterLink to="/" class="btn btn-primary" style="margin-top:1rem">
          Helyszínek böngészése
        </RouterLink>
      </div>

      <div v-else class="card-grid">
        <VenueCard
          v-for="venue in saved"
          :key="venue.id"
          :venue="venue"
          :is-saved="true"
          @toggle-save="removeSaved"
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

const user    = computed(() => authStore.user)
const saved   = ref([])
const loading = ref(false)

// First two letters of username as avatar placeholder
const initials = computed(() => {
  const name = user.value?.username || ''
  return name.slice(0, 2).toUpperCase()
})

async function fetchSaved() {
  loading.value = true
  try {
    const { data } = await api.get('/venues/favorites')
    saved.value = data
  } catch {
    // Favorites endpoint may not exist yet
    saved.value = []
  } finally {
    loading.value = false
  }
}

async function removeSaved(venue) {
  try {
    await api.delete(`/venues/favorites/${venue.id}`)
    saved.value = saved.value.filter(v => v.id !== venue.id)
  } catch {
    // Silently ignore
  }
}

onMounted(fetchSaved)
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Profile header card */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
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
  background: var(--color-primary);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.username {
  font-size: 1.3rem;
  font-weight: 700;
}

.email {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

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

/* Saved venues section */
.saved-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  color: var(--color-text-muted);
  text-align: center;
}

.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--color-text-muted);
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
