import { createRouter, createWebHistory } from 'vue-router'
import tintsView from '../views/tintsView.vue'
import shadesView from '../views/shadesView.vue'
import tonesView from '../views/tonesView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tints',
      name: 'tints',
      component: tintsView
    },
    {
      path: '/shades',
      name: 'shades',
      component: shadesView
    },
    {
      path: '/tones',
      name: 'tones',
      component: tonesView
    }
  ]
})

export default router
