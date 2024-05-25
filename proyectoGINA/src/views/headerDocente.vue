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
    emits: ['cambiarEstado'],
    data() {
        return {
            showUserMenu: false,
        };
    },
    methods: {
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
