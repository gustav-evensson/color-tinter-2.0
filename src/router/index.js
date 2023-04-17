import { createRouter, createWebHistory } from 'vue-router'
import tintsView from '../views/tintsView.vue'
import shadesView from '../views/shadesView.vue'
import tonesView from '../views/tonesView.vue'
import contrastView from '../views/contrastView.vue'
import complementaryView from '../views/complementaryView.vue'
import splitComplementaryView from '../views/splitComplementaryView.vue'
import analogousView from '../views/analogousView.vue'
import triadicView from '../views/triadicView.vue'
import tetradicView from '../views/tetradicView.vue'
import squareView from '../views/squareView.vue'
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
    },
    {
      path: '/complementary',
      name: 'complementary',
      component: complementaryView
    },
    {
      path: '/splitComplementary',
      name: 'splitComplementary',
      component: splitComplementaryView
    },
    {
      path: '/analogous',
      name: 'analogous',
      component: analogousView
    },
    {
      path: '/triadic',
      name: 'triadic',
      component: triadicView
    },
    {
      path: '/tetradic',
      name: 'tetradic',
      component: tetradicView
    },
    {
      path: '/square',
      name: 'square',
      component: squareView
    },
  ]
})

export default router
