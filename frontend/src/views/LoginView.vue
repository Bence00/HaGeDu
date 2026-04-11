<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Bejelentkezés</h1>
      <p class="auth-sub">Üdv vissza! Jelentkezz be a fiókodba.</p>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleLogin" class="auth-form" novalidate>
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
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
        </button>
      </form>

      <p class="auth-footer">
        Még nincs fiókod?
        <RouterLink to="/register">Regisztrálj</RouterLink>
      </p>
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

async function handleLogin() {
  error.value   = null
  loading.value = true

  try {
    await login(form.email, form.password)
    // Redirect to the page the user was trying to access, or home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = err.response?.data?.error || 'Bejelentkezési hiba. Kérjük próbáld újra.'
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
