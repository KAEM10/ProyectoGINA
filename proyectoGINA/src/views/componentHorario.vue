<template>
  <div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div class="cell" v-for="day in days" :key="day + index"
          :class="{ selected: isSelected(day, hour), occupied: isOccupied(day, hour) }"
          @click="toggleSelection(day, hour)"></div>
      </div>
    </div>
    <div>
      <p>{{ idAmbiente }}</p>
    </div>
    <div>
      <p>{{ idDocente }}</p>
    </div>
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
    },
    idDocente: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      hours: this.generateHours(7, 22),
      selectedCells: [],
      horariosOcupados: [],
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
    },
    idDocente: {
      handler(newVal) {
        if (newVal) {
          console.log(newVal)
          this.obtenerHorariosOcupadosDocente(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    countWeeklyHours() {
      const weeklyHours = this.selectedCells.length * 2; // Multiplicar por 2 ya que cada celda representa 2 horas
      return weeklyHours;
    },
    countDailyHours() {
      const dailyHours = {}; // Objeto para almacenar las horas diarias
      this.selectedCells.forEach(cell => {
        if (!dailyHours[cell.day]) {
          dailyHours[cell.day] = 0; // Inicializar las horas diarias para cada día en 0
        }
        alert(dailyHours[cell.day])
        dailyHours[cell.day] += 1; // Sumar 2 horas por cada celda seleccionada
      });
      return dailyHours;
    },
    isWeeklyHoursExceeded() {
      return this.countWeeklyHours() > 40; // Verificar si las horas semanales exceden 40
    },
    isDailyHoursExceeded() {
      const dailyHours = this.countDailyHours();
      for (const day in dailyHours) {
        if (dailyHours[day] > 8) { // Verificar si las horas diarias exceden 8 para algún día
          return true;
        }
      }
      return false;
    },
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
      // Verifica si el horario está ocupado en la primera lista
      const isOccupiedInFirstList = this.horariosOcupados.some(horario =>
        horario.dia === day && this.isBetween(hour, horario.hora_inicio, horario.hora_fin)
      );

      // Verifica si el horario está ocupado en la segunda lista
      const isOccupiedInSecondList = this.horariosOcupados2.some(horario =>
        horario.dia === day && this.isBetween(hour, horario.hora_inicio, horario.hora_fin)
      );

      // Retorna true si el horario está ocupado en alguna de las dos listas
      return isOccupiedInFirstList || isOccupiedInSecondList;
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
  // Verificar si la celda está ocupada
  if (!this.isOccupied(day, hour)) {
    // Verificar si ya se ha alcanzado el límite de 3 bloques de dos horas
    if (this.selectedCells.length >= 6) {
      return; // No permitir más selecciones si se alcanzó el límite
    }

    // Verificar si la celda ya está seleccionada
    const cellIndex = this.selectedCells.findIndex(cell => cell.day === day && cell.hour === hour);
    if (cellIndex >= 0) {
      // Si la celda ya está seleccionada, deseleccionarla
      this.selectedCells.splice(cellIndex, 1);

      // También deseleccionar la celda adyacente en la siguiente hora si está seleccionada
      const nextHourIndex = this.hours.findIndex(h => h === hour) + 1;
      if (nextHourIndex < this.hours.length) {
        const nextHour = this.hours[nextHourIndex];
        const nextHourCellIndex = this.selectedCells.findIndex(cell => cell.day === day && cell.hour === nextHour);
        if (nextHourCellIndex >= 0) {
          this.selectedCells.splice(nextHourCellIndex, 1);
        }
      }
    } else {
      // Si no está seleccionada, agregarla a las selecciones
      this.selectedCells.push({ day, hour });

      // Verificar si hay una celda adyacente en la siguiente hora y seleccionarla automáticamente
      const nextHourIndex = this.hours.findIndex(h => h === hour) + 1;
      if (nextHourIndex < this.hours.length) {
        const nextHour = this.hours[nextHourIndex];
        if (!this.isOccupied(day, nextHour)) {
          // Verificar si ya se han seleccionado dos bloques de dos horas consecutivos
          if (this.selectedCells.length % 2 === 0) {
            // Si se han seleccionado dos bloques consecutivos, no permitir más selecciones
            return;
          }
          this.selectedCells.push({ day, hour: nextHour });
        }
      }
    }
    if (this.isDailyHoursExceeded()) {
        alert("Se han excedido las horas diarias permitidas.");
      }
      if (this.isWeeklyHoursExceeded()) {
        alert("Se han excedido las horas semanales permitidas.");
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
  pointer-events: none;
  /* Deshabilita eventos de clic en celdas ocupadas */
}
</style>
