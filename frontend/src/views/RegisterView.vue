<template>
  <div class="auth-page">
    <section class="auth-card">
      <div class="auth-mark" aria-hidden="true">A</div>
      <h1>Regisztráció</h1>
      <p class="auth-sub">Hozz létre fiókot a mentett helyszínekhez.</p>

      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <form class="auth-form" @submit.prevent="handleRegister" novalidate>
        <div class="form-group">
          <label for="username">Felhasználónév</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="kovacs_istvan"
            autocomplete="username"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email cím</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="pelda@hagedu.hu"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="password">Jelszó</label>
            <button type="button" class="text-button" @click="showPassword = !showPassword">
              {{ showPassword ? 'Elrejtés' : 'Megjelenítés' }}
            </button>
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Minimum 6 karakter"
            autocomplete="new-password"
            required
          />
          <span class="field-hint">Legalább 6 karakter.</span>
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Regisztráció...' : 'Regisztrálok' }}
        </button>
      </form>

      <p class="auth-footer">
        Már van fiókod?
        <RouterLink to="/login">Jelentkezz be</RouterLink>
      </p>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'

const router = useRouter()

const form = reactive({ username: '', email: '', password: '' })
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const showPassword = ref(false)

async function handleRegister() {
  error.value = null
  success.value = null
  loading.value = true

  try {
    await register(form.username.trim(), form.email.trim(), form.password)
    success.value = 'Sikeres regisztráció. Átirányítás a bejelentkezéshez...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value = err.response?.data?.error || 'Regisztrációs hiba. Próbáld újra.'
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
  max-width: 410px;
  padding: 40px 44px;
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
  width: 2px;
  height: 28px;
  background: var(--text);
}

.auth-mark::before {
  transform: rotate(28deg);
}

.auth-mark::after {
  transform: rotate(-28deg);
}

.auth-card h1 {
  color: var(--text);
  font-size: 22px;
  font-weight: 900;
}

.auth-sub {
  margin: 5px 0 26px;
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

.field-hint {
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 700;
}

.btn-full {
  width: 100%;
  margin-top: 2px;
}

.auth-footer {
  margin-top: 24px;
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
