<template>
  <v-container>
    <v-layout column>
      <v-row
        @contextmenu="$event.preventDefault()"
        id="test-area"
        @click="clickEvent($event)"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @dblclick="dbclick"
      >
        <v-col cols="12" md="4">
          <v-item v-slot:default="{ toggle }">
            <v-card
              :color="leftActive ? 'primary' : ''"
              height="200px"
              class="d-flex align-center"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="leftActive"
                  class="display-4 flex-grow-1 text-center"
                >
                  Active
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
        <!--
        <v-col class="wheel-click-div">
        </v-col>
        <v-col class="right-click-div">
        </v-col>
        -->
      </v-row>
      <v-row>
        <v-col>
          <GChart
            type="ColumnChart"
            :data="leftClickLog"
            :options="leftChartOption"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart
            type="ColumnChart"
            :data="rightClickLog"
            :options="rightChartOption"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GChart
            type="ColumnChart"
            :data="wheelClickLog"
            :options="wheelChartOption"
          />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import ClickLogger from "@/js/ClickLogger.js";
export default {
  data: () => ({
    leftActive: false,
    rightActive: false,
    wheelActive: false,
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
      const btn = event.button;
      if (btn === 0) {
        this.leftActive = true;
      } else if (btn === 2) {
        this.rightActive = true;
      } else if (btn === 1) {
        this.wheelActive = true;
      }
      this.logger.addDown = event;
    },
    mouseup(event) {
      const btn = event.button;
      if (btn === 0) {
        // this.leftActive = false;
      } else if (btn === 2) {
        this.rightActive = false;
      } else if (btn === 1) {
        this.wheelActive = false;
      }
      this.logger.addUp = event;
    }
  },
  components: {}
};
</script>

<style>
#test-area {
  background-color: coral;
}
.right-click-div {
  background-color: green;
}
.wheel-click-div {
  background-color: black;
}
</style>
