<template>
  <div class="event-card" @click="goToDetail" role="button" tabindex="0" @keyup.enter="goToDetail">

    <div class="card-header">
      <span class="category-badge" :class="categoryClass">{{ event.category }}</span>
      <span class="price-tag" v-if="event.price_info">{{ event.price_info }}</span>
    </div>

    <h3 class="event-title">{{ event.title }}</h3>

    <div class="event-meta">
      <div class="meta-row">
        <span class="meta-icon">📅</span>
        <span>{{ formattedDate }}</span>
      </div>
      <div class="meta-row" v-if="event.venue_name || event.address">
        <span class="meta-icon">📍</span>
        <span class="meta-text">{{ event.venue_name || shortAddress }}</span>
      </div>
    </div>

    <div class="card-footer">
      <a
        v-if="event.source_url"
        :href="event.source_url"
        target="_blank"
        rel="noopener"
        class="source-chip"
        :class="`source-${event.source}`"
        @click.stop
      >
        {{ sourceLabel }}
      </a>
      <span v-else class="source-chip source-empty">Ingyenes / egyéb</span>

      <button
        v-if="showLike"
        class="like-btn"
        :class="{ liked: isLiked }"
        @click.stop="$emit('toggle-like', event)"
        :title="isLiked ? 'Már érdekel' : 'Érdekel'"
      >
        <span class="like-icon">{{ isLiked ? '♥' : '♡' }}</span>
        <span>{{ isLiked ? 'Érdekel' : 'Érdekel?' }}</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  event:    { type: Object,  required: true },
  isLiked:  { type: Boolean, default: false },
  showLike: { type: Boolean, default: true },
})
defineEmits(['toggle-like'])

const router = useRouter()

function goToDetail() {
  router.push({ name: 'event-detail', params: { id: props.event.id } })
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
  return map[props.event.category] || 'cat-egyeb'
})

const formattedDate = computed(() => {
  if (!props.event.date_time) return ''
  const d = new Date(props.event.date_time)
  return d.toLocaleString('hu-HU', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
})

const shortAddress = computed(() => {
  if (!props.event.address) return ''
  // Show only up to the first dash for brevity
  const parts = props.event.address.split('–')
  return parts[parts.length - 1].trim() || props.event.address
})

const sourceLabel = computed(() => {
  const map = { tixa: 'Tixa', ticketswap: 'TicketSwap', bandsintown: 'Bandsintown' }
  return map[props.event.source] || 'Jegy'
})
</script>

<style scoped>
.event-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-sm);
}
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
.event-card:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* Header row */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.category-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.7rem;
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

.price-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

/* Title */
.event-title {
  font-size: 0.975rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
}

/* Meta */
.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.meta-row {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}
.meta-icon { flex-shrink: 0; font-size: 0.85rem; }
.meta-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.source-chip {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  text-decoration: none;
  transition: opacity 0.15s;
}
.source-chip:hover { opacity: 0.75; text-decoration: none; }
.source-tixa        { background: #fef9c3; color: #854d0e; }
.source-ticketswap  { background: #dbeafe; color: #1e40af; }
.source-bandsintown { background: #fce7f3; color: #9d174d; }
.source-empty       { background: var(--surface-2); color: var(--text-muted); }

/* Like button */
.like-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.1rem;
  transition: color 0.15s;
  white-space: nowrap;
}
.like-btn:hover { color: #e11d48; }
.like-btn.liked { color: #e11d48; }
.like-icon { font-size: 1.05rem; }
</style>
