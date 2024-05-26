import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import periodoAcademico from '../views/periodoAcademico.vue'
import docente from '../views/docente.vue'
import ambiente from '../views/ambiente.vue'
import horario from '../views/horario.vue'
import agregarHorario from '../views/agregarHorario.vue'
import horarioDocente from '../views/horarioDocente.vue'

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
      component: periodoAcademico,
      meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }
    },
    {
      path: '/docente',
      name: 'docente',
      component: docente,
      meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }
    },
    {
      path: '/agregarHorario',
      name: 'agregarHorario',
      component: agregarHorario,

    },
    {
      path: '/ambiente',
      name: 'ambiente',
      component: ambiente,
      meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }
    },
    {
      path: '/horario',
      name: 'horario',
      component: horario,
      meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }
    },
    {
      path: '/horarioDocente',
      name: 'horarioDocente',
      component: horarioDocente,
      meta: {
        requiresAuth: true // Esta ruta requiere autenticación
      }
    }
  ]
})

// Función para verificar si el usuario ha iniciado sesión
const isLoggedIn = () => {
  // Aquí puedes verificar si el token de sesión existe en el almacenamiento local
  // Devuelve true si el token está definido, de lo contrario, devuelve false
  if (localStorage.getItem('token') != null && localStorage.getItem('token') != "undefined") {

    return true;
  } return false;
};


router.beforeEach((to, from, next) => {
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // Redirige a la página de inicio de sesión
    next('/');
  } else {
    // Continúa con la navegación
    next();
  }
});

export default router
