<template>
  <v-container>
    <v-layout column>
      <v-row>
        <v-col>
          <div
            id="test-area"
            @contextmenu="$event.preventDefault()"
            @click="clickEvent($event)"
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
          <GChart type="ColumnChart" :data="leftClickLog" :options="leftChartOption" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="rightClickLog" :options="rightChartOption" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="wheelClickLog" :options="wheelChartOption" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
// import { GChart } from "vue-google-charts";
import ClickLogger from "@/js/ClickLogger.js";
export default {
  data: () => ({
    preventevent(e) {
      e.preventDefault();
    },
    logger: null
  }),
  computed: {
    leftChartOption() {
      return this.logger.chartOption(0);
    },
    rightChartOption() {
      return this.logger.chartOption(2);
    },
    wheelChartOption() {
      return this.logger.chartOption(1);
    },

    leftClickLog() {
      return this.logger.chartData(0);
    },
    rightClickLog() {
      return this.logger.chartData(2);
    },
    wheelClickLog() {
      return this.logger.chartData(1);
    }
  },
  created() {
    this.logger = new ClickLogger();
  },
  methods: {
    reset() {
      this.logger = new ClickLogger();
    },

    clickEvent(event) {
      event.preventDefault();
    },
    dbclick(event) {
      this.logger.addDbClick = event;
    },
    mousedown(event) {
      this.logger.addDown = event;
    },
    mouseup(event) {
      this.logger.addUp = event;
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
