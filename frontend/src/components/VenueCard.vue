<template>
  <div class="venue-card">
    <div class="card-header">
      <h3 class="venue-name">{{ venue.name }}</h3>
    </div>

    <div class="card-body">
      <div class="ticket-links">
        <a
          v-if="venue.tixa_url"
          :href="venue.tixa_url"
          target="_blank"
          rel="noopener noreferrer"
          class="ticket-link tixa"
        >Tixa</a>
        <a
          v-if="venue.ticketswap_url"
          :href="venue.ticketswap_url"
          target="_blank"
          rel="noopener noreferrer"
          class="ticket-link ticketswap"
        >TicketSwap</a>
        <a
          v-if="venue.bandsintown_url"
          :href="venue.bandsintown_url"
          target="_blank"
          rel="noopener noreferrer"
          class="ticket-link bandsintown"
        >Bandsintown</a>
      </div>
    </div>

    <div class="card-footer" v-if="showSave">
      <button
        class="btn btn-outline btn-sm save-btn"
        :class="{ saved: isSaved }"
        @click="$emit('toggle-save', venue)"
      >
        {{ isSaved ? '★ Mentve' : '☆ Mentés' }}
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
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}
.venue-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  padding: 1rem 1.25rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.venue-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.card-body {
  padding: 0.875rem 1.25rem;
  flex: 1;
}

.ticket-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ticket-link {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.3rem 0.75rem;
  border-radius: 99px;
  text-decoration: none;
  transition: opacity 0.15s;
}
.ticket-link:hover { opacity: 0.8; text-decoration: none; }

.tixa        { background: #fef9c3; color: #713f12; }
.ticketswap  { background: #dbeafe; color: #1e3a8a; }
.bandsintown { background: #fce7f3; color: #831843; }

.card-footer {
  padding: 0.75rem 1.25rem;
  border-top: 1px solid var(--color-border);
}

.save-btn.saved {
  background: #eff6ff;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
