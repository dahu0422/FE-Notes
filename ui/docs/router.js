import { createRouter, createWebHistory } from 'vue-router'
import InputText from './components/InpueText.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/input-text',
      name: 'input-text',
      component: InputText
    }
  ]
})

export default router
