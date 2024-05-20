<script>
export default {
    name: 'componenteConsultaPerAca',
    emits: ['consultarPeriodos'],
    data() {
        return {
            nombrePeriodo: ''
        }
    }
}
</script>
<template>
    <div class="card-body">
        <form class="form-inline">
            <ul class="navbar-nav m-auto">
                <li class="nav-item">
                    <div class="form-group">
                        <label class="form ml-sm-2 mr-sm-4 my-2">Nombre</label>
                        <input @keyup="$emit('consultarPeriodos', nombrePeriodo)"v-model="nombrePeriodo" type="text" class="form-control w-100 ml-sm-2 mr-sm-4 my-2" required>
                    </div>
                </li>
            </ul>
        </form>
    </div>
</template>