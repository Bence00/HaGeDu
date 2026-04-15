<template>
  <div class="home">
    <section class="home-hero">
      <div class="container hero-inner">
        <span class="city-pill">Budapest</span>
        <h1>Fedezd fel a város legjobb eseményeit</h1>

        <form class="search-box" @submit.prevent>
          <span class="search-mark" aria-hidden="true"></span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Keress helyszínt vagy eseményt..."
            aria-label="Helyszín keresése"
          />
          <button v-if="searchQuery" type="button" class="clear-btn" @click="searchQuery = ''">
            Törlés
          </button>
        </form>
      </div>
    </section>

    <section class="venues-section">
      <div class="container content-layout">
        <main class="venues-main">
          <div class="section-header">
            <div>
              <h2>Helyszínek</h2>
              <p v-if="!loading">{{ filtered.length }} találat a városban</p>
            </div>
            <div class="view-toggles" aria-hidden="true">
              <span class="active"></span>
              <span></span>
            </div>
          </div>

          <div v-if="loading" class="state-box">
            <div class="spinner"></div>
            <p>Helyszínek betöltése...</p>
          </div>

          <div v-else-if="error" class="empty-card">
            <p class="empty-title">{{ error }}</p>
          </div>

          <div v-else-if="filtered.length === 0" class="empty-card">
            <p class="empty-title">Nincs találat</p>
            <p>Próbálj másik keresési feltételt.</p>
            <button class="btn btn-outline" type="button" @click="resetFilters">Összes megjelenítése</button>
          </div>

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

          <div v-if="!authStore.isLoggedIn && filtered.length > 0" class="login-nudge">
            <span>Mentsd el a kedvenc helyszíneidet.</span>
            <RouterLink to="/register">Regisztrálj ingyen</RouterLink>
          </div>
        </main>

        <aside class="home-sidebar">
          <section class="side-panel">
            <h2>Szűrők</h2>

            <div class="filter-group">
              <h3>Kategória</h3>
              <div class="filter-chips">
                <button
                  v-for="f in filters"
                  :key="f.key"
                  type="button"
                  class="filter-chip"
                  :class="{ active: activeFilter === f.key }"
                  @click="activeFilter = f.key"
                >
                  {{ f.label }}
                </button>
              </div>
            </div>

            <div class="filter-group">
              <h3>Időpont</h3>
              <label class="check-row"><input type="checkbox" /> Ma</label>
              <label class="check-row"><input type="checkbox" /> Ezen a hétvégén</label>
              <label class="check-row"><input type="checkbox" /> Jövő héten</label>
            </div>
          </section>

          <section class="side-panel popular-panel">
            <h2>Népszerű helyek</h2>
            <button
              v-for="venue in popularVenues"
              :key="venue.id"
              type="button"
              class="popular-item"
              @click="openVenue(venue.id)"
            >
              <span class="popular-thumb venue-visual" :class="venueMeta(venue).imageClass">
                <img v-if="venueMeta(venue).image" :src="venueMeta(venue).image" alt="" loading="lazy" />
              </span>
              <span>
                <strong>{{ venue.name }}</strong>
                <small>{{ venueMeta(venue).category }} • {{ platformSummary(venue) }}</small>
              </span>
            </button>
          </section>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/auth'
import api from '../services/api'
import VenueCard from '../components/VenueCard.vue'
import { platformSummary, venueMeta } from '../utils/venuePresentation'

const router = useRouter()

const venues = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const savedIds = ref(new Set())
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'Összes' },
  { key: 'tixa', label: 'Tixa' },
  { key: 'swap', label: 'TicketSwap' },
  { key: 'bands', label: 'Bandsintown' },
]

const filtered = computed(() => {
  let list = venues.value
  const q = searchQuery.value.trim().toLowerCase()

  if (q) {
    list = list.filter(venue => venue.name.toLowerCase().includes(q))
  }

  if (activeFilter.value === 'tixa') list = list.filter(venue => venue.tixa_url)
  if (activeFilter.value === 'swap') list = list.filter(venue => venue.ticketswap_url)
  if (activeFilter.value === 'bands') list = list.filter(venue => venue.bandsintown_url)

  return list
})

const popularVenues = computed(() => {
  return venues.value
    .filter(venue => venue.tixa_url || venue.ticketswap_url || venue.bandsintown_url)
    .slice(0, 3)
})

async function fetchVenues() {
  loading.value = true
  error.value = null
  try {
    const { data } = await api.get('/venues')
    venues.value = data
  } catch (err) {
    error.value =
      err.response?.status === 404
        ? 'A helyszínlista hamarosan elérhető lesz.'
        : 'Hiba a helyszínek betöltésekor.'
  } finally {
    loading.value = false
  }
}

async function fetchSaved() {
  if (!authStore.isLoggedIn) return
  try {
    const { data } = await api.get('/venues/favorites')
    savedIds.value = new Set(data.map(venue => venue.id))
  } catch {
    savedIds.value = new Set()
  }
}

async function toggleSave(venue) {
  const alreadySaved = savedIds.value.has(venue.id)
  try {
    if (alreadySaved) {
      await api.delete(`/venues/favorites/${venue.id}`)
      savedIds.value.delete(venue.id)
    } else {
      await api.post('/venues/favorites', { venue_id: venue.id })
      savedIds.value.add(venue.id)
    }
    savedIds.value = new Set(savedIds.value)
  } catch {
    /* A mentés sikertelensége nem akadályozza a böngészést. */
  }
}

function resetFilters() {
  searchQuery.value = ''
  activeFilter.value = 'all'
}

function openVenue(id) {
  router.push({ name: 'venue-detail', params: { id } })
}

onMounted(() => {
  fetchVenues()
  fetchSaved()
})
</script>

<style scoped>
.home {
  background: var(--bg);
}

.home-hero {
  padding: 52px 0 36px;
  background: var(--surface);
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.city-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 14px;
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  font-size: 12px;
  font-weight: 800;
}

.hero-inner h1 {
  max-width: 650px;
  margin-top: 18px;
  color: var(--text);
  font-size: 42px;
  font-weight: 900;
  line-height: 1.08;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 560px;
  height: 50px;
  margin-top: 26px;
  padding: 0 16px;
  gap: 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--surface-2);
}

.search-box:focus-within {
  border-color: var(--border-strong);
  background: var(--surface);
}

.search-mark {
  width: 13px;
  height: 13px;
  border: 2px solid var(--text-soft);
  border-radius: 50%;
  position: relative;
  flex: 0 0 auto;
}

.search-mark::after {
  content: "";
  position: absolute;
  right: -6px;
  bottom: -4px;
  width: 7px;
  height: 2px;
  background: var(--text-soft);
  transform: rotate(45deg);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-size: 14px;
}

.clear-btn {
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
}

.venues-section {
  padding: 42px 0 64px;
}

.content-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  align-items: start;
  gap: 40px;
}

.venues-main {
  min-width: 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.section-header h2 {
  color: var(--text);
  font-size: 17px;
  font-weight: 900;
}

.section-header p {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
}

.view-toggles {
  display: inline-flex;
  gap: 9px;
}

.view-toggles span {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
}

.view-toggles span::before {
  content: "";
  position: absolute;
  inset: 8px;
  background:
    linear-gradient(var(--text-muted), var(--text-muted)) left top / 5px 5px,
    linear-gradient(var(--text-muted), var(--text-muted)) right top / 5px 5px,
    linear-gradient(var(--text-muted), var(--text-muted)) left bottom / 5px 5px,
    linear-gradient(var(--text-muted), var(--text-muted)) right bottom / 5px 5px;
  background-repeat: no-repeat;
}

.view-toggles span:last-child::before {
  inset: 8px 7px;
  background:
    linear-gradient(var(--text-muted), var(--text-muted)) left top / 16px 3px,
    linear-gradient(var(--text-muted), var(--text-muted)) left center / 16px 3px,
    linear-gradient(var(--text-muted), var(--text-muted)) left bottom / 16px 3px;
  background-repeat: no-repeat;
}

.view-toggles .active {
  background: var(--surface-2);
}

.home-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 82px;
}

.side-panel {
  border-radius: var(--radius);
  background: var(--surface);
  padding: 24px;
}

.side-panel h2 {
  margin-bottom: 18px;
  color: var(--text);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
}

.filter-group + .filter-group {
  margin-top: 22px;
}

.filter-group h3 {
  margin-bottom: 10px;
  color: var(--text);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.filter-chip {
  min-height: 24px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
}

.filter-chip.active {
  background: var(--primary);
  color: #ffffff;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-size: 12px;
  font-weight: 700;
  line-height: 2;
}

.check-row input {
  width: 13px;
  height: 13px;
  accent-color: #111111;
}

.popular-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.popular-panel h2 {
  margin-bottom: 2px;
}

.popular-item {
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}

.popular-item:hover strong {
  text-decoration: underline;
}

.popular-thumb {
  width: 48px;
  height: 48px;
  border-radius: 5px;
}

.popular-thumb img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.08);
}

.popular-item strong {
  display: block;
  font-size: 12px;
  font-weight: 900;
}

.popular-item small {
  display: block;
  margin-top: 3px;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
}

.login-nudge {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 30px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
}

.login-nudge a {
  color: var(--text);
  font-weight: 900;
  text-decoration: underline;
}

@media (max-width: 980px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .home-sidebar {
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .home-hero {
    padding-top: 38px;
  }

  .hero-inner h1 {
    font-size: 32px;
  }

  .content-layout {
    gap: 28px;
  }

  .home-sidebar {
    grid-template-columns: 1fr;
  }

  .section-header {
    align-items: flex-start;
  }

  .view-toggles {
    display: none;
  }

  .login-nudge {
    flex-direction: column;
    align-items: center;
  }
}
</style>
