<template>
  <article
    class="venue-card"
    role="link"
    tabindex="0"
    @click="openDetails"
    @keydown.enter.prevent="openDetails"
    @keydown.space.prevent="openDetails"
  >
    <div class="venue-image venue-visual" :class="meta.imageClass">
      <img v-if="meta.image" class="venue-photo" :src="meta.image" alt="" loading="lazy" />
      <button
        v-if="showSave"
        type="button"
        class="save-bookmark"
        :class="{ saved: isSaved }"
        :aria-label="isSaved ? 'Mentés eltávolítása' : 'Helyszín mentése'"
        @click.stop="emit('toggle-save', venue)"
      >
        <span></span>
      </button>
      <span v-else class="save-bookmark static" aria-hidden="true"><span></span></span>
    </div>

    <div class="venue-body">
      <div class="ticket-links">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="chip"
          @click.stop
        >
          {{ link.label }}
        </a>
        <span v-if="links.length === 0" class="chip muted-chip">Nincs link</span>
      </div>

      <div class="title-row">
        <h3 class="venue-name">{{ venue.name }}</h3>
        <span class="category">{{ meta.category }}</span>
      </div>

      <p class="venue-location">{{ meta.area }}</p>
      <p class="venue-copy">{{ meta.excerpt }}</p>

      <div class="details-row">
        <span class="details-link">Részletes leírás</span>
        <span class="card-dots" aria-hidden="true">
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { platformLinks, venueMeta } from '../utils/venuePresentation'

const props = defineProps({
  venue: { type: Object, required: true },
  isSaved: { type: Boolean, default: false },
  showSave: { type: Boolean, default: true },
})

const emit = defineEmits(['toggle-save'])
const router = useRouter()

const meta = computed(() => venueMeta(props.venue))
const links = computed(() => platformLinks(props.venue))

function openDetails() {
  router.push({ name: 'venue-detail', params: { id: props.venue.id } })
}
</script>

<style scoped>
.venue-card {
  overflow: hidden;
  min-height: 338px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.venue-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
}

.venue-card:focus-visible {
  outline: 3px solid rgba(0, 0, 0, 0.16);
  outline-offset: 3px;
}

.venue-image {
  height: 174px;
}

.venue-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.08);
}

.venue-image::after {
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.34));
}

.save-bookmark {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.58);
  cursor: pointer;
}

.save-bookmark span {
  width: 11px;
  height: 15px;
  border: 2px solid rgba(0, 0, 0, 0.62);
  border-bottom: 0;
  border-radius: 3px 3px 1px 1px;
  position: relative;
}

.save-bookmark span::after {
  content: "";
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: -5px;
  height: 8px;
  background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.62) 51%) left,
    linear-gradient(225deg, transparent 50%, rgba(0, 0, 0, 0.62) 51%) right;
  background-size: 50% 100%;
  background-repeat: no-repeat;
}

.save-bookmark.saved {
  background: #111111;
}

.save-bookmark.saved span {
  border-color: #ffffff;
}

.save-bookmark.saved span::after {
  background: linear-gradient(135deg, transparent 50%, #ffffff 51%) left,
    linear-gradient(225deg, transparent 50%, #ffffff 51%) right;
  background-size: 50% 100%;
  background-repeat: no-repeat;
}

.save-bookmark.static {
  pointer-events: none;
}

.venue-body {
  display: flex;
  min-height: 164px;
  flex-direction: column;
  padding: 14px 16px 16px;
}

.ticket-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 18px;
  margin-bottom: 9px;
}

.chip {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  padding: 0 7px;
  border-radius: 3px;
  background: var(--surface-2);
  color: var(--text);
  font-size: 10px;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
}

.chip:hover {
  background: #111111;
  color: #ffffff;
  text-decoration: none;
}

.muted-chip {
  color: var(--text-muted);
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.venue-name {
  color: var(--text);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.2;
}

.category {
  flex: 0 0 auto;
  padding: 4px 7px;
  border-radius: 3px;
  background: var(--surface-2);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 900;
}

.venue-location {
  margin-top: 5px;
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
}

.venue-copy {
  margin-top: 8px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.55;
}

.details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
}

.details-link {
  color: var(--text);
  font-size: 12px;
  font-weight: 900;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.card-dots {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.card-dots span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #d7d7d7;
}

.card-dots span:last-child {
  margin-left: -7px;
  background: #c9c9c9;
}

@media (max-width: 640px) {
  .venue-image {
    height: 190px;
  }
}
</style>
