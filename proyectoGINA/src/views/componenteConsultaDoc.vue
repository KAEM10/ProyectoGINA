<script>
export default {
  name: 'componenteConsulta',
  emits: ['cargarDocente'],
  data() {
    return {
      parametro: ''
    }
  }
}
</script>

<template>
  <div class="card">
    
    <div class="card-body">
      <form class="form-inline">
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
            <div class="form-group">
              <label class="form ml-sm-2 mr-sm-4 my-2">Docente</label>
              <input placeholder="Nombre / Apellido / Cedula" v-model="parametro" @keyup="$emit('cargarDocente', parametro)" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
            </div>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>
