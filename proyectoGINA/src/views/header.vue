<!-- components/HeaderComponent.vue -->
<template>
    <header class="header navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <i class="bi bi-shop"></i> Proyecto GINA
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li v-show="admin" class="nav-item dropdown" @click="showOptions">
                        <router-link to="/periodoAcademico" class="navbar-brand">
                            <i class="bi bi-card-text"></i> Periodo Academico
                        </router-link>
                        <div v-show="showPeriodoOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'crear')">Crear Periodo</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'gestionar')">Gestionar Periodo</a>
                        </div>
                    </li>
                    <li v-show="admin" class="nav-item dropdown" @click="showOptionsDoc">
                        <router-link to="/docente" class="navbar-brand">
                            <i class="bi bi-card-text"></i> Docentes
                        </router-link>
                        <div v-show="showDocenteOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'crear')">Crear Docente</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'gestionar')">Gestionar Docentes</a>
                        </div>
                    </li>
                    <li v-show="admin" class="nav-item dropdown" @click="showOptionsAmb">
                        <router-link to="/ambiente" class="navbar-brand">
                            <i class="bi bi-card-text"></i> Ambientes Academicos
                        </router-link>
                        <div v-show="showAmbienteOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'crear')">Crear Ambiente</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstado', 'gestionar')">Gestionar Ambiente</a>
                        </div>
                    </li>
                    <li v-show="admin" class="nav-item">
                        <router-link to="/horario" class="nav-link">
                            <i class="bi bi-calendar3"></i> Horarios
                        </router-link>
                    </li>
                    <li class="nav-item" @click="toggleUserMenu">
                        <a href="#" class="nav-link">
                            <i class="bi bi-person"></i>
                        </a>
                    </li>
                    <li v-show="showUserMenu" class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="bi bi-box-arrow-right"></i> Cerrar sesión
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import controllerDoc from '../Controllers/controllerDocente'
export default {
    name: 'header',
    components: {},
    mixins: [controllerDoc],
    emits: ['cambiarEstado'],
    
    data() {
        return {
            showPeriodoOptions: false,
            showDocenteOptions: false,
            showAmbienteOptions: false,
            showUserMenu: false,
            tokem:''
        };
    },
    mounted() {
        // Recuperar el token almacenado en localStorage
        this.token = localStorage.getItem('token');
        this.ObtenerDocenteById(this.token.id);
        
    },
    methods: {
        showOptions() {
            this.showPeriodoOptions = !this.showPeriodoOptions;
        },
        showOptionsDoc() {
            this.showDocenteOptions = !this.showDocenteOptions;
        },
        showOptionsAmb() {
            this.showAmbienteOptions = !this.showAmbienteOptions;
        },
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        }
    }
};
</script>

<style scoped>
.bi {
    font-size: 1.5rem;
    color: #007bff;
}
.navbar-nav {
    font-size: 1.2rem;
}
.desplegable a {
    border: 1px solid #ccc;
}
</style>
