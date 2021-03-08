<template>
  <v-chart
    v-if="config"
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
  GridComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([
  BarChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
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
    search: {
      type: String,
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
      if (e.data && e.data.name) this.handleClick(this.search, e.data.name)
    },
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      const cData = this.chartData
        .map((datum) => ({
          name: datum.name,
          value: datum.value,
          itemStyle: {
            normal: {
              color: datum.color,
              lineStyle: {
                color: datum.color,
              },
              areaStyle: {
                color: datum.color,
              },
            },
          },
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
        xAxis: {
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        yAxis: {
          data: cData.map((datum) => datum.name),
          axisLabel: {
            width: 200,
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: cData,
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
