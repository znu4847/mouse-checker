<template>
  <v-container>
    <v-layout column>
      <v-row
        @contextmenu="$event.preventDefault()"
        @click="clickEvent($event)"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @dblclick="dbclick"
      >
        <v-col>
          <v-card tile color="#00cc99">
            <v-row style="padding-left:10px;padding-right:10px">
              <v-col cols="12" md="4">
                <v-card
                  @contextmenu="$event.preventDefault()"
                  :color="leftActive ? 'orange' : ''"
                  height="120px"
                  class="d-flex align-center"
                  outlined
                  :elevation="leftActive ? 0 : 5"
                >
                  <v-scroll-y-reverse-transition>
                    <div
                      v-if="leftActive"
                      class="display-3 flex-grow-1 text-center"
                    >
                      Left
                    </div>
                  </v-scroll-y-reverse-transition>
                </v-card>
              </v-col>
              <v-col>
                <v-card
                  @contextmenu="$event.preventDefault()"
                  :color="wheelActive ? 'orange' : ''"
                  height="120px"
                  class="d-flex align-center"
                  outlined
                  :elevation="wheelActive ? 0 : 5"
                >
                  <v-scroll-y-reverse-transition>
                    <div
                      v-if="wheelActive"
                      class="display-3 flex-grow-1 text-center"
                    >
                      Wheel
                    </div>
                  </v-scroll-y-reverse-transition>
                </v-card>
              </v-col>
              <v-col>
                <v-card
                  :color="rightActive ? 'orange' : ''"
                  height="120px"
                  class="d-flex align-center"
                  outlined
                  :elevation="rightActive ? 0 : 5"
                >
                  <v-scroll-y-reverse-transition>
                    <div
                      v-if="rightActive"
                      class="display-3 flex-grow-1 text-center"
                      @contextmenu="$event.preventDefault()"
                    >
                      Right
                    </div>
                  </v-scroll-y-reverse-transition>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          click any box
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="reset">RESET</v-btn>
        </v-col>
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
    panel: [0, 1, 2],
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
        this.leftActive = false;
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
