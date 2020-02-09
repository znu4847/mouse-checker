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
            test-area
          </div>
        </v-col>
        <v-col>
          <v-btn @click="reset">reset</v-btn>
          2nd-row
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="leftLog" :options="chartOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="rightLog" :options="chartOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart
            type="ColumnChart"
            :data="middleLog"
            :options="chartOptions"
          />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  data: () => ({
    clickLog: [],
    singleClick: [],
    dbClick: [],
    leftClick: [],
    rightClick: [],
    middleClick: [],
    leftLog: [
      ["click", "single", "double"],
      ["click", 0, 0]
    ],
    rightLog: [
      ["click", "single", "double"],
      ["click", 0, 0]
    ],
    middleLog: [
      ["click", "single", "double"],
      ["click", 0, 0]
    ],

    chartOptions: {
      title: "test",
      subtitle: "subtitle"
    },
    preventevent(e) {
      e.preventDefault();
    }
  }),
  computed: {
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
  methods: {
    reset() {
      this.leftLog = [
        ["click", "single", "double"],
        ["click", 0, 0]
      ];
      this.rightLog = [
        ["click", "single", "double"],
        ["click", 0, 0]
      ];
      this.middleLog = [
        ["click", "single", "double"],
        ["click", 0, 0]
      ];
    },

    clickEvent(event) {
      console.log("----- event");
      console.log(event.timeStamp);
    },
    dbclick(event) {
      console.log("---- dbclick");
      console.log(event.timeStamp);
    },
    mousedown(event) {
      let click = this.clickMap[event.button];
      click.push({
        down: { timeStamp: event.timeStamp, button: event.button }
      });
    },
    mouseup(event) {
      let clickList = this.clickMap[event.button];

      let click = clickList.pop();
      click.up = { timeStamp: event.timeStamp, type: event.type };
      click.type = "single";

      clickList.push(click);

      this.logMap[event.button].push(["single", 1, 0]);
    }
  },
  components: {
    GChart
  }
};
</script>

<style>
#test-area {
  background-color: coral;
  width: 300px;
  height: 300px;
}
</style>
