<template>
  <v-chart
    v-if="config"
    :options="config"
    :init-options="initOptions"
    @click="onClick"
    ref="pie"
    autoresize
  />
</template>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState } from 'vuex'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
} from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

const { use } = echarts

use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer,
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
      console.log('create chart')
      if (!this.chartData || !this.chartData.length) return
      const cData = this.chartData.map((datum) => ({
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
      this.config = {
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        title: {
          text: 'Traffic Sources',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [
            'Direct',
            'Email',
            'Ad Networks',
            'Video Ads',
            'Search Engines',
          ],
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 234, name: 'Ad Networks' },
              { value: 135, name: 'Video Ads' },
              { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      // this.config = {
      //   title: {
      //     text: this.title,
      //     left: 'center',
      //     textStyle: {
      //       color: this.theme.isDark ? 'white' : 'black',
      //     },
      //   },
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{b}: {c} ({d}%)',
      //   },
      //   series: [
      //     {
      //       type: 'pie',
      //       radius: '55%',
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: 'rgba(0, 0, 0, 0.5)',
      //         },
      //       },
      //       data: cData,
      //       animationType: 'scale',
      //       animationEasing: 'elasticOut',
      //       animationDelay: () => Math.random() * 200,
      //     },
      //   ],
      // }
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
