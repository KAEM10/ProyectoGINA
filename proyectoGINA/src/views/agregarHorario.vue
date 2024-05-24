<template class="agregarHorario">
  <div>
    <HeaderComponent />
    <div>{{ programaEncontrado}}</div>
    <!-- Llamar a la función obtenerPrograma(nombre) y almacenar el resultado en una variable -->
   
    <div class="container">
      <label for="docente-select">Selecciona el programa:</label>
      <div class="form-group search-container">
          <input type="text" v-model="inputValue" @input="filterOptions" @click="toggleDropdown"
            placeholder="Escribe o selecciona..." />
          <select v-show="showDropdown && filteredOptions.length > 0" v-model="selectedProg" @change="selectOption"
            size="5">
            <option v-for="period in filteredOptions" :key="period.id_programa" :value="period.nombre">
              {{ period.nombre }}
            </option>
          </select>
      </div>
      <div class="container">
      <label for="docente-select">Selecciona el docente:</label>
      <div class="form-group search-container">
          <input type="text" v-model="inputValue2" @input="filterOptionsDoc" @click="toggleDropdownDocente"
            placeholder="Escribe o selecciona..." />
          <select v-show="showDropdown && filteredOptions.length > 0" v-model="selectedDoc" @change="selectOptionDoc"
            size="5">
            <option v-for="period in filteredOptionsDoc" :key="period.identificacion" :value="period.identificacion">
              {{ period.identificacion }}
            </option>
          </select>
      </div> </div>

      <div class="form-group search-container">
        <label for="competencia-select">Selecciona la competencia a orientar:</label>
        <div class="search-box">
          <input type="text" id="competencia-select" v-model="selectedCompetencia" placeholder="Buscar competencia" />
          <span class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M10,2A8,8,0,1,0,18,10,8,8,0,0,0,10,2ZM10,14A4,4,0,1,1,14,10,4,4,0,0,1,10,14Zm7.71,4.29-3.39-3.39A6.92,6.92,0,0,0,17,10a7,7,0,1,0-2,5l3.39,3.39a1,1,0,1,0,1.42-1.42Z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div>
      <componentHorario />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../views/header.vue';
import controllerPrograma from '../Controllers/controllerPrograma.js';
import controllerDocente from '../Controllers/controllerDocente.js';
import componentHorario from '../views/componentHorario.vue';

export default {
  mixins: [controllerPrograma, controllerDocente],
  components: {
    HeaderComponent,
    componentHorario
  },
  data() {
    return {
      programaDerecho: null,
      selectedProgram: '',
      selectedDocente: '',
      selectedCompetencia: '',
      programaEncontrado: null,
      selectedPeriod: null,
      selectedProgram: null,
      selectedProg: null,
      selectedComp: null,
      showDropdown: false,
      filteredOptions: [],
      competencias: [],
      filteredOptionsDoc: [],
      filteredOptionsComp: [],
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
        this.filteredOptions = this.programas; // Restaurar opciones filtradas
      }
    },
    toggleDropdownDocente() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.filteredOptionsDoc = this.docentes; // Restaurar opciones filtradas
      }
    },
    toggleDropdownCompetencia() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.filteredOptionsComp= this.programaEncontrado.competencias; // Restaurar opciones filtradas
      }
    },
    filterOptions() {
      const searchTerm = this.inputValue.toLowerCase();
      this.filteredOptions = this.programas.filter(period =>
        period.nombre.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown = true; // Mostrar el dropdown cuando haya coincidencias
    },
    filterOptionsDoc() {
      const searchTerm = this.inputValue2.toLowerCase();
      this.filteredOptionsDoc= this.docentes.filter(period =>
        period.identificacion.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown = true; // Mostrar el dropdown cuando haya coincidencias
    },
    filterOptionsComp() {
      const searchTerm = this.inputValue3.toLowerCase();
      this.filteredOptionsComp= this.programaEncontrado.competencias.filter(period =>
        period.nombre.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown = true; // Mostrar el dropdown cuando haya coincidencias
    },
    encontrarPrograma(){
      this.programaEncontrado = this.programas.find(programa => programa.nombre === "Derecho");
      console.log(this.programaEncontrado)
    },
    selectOptionDoc() {
      this.inputValue2 = this.selectedDoc;
      this.showDropdown = false;
    },
    selectOptionComp() {
      this.inputValue3 = this.selectedComp;
      this.showDropdown = false;
    },
    selectOption() {
      this.inputValue = this.selectedProg;
      this.showDropdown = false;
    },
  },
  mounted() {
    this.cargarProgramas();
    this.cargarTabla();
    this.encontrarPrograma();
    //this.obtenerPrograma('Derecho');
  },
  watch: {
    selectedProgram(newVal) {
      if (newVal) {
        this.inputValue = newVal;
        this.showDropdown = false;
      }
    },
    selectedProgram(newVal) {
      if (newVal) {
        this.inputValue2 = newVal;
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

input {
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