<template>
<<<<<<< HEAD
  <div>
    <HeaderComponent />
    <div class="container">
      <div class="form-group">
        <label for="period-select">Seleccione período académico:</label>
        <select id="period-select" v-model="selectedPeriod">
          <option v-for="period in periodos" :key="period.nombre" :value="period.fecha_inicio">{{ period.nombre }}
          </option>
        </select>
=======
    <div>
      <HeaderComponent />
      <div class="container">
        <div class="form-group">
          <label for="period-select">Seleccione período académico:</label>
          <select class="form-control w-100 ml-sm-2 mr-sm-4 my-2">
            <option v-for="programa in programas" :key="programa.id" :value="programa.nombre">{{ programa.nombre }}</option>
          </select>
        </div>
        <div class="form-group search-container">
          <label for="search-ambient">Buscar ambiente:</label>
          <div class="search-box">
            <input
              type="text"
              id="search-ambient"
              v-model="searchQuery"
              placeholder="Buscar ambiente"
            />
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10,2A8,8,0,1,0,18,10,8,8,0,0,0,10,2ZM10,14A4,4,0,1,1,14,10,4,4,0,0,1,10,14Zm7.71,4.29-3.39-3.39A6.92,6.92,0,0,0,17,10a7,7,0,1,0-2,5l3.39,3.39a1,1,0,1,0,1.42-1.42Z"/>
              </svg>
            </span>
          </div>
        </div>
>>>>>>> 3dfea56899d0350f7d17aa0b9dab02d3dafe0830
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
    </div>
<<<<<<< HEAD
    <div>
      <p>{{ selectedAmb }}</p>
    </div>
    <div v-if="selectedPeriod && selectedAmb">
      <!-- Utilizamos :key para forzar la recreación del componente cuando cambian selectedPeriod o selectedAmb -->
      <componentHorario :idAmbiente="selectedAmb" :key="selectedPeriod + selectedAmb" />
    </div>
    <div>
  <button @click="cargarAgregarHorario">Seleccionar</button>
</div>


  </div>
</template>

<script>
import HeaderComponent from '../views/header.vue';
import componentHorario from '../views/componentHorario.vue';
import controller from '../Controllers/controllerHorario.js';

export default {
  mixins: [controller],
  components: {
    HeaderComponent,
    componentHorario,
  },
  data() {
    return {
      inputValue: '',
      selectedPeriod: null,
      selectedAmb: null,
      showDropdown: false,
      filteredOptions: [],
      id_del_ambiente: 'ID_DEL_AMBIENTE_AQUI'
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
=======
  </template>
  
  <script>
  import HeaderComponent from '../views/header.vue';
  import componentHorario from '../views/componentHorario.vue';
  import controllerPrograma from '../Controllers/controllerPrograma';
  
  export default {
    mixins: [controllerPrograma],
    components: {
      HeaderComponent,
      componentHorario
    },
    mounted(){
      this.cargarProgramas();
    },
    data() {
      return {
        periods: ['2021-2022', '2022-2023', '2023-2024'], // Example periods
        selectedPeriod: '',
        searchQuery: '',
        ambients: ['Aula 101', 'Aula 102', 'Laboratorio 201', 'Sala de reuniones', 'Biblioteca'] // Example ambients
      };
>>>>>>> 3dfea56899d0350f7d17aa0b9dab02d3dafe0830
    },
    selectOption() {
      this.inputValue = this.selectedAmb;
      this.showDropdown = false;
    },
    cargarAgregarHorario() {
      // En tus métodos o eventos donde quieres navegar a la nueva página
      this.$router.push('/agregarHorario');

    }
  },
  watch: {
    selectedPeriod(newVal) {
      if (newVal) {
        this.inputValue = newVal;
        this.showDropdown = false;
      }
    }

  },
  mounted() {
    this.obtenerPeriodosActivos();
    this.obtenerAmbientes();
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
