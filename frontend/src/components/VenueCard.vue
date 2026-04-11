<template>
  <div class="venue-card">
    <div class="card-top">
      <div class="venue-icon">🏛</div>
      <h3 class="venue-name">{{ venue.name }}</h3>
    </div>

    <div class="ticket-links">
      <a v-if="venue.tixa_url"        :href="venue.tixa_url"        target="_blank" rel="noopener" class="chip chip-tixa">Tixa</a>
      <a v-if="venue.ticketswap_url"  :href="venue.ticketswap_url"  target="_blank" rel="noopener" class="chip chip-swap">TicketSwap</a>
      <a v-if="venue.bandsintown_url" :href="venue.bandsintown_url" target="_blank" rel="noopener" class="chip chip-bands">Bandsintown</a>
      <span v-if="!venue.tixa_url && !venue.ticketswap_url && !venue.bandsintown_url" class="chip chip-empty">
        Nincs link
      </span>
    </div>

    <div class="card-footer" v-if="showSave">
      <button
        class="save-btn"
        :class="{ saved: isSaved }"
        @click="$emit('toggle-save', venue)"
      >
        <span class="save-icon">{{ isSaved ? '★' : '☆' }}</span>
        {{ isSaved ? 'Mentve' : 'Mentés' }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  venue:    { type: Object,  required: true },
  isSaved:  { type: Boolean, default: false },
  showSave: { type: Boolean, default: true  },
})
defineEmits(['toggle-save'])
</script>

<style scoped>
.venue-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-sm);
}
.venue-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.venue-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.venue-name {
  font-size: 0.975rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  padding-top: 0.15rem;
}

.ticket-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 99px;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;
  display: inline-block;
}
.chip:hover { opacity: 0.8; transform: scale(1.03); text-decoration: none; }

.chip-tixa   { background: #fef9c3; color: #854d0e; }
.chip-swap   { background: #dbeafe; color: #1e40af; }
.chip-bands  { background: #fce7f3; color: #9d174d; }
.chip-empty  { background: var(--surface-2); color: var(--text-muted); }

.card-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.825rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
}
.save-btn:hover { color: var(--primary); }
.save-btn.saved { color: var(--primary); }
.save-icon { font-size: 1rem; }
</style>
