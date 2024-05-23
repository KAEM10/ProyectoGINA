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
          <form class="form-inline" @submit.prevent="agregarDocente">
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
<i @click="actualizarDocente(docente)" class="bi bi-check"></i>
</a>
<a href="#" class="icon">
<i @click="onEditOrCancel" class="bi bi-x-circle"></i>
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
<i @click="onEditOrCancel(docente)">Editar</i>
</a>
<a href="#" class="icon">
<i @click="validarEliminar(docente.id_docente)">Eliminar</i>
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
<script>
import HeaderComponent from '../views/header.vue';
import componenteConsulta from '../views/componenteConsultaDoc.vue';
import controller from '../Controllers/controllerDocente';

export default {
  mixins: [controller],
  components: {
    HeaderComponent,
    componenteConsulta
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
i {
  margin: 5px;
}
</style>