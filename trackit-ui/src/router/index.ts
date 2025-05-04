import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      // beforeEnter: async (to, from) => {
      //   const authStore = useAuthStore()

      //   if (!authStore.data) {
      //     try {
      //       await authStore.refresh()
      //     } catch {
      //       return
      //     }
      //   }

      //   if (authStore.data) {
      //     // redirect the user to the login page
      //     return { name: 'dashboard' }
      //   }
      // },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// router.beforeEach(async (to, from) => {
//   const authStore = useAuthStore()

//   if (!authStore.data) {

//     try {
//       await authStore.refresh()
//     } catch {
//       return
//     }
//   }

//   if (to.name !== 'Login' && !authStore.data) {
//     // redirect the user to the login page
//     return { name: 'login' }
//   }
// })

export default router
