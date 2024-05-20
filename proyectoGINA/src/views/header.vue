<!-- components/HeaderComponent.vue -->
<template>
    <header class="header navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/home" class="navbar-brand">
                <i class="bi bi-shop"></i> Proyecto GINA
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown" @click="showOptions">
                        <router-link to="/periodoAcademico" class="navbar-brand">
                            <i class="bi bi-card-text"></i> Periodo Academico
                        </router-link>
                        <div v-show="showPeriodoOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="$emit('cambiarEstadoPeriodo', 'crear')">Crear Periodo</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstadoPeriodo', 'editar')">Editar Periodo</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstadoPeriodo', 'eliminar')">Eliminar Periodo</a>
                            <a class="nav-link" href="#" @click="$emit('cambiarEstadoPeriodo', 'consultar')">Consultar Periodo</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown" @click="showOptionsDoc">
                        <router-link to="/docente" class="navbar-brand">
                            <i class="bi bi-card-text"></i> Docentes
                        </router-link>
                        <div v-show="showDocenteOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="$emit('crearDocente')">Crear Docente</a>
                            <a class="nav-link" href="#" @click="$emit('editarDocente')">Editar Docente</a>
                            <a class="nav-link" href="#" @click="$emit('eliminarDocente')">Eliminar Docente</a>
                            <a class="nav-link" href="#" @click="$emit('consultarDocente')">Consultar Docente</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link to="/ambiente" class="nav-link">
                            <i class="bi bi-building"></i> Ambientes Academicos
                        </router-link>
                    </li>
                    <li class="nav-item">
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
export default {
    name: 'header',
    components: {},
    emits: ['cambiarEstadoPeriodo',
        'crearDocente','editarDocente','eliminarDocente','consultarDocente'
    ],
    
    data() {
        return {
            showPeriodoOptions: false,
            showDocenteOptions: false,
            showUserMenu: false,
        };
    },
    methods: {
        showOptions() {
            this.showPeriodoOptions = !this.showPeriodoOptions;
        },
        showOptionsDoc() {
            this.showDocenteOptions = !this.showDocenteOptions;
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
