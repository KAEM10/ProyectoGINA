




<template>
  <div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div
          class="cell"
          v-for="day in days" 
          :key="day + index"
          :class="{ selected: isSelected(day, hour), occupied: isOccupied(day, hour) }"
          @click="toggleSelection(day, hour)"
        ></div>
      </div>
    </div>
    <div><p>{{ idAmbiente }}</p></div>
  </div>
</template>

<script>
import controller from '../Controllers/controllerHorario.js'; // Importar el mixin

export default {
  mixins: [controller],
  props: {
    idAmbiente: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      hours: this.generateHours(7, 22),
      selectedCells: [],
      horariosOcupados: []
    };
  },
  watch: {
    idAmbiente: {
      handler(newVal) {
        if (newVal) {
          this.obtenerHorariosOcupados(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    generateHours(start, end) {
      const hours = [];
      for (let i = start; i <= end; i++) {
        let period = i < 12 ? 'AM' : 'PM';
        let displayHour = i % 12 === 0 ? 12 : i % 12;
        hours.push(`${displayHour} ${period}`);
      }
      return hours;
    },
    isSelected(day, hour) {
      return this.selectedCells.some(cell => cell.day === day && cell.hour === hour);
    },
    isOccupied(day, hour) {
      return this.horariosOcupados.some(horario =>
        horario.dia === day && this.isBetween(hour, horario.hora_inicio, horario.hora_fin)
      );
    },
    isBetween(hour, startHour, endHour) {
      const hourToNumber = (h) => {
        const [time, period] = h.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + (minutes || 0);
      };
      return hourToNumber(hour) >= hourToNumber(startHour) && hourToNumber(hour) < hourToNumber(endHour);
    },
    toggleSelection(day, hour) {
      if (!this.isOccupied(day, hour)) {
        const cellIndex = this.selectedCells.findIndex(cell => cell.day === day && cell.hour === hour);
        if (cellIndex >= 0) {
          this.selectedCells.splice(cellIndex, 1);
        } else {
          this.selectedCells.push({ day, hour });
        }
      }
    }
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
.cell.occupied {
  background-color: #ff0000;
  pointer-events: none; /* Deshabilita eventos de clic en celdas ocupadas */
}
</style>
