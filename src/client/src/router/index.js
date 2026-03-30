import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginRegister from '@/views/LoginRegister.vue'
import ScheduleConsultationView from '@/views/ScheduleConsultationView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import UserLevelRegister from '@/views/UserLevelRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      path: '/user-level-register',
      name: 'user-level-register',
      component: UserLevelRegister,
      meta: { layout: 'blank', requiresAuth: true, requiresGM: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.initializeAuth()

  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = authStore.isAuthenticated

  const requiresGM = to.meta.requiresGM

  if (requiresAuth && !isAuthenticated) {
    next('/login-register')
  } else if (requiresGM && authStore.user?.accessLevel !== 'GM') {
    next('/user-dashboard')
  } else if (to.path === '/login-register' && isAuthenticated) {
    next('/user-dashboard')
  } else {
    next()
  }
})

export default router
