import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../stores/auth'

import HomeView        from '../views/HomeView.vue'
import LoginView       from '../views/LoginView.vue'
import RegisterView    from '../views/RegisterView.vue'
import ProfileView     from '../views/ProfileView.vue'
import EventDetailView from '../views/EventDetailView.vue'

const routes = [
  { path: '/',         component: HomeView,     name: 'home' },
  { path: '/login',    component: LoginView,    name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  {
    path: '/profile',
    component: ProfileView,
    name: 'profile',
    meta: { requiresAuth: true },
  },
  {
    path: '/events/:id',
    component: EventDetailView,
    name: 'event-detail',
  },
  // Catch-all: redirect unknown routes to home
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// Navigation guard — protect auth-required routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
