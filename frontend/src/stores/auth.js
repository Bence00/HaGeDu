import { reactive } from 'vue'

// Load previously saved auth from localStorage (survives page refresh)
function loadStored() {
  try {
    const raw = localStorage.getItem('auth')
    return raw ? JSON.parse(raw) : { token: null, user: null }
  } catch {
    return { token: null, user: null }
  }
}

const stored = loadStored()

// Central auth state — shared across all components via import
export const authStore = reactive({
  token: stored.token,
  user:  stored.user,

  get isLoggedIn() {
    return !!this.token
  },

  get isAdmin() {
    return this.user?.role === 'admin'
  },

  setAuth(token, user) {
    this.token = token
    this.user  = user
    localStorage.setItem('auth', JSON.stringify({ token, user }))
  },

  clearAuth() {
    this.token = null
    this.user  = null
    localStorage.removeItem('auth')
  },
})
