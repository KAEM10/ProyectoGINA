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
                        <a href="#" class="nav-link">
                            <i class="bi bi-card-text"></i> Periodo Academico
                        </a>
                        <div v-show="showPeriodoOptions" class="desplegable">
                            <a class="nav-link" href="#" @click="crearPeriodo()">Crear Periodo</a>
                            <a class="nav-link" href="#" @click="editarPeriodo()">Editar Periodo</a>
                            <a class="nav-link" href="#" @click="eliminarPeriodo()">Eliminar Periodo</a>
                            <a class="nav-link" href="#" @click="$emit('consultarPeriodo')">Consultar Periodo</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link to="/docente" class="nav-link">
                            <i class="bi bi-person"></i> Docentes
                        </router-link>
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
    data() {
        return {
            showPeriodoOptions: false,
            showUserMenu: false,

        };
    },
    methods: {
        showOptions() {
            this.showPeriodoOptions = !this.showPeriodoOptions;
        },
        crearPeriodo(){
            this.showCrearPeriodo = true;
            this.showEditarPeriodo = false;
            this.showEliminarPeriodo = false;
            this.showConsultarPeriodo = false;
        },
        editarPeriodo() {
            this.$emit('editarPeriodo');
        },
        eliminarPeriodo() {
            this.$emit('eliminarPeriodo');
        },
        consultarPeriodo() {
            this.$emit('consultarPeriodo');
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
