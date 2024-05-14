import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import periodoAcademico from '../views/periodoAcademico.vue'
import docente from '../views/docente.vue'
import ambiente from '../views/ambiente.vue'
import horario from '../views/horario.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
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
    },
    {
      path: '/docente',
      name: 'docente',
      component: docente
      /*meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }*/
    },
    {
      path: '/ambiente',
      name: 'ambiente',
      component: ambiente
      /*meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }*/
    },
    {
      path: '/horario',
      name: 'horario',
      component: horario
      /*meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }*/
    }
  ]
})

export default router
