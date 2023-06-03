import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tbs-overview',
      name: 'tbs-overview',
      component: () => import('../views/tbs-research/TbsOverview.vue')
    }
  ]
})

export default router
