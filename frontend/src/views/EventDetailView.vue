<template>
  <div class="container event-detail-page">

    <!-- Back navigation -->
    <button class="back-btn" @click="router.back()">
      ← Vissza
    </button>

    <!-- Loading -->
    <div v-if="loading" class="state-box">
      <div class="spinner"></div>
      <p>Esemény betöltése...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="empty-card">
      <div class="empty-icon">⚠️</div>
      <p class="empty-title">{{ error }}</p>
      <RouterLink to="/" class="btn btn-outline" style="margin-top:1rem">Főoldal</RouterLink>
    </div>

    <!-- Event detail -->
    <template v-else-if="event">
      <div class="detail-hero">
        <div class="detail-hero-left">
          <div class="hero-meta">
            <span class="category-badge" :class="categoryClass">{{ event.category }}</span>
            <span class="price-badge" v-if="event.price_info">{{ event.price_info }}</span>
          </div>
          <h1 class="detail-title">{{ event.title }}</h1>
          <p class="detail-desc" v-if="event.description">{{ event.description }}</p>
        </div>

        <!-- Like / Interested button -->
        <div class="hero-actions">
          <button
            v-if="authStore.isLoggedIn"
            class="like-btn-large"
            :class="{ liked: isLiked }"
            @click="toggleLike"
            :disabled="likeLoading"
          >
            <span class="like-icon">{{ isLiked ? '♥' : '♡' }}</span>
            {{ isLiked ? 'Érdekel' : 'Érdekel?' }}
          </button>
          <RouterLink
            v-else
            :to="{ name: 'login', query: { redirect: route.fullPath } }"
            class="btn btn-primary"
          >
            ♡ Bejelentkezés a jelöléshez
          </RouterLink>
        </div>
      </div>

      <!-- Info cards -->
      <div class="info-grid">
        <div class="info-card">
          <span class="info-icon">📅</span>
          <div>
            <div class="info-label">Időpont</div>
            <div class="info-value">{{ formattedDate }}</div>
            <div class="info-sub">{{ formattedDay }}</div>
          </div>
        </div>

        <div class="info-card" v-if="event.address">
          <span class="info-icon">📍</span>
          <div>
            <div class="info-label">Helyszín</div>
            <div class="info-value">{{ event.venue_name || 'Helyszín' }}</div>
            <div class="info-sub">{{ event.address }}</div>
          </div>
        </div>

        <div class="info-card" v-if="event.price_info">
          <span class="info-icon">🎟</span>
          <div>
            <div class="info-label">Belépő</div>
            <div class="info-value">{{ event.price_info }}</div>
          </div>
        </div>
      </div>

      <!-- Ticket links -->
      <div class="ticket-section" v-if="event.source_url || event.tixa_url || event.ticketswap_url || event.bandsintown_url">
        <h2 class="section-title">Jegyvásárlás</h2>
        <div class="ticket-links">
          <a v-if="event.source_url" :href="event.source_url" target="_blank" rel="noopener"
             class="ticket-btn" :class="`ticket-${event.source}`">
            🎟 Jegy – {{ sourceLabel }}
          </a>
          <template v-if="event.venue_id">
            <a v-if="event.tixa_url"        :href="event.tixa_url"        target="_blank" rel="noopener" class="ticket-btn ticket-tixa">Tixa</a>
            <a v-if="event.ticketswap_url"  :href="event.ticketswap_url"  target="_blank" rel="noopener" class="ticket-btn ticket-ticketswap">TicketSwap</a>
            <a v-if="event.bandsintown_url" :href="event.bandsintown_url" target="_blank" rel="noopener" class="ticket-btn ticket-bandsintown">Bandsintown</a>
          </template>
        </div>
      </div>

      <!-- Toast -->
      <Transition name="toast">
        <div v-if="toast.visible" class="toast" :class="`toast-${toast.type}`">
          {{ toast.message }}
        </div>
      </Transition>
    </template>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authStore } from '../stores/auth'
import api from '../services/api'

const route  = useRoute()
const router = useRouter()

const event       = ref(null)
const loading     = ref(false)
const error       = ref(null)
const isLiked     = ref(false)
const likeLoading = ref(false)
const toast       = ref({ visible: false, message: '', type: 'success' })

function showToast(message, type = 'success') {
  toast.value = { visible: true, message, type }
  setTimeout(() => { toast.value.visible = false }, 2500)
}

async function fetchEvent() {
  loading.value = true
  error.value   = null
  try {
    const { data } = await api.get(`/events/${route.params.id}`)
    event.value = data
  } catch (err) {
    error.value = err.response?.status === 404
      ? 'Ez az esemény nem található.'
      : 'Hiba az esemény betöltésekor.'
  } finally {
    loading.value = false
  }
}

async function fetchLikedIds() {
  if (!authStore.isLoggedIn) return
  try {
    const { data } = await api.get('/events/liked')
    const id = parseInt(route.params.id, 10)
    isLiked.value = data.some(e => e.id === id)
  } catch { /* not critical */ }
}

async function toggleLike() {
  if (likeLoading.value) return
  likeLoading.value = true
  try {
    if (isLiked.value) {
      await api.delete(`/events/liked/${event.value.id}`)
      isLiked.value = false
      showToast('Eltávolítva az érdeklődési listádból.', 'info')
    } else {
      await api.post('/events/liked', { event_id: event.value.id })
      isLiked.value = true
      showToast('Hozzáadva az érdeklődési listádhoz! ♥', 'success')
    }
  } catch { /* silently ignore */ } finally {
    likeLoading.value = false
  }
}

const categoryClass = computed(() => {
  const map = {
    'Zene':      'cat-zene',
    'Kultúra':   'cat-kultura',
    'Színház':   'cat-szinhaz',
    'Sport':     'cat-sport',
    'Buli':      'cat-buli',
    'Kiállítás': 'cat-kiallitas',
  }
  return map[event.value?.category] || 'cat-egyeb'
})

const formattedDate = computed(() => {
  if (!event.value?.date_time) return ''
  return new Date(event.value.date_time).toLocaleString('hu-HU', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
})

const formattedDay = computed(() => {
  if (!event.value?.date_time) return ''
  return new Date(event.value.date_time).toLocaleString('hu-HU', { weekday: 'long' })
})

const sourceLabel = computed(() => {
  const map = { tixa: 'Tixa', ticketswap: 'TicketSwap', bandsintown: 'Bandsintown' }
  return map[event.value?.source] || 'Jegy'
})

onMounted(() => {
  fetchEvent()
  fetchLikedIds()
})
</script>

<style scoped>
.event-detail-page {
  padding-top: 1.5rem;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.back-btn {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 0;
  transition: color 0.15s;
}
.back-btn:hover { color: var(--primary); }

/* Hero */
.detail-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  box-shadow: var(--shadow);
}

.detail-hero-left { flex: 1; min-width: 260px; }

.hero-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.85rem;
}

.category-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.cat-zene      { background: #fef3c7; color: #92400e; }
.cat-kultura   { background: #d1fae5; color: #065f46; }
.cat-szinhaz   { background: #ede9fe; color: #5b21b6; }
.cat-sport     { background: #dbeafe; color: #1e40af; }
.cat-buli      { background: #fce7f3; color: #9d174d; }
.cat-kiallitas { background: #fef9c3; color: #713f12; }
.cat-egyeb     { background: var(--surface-2); color: var(--text-muted); }

.price-badge {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.detail-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 0.85rem;
}

.detail-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 620px;
}

/* Like button */
.hero-actions { flex-shrink: 0; }

.like-btn-large {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.6rem;
  border-radius: 99px;
  font-size: 0.9rem;
  font-weight: 700;
  border: 2px solid #e11d48;
  background: transparent;
  color: #e11d48;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.like-btn-large:hover:not(:disabled) {
  background: #fef2f2;
  transform: translateY(-1px);
}
.like-btn-large.liked {
  background: #e11d48;
  color: #fff;
}
.like-btn-large:disabled { opacity: 0.55; cursor: not-allowed; }
.like-icon { font-size: 1.1rem; }

/* Info grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.info-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  box-shadow: var(--shadow-sm);
}
.info-icon { font-size: 1.4rem; flex-shrink: 0; padding-top: 0.1rem; }
.info-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.2rem;
}
.info-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}
.info-sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

/* Tickets */
.ticket-section { display: flex; flex-direction: column; gap: 0.75rem; }
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
}
.ticket-links { display: flex; flex-wrap: wrap; gap: 0.6rem; }

.ticket-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.25rem;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
}
.ticket-btn:hover { opacity: 0.8; transform: scale(1.03); text-decoration: none; }
.ticket-tixa        { background: #fef9c3; color: #854d0e; }
.ticket-ticketswap  { background: #dbeafe; color: #1e40af; }
.ticket-bandsintown { background: #fce7f3; color: #9d174d; }
.ticket-egyéb       { background: var(--primary-light); color: var(--primary); }

/* State boxes */
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
.empty-icon { font-size: 2.5rem; }
.empty-title { font-size: 1rem; font-weight: 600; }

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
}
.toast-success { background: #166534; color: #fff; }
.toast-info    { background: #1e3a5f; color: #fff; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(12px); }
</style>
