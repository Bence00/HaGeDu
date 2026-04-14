<template>
  <div class="home">

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-blob blob-1"></div>
        <div class="hero-blob blob-2"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-badge">🗺 Budapest</div>
        <h1 class="hero-title">Fedezd fel a város<br><span class="gradient-text">legjobb eseményeit</span></h1>
        <p class="hero-sub">Koncertek, fesztiválok és programok egy helyen</p>

        <form class="search-box" @submit.prevent>
          <span class="search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="activeTab === 'events' ? 'Keresés esemény vagy helyszín neve alapján...' : 'Keresés helyszín neve alapján...'"
            class="search-input"
          />
          <span v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</span>
        </form>

        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">{{ events.length }}</span>
            <span class="stat-label">Közelgő esemény</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">{{ venues.length }}</span>
            <span class="stat-label">Helyszín</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">Ingyenes</span>
            <span class="stat-label">Használat</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content-section">
      <div class="container">

        <!-- Tab switcher -->
        <div class="tab-bar">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'events' }"
            @click="activeTab = 'events'"
          >
            🎭 Események
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'venues' }"
            @click="activeTab = 'venues'"
          >
            🏛 Helyszínek
          </button>
        </div>

        <!-- ── EVENTS TAB ─────────────────────────────────────── -->
        <template v-if="activeTab === 'events'">

          <!-- Date quick filters -->
          <div class="filter-row">
            <div class="filter-chips">
              <button
                v-for="d in dateFilters"
                :key="d.key"
                class="filter-chip"
                :class="{ active: activeDateFilter === d.key }"
                @click="activeDateFilter = d.key"
              >
                {{ d.label }}
              </button>
            </div>

            <div class="filter-chips">
              <button
                v-for="c in categoryFilters"
                :key="c.key"
                class="filter-chip"
                :class="{ active: activeCategoryFilter === c.key }"
                @click="activeCategoryFilter = c.key"
              >
                {{ c.label }}
              </button>
            </div>
          </div>

          <div class="section-header">
            <div>
              <h2 class="section-title">Közelgő események</h2>
              <p class="section-sub" v-if="!eventsLoading">{{ filteredEvents.length }} találat</p>
            </div>
          </div>

          <div v-if="eventsLoading" class="state-box">
            <div class="spinner"></div>
            <p>Események betöltése...</p>
          </div>

          <div v-else-if="eventsError" class="empty-card">
            <div class="empty-icon">⚠️</div>
            <p class="empty-title">{{ eventsError }}</p>
          </div>

          <div v-else-if="filteredEvents.length === 0" class="empty-card">
            <div class="empty-icon">🔍</div>
            <p class="empty-title">Nincs találat</p>
            <p class="empty-sub">Próbálj más szűrőt vagy keresési feltételt.</p>
            <button class="btn btn-outline" style="margin-top:1rem" @click="resetEventFilters">
              Szűrők törlése
            </button>
          </div>

          <div v-else class="card-grid">
            <EventCard
              v-for="ev in filteredEvents"
              :key="ev.id"
              :event="ev"
              :is-liked="likedIds.has(ev.id)"
              :show-like="authStore.isLoggedIn"
              @toggle-like="toggleLike"
            />
          </div>

          <div v-if="!authStore.isLoggedIn && filteredEvents.length > 0" class="login-nudge">
            <span>❤ Jelöld meg az érdekes eseményeket —</span>
            <RouterLink to="/register">Regisztrálj ingyen</RouterLink>
          </div>

        </template>

        <!-- ── VENUES TAB ─────────────────────────────────────── -->
        <template v-else>

          <div class="section-header">
            <div>
              <h2 class="section-title">Helyszínek</h2>
              <p class="section-sub" v-if="!loading">{{ filteredVenues.length }} találat</p>
            </div>
            <div class="filter-chips" v-if="venues.length > 0">
              <button
                v-for="f in platformFilters"
                :key="f.key"
                class="filter-chip"
                :class="{ active: activePlatformFilter === f.key }"
                @click="activePlatformFilter = f.key"
              >
                {{ f.label }}
              </button>
            </div>
          </div>

          <div v-if="loading" class="state-box">
            <div class="spinner"></div>
            <p>Helyszínek betöltése...</p>
          </div>

          <div v-else-if="error" class="empty-card">
            <div class="empty-icon">⚠️</div>
            <p class="empty-title">{{ error }}</p>
          </div>

          <div v-else-if="filteredVenues.length === 0" class="empty-card">
            <div class="empty-icon">🔍</div>
            <p class="empty-title">Nincs találat</p>
            <p class="empty-sub">Próbálj más keresési feltételt.</p>
            <button class="btn btn-outline" style="margin-top:1rem" @click="searchQuery = ''">
              Összes megjelenítése
            </button>
          </div>

          <div v-else class="card-grid">
            <VenueCard
              v-for="venue in filteredVenues"
              :key="venue.id"
              :venue="venue"
              :is-saved="savedIds.has(venue.id)"
              :show-save="authStore.isLoggedIn"
              @toggle-save="toggleSave"
            />
          </div>

          <div v-if="!authStore.isLoggedIn && filteredVenues.length > 0" class="login-nudge">
            <span>📌 Mentsd el a kedvenc helyszíneidet —</span>
            <RouterLink to="/register">Regisztrálj ingyen</RouterLink>
          </div>

        </template>

      </div>
    </section>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast" :class="`toast-${toast.type}`">
        {{ toast.message }}
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { authStore } from '../stores/auth'
import api from '../services/api'
import VenueCard from '../components/VenueCard.vue'
import EventCard from '../components/EventCard.vue'

// ── Tab ──────────────────────────────────────────────────────────────────────
const activeTab = ref('events')

// ── Shared search ─────────────────────────────────────────────────────────
const searchQuery = ref('')

// ── Toast ─────────────────────────────────────────────────────────────────
const toast = ref({ visible: false, message: '', type: 'success' })
function showToast(message, type = 'success') {
  toast.value = { visible: true, message, type }
  setTimeout(() => { toast.value.visible = false }, 2500)
}

// ── Events ────────────────────────────────────────────────────────────────
const events         = ref([])
const eventsLoading  = ref(false)
const eventsError    = ref(null)
const likedIds       = ref(new Set())

const activeDateFilter     = ref('all')
const activeCategoryFilter = ref('all')

const dateFilters = [
  { key: 'all',   label: 'Összes' },
  { key: 'today', label: 'Ma' },
  { key: 'week',  label: 'Ez a hét' },
  { key: 'month', label: 'Ez a hónap' },
]

const categoryFilters = [
  { key: 'all',       label: 'Minden kategória' },
  { key: 'Zene',      label: '🎵 Zene' },
  { key: 'Kultúra',   label: '🎨 Kultúra' },
  { key: 'Színház',   label: '🎭 Színház' },
  { key: 'Sport',     label: '⚽ Sport' },
  { key: 'Buli',      label: '🪩 Buli' },
  { key: 'Kiállítás', label: '🖼 Kiállítás' },
]

const filteredEvents = computed(() => {
  let list = events.value
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(e =>
      e.title.toLowerCase().includes(q) ||
      (e.venue_name || '').toLowerCase().includes(q) ||
      (e.address    || '').toLowerCase().includes(q)
    )
  }
  return list
})

function resetEventFilters() {
  activeDateFilter.value     = 'all'
  activeCategoryFilter.value = 'all'
  searchQuery.value          = ''
}

async function fetchEvents() {
  eventsLoading.value = true
  eventsError.value   = null
  try {
    const params = {}
    if (activeDateFilter.value     !== 'all') params.date     = activeDateFilter.value
    if (activeCategoryFilter.value !== 'all') params.category = activeCategoryFilter.value
    const { data } = await api.get('/events', { params })
    events.value = data
  } catch {
    eventsError.value = 'Hiba az események betöltésekor.'
  } finally {
    eventsLoading.value = false
  }
}

async function fetchLiked() {
  if (!authStore.isLoggedIn) return
  try {
    const { data } = await api.get('/events/liked')
    likedIds.value = new Set(data.map(e => e.id))
  } catch { /* not critical */ }
}

async function toggleLike(event) {
  if (!authStore.isLoggedIn) return
  const alreadyLiked = likedIds.value.has(event.id)
  try {
    if (alreadyLiked) {
      await api.delete(`/events/liked/${event.id}`)
      likedIds.value.delete(event.id)
      showToast('Eltávolítva az érdeklődési listádból.', 'info')
    } else {
      await api.post('/events/liked', { event_id: event.id })
      likedIds.value.add(event.id)
      showToast('Hozzáadva az érdeklődési listádhoz! ♥')
    }
    likedIds.value = new Set(likedIds.value)
  } catch { /* silently ignore */ }
}

// Refetch events from API when date/category filter changes
watch([activeDateFilter, activeCategoryFilter], fetchEvents)

// ── Venues ────────────────────────────────────────────────────────────────
const venues             = ref([])
const loading            = ref(false)
const error              = ref(null)
const savedIds           = ref(new Set())
const activePlatformFilter = ref('all')

const platformFilters = [
  { key: 'all',   label: 'Összes' },
  { key: 'tixa',  label: 'Tixa' },
  { key: 'swap',  label: 'TicketSwap' },
  { key: 'bands', label: 'Bandsintown' },
]

const filteredVenues = computed(() => {
  let list = venues.value
  const q = searchQuery.value.trim().toLowerCase()
  if (q) list = list.filter(v => v.name.toLowerCase().includes(q))
  if (activePlatformFilter.value === 'tixa')  list = list.filter(v => v.tixa_url)
  if (activePlatformFilter.value === 'swap')  list = list.filter(v => v.ticketswap_url)
  if (activePlatformFilter.value === 'bands') list = list.filter(v => v.bandsintown_url)
  return list
})

async function fetchVenues() {
  loading.value = true
  error.value   = null
  try {
    const { data } = await api.get('/venues')
    venues.value = data
  } catch (err) {
    error.value = err.response?.status === 404
      ? 'A helyszín lista hamarosan elérhető lesz.'
      : 'Hiba a helyszínek betöltésekor.'
  } finally {
    loading.value = false
  }
}

async function fetchSaved() {
  if (!authStore.isLoggedIn) return
  try {
    const { data } = await api.get('/venues/favorites')
    savedIds.value = new Set(data.map(v => v.id))
  } catch { /* not critical */ }
}

async function toggleSave(venue) {
  const alreadySaved = savedIds.value.has(venue.id)
  try {
    if (alreadySaved) {
      await api.delete(`/venues/favorites/${venue.id}`)
      savedIds.value.delete(venue.id)
      showToast('Helyszín eltávolítva.', 'info')
    } else {
      await api.post('/venues/favorites', { venue_id: venue.id })
      savedIds.value.add(venue.id)
      showToast('Helyszín mentve! ★')
    }
    savedIds.value = new Set(savedIds.value)
  } catch { /* silently ignore */ }
}

onMounted(() => {
  fetchEvents()
  fetchLiked()
  fetchVenues()
  fetchSaved()
})
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 6rem 0 5rem;
  background: #fafbff;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.45; }
.blob-1 { width: 600px; height: 600px; background: radial-gradient(circle, #c7d2fe, #a5b4fc); top: -200px; left: -150px; }
.blob-2 { width: 500px; height: 500px; background: radial-gradient(circle, #ddd6fe, #c4b5fd); bottom: -150px; right: -100px; }

.hero-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.hero-badge {
  display: inline-block;
  background: rgba(99,102,241,0.1);
  color: var(--primary);
  font-size: 0.825rem;
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
  border: 1px solid rgba(99,102,241,0.2);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text);
}
.gradient-text {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub { max-width: 480px; color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; }

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 520px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 99px;
  padding: 0.5rem 0.75rem 0.5rem 1.25rem;
  gap: 0.5rem;
  box-shadow: var(--shadow);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-box:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1), var(--shadow);
}
.search-icon { font-size: 1rem; flex-shrink: 0; }
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  font-family: inherit;
  color: var(--text);
  background: transparent;
}
.search-input::placeholder { color: var(--text-muted); }
.clear-btn {
  font-size: 0.75rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 99px;
  transition: background 0.15s;
}
.clear-btn:hover { background: var(--surface-2); }

.hero-stats { display: flex; align-items: center; gap: 1.5rem; margin-top: 0.5rem; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
.stat-num { font-size: 1.1rem; font-weight: 800; color: var(--text); }
.stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
.stat-divider { width: 1px; height: 32px; background: var(--border); }

/* Content section */
.content-section { padding: 2.5rem 0 4rem; }

/* Tabs */
.tab-bar {
  display: flex;
  gap: 0.25rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 99px;
  padding: 0.25rem;
  width: fit-content;
  margin-bottom: 1.75rem;
}
.tab-btn {
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

/* Filter row */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.filter-chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.filter-chip {
  padding: 0.35rem 1rem;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1.5px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}
.filter-chip:hover { border-color: var(--primary); color: var(--primary); }
.filter-chip.active { background: var(--primary-light); border-color: var(--primary); color: var(--primary); }

/* Section header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.section-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; }
.section-sub { color: var(--text-muted); font-size: 0.875rem; margin-top: 0.15rem; }

/* States */
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--text-muted);
}
.empty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 4rem 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-align: center;
}
.empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
.empty-title { font-size: 1rem; font-weight: 600; color: var(--text); }
.empty-sub   { color: var(--text-muted); font-size: 0.875rem; }

.login-nudge {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  border-radius: 99px;
  font-size: 0.875rem;
  font-weight: 600;
  z-index: 9999;
  box-shadow: var(--shadow-lg);
  pointer-events: none;
  white-space: nowrap;
}
.toast-success { background: #166534; color: #fff; }
.toast-info    { background: #1e3a5f; color: #fff; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }
</style>
