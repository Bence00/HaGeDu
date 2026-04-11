import api from './api'
import { authStore } from '../stores/auth'

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  authStore.setAuth(data.token, data.user)
  return data.user
}

export async function register(username, email, password) {
  const { data } = await api.post('/auth/register', { username, email, password })
  return data
}

export function logout() {
  authStore.clearAuth()
}
