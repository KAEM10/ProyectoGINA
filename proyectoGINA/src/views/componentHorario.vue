<template>
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
        :class="{ selected: isSelected(day, hour) }"
        @click="toggleSelection(day, hour)"
      ></div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      hours: this.generateHours(7, 22),
      selectedCells: []
    };
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
    toggleSelection(day, hour) {
      const cellIndex = this.selectedCells.findIndex(cell => cell.day === day && cell.hour === hour);
      if (cellIndex >= 0) {
        this.selectedCells.splice(cellIndex, 1);
      } else {
        this.selectedCells.push({ day, hour });
        console.log(day,hour);
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
</style>

