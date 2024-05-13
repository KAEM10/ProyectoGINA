import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import periodoAcademico from '../views/periodoAcademico.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/periodoAcademico',
      name: 'periodoAcademico',
      component: periodoAcademico
      /*meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }*/
    }
  ]
})

export default router
