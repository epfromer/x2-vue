<template>
  <v-chart
    class="chart"
    :option="config"
    :init-options="initOptions"
    @click="onClick"
    autoresize
  />
</template>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState } from 'vuex'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  LegendComponent,
  TitleComponent,
  DataZoomComponent,
  DataZoomSliderComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([
  BarChart,
  LegendComponent,
  TitleComponent,
  DataZoomComponent,
  DataZoomSliderComponent,
  CanvasRenderer,
])

export default {
  data() {
    return {
      config: null,
      initOptions: { renderer: 'canvas' },
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
    handleClick: {
      type: Function,
      required: true,
    },
  },
  inject: ['theme'],
  components: { VChart },
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    onClick(e) {
      if (e.name) this.handleClick(e.name)
    },
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      const cData = this.chartData
        .map((datum) => ({
          name: datum.name,
          value: datum.value,
          itemStyle: {  color: datum.color },
        }))
        .reverse()
      this.config = {
        title: {
          text: this.title,
          left: 'center',
          textStyle: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          containLabel: true,
        },
        dataZoom: [
          {
            type: 'inside',
          },
          {
            type: 'slider',
          },
        ],
        xAxis: {
          data: this.chartData.map((datum) => datum.sent),
          silent: false,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        yAxis: {
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: this.chartData.map((datum) => datum.total),
          },
        ],
      }
    },
  },
  watch: {
    darkMode() {
      this.createChart()
    },
    chartData() {
      this.createChart()
    },
  },
}
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
