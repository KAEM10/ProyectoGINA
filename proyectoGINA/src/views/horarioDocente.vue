<template>
    <div>
        <HeaderComponent />
        <h1>Información del Docente</h1>
        <div class="user-info">
        
        <div>
        <p><strong>Nombres:</strong> {{ docenteById.nombres +" "+ docenteById.apellidos }}</p>
        <p><strong>Identificacion:</strong> {{ docenteById.tipo_identificacion +" "+docenteById.identificacion }}</p>
        <p><strong>Tipo Docente:</strong> {{ docenteById.tipo_docente }}</p>
        <p><strong>Tipo Contrato:</strong> {{ docenteById.tipo_contrato }}</p>
        <p><strong>Area:</strong> {{ docenteById.area_perteneciente }}</p>
        <p><strong>Estado:</strong> {{ docenteById.estado }}</p>
        </div>
    </div>
        <componenteHorarioDocente :idDocente="docenteById.id_docente"/>
    </div>
</template>

<script>
  import HeaderComponent from '../views/header.vue';
  import componenteHorarioDocente from '../views/componenteHorarioDocente.vue';
  import controller from '../Controllers/controllerHorario.js';
  import controllerPrograma from '../Controllers/controllerPrograma.js';
  import controllerDocente from '../Controllers/controllerDocente.js';
  
  export default {
    mixins: [controller, controllerPrograma, controllerDocente],
    components: {
      HeaderComponent,
      componenteHorarioDocente,
    },
    props: {
    idDocente: {
      type: String,
      required: true
    }
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
        ambientes: [] ,// Asegúrate de cargar los ambientes desde el controller
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
      this.cargarTabla();
      this.obtenerPeriodosActivos();
      this.obtenerAmbientes();
      this.cargarProgramas();
      this.ObtenerDocenteById(localStorage.getItem('token'));
    },
    watch: {
      idDocente: {
      handler(newVal) {
        if (newVal) {
          this.obtenerHorariosOcupadosDocente(newVal);
        }
      },
      immediate: true
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
.user-info {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: justify; /* Justifica el texto */
}
h1 {
  color: #333;
  margin: 10px;
}
p {
  font-size: 16px;
  color: #555;
}
</style>