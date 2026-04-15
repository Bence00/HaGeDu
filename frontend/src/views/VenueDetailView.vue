<template>
  <div class="venue-detail">
    <div class="container detail-wrap">
      <RouterLink to="/" class="back-link">← Vissza a helyszínekhez</RouterLink>

      <div v-if="loading" class="state-box">
        <div class="spinner"></div>
        <p>Részletek betöltése...</p>
      </div>

      <div v-else-if="error" class="empty-card">
        <p class="empty-title">{{ error }}</p>
        <RouterLink to="/" class="btn btn-primary">Helyszínek böngészése</RouterLink>
      </div>

      <div v-else-if="venue" class="detail-grid">
        <main class="detail-main">
          <h1>{{ venue.name }}</h1>
          <span class="title-rule" aria-hidden="true"></span>

          <div class="detail-image venue-visual" :class="meta.imageClass">
            <img v-if="meta.image" :src="meta.image" :alt="venue.name" />
          </div>

          <p class="lead">{{ meta.detail }}</p>
          <p>
            A helyszín aktuális programjaihoz a kapcsolódó jegy- és eseményoldalakon találsz friss
            időpontokat, árakat és elérhető belépőket. Ha több platform is elérhető, érdemes
            mindegyiket megnézni.
          </p>
          <p>
            A jegykészlet, a továbbértékesített jegyek kínálata és a programlista eltérhet, ezért
            a végleges információt mindig a megnyitott oldalon ellenőrizd.
          </p>

          <div class="info-grid">
            <article class="info-panel">
              <h2>Mit érdemes tudni?</h2>
              <ul>
                <li>Kapcsolódó jegyoldalak: {{ platformSummaryText }}.</li>
                <li>{{ meta.category }} kategóriájú budapesti programhelyszín.</li>
                <li>Mentés után a profiloldalon gyorsan visszakereshető.</li>
              </ul>
            </article>

            <article class="info-panel">
              <h2>Gyors adatok</h2>
              <dl class="facts">
                <div>
                  <dt>Kapacitás</dt>
                  <dd>{{ meta.capacity }}</dd>
                </div>
                <div>
                  <dt>Cím</dt>
                  <dd>{{ meta.address }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </main>

        <aside class="detail-side">
          <section class="side-card">
            <h2>Jegy és esemény oldalak</h2>
            <div v-if="links.length" class="platform-list">
              <a
                v-for="link in links"
                :key="link.label"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="platform-link"
              >
                {{ link.label }}
              </a>
            </div>
            <p v-else class="muted">Ehhez a helyszínhez jelenleg nincs elérhető jegyoldal.</p>
          </section>

          <section class="map-card">
            <div class="map-art">
              <span class="map-pin" aria-hidden="true"></span>
            </div>
            <div class="map-caption">
              <strong>Helyszín</strong>
              <span>{{ meta.address }}</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../services/api'
import { platformLinks, platformSummary, venueMeta } from '../utils/venuePresentation'

const props = defineProps({
  id: { type: String, required: true },
})

const venue = ref(null)
const loading = ref(false)
const error = ref(null)

const meta = computed(() => venueMeta(venue.value))
const links = computed(() => platformLinks(venue.value))
const platformSummaryText = computed(() => platformSummary(venue.value))

async function fetchVenue() {
  loading.value = true
  error.value = null

  try {
    const { data } = await api.get(`/venues/${props.id}`)
    venue.value = data
  } catch (err) {
    error.value =
      err.response?.status === 404
        ? 'A keresett helyszín nem található.'
        : 'Hiba történt a részletek betöltésekor.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchVenue)
</script>

<style scoped>
.venue-detail {
  min-height: 100%;
  background: var(--surface);
}

.detail-wrap {
  padding-top: 42px;
  padding-bottom: 72px;
}

.back-link {
  display: inline-flex;
  margin-bottom: 36px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 900;
}

.back-link:hover {
  color: var(--text);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  align-items: start;
  gap: 56px;
}

.detail-main h1 {
  max-width: 760px;
  color: var(--text);
  font-size: 52px;
  font-weight: 900;
  line-height: 1.04;
}

.title-rule {
  display: block;
  width: 68px;
  height: 3px;
  margin: 20px 0 36px;
  background: var(--text);
}

.detail-image {
  width: 100%;
  height: 330px;
  border-radius: var(--radius);
  margin-bottom: 34px;
}

.detail-image img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.08);
}

.detail-image::after {
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.22));
}

.lead {
  max-width: 740px;
  color: var(--text);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.8;
}

.detail-main p:not(.lead) {
  max-width: 740px;
  margin-top: 22px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.85;
}

.detail-side {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 82px;
}

.side-card,
.map-card,
.info-panel {
  border-radius: var(--radius);
  background: var(--surface-2);
}

.side-card {
  padding: 30px;
}

.side-card h2,
.info-panel h2 {
  margin-bottom: 22px;
  color: var(--text);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.platform-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.platform-link {
  display: flex;
  align-items: center;
  min-height: 42px;
  color: var(--text);
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;
}

.platform-link:hover {
  text-decoration: underline;
}

.map-card {
  overflow: hidden;
}

.map-art {
  height: 190px;
  background:
    linear-gradient(30deg, transparent 0 35%, rgba(255, 255, 255, 0.5) 35% 42%, transparent 42%),
    linear-gradient(118deg, transparent 0 46%, rgba(0, 0, 0, 0.18) 46% 48%, transparent 48%),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.48) 0 2px, transparent 2px 22px),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.48) 0 2px, transparent 2px 26px),
    #b9b9b9;
  position: relative;
}

.map-pin {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #111111;
  transform: translate(-50%, -50%);
}

.map-pin::after {
  content: "";
  position: absolute;
  left: 18px;
  top: 15px;
  width: 10px;
  height: 10px;
  border: 2px solid #ffffff;
  border-radius: 50%;
}

.map-caption {
  padding: 18px 22px 22px;
}

.map-caption strong {
  display: block;
  color: var(--text);
  font-size: 12px;
  font-weight: 900;
}

.map-caption span {
  display: block;
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  max-width: 740px;
  margin-top: 56px;
}

.info-panel {
  padding: 28px;
}

.info-panel h2 {
  margin-bottom: 16px;
  text-transform: none;
  font-size: 19px;
}

.info-panel ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 18px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.6;
}

.facts {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.facts dt {
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
}

.facts dd {
  margin-top: 4px;
  color: var(--text);
  font-size: 14px;
  font-weight: 900;
}

@media (max-width: 900px) {
  .detail-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }

  .detail-side {
    padding-top: 0;
  }
}

@media (max-width: 640px) {
  .detail-wrap {
    padding-top: 28px;
  }

  .detail-main h1 {
    font-size: 38px;
  }

  .detail-image {
    height: 230px;
  }

  .lead {
    font-size: 16px;
  }
}
</style>
