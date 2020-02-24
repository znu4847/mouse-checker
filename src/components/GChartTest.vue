<template>
  <v-container>
    <v-layout column>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="cChartDataNs" :options="cChartOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="ColumnChart" :data="cChartDataS" :options="cChartOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart type="LineChart" :data="lChartData" :options="lChartOptions" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
// import { GChart } from "vue-google-charts";
import lChartData from "@/data/lineChartData.json";
export default {
  data: () => ({
    lChartData: [],
    lChartOptions: {
      explorer: {
        axis: "horizontal"
      }
    },
    cChartData: [],
    cChartOptions: {
      title: "test",
      subtitle: "subtitle",
      explorer: {
        axis: "horizontal",
        maxZoomIn: 1,
        maxZoomOut: 1
        // keepInBounds: true
        // actions: ["dragToZoom", "rightClickToReset"]
      },
      vAxis: {
        title: "time",
        viewWindow: {
          max: 10,
          min: 0
        }
      },
      hAxis: {
        viewWindowMode: "pretty",
        viewWindow: {
          min: 0,
          max: 10
        }
      }
    }
  }),
  computed: {
    cChartDataNs() {
      let dummyData = Array(60)
        .fill()
        .map((_, i) => [i + "g", (i % 3) + 2, (i % 2) + 2, (i % 7) + 1]);
      let head = [["groupNumber", "down", "up", "inter"]];
      let cChartDataL = [...head, ...dummyData];
      return cChartDataL;
    },
    cChartDataS() {
      let dummyData = Array(60)
        .fill()
        .map((_, i) => [i + 1, (i % 3) + 2, (i % 2) + 2, (i % 7) + 1]);
      let head = [["groupNumber", "down", "up", "inter"]];
      let cChartDataL = [...head, ...dummyData];
      return cChartDataL;
    }
  },
  created() {
    this.lChartData = lChartData;
  },
  components: {}
};
</script>

<style scoped>
</style>
