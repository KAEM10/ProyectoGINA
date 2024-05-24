<script>

import HeaderComponent from '../views/header.vue';
import componenteConsultaAmb from '../views/componenteConsultaAmb.vue';
import controller from '../Controllers/controllerAmbiente';

export default {
    mixins: [controller],
    components: {
        HeaderComponent,
        componenteConsultaAmb
    }
};

</script>

<template>
    <div>
        <!-- Header -->
        <HeaderComponent @cambiarEstado="cambiarEstadoAmbiente" />
    </div>

    <!-- Crear ambientes -->
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
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="tipo">
                                    <option v-for="tip in tipos" :key="tip.id" :value="tip.nombre">{{ tip.nombre }}
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

    <!-- Editar ambientes -->
    <div v-show="showGestionarAmbiente">
        <h3>Ambientes</h3>
        <div class="card">
            <div class="card-header">
                Gestionar Ambiente
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
                        <tbody v-show="!tablaVacia">
                            <tr v-for="ambiente in ambientes" :key="ambiente.codigo">
                                <template v-if="editId == ambiente.codigo">
                                    <td>{{ ambiente.codigo }}</td>
                                    <td><input type="text" v-model="ambiente.nombre" class="form-control"></td>
                                    <td><select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="ambiente.tipo">
                                    <option v-for="tip in tipos" :key="tip.id" :value="tip.nombre">{{ tip.nombre }}</option>
                                </select></td>
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
                                        <a href="#" class="icon">
                                            <i v-on:click="eliminarAmbiente(ambiente.codigo)">Eliminar</i>
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

i {
    margin: 5px;
}
</style>