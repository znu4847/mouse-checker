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
        axis: "horizontal"
      },
      vAxis: {
        title: "time",
        viewWindow: {
          max: 10,
          min: 0
        }
      },
      hAxis: {
        //maxValue: 10
        // viewWindowMode: "pretty"
        // viewWindow: {
        //   min: 10
        // }
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
      console.log(cChartDataL);
      return cChartDataL;
    },
    cChartDataS() {
      let dummyData = Array(60)
        .fill()
        .map((_, i) => [i, (i % 3) + 2, (i % 2) + 2, (i % 7) + 1]);
      let head = [["groupNumber", "down", "up", "inter"]];
      let cChartDataL = [...head, ...dummyData];
      console.log(cChartDataL);
      return cChartDataL;
    }
  },
  created() {
    this.lChartData = lChartData;
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
