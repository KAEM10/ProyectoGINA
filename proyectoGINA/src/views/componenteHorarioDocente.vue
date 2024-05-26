<template>
  <div>
    <div>{{ this.horariosOcupados2 }}</div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div class="cell" v-for="(day, dayIndex) in days" :key="dayIndex" :class="cellClasses(day, hour)">
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
          this.obtenerHorariosOcupadosDocente(newVal);
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
      console.log(this.horariosOcupados2)
      const occupiedCells = [];
      this.horariosOcupados2.forEach(horario => {
        occupiedCells.push({ day: horario.dia, hour: this.formatHour(horario.hora_inicio, horario.hora_fin) });
      });
      return occupiedCells;
    },
    cellClasses(day, hour) {
      const schedule2 = this.horariosOcupados2.find(item => item.dia === day && this.formatHour(item.hora_inicio, item.hora_fin) === hour);
      const schedule1 = this.horariosOcupados.find(item => item.dia === day && this.formatHour(item.hora_inicio, item.hora_fin) === hour);

      if (schedule2) {
        console.log("Horario ocupado 2:", schedule2);
      }

      if (schedule1) {
        console.log("Horario ocupado 1:", schedule1);
      }

      return {
        'occupied-brown': this.isOccupied(day, hour) === 'secondList'
      };
    },

    isOccupied(day, hour) {
      console.log("hpta")
      // Verifica si el horario está ocupado en la segunda lista
      const isOccupiedInSecondList = this.horariosOcupados2.some(horario =>
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

    enviarDatos() {
      // Aquí puedes implementar la lógica para enviar los datos seleccionados.
      // Por ejemplo, podrías llamar a una función para procesar los datos y enviarlos al backend.
      console.log("Datos seleccionados:", this.selectedCells);
    }
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
  background-color: #8b4513;
}
</style>
