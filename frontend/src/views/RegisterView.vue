<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Regisztráció</h1>
      <p class="auth-sub">Hozz létre fiókot az összes funkció eléréséhez.</p>

      <div v-if="error"   class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <form @submit.prevent="handleRegister" class="auth-form" novalidate>
        <div class="form-group">
          <label for="username">Felhasználónév</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="pl. kovacs_janos"
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
            placeholder="pelda@email.hu"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Jelszó</label>
          <div class="input-wrap">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Minimum 6 karakter"
              autocomplete="new-password"
              required
            />
            <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
              {{ showPassword ? 'Elrejt' : 'Mutat' }}
            </button>
          </div>
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
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'

const router = useRouter()

const form         = reactive({ username: '', email: '', password: '' })
const loading      = ref(false)
const error        = ref(null)
const success      = ref(null)
const showPassword = ref(false)

async function handleRegister() {
  error.value   = null
  success.value = null
  loading.value = true

  try {
    await register(form.username.trim(), form.email.trim(), form.password)
    success.value = 'Sikeres regisztráció! Átirányítás a bejelentkezéshez...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value = err.response?.data?.error || 'Regisztrációs hiba. Kérjük próbáld újra.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
}

.auth-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 2.25rem 2rem;
  width: 100%;
  max-width: 420px;
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.auth-sub {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-wrap {
  position: relative;
  display: flex;
}

.input-wrap input {
  flex: 1;
  padding-right: 5rem;
}

.toggle-pw {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.field-hint {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.btn-full {
  width: 100%;
  margin-top: 0.5rem;
}

.auth-footer {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
