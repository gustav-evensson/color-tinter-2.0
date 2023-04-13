import { createRouter, createWebHistory } from 'vue-router'
import tintsView from '../views/tintsView.vue'
import shadesView from '../views/shadesView.vue'
import tonesView from '../views/tonesView.vue'
import contrastView from '../views/contrastView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
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
    },
    {
      path: '/contrast',
      name: 'contrast',
      component: contrastView
    }
  ]
})

export default router
