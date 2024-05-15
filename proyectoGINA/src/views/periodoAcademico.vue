<script>

import HeaderComponent from '../views/header.vue';

export default {
    components: {
        HeaderComponent
    },
    data() {
        return {
            periodos: [],
            fechas: [],
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
        editarPeriodo(){
            this.showCrearPeriodo = false;
            this.showEditarPeriodo = true;
            this.showEliminarPeriodo = false;
            this.showConsultarPeriodo = false;
        },
        eliminarPeriodo(){
            this.showCrearPeriodo = false;
            this.showEditarPeriodo = false;
            this.showEliminarPeriodo = true;
            this.showConsultarPeriodo = false;
        },
        consultarPeriodo(){
            this.showCrearPeriodo = false;
            this.showEditarPeriodo = false;
            this.showEliminarPeriodo = false;
            this.showConsultarPeriodo = true;
        },
        toggleUserMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        consultarPeriodos(nombrePeriodo) {
            fetch(`http://localhost:3000/periodoAcademico/${nombrePeriodo}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        let fecha = new Date(data[0].fecha_inicio);
                        // Obtener el día, mes y año
                        let dia = fecha.getDate();
                        let mes = fecha.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
                        let anio = fecha.getFullYear();
                        // Formatear la fecha
                        let fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
                        // Asignar la fecha formateada al objeto
                        data[0].fecha_inicio = fechaFormateada;

                        let fecha1 = new Date(data[0].fecha_final);
                        // Obtener el día, mes y años
                        let dia1 = fecha1.getDate();
                        let mes1 = fecha1.getMonth() + 1; // Los meses van de 0 a 11, por eso sumamos 1
                        let anio1 = fecha1.getFullYear();
                        // Formatear la fecha
                        let fechaFormateada1 = `${dia1.toString().padStart(2, '0')}/${mes1.toString().padStart(2, '0')}/${anio1}`;
                        // Asignar la fecha formateada al objeto
                        data[0].fecha_final = fechaFormateada1;
                        this.periodos = data;
                        this.nombrePeriodo = '';
                        //console.log(data);
                    } else {
                        console.warn(`No se encontró ningún período académico con el nombre ${nombrePeriodo}`);
                    }
                })
                .catch(error => {
                    console.error('Error al cargar periodos:', error);
                });
        },
        agregarPeriodos() {
            // Calcula la diferencia en meses entre las fechas de inicio y fin
                const diffMeses = (new Date(this.fechaFin).getTime() - new Date(this.fechaInicio).getTime()) / (1000 * 3600 * 24 * 30);
                //console.log(diffMeses);
            // Verifica que la diferencia sea 3 o 6 meses
            if (diffMeses !== 3 && diffMeses !== 6) {
                alert('La duración del periodo académico debe ser de 3 o 6 meses.');
                return;
            }
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
    }
};

</script>

<template>
    <div>
        <!-- Header -->
        <HeaderComponent
            @crearPeriodo="crearPeriodo" 
            @editarPeriodo="editarPeriodo" 
            @eliminarPeriodo="eliminarPeriodo" 
            @consultarPeriodo="consultarPeriodo"
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
                                <input v-model="fechaInicio" type="date" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                        </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Fecha de Fin</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="fechaFin">
                                    <option v-for="fecha in fechas">{{ fecha }}</option>
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

    <!-- Eliminar Periodos -->
    <div class="eliminarPeriodos" v-show="showEliminarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Eliminar Periodo Academico
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

    <!-- Consultar Periodos -->
    <div class="consultarPeriodos" v-show="showConsultarPeriodo">
        <h3>Periodos Academicos</h3>
        <div class="card">
            <div class="card-header">
                Consultar Periodo Academico
            </div>
            <div class="card-body">
                <form class="form-inline" v-on:submit.prevent="consultarPeriodos(nombrePeriodo)">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Nombre</label>
                                <input v-model="nombrePeriodo" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="m-auto">
                                <button type="submit" class="btn btn-primary ml-sm-2 mr-sm-4 my-5">Consultar Periodo</button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
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
                        <tbody>
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