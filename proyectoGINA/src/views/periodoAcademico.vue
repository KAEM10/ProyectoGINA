<script>

import HeaderComponent from '../views/header.vue';
import componenteConsultaPerAca from '../views/componenteConsultaPerAca.vue';
import controller from '../Controllers/controllerPeriodo';


export default {
    mixins: [controller],
    components: {
        HeaderComponent,
        componenteConsultaPerAca
    },
    data() {
        return {
            periodos: [],
            fechas: [],
            estados: ['activo', 'inactivo'],
            editId: '',
            nombrePeriodo: '',
            fechaInicio: '',
            fechaFin: '',
            tablaVacia: true,
            showCrearPeriodo: false,
            showGestionarPeriodo: false,
        };
    }
};

</script>

<template>
    <div>
        <!-- Header -->
        <HeaderComponent
            @cambiarEstado="cambiarEstadoPeriodo"
        />
    </div>

    <!-- Crear Periodos -->
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
                                <input v-model="fechaInicio" type="date" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" @change="actualizarFechaFin(fechaInicio)" required>
                        </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Fecha de Fin</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="fechaFin" requiered>
                                    <option v-for="fecha in fechas" :key="fecha">{{ fecha }}</option>
                                </select>
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

    <!-- Gestionar Periodos -->
    <div class="editarPeriodos" v-show="showGestionarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Gestionar Periodo Academico
            </div>
            <componenteConsultaPerAca 
            @consultarPeriodos="consultarPeriodos" 
            />
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
                                    Fecha de Inicio
                                </th>
                                <th>
                                    Fecha de Fin
                                </th>
                                <th>
                                    Estado
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="!tablaVacia">
                            <tr v-for="periodo in periodos" :key="periodo.id_periodo">
                                <template v-if = "editId == periodo.id_periodo">
                                    <td>{{ periodo.id_periodo }}</td>
                                    <td><input type="text" v-model="periodo.nombre" class="form-control" required></td>
                                    <td><input type="date" v-model="periodo.fecha_inicio" class="form-control" required></td>
                                    <td>
                                        <select class="form-control" v-model="periodo.fecha_final" required>
                                            <option v-for="fecha in fechas" :key="fecha">{{ fecha }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control" v-model="periodo.estado" required>
                                            <option v-for="estado in estados" :key="estado">{{ estado }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="actualizarPeriodo(periodo)" class="bi bi-check"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel" class="bi bi-x-circle"></i>
                                        </a>
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ periodo.id_periodo }}</td>
                                    <td>{{ periodo.nombre }}</td>
                                    <td>{{ periodo.fecha_inicio}}</td>
                                    <td>{{ periodo.fecha_final }}</td>
                                    <td>{{ periodo.estado }}</td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel(periodo)">Editar</i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="validarEliminar(periodo.id_periodo)">Eliminar</i>
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
.desplegable a{
    border: 1px solid #ccc;
}
i {
    margin: 5px;
}
</style>