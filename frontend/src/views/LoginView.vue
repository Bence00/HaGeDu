<template>
  <div class="auth-page">
    <section class="auth-card">
      <div class="auth-mark" aria-hidden="true">A</div>
      <h1>HaGeDu</h1>
      <p class="auth-sub">Bejelentkezés</p>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form class="auth-form" @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label for="identifier">Email vagy felhasználónév</label>
          <input
            id="identifier"
            v-model="form.identifier"
            type="text"
            placeholder="pelda@hagedu.hu"
            autocomplete="username"
            required
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="password">Jelszó</label>
            <button type="button" class="text-button" @click="showPw = !showPw">
              {{ showPw ? 'Elrejtés' : 'Megjelenítés' }}
            </button>
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPw ? 'text' : 'password'"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
        </button>
      </form>

      <div class="divider"><span>Vagy folytatás ezzel</span></div>

      <div class="social-row">
        <button type="button">Google</button>
        <button type="button">Apple</button>
      </div>

      <p class="auth-footer">
        Még nincs fiókod?
        <RouterLink to="/register">Regisztráció</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../services/authService'

const router = useRouter()
const route = useRoute()

const form = reactive({ identifier: '', password: '' })
const loading = ref(false)
const error = ref(null)
const showPw = ref(false)

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await login(form.identifier.trim(), form.password)
    router.push(route.query.redirect || '/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Bejelentkezési hiba. Próbáld újra.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  min-height: 660px;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  background: var(--surface);
}

.auth-card {
  width: 100%;
  max-width: 390px;
  padding: 42px 44px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.auth-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-bottom: 16px;
  border-radius: 50%;
  color: var(--text);
  font-size: 18px;
  font-weight: 900;
  position: relative;
}

.auth-mark::before,
.auth-mark::after {
  content: "";
  position: absolute;
  background: var(--text);
}

.auth-mark::before {
  width: 2px;
  height: 28px;
  transform: rotate(28deg);
}

.auth-mark::after {
  width: 2px;
  height: 28px;
  transform: rotate(-28deg);
}

.auth-card h1 {
  color: var(--text);
  font-size: 14px;
  font-weight: 900;
}

.auth-sub {
  margin: 3px 0 28px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.text-button {
  border: 0;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.btn-full {
  width: 100%;
  margin-top: 2px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 28px 0 18px;
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.divider::before,
.divider::after {
  content: "";
  height: 1px;
  flex: 1;
  background: var(--border);
}

.social-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.social-row button {
  min-height: 40px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text);
  cursor: pointer;
  font-size: 12px;
  font-weight: 900;
}

.social-row button:hover {
  background: var(--surface-3);
}

.auth-footer {
  margin-top: 26px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
}

.auth-footer a {
  color: var(--text);
  font-weight: 900;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 34px 24px;
  }
}
</style>
