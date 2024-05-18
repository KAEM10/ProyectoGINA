<template>
    <div>
      <HeaderComponent />
      <div class="container">
        <div class="form-group search-container">
          <label for="program-select">Selecciona el programa:</label>
          <div class="search-box">
            <input
              type="text"
              id="program-select"
              v-model="selectedProgram"
              placeholder="Buscar programa"
            />
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10,2A8,8,0,1,0,18,10,8,8,0,0,0,10,2ZM10,14A4,4,0,1,1,14,10,4,4,0,0,1,10,14Zm7.71,4.29-3.39-3.39A6.92,6.92,0,0,0,17,10a7,7,0,1,0-2,5l3.39,3.39a1,1,0,1,0,1.42-1.42Z"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="form-group search-container">
          <label for="docente-select">Selecciona el docente:</label>
          <div class="search-box">
            <input
              type="text"
              id="docente-select"
              v-model="selectedDocente"
              placeholder="Buscar docente"
            />
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10,2A8,8,0,1,0,18,10,8,8,0,0,0,10,2ZM10,14A4,4,0,1,1,14,10,4,4,0,0,1,10,14Zm7.71,4.29-3.39-3.39A6.92,6.92,0,0,0,17,10a7,7,0,1,0-2,5l3.39,3.39a1,1,0,1,0,1.42-1.42Z"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="form-group search-container">
          <label for="competencia-select">Selecciona la competencia a orientar:</label>
          <div class="search-box">
            <input
              type="text"
              id="competencia-select"
              v-model="selectedCompetencia"
              placeholder="Buscar competencia"
            />
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10,2A8,8,0,1,0,18,10,8,8,0,0,0,10,2ZM10,14A4,4,0,1,1,14,10,4,4,0,0,1,10,14Zm7.71,4.29-3.39-3.39A6.92,6.92,0,0,0,17,10a7,7,0,1,0-2,5l3.39,3.39a1,1,0,1,0,1.42-1.42Z"/>
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
  import componentHorario from '../views/componentHorario.vue';
  
  export default {
    components: {
      HeaderComponent,
      componentHorario
    },
    data() {
      return {
        selectedProgram: '',
        selectedDocente: '',
        selectedCompetencia: '',
      };
    },
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
  