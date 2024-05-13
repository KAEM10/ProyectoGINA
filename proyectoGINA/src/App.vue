<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* import home from './views/home.vue'; // Importa el componente home.vue

export default {
  components: {
    home // Registra el componente Home en el ámbito de este componente
  }
  // Otra lógica JavaScript si es necesaria
}*/
</script>

<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}

#nav {
padding: 30px;
}

#nav a {
font-weight: bold;
color: #2c3e50;
}

#nav a.router-link-exact-active {
color: #42b983;
}
</style>
