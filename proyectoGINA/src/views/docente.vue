<script>
import HeaderComponent from '../views/header.vue';
export default {
    components: {
        HeaderComponent
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
            estado:'',
            tiposEstados: [
                { id: 1, nombre: 'activo' },
                { id: 2, nombre: 'inactivo' }
            ],
            idUsuario:0,
            usuario:'',
            contrasena:'',
            docentes:[],
            usuarios:[],
            showUserMenu: false,
            showPeriodoDocOptions: false,
            showCrearDocente: false,
            showEditarDocente: false,
            showEliminarDocente: false,
            showConsultarDocente: false,
        };
    },
    methods: {
        showOptionsDoc(){
            this.showPeriodoDocOptions = !this.showPeriodoDocOptions;
        },
        crearDocente(){
            this.showCrearDocente = true;
            this.showEditarDocente = false;
            this.showEliminarDocente = false;
            this.showConsultarDocente = false;
        },
        editarDocente(){
            this.showCrearDocente = false;
            this.showEditarDocente = true;
            this.showEliminarDocente = false;
            this.showConsultarDocente = false;
        },
        eliminarDocente(){
            this.showCrearDocente = false;
            this.showEditarDocente = false;
            this.showEliminarDocente = true;
            this.showConsultarDocente = false;
        },
        consultarDocente(){
            this.showCrearDocente = false;
            this.showEditarDocente = false;
            this.showEliminarDocente = false;
            this.showConsultarDocente = true;
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
        /*
        agregarUsuario() {
            const nuevoUsuario = {
                usuario:this.usuario,
                contra:this.contrasena
            };
            fetch('http://localhost:3000/crearUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    console.log(data)
                    this.idUsuario=data.id
                    console.log(this.idUsuario)
                    this.usuarios.push(data)
                })
                .catch(error => {
                    console.error('Error al agregar Docentes:', error);
                });
        },
        agregarDocente() {
            this.agregarUsuario()
            console.log(this.idUsuario)
            const nuevoDocente = {
                nombres:this.nombres,
                apellidos:this.apellidos,
                tipoId:this.tipoId,
                numeroId:this.numeroId,
                tipoDocente:this.tipoDocente,
                tipoContrato:this.tipoContrato,
                area:this.area,
                estado:this.estado,
                usuario:this.idUsuario
            };
            fetch('http://localhost:3000/crearDocente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoDocente)
            })
                .then(response => response.json())
                .then(data => {
                    // Si la solicitud es exitosa, actualiza la lista de usuarios
                    this.docentes.push(data);

                    
                })
                .catch(error => {
                    console.error('Error al agregar Docentes:', error);
                });
        },*/
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

        const data = await response.json();
        this.docentes.push(data);

    } catch (error) {
        console.error('Error al agregar Docentes:', error);
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
            @crearDocente="crearDocente" 
            @editarDocente="editarDocente" 
            @eliminarDocente="eliminarDocente" 
            @consultarDocente="consultarDocente"
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
                            <div class="form-group">
                                <label class="form ml-sm-2 mr-sm-4 my-2">Estado</label>
                                <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2" v-model="estado">
                                <option v-for="tipo in tiposEstados" :key="tipo.id"  :value="tipo.nombre">{{ tipo.nombre }}</option>
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