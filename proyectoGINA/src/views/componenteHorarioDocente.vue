<template>
  <div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div class="cell" v-for="(day, dayIndex) in days" :key="dayIndex" :class="cellClasses(day, hour)">
          <template
            v-for="horario in horariosOcupadosDoc.filter(h => h.dia === day && isBetween(hour, h.hora_inicio, h.hora_fin))">
            {{ horario.codigo }}-{{ horario.nombre }}
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import controller from '../Controllers/controllerHorario.js'; // Importar el mixin

export default {
  mixins: [controller],
  props: {
    idDocente: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      hours: this.generateHours(),
      selectedCells: [],
      horariosOcupados2: [],
    };
  },

  watch: {
    idDocente: {
      handler(newVal) {
        if (newVal) {
          this.obtenerHorariosOcupadosVistaDoc(newVal);
        }
      },
      immediate: true
    }
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
    getOccupiedCells() {
      console.log(this.horariosOcupadosDoc)
      const occupiedCells = [];
      this.horariosOcupadosDoc.forEach(horario => {
        occupiedCells.push({ day: horario.dia, hour: this.formatHour(horario.hora_inicio, horario.hora_fin) });
      });
      return occupiedCells;
    },
    cellClasses(day, hour) {


      return {
        'occupied-brown': this.isOccupied(day, hour) === 'secondList'
      };
    },

    isOccupied(day, hour) {
      // Verifica si el horario está ocupado en la segunda lista
      const isOccupiedInSecondList = this.horariosOcupadosDoc.some(horario =>
        horario.dia === day && this.isBetween(hour, horario.hora_inicio, horario.hora_fin)
      );

      if (isOccupiedInSecondList) return 'secondList';

      // Retorna null si el horario no está ocupado en ninguna de las dos listas
      return null;
    },
    isBetween(hour, startHour, endHour) {
      const hourToNumber = (h) => {
        const [timeRange] = h.split(' - ');
        const [time, period] = timeRange.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + (minutes || 0);
      };
      return hourToNumber(hour) >= hourToNumber(startHour) && hourToNumber(hour) < hourToNumber(endHour);
    },

  },
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
}

.cell.occupied-brown {
  background-color: aquamarine;
}
</style>
