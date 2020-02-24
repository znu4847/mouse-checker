<template>
  <v-app>
    <div id="app">
      <v-toolbar>
        <v-toolbar-title>
          Mouse Checker
        </v-toolbar-title>
      </v-toolbar>
      <component v-bind:is="currentTabComponent"></component>
    </div>
  </v-app>
</template>

<script>
import Main from "./components/Main.vue";
import GChartTest from "./components/GChartTest.vue";
import ItemGroup from "./components/ItemGroup.vue";

export default {
  name: "App",
  data: () => ({
    currentTabComponent: "Main"
  }),
  components: {
    Main,
    GChartTest,
    ItemGroup
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /** margin-top: 60px; */
}
</style>
