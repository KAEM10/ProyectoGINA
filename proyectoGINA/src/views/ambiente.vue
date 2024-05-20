<script>

import HeaderComponent from '../views/header.vue';
import componenteConsultaAmb from '../views/componenteConsultaAmb.vue';

export default {
    components: {
        HeaderComponent,
        componenteConsultaAmb
    },
    data() {
        return {
            ambientes: [],
            codigo: '',
            nombre: '',
            capacidad: '',
            estudiantes: '',
            ubicacion: '',
            fechas: [],
            tipoo: '',
            tipo: [{ id: 1, nombre: 'virtual' }, { id: 2, nombre: 'presencial' }],
            editId: '',
            nombrePeriodo: '',
            fechaInicio: '',
            fechaFin: '',
            tablaVacia: false,
            showCrearAmbiente: false,
            showEditarAmbiente: false,
            showEliminarAmbiente: false,
            showConsultarAmbiente: false,

        };
    },
    methods: {
        crearAmbiente() {
            this.showCrearAmbiente = true;
            this.showEditarAmbiente = false;
            this.showEliminarAmbiente = false;
            this.showConsultarAmbiente = false;
        },
        editarAmbiente() {
            this.showCrearAmbiente = false;
            this.showEditarAmbiente = true;
            this.showEliminarAmbiente = false;
            this.showConsultarAmbiente = false;
        },
        eliminarAmbiente() {
            this.showCrearAmbiente = false;
            this.showEditarAmbiente = false;
            this.showEliminarAmbiente = true;
            this.showConsultarAmbiente = false;
        },
        consultarAmbiente() {
            this.showCrearAmbiente = false;
            this.showEditarAmbiente = false;
            this.showEliminarAmbiente = false;
            this.showConsultarAmbiente = true;
        },
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        onEditOrCancel(ambiente) {
            this.editId = ambiente ? ambiente.codigo : '';
        },
        limpiaCampos() {
            this.codigo = '';
            this.nombreAmbiente = '';
            this.capacidad = '';
            this.estudiantes = '';
            this.ubicacion = '';
            this.tipo = [];
        },
        async cargarAmbiente(parametro) {
            try {
                if (parametro == "") {
                    console.warn("parametro vacio")
                    this.tablaVacia = true;
                } else {
                    const response = await fetch(`http://localhost:3000/cargarAmbiente/${parametro}`);
                    const data = await response.json();

                    if (data.length > 0) {
                        this.ambientes = data;
                        this.tablaVacia = false;

                    } else {
                        this.tablaVacia = true;
                        console.warn(`No se encontró ningún docente con:  ${parametro}`);
                    }
                }

            } catch (error) {
                console.error('Error al cargar Docentes:', error);
            }
        },

        agregarAmbiente() {
            const nuevoAmbiente = {
                codigo: this.codigo,
                nombre: this.nombre,
                tipo: this.tipoo,
                capacidad_estudiantes: this.capacidad,
                ubicacion: this.ubicacion,
            };
            fetch('http://localhost:3000/crearAmbiente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoAmbiente)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.ambientes.push(data);

                    // Limpia los campos de entrada
                    this.codigo = '';
                    this.nombre = '';
                    this.capacidad = '';
                    this.tipo = '';
                    this.ubicacion = '';
                })
                .catch(error => {
                    console.error('Error al agregar ambiente academico:', error);
                });
        },
        actualizarAmbiente(ambiente) {
            fetch(`http://localhost:3000/actualizarAmbiente/${ambiente.codigo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ambiente)
            })
                .then(response => response.json())
                .then(() => {
                    this.onEditOrCancel();
                    this.cargarAmbiente(ambiente.nombre);
                })
                .catch(error => {
                    console.error('Error al actualizar periodo academico:', error);
                });
        },
        eliminarAmbiente(id) {
            fetch(`http://localhost:3000/borrarAmbiente/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const index = this.ambientes.findIndex(ambiente => ambiente.codigo === id);
                    if (index !== -1) {
                        this.ambientes.splice(index, 1);
                    }
                    alert("Periodo eliminado con exito");
                })
                .catch(error => {
                    console.error('Error al eliminar periodo:', error);
                });
        },
        validarEliminar(id) {
            if (confirm("¿Está seguro que desea eliminar el periodo académico?")) {
                this.eliminarAmbiente(id);
            }
        }
    }
};

</script>

<template>
    <div>
        <!-- Header -->
        <HeaderComponent @crearAmbiente="crearAmbiente" @editarAmbiente="editarAmbiente"
            @eliminarAmbiente="eliminarAmbiente" @consultarAmbiente="consultarAmbiente" />
    </div>

    <!-- Crear Periodos -->
    <div class="crearAmbiente" v-show="showCrearAmbiente">
        <h3>Ambientes</h3>
        <div class="card">
            <div class="card-header">
                Agregar Nuevo Ambiente Academico
            </div>
            <div class="card-body">
                <form class="form-inline" v-on:submit.prevent="agregarAmbiente">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Codigo</label>
                                <input v-model="codigo" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2"
                                    required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Nombre</label>
                                <input v-model="nombre" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2"
                                    required>
                            </div>
                        </li>

                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Tipo</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="tipoo">
                                    <option v-for="tip in tipo" :key="tip.id" :value="tip.nombre">{{ tip.nombre }}
                                    </option>
                                </select>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Capacidad estudiantes</label>
                                <input v-model="capacidad" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2"
                                    required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Ubicacion</label>
                                <input v-model="ubicacion" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2"
                                    required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="m-auto">
                                <button type="submit" class="btn btn-primary ml-sm-2 mr-sm-4 my-5">Agregar
                                    Ambiente</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>

    <!-- Editar Periodos -->
    <div class="editarPeriodos" v-show="showEditarAmbiente">
        <h3>Ambientes</h3>
        <div class="card">
            <div class="card-header">
                Editar Ambiente
            </div>
            <componenteConsultaAmb @cargarAmbiente="cargarAmbiente" />
        </div>

        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    ID
                                </th>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Tipo
                                </th>
                                <th>
                                    Capacidad
                                </th>
                                <th>
                                    Ubicacion
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="tablaVacia">
                            <tr v-for="ambiente in ambientes" :key="ambiente.codigo">
                                <template v-if="editId == ambiente.codigo">
                                    <td>{{ ambiente.codigo }}</td>
                                    <td><input type="text" v-model="ambiente.nombre" class="form-control"></td>
                                    <td><input type="text" v-model="ambiente.tipo" class="form-control" required></td>
                                    <td><input type="text" v-model="ambiente.capacidad_estudiantes"
                                            class="form-control"></td>
                                    <td><input type="text" v-model="ambiente.ubicacion" class="form-control" required>
                                    </td>


                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="actualizarAmbiente(ambiente)" class="bi bi-check"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel" class="bi bi-x-circle"></i>
                                        </a>
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ ambiente.codigo }}</td>
                                    <td>{{ ambiente.nombre }}</td>
                                    <td>{{ ambiente.tipo }}</td>
                                    <td>{{ ambiente.capacidad_estudiantes }}</td>
                                    <td>{{ ambiente.ubicacion }}</td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel(ambiente)">Editar</i>
                                        </a>
                                    </td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Eliminar Periodos -->
    <div class="eliminarAmbiente" v-show="eliminarAmbiente">
        <h3>Ambientes</h3>
        <div class="card">
            <div class="card-header">
                Eliminar Ambiente Academico
            </div>
            <componenteConsultaAmb @cargarAmbiente="cargarAmbiente" />
        </div>

        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    ID
                                </th>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Tipo
                                </th>
                                <th>
                                    Capacidad
                                </th>
                                <th>
                                    Ubicacion
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="tablaVacia">

                            <tr v-for="ambiente in ambientes" :key="ambiente.codigo">
                                <td>{{ ambiente.codigo }}</td>
                                <td>{{ ambiente.nombre }}</td>
                                <td>{{ ambiente.tipo }}</td>
                                <td>{{ ambiente.capacidad_estudiantes }}</td>
                                <td>{{ ambiente.ubicacion }}</td>

                                <a href="#" class="icon">
                                    <i v-on:click="eliminarAmbiente(ambiente.codigo)">Eliminar</i>
                                </a>


                                <div>

                                </div>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Consultar Periodos -->
    <div class="consultarAmbiente" v-show="showConsultarAmbiente">
        <h3>Ambientes</h3>
        <div class="card">
            <div class="card-header">
                Consultar Ambiente Academico
            </div>
            <componenteConsultaAmb @cargarAmbiente="cargarAmbiente" />
        </div>

        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    ID
                                </th>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Tipo
                                </th>
                                <th>
                                    Capacidad
                                </th>
                                <th>
                                    Ubicacion
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="tablaVacia">

                            <tr v-for="ambiente in ambientes" :key="ambiente.codigo">
                                <td>{{ ambiente.codigo }}</td>
                                <td>{{ ambiente.nombre }}</td>
                                <td>{{ ambiente.tipo }}</td>
                                <td>{{ ambiente.capacidad_estudiantes }}</td>
                                <td>{{ ambiente.ubicacion }}</td>

                                <div>

                                </div>
                            </tr>
                        </tbody>

                    </table>
                </div>
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

.desplegable a {
    border: 1px solid #ccc;
}
</style>