<template class="agregarHorario">
  <div>
    <HeaderComponent />
    <div class="container">
      <label for="docente-select">Selecciona el programa:</label>
      <div class="form-group search-container">
        <input type="text" v-model="inputValue1" @input="filterOptionsProg" @click="toggleDropdownProg"
          placeholder="Escribe o selecciona..." />
        <select v-show="showDropdown1 && filteredOptionsProg.length > 0" v-model="selectedProg" @change="selectOptionProg">
          <option v-for="period in filteredOptionsProg" :key="period.id_programa" :value="period.nombre">
            {{ period.nombre }}
          </option>
        </select>
      </div>
      <div class="container">
        <label for="docente-select">Selecciona el docente:</label>
        <div class="form-group search-container">
          <input type="text" v-model="inputValue2" @input="filterOptionsDoc" @click="toggleDropdownDocente"
            placeholder="Escribe o selecciona..." />
          <select v-show="showDropdown2 && filteredOptionsDoc.length > 0" v-model="selectedDoc" @change="selectOptionDoc">
            <option v-for="period in filteredOptionsDoc" :key="period.id_docente" :value="period.id_docente">
              {{ period.id_docente }}
            </option>
          </select>
        </div>
      </div>

      <div class="container">
        <label for="ambient-select">Selecciona la compentencia:</label>
        <div class="form-group search-container" >
          
         
          <input type="text" v-model="inputValue3" @input="filterOptionsComp" @click="cargarCompetencias(selectedProg); toggleDropdownCompetencia()" placeholder="Escribe o selecciona..." />

          <select v-show="showDropdown3 && filteredOptionsComp.length > 0" v-model="selectedComp"
            @change="selectOptionComp">
            <option v-for="period in filteredOptionsComp" :key="period.nombre" :value="period.nombre">
              {{ period.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="selectedProg && selectedDoc &&selectedComp">
        <componentHorario :idDocente="selectedDoc" :key="selectedProg + selectedDoc+ selectedComp" />
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
      selectedDoc: '',
      selectedCompetencia: '',
      selectedPeriod: null,
      selectedProgram: null,
      selectedProg: null,
      selectedComp: null,
      programaEncontrado: null,
      showDropdown1: false,
      showDropdown2: false,
      showDropdown3: false,
      inputValue1:'',
      inputValue2:'',
      inputValue3:'',
      filteredOptionsProg: [],
      filteredOptionsDoc: [],
      filteredOptionsComp: [],
      id_del_ambiente: 'ID_DEL_AMBIENTE_AQUI',
      searchQuery: '',
      competencias: [],
      periodos: [], // Asegúrate de cargar los periodos desde el controller
      programas: [], // Asegúrate de cargar los programas desde el controller
      ambientes: [] // Asegúrate de cargar los ambientes desde el controller
    };
  },
  methods: {
    toggleDropdownProg() {
      this.showDropdown1 = !this.showDropdown1;
      if (this.showDropdown1) {
        this.filteredOptionsProg = this.programas; // Restaurar opciones filtradas
      }
    },
    toggleDropdownDocente() {
      this.showDropdown2 = !this.showDropdown2;
      if (this.showDropdown2) {
        this.filteredOptionsDoc = this.docentes; // Restaurar opciones filtradas
      }
    },
    toggleDropdownCompetencia() {
      
      this.showDropdown3 = !this.showDropdown3;
      if (this.showDropdown3) {
        this.filteredOptionsComp = this.competencias; // Restaurar opciones filtradas
      }
    },
    filterOptionsProg() {
      const searchTerm = this.inputValue1.toLowerCase();
      this.filteredOptionsProg = this.programas.filter(period =>
        period.nombre.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown1 = true; // Mostrar el dropdown cuando haya coincidencias
    },
    filterOptionsDoc() {
      const searchTerm = this.inputValue2.toLowerCase();
      this.filteredOptionsDoc = this.docentes.filter(period =>
        period.id_docente.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown2 = true; // Mostrar el dropdown cuando haya coincidencias
    },
    filterOptionsComp() {
      const searchTerm = this.inputValue3.toLowerCase();
      this.filteredOptionsComp = this.competencias.filter(period =>
        period.nombre.toLowerCase().startsWith(searchTerm)
      );
      this.showDropdown3 = true; // Mostrar el dropdown cuando haya coincidencias
    },
    selectOptionDoc() {
      this.inputValue2 = this.selectedDoc;
      this.showDropdown2 = false;
    },
    selectOptionComp() {
      this.inputValue3 = this.selectedComp;
      this.showDropdown3 = false;
    },
    selectOptionProg() {
      this.inputValue1 = this.selectedProg;
      this.showDropdown1 = false;
    },
  },
  mounted() {
    this.cargarProgramas();
    this.cargarTabla();
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
        this.showDropdown2 = false;
      }
    },
    selectedProgram(newVal) {
      if (newVal) {
        this.inputValue3 = newVal;
        this.showDropdown3 = false;
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