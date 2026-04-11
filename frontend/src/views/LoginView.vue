<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-brand">
        <div class="brand-logo">H</div>
        <span class="brand-name">HaGeDu</span>
      </div>
      <h2 class="auth-tagline">Budapest legjobb eseményei egy helyen.</h2>
      <p class="auth-desc">Fedezd fel a várost, ments el helyszíneket, és oszd meg barátaiddal.</p>
      <div class="auth-features">
        <div class="feature">✓ Ingyenes regisztráció</div>
        <div class="feature">✓ Helyszín mentés</div>
        <div class="feature">✓ Napi frissítések</div>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-card">
        <h1 class="auth-title">Üdvözlünk</h1>
        <p class="auth-sub">Jelentkezz be a fiókodba a folytatáshoz.</p>

        <div v-if="error" class="alert alert-error">{{ error }}</div>

        <form @submit.prevent="handleLogin" class="auth-form" novalidate>
          <div class="form-group">
            <label for="email">Email cím</label>
            <input id="email" v-model="form.email" type="email" placeholder="pelda@email.hu" autocomplete="email" required />
          </div>

          <div class="form-group">
            <label for="password">Jelszó</label>
            <div class="input-wrap">
              <input
                id="password"
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button type="button" class="toggle-pw" @click="showPw = !showPw">
                {{ showPw ? 'Elrejt' : 'Mutat' }}
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
            {{ loading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
          </button>
        </form>

        <p class="auth-footer">
          Még nincs fiókod? <RouterLink to="/register">Regisztrálj ingyen</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../services/authService'

const router = useRouter()
const route  = useRoute()

const form    = reactive({ email: '', password: '' })
const loading = ref(false)
const error   = ref(null)
const showPw  = ref(false)

async function handleLogin() {
  error.value   = null
  loading.value = true
  try {
    await login(form.email.trim(), form.password)
    router.push(route.query.redirect || '/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Bejelentkezési hiba. Kérjük próbáld újra.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* Left panel */
.auth-left {
  background: linear-gradient(145deg, #4f46e5 0%, #7c3aed 100%);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  color: #fff;
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.brand-logo {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 1rem;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.auth-tagline {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.auth-desc {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.6;
  max-width: 340px;
}

.auth-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.feature {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Right panel */
.auth-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: var(--bg);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  box-shadow: var(--shadow);
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.3rem;
}

.auth-sub {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.75rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.input-wrap {
  position: relative;
  display: flex;
}
.input-wrap input { flex: 1; padding-right: 5rem; }

.toggle-pw {
  position: absolute;
  right: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.btn-full { width: 100%; margin-top: 0.4rem; padding: 0.8rem; font-size: 0.95rem; }

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
}

@media (max-width: 720px) {
  .auth-page { grid-template-columns: 1fr; }
  .auth-left  { display: none; }
}
</style>
