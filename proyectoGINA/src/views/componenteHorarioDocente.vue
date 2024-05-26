<template>
  <div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div class="cell" v-for="(day, dayIndex) in days" :key="dayIndex" :class="getCellClass(day, hour)">
          {{ getAmbienteName(day, hour) }}
        </div>
      </div>
    </div>
    <div>
      <button @click="enviarDatos">Seleccionar</button>
    </div>
  </div>
</template>

<script>
import controller from '../Controllers/controllerHorario.js'; // Importar el mixin

export default {
  mixins: [controller],
  
  data() {
    return {
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      hours: this.generateHours(),
      selectedCells: [],
      scheduleData: [ // Añade la información de los horarios aquí
        { nombreAmbiente: 'Aula 101', dia: 'Lunes', horaInicio: '7:00', horaFin: '9:00' },
        { nombreAmbiente: 'Aula 101', dia: 'Miércoles', horaInicio: '11:00', horaFin: '13:00' },
        // Añade más información de horarios según necesites
      ],
    };
  },
  
  methods: {
    formatHour(startHour, endHour) {
      return `${startHour.split(':')[0]} ${startHour.split(' ')[1]} - ${endHour.split(':')[0]} ${endHour.split(' ')[1]}`;
    },
    generateHours() {
      return [
        '7 AM - 9 AM',
        '9 AM - 11 AM',
        '11 AM - 1 PM',
        '2 PM - 4 PM',
        '4 PM - 6 PM',
        '6 PM - 8 PM',
        '8 PM - 10 PM'
      ];
    },
    getCellClass(day, hour) {
      const schedule = this.scheduleData.find(item => item.dia === day && this.formatHour(item.horaInicio, item.horaFin) === hour);
      if (schedule) {
        return 'cell occupied-red'; // Puedes definir más clases según necesites
      }
      return 'cell';
    },
    getAmbienteName(day, hour) {
      const schedule = this.scheduleData.find(item => item.dia === day && this.formatHour(item.horaInicio, item.horaFin) === hour);
      return schedule ? schedule.nombreAmbiente : '';
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
.schedule {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin: 20px;
}

.header {
  display: contents;
}

.row {
  display: contents;
}

.cell {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
}

.cell:first-child {
  background-color: #e9e9e9;
  font-weight: bold;
}

.header .cell {
  background-color: #e9e9e9;
  font-weight: bold;
}

.cell.selected {
  background-color: #007bff;
  color: white;
}

.cell.occupied-red {
  background-color: #ff0000;
  pointer-events: none;
}
</style>
