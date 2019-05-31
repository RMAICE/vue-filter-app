<template>
  <div id="app">
    <div class="header"></div>
    <Main/>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "app",
  components: {
    Main
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.header {
  height: 50px;
  margin-bottom: 100px;
  background-color: #000aff;
}
#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
