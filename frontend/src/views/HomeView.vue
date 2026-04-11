<template>
  <div class="home">
    <!-- Hero section -->
    <section class="hero">
      <div class="container hero-inner">
        <h1 class="hero-title">Fedezd fel Budapest eseményeit</h1>
        <p class="hero-subtitle">
          Találd meg a legjobb koncerteket, fesztiválokat és programokat a városban.
        </p>
        <form class="search-form" @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Keresés helyszín alapján..."
            class="search-input"
          />
          <button type="submit" class="btn btn-primary">Keresés</button>
        </form>
      </div>
    </section>

    <!-- Venue listing -->
    <section class="venues-section">
      <div class="container">
        <div class="section-header">
          <h2>Helyszínek</h2>
          <span class="venue-count" v-if="!loading">{{ filtered.length }} helyszín</span>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="state-box">
          <div class="spinner"></div>
          <p>Betöltés...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <!-- Empty state -->
        <div v-else-if="filtered.length === 0" class="state-box">
          <p>Nincs találat a keresési feltételekre.</p>
        </div>

        <!-- Cards -->
        <div v-else class="card-grid">
          <VenueCard
            v-for="venue in filtered"
            :key="venue.id"
            :venue="venue"
            :is-saved="savedIds.has(venue.id)"
            :show-save="authStore.isLoggedIn"
            @toggle-save="toggleSave"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authStore } from '../stores/auth'
import api from '../services/api'
import VenueCard from '../components/VenueCard.vue'

const venues      = ref([])
const loading     = ref(false)
const error       = ref(null)
const searchQuery = ref('')
const savedIds    = ref(new Set())

// Filter venues by search query
const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return venues.value
  return venues.value.filter(v => v.name.toLowerCase().includes(q))
})

async function fetchVenues() {
  loading.value = true
  error.value   = null
  try {
    const { data } = await api.get('/venues')
    venues.value = data
  } catch (err) {
    // If the venues endpoint doesn't exist yet, show a friendly message
    if (err.response?.status === 404) {
      error.value = 'A helyszín lista hamarosan elérhető lesz.'
    } else {
      error.value = 'Hiba a helyszínek betöltésekor. Kérjük próbáld újra.'
    }
  } finally {
    loading.value = false
  }
}

async function fetchSaved() {
  if (!authStore.isLoggedIn) return
  try {
    const { data } = await api.get('/favorites')
    savedIds.value = new Set(data.map(f => f.venue_id))
  } catch {
    // Favorites not critical — silently ignore
  }
}

async function toggleSave(venue) {
  const alreadySaved = savedIds.value.has(venue.id)
  try {
    if (alreadySaved) {
      await api.delete(`/favorites/${venue.id}`)
      savedIds.value.delete(venue.id)
    } else {
      await api.post('/favorites', { venue_id: venue.id })
      savedIds.value.add(venue.id)
    }
    // Trigger reactivity by re-assigning
    savedIds.value = new Set(savedIds.value)
  } catch {
    // Silently fail — backend endpoint may not be ready yet
  }
}

function handleSearch() {
  // Filtering is reactive via computed — nothing extra needed
}

onMounted(() => {
  fetchVenues()
  fetchSaved()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: #fff;
  padding: 4rem 0;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.05rem;
  opacity: 0.85;
  max-width: 520px;
}

.search-form {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 520px;
  margin-top: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: var(--radius);
  border: none;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  color: var(--color-text);
}

/* Venues section */
.venues-section {
  padding: 2.5rem 0;
}

.section-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.35rem;
  font-weight: 600;
}

.venue-count {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

/* Loading spinner */
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
