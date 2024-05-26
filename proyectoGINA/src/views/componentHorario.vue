<template>
  <div>
    <div class="schedule">
      <div class="header">
        <div class="cell"></div>
        <div class="cell" v-for="day in days" :key="day">{{ day }}</div>
      </div>
      <div class="row" v-for="(hour, index) in hours" :key="index">
        <div class="cell">{{ hour }}</div>
        <div class="cell" v-for="day in days" :key="day + index" :class="cellClasses(day, hour)"
          @click="toggleSelection(day, hour)"></div>
      </div>
    </div>
    <div>ss{{ idPeriodo }}</div>
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
    idAmbiente: {
      type: String,
      required: true
    },
    idDocente: {
      type: String,
      required: true
    },
    idPeriodo: {
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
      const occupiedCells = [...this.selectedCells, ...this.getOccupiedCells2()];
      const weeklyHours = occupiedCells.length * 2; // Multiplicar por 2 ya que cada celda representa 2 horas
      return weeklyHours;
    },
    contarHorasOcupadasPorDia() {
      const horarios = this.horariosOcupados2;
      const horasPorDia = {};

      // Iterar sobre los horarios ocupados y calcular las horas por día
      console.log("Calculando horas ocupadas por día desde horarios ocupados...");
      horarios.forEach(horario => {
        const dia = horario.dia;
        const horaInicio = new Date(`2000-01-01T${horario.hora_inicio}`);
        const horaFin = new Date(`2000-01-01T${horario.hora_fin}`);
        const duracionHoras = (horaFin - horaInicio) / (1000 * 60 * 60); // Convertir de milisegundos a horas

        if (horasPorDia[dia]) {
          horasPorDia[dia] += duracionHoras;
        } else {
          horasPorDia[dia] = duracionHoras;
        }
      });

      // Iterar sobre las celdas seleccionadas y agregar las horas por día
      console.log("Calculando horas ocupadas por celda seleccionada...");
      const selectedCellsArray = Array.from(this.selectedCells); // Convertir el Proxy en un array
      selectedCellsArray.forEach(cell => {
        const dia = cell.day;
        const duracionHoras = 2; // Cada celda representa 2 horas

        if (!horasPorDia[dia]) {
          horasPorDia[dia] = 0; // Inicializar las horas diarias para cada día en 0 si no existe
        }

        horasPorDia[dia] += duracionHoras; // Sumar la duración de la franja horaria al total de horas para ese día
        console.log(`Agregadas ${duracionHoras} horas para ${dia} (${cell.hour})`);
      });

      // Imprimir los resultados de las horas por día
      console.log("Resultados de las horas ocupadas por día:");
      for (const dia in horasPorDia) {
        console.log(`Horas ocupadas en ${dia}: ${horasPorDia[dia]}`);
      }

      console.log("Horas ocupadas por día calculadas con éxito.");
      return horasPorDia;
    },

    isWeeklyHoursExceeded() {
      if (this.docenteCT === "PT") {
        this.horasMaximasSemanales = 32;
      }
      if (this.docenteCT === "CNT") {
        this.horasMaximasSemanales = 40;
      }
      return this.countWeeklyHours() > this.horasMaximasSemanales; // Verificar si las horas semanales exceden 40
    },
    isDailyHoursExceeded(day) {
      const dailyHours = this.contarHorasOcupadasPorDia();
      if (this.docenteCT === "PT") {
        this.horasMaximasDiarias = 8;
      }
      if (this.docenteCT === "CNT") {
        this.horasMaximasDiarias = 10;
      }
      console.log(`Verificando si las horas diarias para ${day} exceden el máximo permitido: ${dailyHours[day]} > ${this.horasMaximasDiarias}`);
      return dailyHours[day] > this.horasMaximasDiarias;
    },
    getOccupiedCells2() {
      const occupiedCells = [];
      this.horariosOcupados2.forEach(horario => {
        occupiedCells.push({ day: horario.dia, hour: this.formatHour(horario.hora_inicio, horario.hora_fin) });
      });
      return occupiedCells;
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
        // Verificar si la celda ya está seleccionada
        const cellIndex = this.selectedCells.findIndex(cell => cell.day === day && cell.hour === hour);
        if (cellIndex >= 0) {
          // Si la celda ya está seleccionada, deseleccionarla
          this.selectedCells.splice(cellIndex, 1);
        } else {
          // Si no está seleccionada, agregarla a las selecciones
          this.selectedCells.push({ day, hour });

          // Verificar si se excedió el límite de horas diarias para este día
          if (this.isDailyHoursExceeded(day)) {
            // Si se excede el límite, eliminar la última selección y mostrar una alerta
            this.selectedCells.pop();
            alert("Se han excedido las horas diarias permitidas para este día.");
            return;
          }

          // Verificar si ya se ha alcanzado el límite de 3 bloques de dos horas
          if (this.selectedCells.length >= 6 && this.isWeeklyHoursExceeded()) {
            // Si se excede el límite, eliminar la última selección y mostrar una alerta
            this.selectedCells.pop();
            alert("Se han excedido las horas semanales permitidas.");
            return;
          }
        }
      }
    },
    enviarDatos() {
      const franjasHorarias = this.selectedCells.map(cell => {
        const [horaInicio, horaFin] = cell.hour.split(' - ').map(h => {
          const [time, period] = h.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (period === 'PM' && hours !== 12) hours += 12;
          if (period === 'AM' && hours === 12) hours = 0;
          return `${String(hours).padStart(2, '0')}:${String(minutes || 0).padStart(2, '0')}:00`;
        });
        return {
          dia: cell.day,
          horaInicio,
          horaFin
        };
      });

      const horarios = franjasHorarias.map(franja => ({
        idPeriodo: this.idPeriodo,
        idDocente: this.idDocente,
        
        idCompetencia: 1,
        idAmbiente: this.idAmbiente,
        
        ...franja
      }));

      // Iterar sobre cada objeto horario y llamar al método de inserción en la base de datos
      horarios.forEach(horario => {
         
        this.agregarHorario(horario);
      });
      // Aquí puedes enviar 'horarios' a la base de datos
    }
  },
  mounted() {
    this.obtenerDocenteContrato(this.idDocente);
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
