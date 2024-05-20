<script>
import HeaderComponent from '../views/header.vue';
import componenteConsulta from '../views/componenteConsultaDoc.vue';
export default {
    components: {
        HeaderComponent,
        componenteConsulta
    },

    data() {
        
        return {
            editId: '',
            nombres:'',
            apellidos:'',
            tipoId:'',
            tiposIDs: [
                { id: 1, nombre: 'CC' },
                { id: 2, nombre: 'CE' },
                { id: 3, nombre: 'PASAPORTE' }
            ],
            numeroId:'',
            tipoDocente:'',
            tiposDocentes: [
                { id: 1, nombre: 'Tecnico' },
                { id: 2, nombre: 'Profesional' }
            ],
            tipoContrato:'',
            tiposContratos: [
                { id: 1, nombre: 'PT' },
                { id: 2, nombre: 'CNT' }
            ],
            area:'',
            showUserMenu: false,
            showPeriodoDocOptions: false,
            showCrearDocente: false,
            showEditarDocente: false,
            showEliminarDocente: false,
            showConsultarDocente: false,
        };
    },
    methods: {
        limpiaCampos(){
            this.nombrePeriodo = '';
            this.fechaInicio = '';
            this.fechaFin = '';
            this.periodos = [];
        },
        cambiarEstadoDocente(accion) {
            this.limpiaCampos();
            this.showCrearDocente = (accion === 'crear');
            this.showEditarDocente = (accion === 'editar');
            this.showEliminarDocente = (accion === 'eliminar');
            this.showConsultarDocente = (accion === 'consultar');
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
        agregarDocente() {
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
        <HeaderComponent
        @cambiarEstado="cambiarEstadoDocente"
        />
    </div>
    <div class="crearDocente" v-show="showCrearDocente">
        <h3>Docentes</h3>
        <div class="card">
            <div class="card-header">
                Agregar Nuevo Docente
            </div>
            <div class="card-body">
                <form class="form-inline" v-on:submit.prevent="agregarDocente">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Nombres</label>
                                <input v-model="nombres" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Apellidos</label>
                                <input v-model="apellidos" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Tipo de identificación</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="tipoId">
                                <option v-for="tipo in tiposIDs" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                </select>
                                
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Numero de identificación</label>
                                <input v-model="numeroId" type="number" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>

                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Tipo de Docente</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="tipoDocente">
                                <option v-for="tipo in tiposDocentes" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                </select>
                            </div>
                        </li>

                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Tipo de Contrato</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="tipoContrato">
                                <option v-for="tipo in tiposContratos" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                </select>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Area perteneciente</label>
                                <input v-model="area" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="m-auto">
                                <button type="submit" class="btn btn-primary ml-sm-2 mr-sm-4 my-5">Agregar Docente</button>
                            </div>
                        </li>
                        
                    </ul>
                </form>
            </div>
        </div>
    </div>
    <div  v-show="showEditarDocente">
        <h3>Docentes</h3>
        <div class="card-header">
            Editar Docentes
        </div>
        <componenteConsulta @cargarDocente="cargarDocente" />
        
        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Identificación
                                </th>
                                <th>
                                    Tipo identificación
                                </th>
                                <th>
                                    Nombres
                                </th>
                                <th>
                                    Apellidos
                                </th>
                                <th>
                                    Tipo de Docente
                                </th>
                                <th>
                                    Contrato
                                </th>
                                <th>
                                    Area
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="!tablaVacia">
                            <tr v-for="docente in docentes" :key="docente.id_docente">
                                <template v-if = "editId == docente.id_docente"> 
                                    
                                    <td><input type="number" v-model="docente.identificacion" class="form-control" required></td>
                                    <td>
                                        <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="docente.tipo_identificacion">
                                            <option v-for="tipo in tiposIDs" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                        </select> 
                                    </td>
                                    <td><input type="text" v-model="docente.nombres" class="form-control" required></td>
                                    <td><input type="text" v-model="docente.apellidos" class="form-control" required></td>
                                    
                                    <td>
                                        <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="docente.tipo_docente">
                                            <option v-for="tipo in tiposDocentes" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="docente.tipo_contrato">
                                            <option v-for="tipo in tiposContratos" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                        </select>
                                    </td><td><input type="text" v-model="docente.area_perteneciente" class="form-control" required></td>
                                    <td>
                                        <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="docente.estado">
                                            <option v-for="tipo in tiposEstados" :key="tipo.id"  :value="tipo.nombre">{{ tipo.nombre }}</option>
                                        </select>
                                    </td>
                                    
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="actualizarDocente(docente)" class="bi bi-check"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="onCancel" class="bi bi-x-circle"></i>
                                        </a>
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ docente.identificacion }}</td>
                                    <td>{{ docente.tipo_identificacion }}</td>
                                    <td>{{ docente.nombres}}</td>
                                    <td>{{ docente.apellidos }}</td>
                                    <td>{{ docente.tipo_docente }}</td>
                                    <td>{{ docente.tipo_contrato }}</td>
                                    <td>{{ docente.area_perteneciente }}</td>
                                    <td>{{ docente.estado }}</td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEdit(docente)" >Editar</i>
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

    <div  v-show="showEliminarDocente">
        <h3>Docentes</h3>
        <div class="card-header">
            Eliminar Docentes
        </div>
        <componenteConsulta @cargarDocente="cargarDocente" />
        
        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Identificación
                                </th>
                                <th>
                                    Tipo identificación
                                </th>
                                <th>
                                    Nombres
                                </th>
                                <th>
                                    Apellidos
                                </th>
                                <th>
                                    Tipo de Docente
                                </th>
                                <th>
                                    Contrato
                                </th>
                                <th>
                                    Area
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="!tablaVacia">
                            <tr v-for="docente in docentes" :key="docente.id_docente">
                                <td>{{ docente.identificacion }}</td>
                                <td>{{ docente.tipo_identificacion }}</td>
                                <td>{{ docente.nombres}}</td>
                                <td>{{ docente.apellidos }}</td>
                                <td>{{ docente.tipo_docente }}</td>
                                <td>{{ docente.tipo_contrato }}</td>
                                <td>{{ docente.area_perteneciente }}</td>
                                <td>{{ docente.estado }}</td>
                                <td>
                                    <a href="#" class="icon">
                                        <i v-on:click="validarEliminar(docente.id_docente)" >Eliminar</i>
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


    <div  v-show="showConsultarDocente">
    <h3>Docentes</h3>
    <div class="card-header">
      Consultar Docentes
    </div>
    <componenteConsulta @cargarDocente="cargarDocente" />
        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Identificación
                                </th>
                                <th>
                                    Tipo identificación
                                </th>
                                <th>
                                    Nombres
                                </th>
                                <th>
                                    Apellidos
                                </th>
                                <th>
                                    Tipo de Docente
                                </th>
                                <th>
                                    Contrato
                                </th>
                                <th>
                                    Area
                                </th>
                                <th>
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody v-show="!tablaVacia">
                            <tr v-for="docente in docentes">
                                <td>{{ docente.identificacion }}</td>
                                <td>{{ docente.tipo_identificacion }}</td>
                                <td>{{ docente.nombres}}</td>
                                <td>{{ docente.apellidos }}</td>
                                <td>{{ docente.tipo_docente }}</td>
                                <td>{{ docente.tipo_contrato }}</td>
                                <td>{{ docente.area_perteneciente }}</td>
                                <td>{{ docente.estado }}</td>
                                
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