<script>

import HeaderComponent from '../views/header.vue';
import componenteConsultaPerAca from '../views/componenteConsultaPerAca.vue';

export default {
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
            tablaVacia: false,
            showCrearPeriodo: false,
            showEditarPeriodo: false,
            showEliminarPeriodo: false,
            showConsultarPeriodo: false,
        };
    },
    methods: {
        onEditOrCancel(periodo) {
            this.editId = periodo ? periodo.id_periodo : '';
        },
        limpiaCampos(){
            this.nombrePeriodo = '';
            this.fechaInicio = '';
            this.fechaFin = '';
            this.periodos = [];
        },
        actualizarFechaFin(fecha) {
            if (!fecha) return;

            const fechaInicio = new Date(fecha);
            this.fechas = [];

            // Función para obtener la fecha correcta sumando meses
            const sumarMeses = (fecha, meses) => {
                const nuevaFecha = new Date(fecha);
                nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);

                // Verificar si la fecha resultante es válida para el mes y año
                if (nuevaFecha.getDate() !== fecha.getDate()) {
                    // Ajustar al último día del mes anterior
                    nuevaFecha.setDate(0);
                }

                const dia = nuevaFecha.getDate().toString().padStart(2, '0');
                const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0');
                return `${nuevaFecha.getFullYear()}-${mes}-${dia}`;
            };
            
            // Fecha de fin en 3 meses
            this.fechas.push(sumarMeses(fechaInicio, 3));

            // Fecha de fin en 6 meses
            this.fechas.push(sumarMeses(fechaInicio, 6));

            // Seleccionar la primera fecha por defecto
            this.fechaFin = this.fechas[0];
        },
        cambiarEstadoPeriodo(accion) {
            this.limpiaCampos();
            this.showCrearPeriodo = (accion === 'crear');
            this.showEditarPeriodo = (accion === 'editar');
            this.showEliminarPeriodo = (accion === 'eliminar');
            this.showConsultarPeriodo = (accion === 'consultar');
        },
        formatearFecha(fechaString) {
            const fecha = new Date(fechaString);
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
            const anio = fecha.getFullYear();
            return `${dia}/${mes}/${anio}`;
        },
        async consultarPeriodos(nombrePeriodo) {
            try {
                if (nombrePeriodo=="") {
                    console.warn('El nombre del periodo académico es requerido');
                    this.tablaVacia= false;
                    return;
                }else{
                    const response = await fetch(`http://localhost:3000/periodoAcademico/${nombrePeriodo}`);
                    const data = await response.json();

                    if (data.length > 0) {
                        // Formatear fechas de inicio y fin
                        data[0].fecha_inicio = this.formatearFecha(data[0].fecha_inicio);
                        data[0].fecha_final = this.formatearFecha(data[0].fecha_final);

                        this.periodos = data;
                        this.tablaVacia=true;
                        //this.nombrePeriodo = '';
                    } else {
                        this.tablaVacia=false;
                        console.warn(`No se encontró ningún período académico con el nombre ${nombrePeriodo}`);
                    }
                }
                
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
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
        actualizarPeriodo(periodo) {
            fetch(`http://localhost:3000/periodoAcademico/${periodo.id_periodo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(periodo)
            })
                .then(response => response.json())
                .then(() => {
                    this.onEditOrCancel();
                    this.consultarPeriodos(periodo.nombre);
                })
                .catch(error => {
                    console.error('Error al actualizar periodo academico:', error);
                });
        },
        eliminarPeriodo(id) {
            fetch(`http://localhost:3000/periodoAcademico/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const index = this.periodos.findIndex(periodo => periodo.id_periodo === id);
                    if (index !== -1) {
                        this.periodos.splice(index, 1);
                    }
                    alert("Periodo eliminado con exito");
                })
                .catch(error => {
                    console.error('Error al eliminar periodo:', error);
                });
        },
        validarEliminar(id){
            if(confirm("¿Está seguro que desea eliminar el periodo académico?")){
                this.eliminarPeriodo(id);
            }
        }
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

    <!-- Editar Periodos -->
    <div class="editarPeriodos" v-show="showEditarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Editar Periodo Academico
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
                        <tbody v-show="tablaVacia">
                            <tr v-for="periodo in periodos" :key="periodo.id_periodo">
                                <template v-if = "editId == periodo.id_periodo"> 
                                    <td>{{ periodo.id_periodo }}</td>
                                    <td><input type="text" v-model="periodo.nombre" class="form-control" required></td>
                                    <td><input type="date" v-model="periodo.fecha_inicio" class="form-control" @change="actualizarFechaFin(periodo.fecha_inicio)" required></td>
                                    <td>
                                        <select class="form-control" v-model="periodo.fecha_final" required>
                                            <option v-for="fecha in fechas" :key="fecha">{{ fecha }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control" v-model="periodo.estado" required>
                                            <option v-for="estado in estados">{{ estado }}</option>
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
                                            <i v-on:click="onEditOrCancel(periodo)" >Editar</i>
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
    <div class="eliminarPeriodos" v-show="showEliminarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Eliminar Periodo Academico
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
                        <tbody v-show="tablaVacia">
                            <tr v-for="periodo in periodos" :key="periodo.id_periodo">
                                <td>{{ periodo.id_periodo }}</td>
                                <td>{{ periodo.nombre }}</td>
                                <td>{{ periodo.fecha_inicio}}</td>
                                <td>{{ periodo.fecha_final }}</td>
                                <td>{{ periodo.estado }}</td>
                                <td>
                                    <a href="#" class="icon">
                                        <i v-on:click="validarEliminar(periodo.id_periodo)" >Eliminar</i>
                                    </a>
                                </td>
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
    <div class="consultarPeriodos" v-show="showConsultarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Consultar Periodo Academico
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
                            </tr>
                        </thead>
                        <tbody v-show="tablaVacia">
                            <tr v-for="periodo in periodos">
                                <td>{{ periodo.id_periodo }}</td>
                                <td>{{ periodo.nombre }}</td>
                                <td>{{ periodo.fecha_inicio}}</td>
                                <td>{{ periodo.fecha_final }}</td>
                                <td>{{ periodo.estado }}</td>
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
</style>