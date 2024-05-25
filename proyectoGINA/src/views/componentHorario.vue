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
          :class="cellClasses(day, hour)"
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
      hours: this.generateHours(),
      selectedCells: [],
      horasMaximasDiarias: 0,
      horasMaximasSemanales: 0,
      horariosOcupados: [],
      horariosOcupados2: []
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
          this.obtenerHorariosOcupadosDocente(newVal);
        }
      },
      immediate: true
    }
  },
  methods: {
    countWeeklyHours() {
      const occupiedCells = [...this.selectedCells, ...this.getOccupiedCells()];
      const weeklyHours = occupiedCells.length * 2; // Multiplicar por 2 ya que cada celda representa 2 horas
      return weeklyHours;
    },
    countDailyHours() {
      const occupiedCells = [...this.selectedCells, ...this.getOccupiedCells()];
      const dailyHours = {}; // Objeto para almacenar las horas diarias
      occupiedCells.forEach(cell => {
        if (!dailyHours[cell.day]) {
          dailyHours[cell.day] = 0; // Inicializar las horas diarias para cada día en 0
        }
        dailyHours[cell.day] += 2; // Sumar 2 horas por cada celda seleccionada
      });
      return dailyHours;
    },
    isWeeklyHoursExceeded() {
      this.obtenerDocenteContrato(this.idDocente);
      if(this.docenteContrato==="PT"){
        this.horasMaximasSemanales=32;
      }
      if(this.docenteContrato==="CNT"){
        this.horasMaximasSemanales=40;
      }
      return this.countWeeklyHours() > this.horasMaximasSemanales; // Verificar si las horas semanales exceden 40
    },
    isDailyHoursExceeded() {
      this.obtenerDocenteContrato(this.idDocente);
      alert(this.docenteCT)
      const dailyHours = this.countDailyHours();
      if(this.docenteContrato==="PT"){
        this.horasMaximasDiarias=8;
      }
      if(this.docenteContrato==="CNT"){
        this.horasMaximasDiarias=10;
      }
      alert(this.horasMaximasDiarias);
      for (const day in dailyHours) {
        if (dailyHours[day] > this.horasMaximasDiarias) { // Verificar si las horas diarias exceden 8 para algún día
          return true;
        }
      }
      return false;
    },
    getOccupiedCells() {
      const occupiedCells = [];
      this.horariosOcupados.forEach(horario => {
        occupiedCells.push({ day: horario.dia, hour: this.formatHour(horario.hora_inicio, horario.hora_fin) });
      });
      this.horariosOcupados2.forEach(horario => {
        occupiedCells.push({ day: horario.dia, hour: this.formatHour(horario.hora_inicio, horario.hora_fin) });
      });
      return occupiedCells;
    },
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
    isSelected(day, hour) {
      return this.selectedCells.some(cell => cell.day === day && cell.hour === hour);
    },
    cellClasses(day, hour) {
      return {
        selected: this.isSelected(day, hour),
        'occupied-red': this.isOccupied(day, hour) === 'firstList',
        'occupied-brown': this.isOccupied(day, hour) === 'secondList'
      };
    },
    isOccupied(day, hour) {
      // Verifica si el horario está ocupado en la primera lista
      const isOccupiedInFirstList = this.horariosOcupados.some(horario =>
        horario.dia === day && this.isBetween(hour, horario.hora_inicio, horario.hora_fin)
      );

      if (isOccupiedInFirstList) return 'firstList';

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
        } else {
          // Si no está seleccionada, agregarla a las selecciones
          this.selectedCells.push({ day, hour });
        }

        // Verificar si se exceden las horas diarias o semanales
        if (this.isDailyHoursExceeded()) {
          alert("Se han excedido las horas diarias permitidas.");
        }
        if (this.isWeeklyHoursExceeded()) {
          alert("Se han excedido las horas semanales permitidas.");
        }
      }
    }
  },
  mounted(){
    
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
  /* Deshabilita eventos de clic en celdas ocupadas */
}

.cell.occupied-brown {
  background-color: #8b4513;
  pointer-events: none;
  /* Deshabilita eventos de clic en celdas ocupadas */
}
</style>
