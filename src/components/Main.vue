<template>
  <v-container>
    <v-layout column>
      <v-row>
        <v-col>
          <div
            id="test-area"
            @contextmenu="preventevent($event)"
            @click="clickEvent"
            @mousedown="mousedown"
            @mouseup="mouseup"
            @dblclick="dbclick"
          >
          </div>
        </v-col>
        <v-col>
          <v-btn @click="reset">reset</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="clickLogChart" :options="chartOptions" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
// import { GChart } from "vue-google-charts";
import LogRegister from "@/js/LogRegister.js";
export default {
  data: () => ({
    chartOptions: {
      title: "test",
      subtitle: "subtitle",
      vAxis: {
        title: "time"
      },
      hAxis: {
        //maxValue: 10
        // viewWindowMode: "pretty"
      }
    },
    preventevent(e) {
      e.preventDefault();
    },
    logRegister: null
  }),
  computed: {
    clickLogChart() {
      let clickLogChart = [];
      clickLogChart.push([
        "click",
        "single",
        "single",
        "double",
        "time-interval"
      ]);
      this.logRegister.clickLogMap[0].forEach(log => {
        clickLogChart.push(log.chartData);
      });
      return clickLogChart;
    },
    logMap() {
      return {
        0: this.leftLog,
        1: this.middleLog,
        2: this.rightLog
      };
    },
    clickMap() {
      return {
        0: this.leftClick,
        1: this.middleClick,
        2: this.rightClick
      };
    }
  },
  created() {
    this.logRegister = new LogRegister();
  },
  methods: {
    reset() {
      this.logRegister = new LogRegister();
    },

    clickEvent(event) {
      console.log("----- event");
      console.log(event);
      console.log(event.timeStamp);
    },
    dbclick(event) {
      this.logRegister.addDbClick = event;
    },
    mousedown(event) {
      this.logRegister.addDown = event;
    },
    mouseup(event) {
      this.logRegister.addUp = event;
    }
  },
  components: {}
};
</script>

<style>
#test-area {
  background-color: coral;
  width: 300px;
  height: 300px;
}
</style>
