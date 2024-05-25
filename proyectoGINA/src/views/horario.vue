<template>
  <div>
    <HeaderComponent />
    <div> {{ horario }}</div>
    <div class="container">
      <div class="form-group">
        <label for="period-select">Seleccione período académico:</label>
        <select id="period-select" v-model="selectedPeriod">
          <option v-for="period in periodos" :key="period.nombre" :value="period.fecha_inicio">
            {{ period.nombre }}
          </option>
        </select>
      </div>


      <div>
        <input type="text" v-model="inputValue" @input="filterOptions" @click="toggleDropdown"
          placeholder="Escribe o selecciona..." />
        <select v-show="showDropdown && filteredOptions.length > 0" v-model="selectedAmb" @change="selectOption"
          size="5">
          <option v-for="period in filteredOptions" :key="period.codigo" :value="period.codigo">
            {{ period.codigo }}
          </option>
        </select>
      </div>
      <div v-if="selectedPeriod && selectedAmb">
        <componentHorario :idAmbiente="selectedAmb" :key="selectedPeriod + selectedAmb" />
      </div>
      <div>
        <button @click="cargarAgregarHorario">Seleccionar</button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../views/header.vue';
import componentHorario from '../views/componentHorario.vue';
import controller from '../Controllers/controllerHorario.js';
import controllerPrograma from '../Controllers/controllerPrograma.js';

export default {
  mixins: [controller, controllerPrograma],
  components: {
    HeaderComponent,
    componentHorario,
  },
  data() {
    return {
      inputValue: '',
      selectedPeriod: null,
      selectedProgram: null,
      selectedAmb: null,
      horario:[],
      showDropdown: false,
      filteredOptions: [],
      id_del_ambiente: 'ID_DEL_AMBIENTE_AQUI',
      searchQuery: '',
      periodos: [], // Asegúrate de cargar los periodos desde el controller
      programas: [], // Asegúrate de cargar los programas desde el controller
      ambientes: [] // Asegúrate de cargar los ambientes desde el controller
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.filteredOptions = this.ambientes; // Restaurar opciones filtradas
      }
    },
    filterOptions() {
      const searchTerm = this.inputValue.toLowerCase();
      this.filteredOptions = this.ambientes.filter(period =>
        period.codigo.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown = true; // Mostrar el dropdown cuando haya coincidencias
    },
    selectOption() {
      this.inputValue = this.selectedAmb;
      this.showDropdown = false;
    },
    cargarAgregarHorario() {
      // Pasa los datos necesarios como parámetros de la ruta
      this.$router.push({
        path: '/agregarHorario',
        query: {
          obtenerHorariosOcupados: this.obtenerHorariosOcupados,
        }
      });
    },


  },
  mounted() {
    this.obtenerPeriodosActivos();
    this.obtenerAmbientes();
    this.cargarProgramas();
  },
  watch: {
    selectedPeriod(newVal) {
      if (newVal) {
        this.inputValue = newVal;
        this.showDropdown = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input,
select {
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.search-container {
  width: 100%;
  max-width: 300px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-box input {
  width: 100%;
  padding-right: 35px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-icon svg {
  width: 20px;
  height: 20px;
  fill: green;
}
</style>