<template>
  <div id="app">
    <v-app-bar>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>MouseChecker</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="currentTabComponent = 'Main'">ClickChecker</v-tab>
          <v-tab @click="currentTabComponent = 'GChartTest'">GChartTest</v-tab>
        </v-tabs>
      </template>


    </v-app-bar>
    <component v-bind:is="currentTabComponent"></component>
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import GChartTest from "./components/GChartTest.vue";

export default {
  name: "App",
  data: () => ({
    currentTabComponent: "GChartTest"
  }),
  components: {
    Main,
    GChartTest
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
  margin-top: 60px;
}
</style>
