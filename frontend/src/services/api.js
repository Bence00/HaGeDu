import axios from 'axios'
import { authStore } from '../stores/auth'

// Single axios instance used by all services
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

// Attach JWT to every outgoing request
api.interceptors.request.use(config => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// If backend returns 401, clear stale auth data
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      authStore.clearAuth()
    }
    return Promise.reject(err)
  }
)

export default api
