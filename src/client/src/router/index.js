import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginRegister from '@/views/LoginRegister.vue'
import ScheduleConsultationView from '@/views/ScheduleConsultationView.vue'
import UserDashboard from '@/views/UserDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'default' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/login-register', 
      name: 'login-register',
      component: LoginRegister,
      meta: { layout: 'blank' }
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: UserDashboard,
      meta: { layout: 'blank', requiresAuth: true }
    },
    {
      path: '/schedule-consultation',
      name: 'schedule-consultation',
      component: ScheduleConsultationView,
      meta: { layout: 'blank' }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.initializeAuth()

  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = authStore.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next('/login-register')
  } else if (to.path === '/login-register' && isAuthenticated) {
    next('/user-dashboard')
  } else {
    next()
  }
})

export default router
