import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginRegister from '@/views/LoginRegister.vue'
import ScheduleConsultationView from '@/views/ScheduleConsultationView.vue'

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
      path: '/schedule-consultation',
      name: 'schedule-consultation',
      component: ScheduleConsultationView,
      meta: { layout: 'blank' }
    },
  ],
})

export default router
