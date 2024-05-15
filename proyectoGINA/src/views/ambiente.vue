<script>
export default {
    data() {
        return {
            editId: '',
            periodos: [],
            nombrePeriodo: '',
            fechaInicio: '',
            fechaFin: '',
            showUserMenu: false,
            showPeriodoOptions: false,
            showCrearPeriodo: false,
            showEditarPeriodo: false,
            showEliminarPeriodo: false,
            showConsultarPeriodo: false,
        };
    },
    methods: {
        showOptions(){
            this.showPeriodoOptions = !this.showPeriodoOptions;
        },
        crearPeriodo(){
            this.showCrearPeriodo = true;
            this.showEditarPeriodo = false;
            this.showEliminarPeriodo = false;
            this.showConsultarPeriodo = false;
        },
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        cargarProductos() {
            fetch('http://localhost:3000/productos')
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                })
                .catch(error => {
                    console.error('Error al cargar productos:', error);
                });
        },
        agregarPeriodos() {
            const nuevoPeriodo = {
                nombre: this.nombrePeriodo,
                fechaInicio: this.fechaInicio,
                fechafin: this.fechaFin,
                estado: 'activo'
            };
            fetch('http://localhost:3000/periodoAcademico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoPeriodo)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.periodos.push(data);

                    // Limpia los campos de entrada
                    this.nombrePeriodo = '';
                    this.fechaInicio = '';
                    this.fechaFin = '';
                })
                .catch(error => {
                    console.error('Error al agregar periodo academico:', error);
                });
        },
        actualizarProducto(producto) {
            fetch(`http://localhost:3000/productos/${producto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
                .then(response => response.json())
                .then(() => {
                    this.editId = '';
                    // Volver a cargar la lista de usuarios
                    this.cargarProductos();
                })
                .catch(error => {
                    console.error('Error al actualizar usuario:', error);
                });
        },
        eliminarProducto(id) {
            fetch(`http://localhost:3000/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const index = this.productos.findIndex(producto => producto.id === id);
                    if (index !== -1) {
                        this.productos.splice(index, 1);
                    }
                    alert("Producto eliminado con exito");
                    // Volver a cargar la lista de usuarios
                    this.cargarProductos();
                })
                .catch(error => {
                    console.error('Error al eliminar producto:', error);
                });
        },
    },
};

</script>

<template>
    <div>
        <!-- Header -->
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
                        <li class="nav-item dropdown" @click="showOptions" >
                            <div href="#" class="nav-link">
                                <i class="bi bi-card-text"></i> Periodo Academico
                            </div>
                            <li v-show="showPeriodoOptions" class="desplegable">
                                <a class="nav-link" href="#" @click="">Crear Periodo</a>
                                <a class="nav-link" href="#" @click="">Editar Periodo</a>
                                <a class="nav-link" href="#" @click="">Eliminar Periodo</a>
                                <a class="nav-link" href="#" @click="">Consultar Periodo</a>
                            </li>
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
    </div>
    <div class="crearPeriodos" v-show="showCrearPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Agregar Nuevo Periodo Academico
            </div>
            <div class="card-body">
                <form class="form-inline" v-on:submit.prevent="agregarPeriodos">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Nombre</label>
                                <input v-model="nombrePeriodo" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Fecha de Inicio</label>
                                <input v-model="fechaInicio" type="date" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                        </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Fecha de Fin</label>
                                <input v-model="fechaFin" type="date" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="m-auto">
                                <button type="submit" class="btn btn-primary ml-sm-2 mr-sm-4 my-5">Agregar Periodo</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bi {
    font-size: 1.5rem;
    color: #007bff;
}
.navbar-nav {
    font-size: 1.2rem;
}
.desplegable a{
    border: 1px solid #ccc;
}
</style>