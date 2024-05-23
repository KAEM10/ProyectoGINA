Aquí tienes el código correctamente indentado:

```javascript
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
            nombres: '',
            apellidos: '',
            tipoId: '',
            tiposIDs: [
                { id: 1, nombre: 'CC' },
                { id: 2, nombre: 'CE' },
                { id: 3, nombre: 'PASAPORTE' }
            ],
            numeroId: '',
            tipoDocente: '',
            tiposDocentes: [
                { id: 1, nombre: 'Tecnico' },
                { id: 2, nombre: 'Profesional' }
            ],
            tipoContrato: '',
            tiposContratos: [
                { id: 1, nombre: 'PT' },
                { id: 2, nombre: 'CNT' }
            ],
            area: '',
            estado: '',
            tiposEstados: [
                { id: 1, nombre: 'activo' },
                { id: 2, nombre: 'inactivo' }
            ],
            idUsuario: 0,
            usuario: '',
            contrasena: '',
            docentes: [],
            usuarios: [],
            parametro: '',
            tablaVacia: true,
            showUserMenu: false,
            showPeriodoDocOptions: false,
            showCrearDocente: false,
            showGestorDocente: false
        };
    },
    methods: {
        onEditOrCancel(docente) {
            this.editId = docente ? docente.id_docente : '';
        },
        limpiaCampos() {
            this.nombres = '';
            this.apellidos = '';
            this.tipoId = '';
            this.numeroId = '';
            this.tipoDocente = '';
            this.tipoContrato = '';
            this.area = '';
            this.estado = '';
            this.usuario = '';
            this.contrasena = '';
            this.docentes = [];
        },
        cambiarEstadoDocente(accion) {
            this.cargarTabla();
            this.limpiaCampos();
            this.showCrearDocente = (accion === 'crear');
            this.showGestorDocente = (accion === 'gestionar');
        },
        async cargarDocente(parametro) {
            try {
                if (parametro == "") {
                    console.warn("parametro vacio");
                    this.cargarTabla();
                } else {
                    const response = await fetch(`http://localhost:3000/cargarDocente/${parametro}`);
                    const data = await response.json();

                    if (data.length > 0) {
                        this.docentes = data;
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
        cargarTabla() {
            fetch('http://localhost:3000/cargarTablaDoc')
                .then(response => response.json())
                .then(data => {
                    this.docentes = data;
                    this.tablaVacia = false;
                })
                .catch(error => {
                    console.error('Error al cargar Docentes:', error);
                });
        },
        async agregarDocente() {
            try {
                const idUsuario = await this.agregarUsuario();
                const nuevoDocente = {
                    nombres: this.nombres,
                    apellidos: this.apellidos,
                    tipoId: this.tipoId,
                    numeroId: this.numeroId,
                    tipoDocente: this.tipoDocente,
                    tipoContrato: this.tipoContrato,
                    area: this.area,
                    estado: this.estado,
                    usuario: idUsuario
                };

                const response = await fetch('http://localhost:3000/crearDocente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoDocente)
                });

                if (!response.ok) {
                    // Verifica si el error es un conflicto (duplicado)
                    if (response.status === 409) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Conflicto: El docente ya existe');
                    } else {
                        throw new Error('Error al crear el docente');
                    }
                }

                const data = await response.json();
                this.limpiaCampos();
                alert("Docente creado con éxito");
            } catch (error) {
                console.error('Error al agregar Docente:', error);
                alert(`Se produjo un error: ${error.message}`);
            }
        },
        async agregarUsuario() {
            try {
                const nuevoUsuario = {
                    usuario: this.usuario,
                    contra: this.contrasena
                };

                const response = await fetch('http://localhost:3000/crearUsuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoUsuario)
                });

                const data = await response.json();
                this.idUsuario = data.id;
                this.usuarios.push(data);
                return data.id;
            } catch (error) {
                console.error('Error al agregar Usuario:', error);
                throw error;
            }
        },
        actualizarDocente(docente) {
            fetch(`http://localhost:3000/actualizarDocente/${docente.id_docente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(docente)
            })
                .then(response => response.json())
                .then(() => {
                    this.onEditOrCancel();
                    this.cargarDocente(this.parametro);
                })
                .catch(error => {
                    console.error('Error al actualizar el docente:', error);
                });
        },
        borrarDocente(id) {
            fetch(`http://localhost:3000/borrarDocente/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    const index = this.docentes.findIndex(docente => docente.id_docente === id);
                    if (index !== -1) {
                        this.docentes.splice(index, 1);
                    }
                    alert("Docente eliminado con éxito");
                })
                .catch(error => {
                    console.error('Error al eliminar docente:', error);
                });
        },
        validarEliminar(id) {
            if (confirm("¿Está seguro que desea eliminar el docente?")) {
                this.borrarDocente(id);
            }
        }
    }
};
</script>

<template>
    <div>
        <HeaderComponent @cambiarEstado="cambiarEstadoDocente" />
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
                                <select class="form-control w-100 ml-sm-2 mr-sm

-4 my-2" v-model="tipoContrato">
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
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Estado</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="estado">
                                    <option v-for="tipo in tiposEstados" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                </select>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Usuario</label>
                                <input v-model="usuario" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Contraseña</label>
                                <input v-model="contrasena" type="password" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
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
    <div v-show="showGestorDocente">
        <h3>Docentes</h3>
        <div class="card-header">
            Gestionar Docentes
        </div>
        <componenteConsulta @cargarDocente="cargarDocente" />
        <div class="card mt">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Identificación</th>
                                <th>Tipo identificación</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Tipo de Docente</th>
                                <th>Contrato</th>
                                <th>Area</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody v-show="!tablaVacia">
                            <tr v-for="docente in docentes" :key="docente.id_docente">
                                <template v-if="editId == docente.id_docente">
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
                                    </td>
                                    <td><input type="text" v-model="docente.area_perteneciente" class="form-control" required></td>
                                    <td>
                                        <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="docente.estado">
                                            <option v-for="tipo in tiposEstados" :key="tipo.id" :value="tipo.nombre">{{ tipo.nombre }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="actualizarDocente(docente)" class="bi bi-check"></i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel" class="bi bi-x-circle"></i>
                                        </a>
                                    </td>
                                </template>
                                <template v-else>
                                    <td>{{ docente.identificacion }}</td>
                                    <td>{{ docente.tipo_identificacion }}</td>
                                    <td>{{ docente.nombres }}</td>
                                    <td>{{ docente.apellidos }}</td>
                                    <td>{{ docente.tipo_docente }}</td>
                                    <td>{{ docente.tipo_contrato }}</td>
                                    <td>{{ docente.area_perteneciente }}</td>
                                    <td>{{ docente.estado }}</td>
                                    <td>
                                        <a href="#" class="icon">
                                            <i v-on:click="onEditOrCancel(docente)">Editar</i>
                                        </a>
                                        <a href="#" class="icon">
                                            <i v-on:click="validarEliminar(docente.id_docente)">Eliminar</i>
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
