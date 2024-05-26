<template>
  <div>
    <HeaderComponent />
    <div class="container">
      <div class="form-group">
        <label for="period-select">Seleccione período académico:</label>
        <select id="period-select" v-model="selectedPeriod">
          <option v-for="period in periodos" :key="period.nombre" :value="period.nombre">
            {{ period.nombre }}
          </option>
        </select>
      </div>


      <div>
        <label for="period-select">Seleccione el ambiente:</label>
        <input type="text" v-model="inputValue" @input="filterOptions" @click="toggleDropdown"
          placeholder="Escribe o selecciona..." />
        <select v-show="showDropdown && filteredOptions.length > 0" v-model="selectedAmb" @change="selectOption"
          size="5">
          <option v-for="period in filteredOptions" :key="period.codigo" :value="period.codigo">
            {{ period.codigo }}
          </option>
        </select>
      </div>
      <div class="container">
        <label for="docente-select">Selecciona el programa:</label>
        <div class="form-group search-container">
          <input type="text" v-model="inputValue1" @input="filterOptionsProg" @click="toggleDropdownProg"
            placeholder="Escribe o selecciona..." />
          <select v-show="showDropdown1 && filteredOptionsProg.length > 0" v-model="selectedProg"
            @change="selectOptionProg">
            <option v-for="period in filteredOptionsProg" :key="period.nombre" :value="period.nombre">
              {{ period.nombre }}
            </option>
          </select>
        </div>
        <div class="container">
          <label for="docente-select">Selecciona el docente:</label>
          <div class="form-group search-container">
            <input type="text" v-model="inputValue2" @input="filterOptionsDoc" @click="toggleDropdownDocente"
              placeholder="Escribe o selecciona..." />
            <select v-show="showDropdown2 && filteredOptionsDoc.length > 0" v-model="selectedDoc"
              @change="selectOptionDoc">
              <option v-for="period in filteredOptionsDoc" :key="period.id_docente" :value="period.id_docente">
                {{ period.nombres }}
              </option>
            </select>
          </div>
        </div>

        <div class="container">
          <label for="ambient-select">Selecciona la compentencia:</label>
          <div class="form-group search-container">

            <input type="text" v-model="inputValue3" @input="filterOptionsComp"
              @click="cargarCompetencias(selectedProg); toggleDropdownCompetencia()"
              placeholder="Escribe o selecciona..." />

            <select v-show="showDropdown3 && filteredOptionsComp.length > 0" v-model="selectedComp"
              @change="selectOptionComp">
              <option v-for="period in filteredOptionsComp" :key="period.nombre" :value="period.nombre">
                {{ period.nombre }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div>{{ this.selectedPeriodo() }}</div>
      <div v-if="selectedPeriod && selectedAmb && selectedProg && selectedDoc && selectedComp">
        <!-- Barra roja para visualizar ambiente ocupado -->
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="background-color: red; height: 10px; width: 50px;"></div>
          <div style="margin-left: 10px;">Ambiente Ocupado</div>
        </div>

        <!-- Barra café para indicar que el docente está ocupado -->
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="background-color: brown; height: 10px; width: 50px;"></div>
          <div style="margin-left: 10px;">Docente Ocupado</div>
        </div>
        <componentHorario :idDocente="selectedDoc" :idAmbiente="selectedAmb" :idPeriodo="selectedP"
          :key="selectedPeriod + selectedAmb + selectedProg + selectedDoc + selectedComp" />
      </div>


    </div>
  </div>
</template>

<script>
import HeaderComponent from '../views/header.vue';
import componentHorario from '../views/componentHorario.vue';
import controller from '../Controllers/controllerHorario.js';
import controllerPrograma from '../Controllers/controllerPrograma.js';
import controllerDocente from '../Controllers/controllerDocente.js';

export default {
  mixins: [controller, controllerPrograma, controllerDocente],
  components: {
    HeaderComponent,
    componentHorario,
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
      inputValue1: '',
      inputValue2: '',
      inputValue3: '',
      filteredOptionsProg: [],
      filteredOptionsDoc: [],
      filteredOptionsComp: [],
      id_del_ambiente: 'ID_DEL_AMBIENTE_AQUI',
      searchQuery: '',
      competencias: [],
      periodos: [], // Asegúrate de cargar los periodos desde el controller
      programas: [], // Asegúrate de cargar los programas desde el controller
      ambientes: [],// Asegúrate de cargar los ambientes desde el controller
      inputValue: '',
      periodo: [],
      selectedP: null,
      selectedPeriod: null,
      selectedProgram: null,
      selectedAmb: null,
      horario: [],
      showDropdown: false,
      filteredOptions: [],
      id_del_ambiente: 'ID_DEL_AMBIENTE_AQUI',
      searchQuery: '',
      periodos: [], 
      programas: [],
      ambientes: [] 
    };
  },
  methods: {
    selectedPeriodo() {
      // Devuelve el período completo basado en el ID seleccionado
      this.periodo = this.periodos.find(period => period.nombre === this.selectedPeriod) || {};
      this.selectedP = this.periodo.id_periodo
    },
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
        period.nombres.toLowerCase().startsWith(searchTerm)
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
    insertarHorario() {
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
    this.cargarTabla();
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