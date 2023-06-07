import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tbs-overview',
      name: 'tbs-overview',
      component: () => import('../views/tbs-research/TbsOverview.vue')
    },
    {
      path: '/coding-draft',
      name: 'coding-draft',
      component: () => import('../views/coding-lab/CodingDraft.vue')
    }
  ]
})

export default router
