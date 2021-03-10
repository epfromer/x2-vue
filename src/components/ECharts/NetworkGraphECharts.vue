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
import { GraphChart } from 'echarts/charts'
import { LegendComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([GraphChart, LegendComponent, TitleComponent, CanvasRenderer])

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
    nodes: {
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
      if (e.data && e.data.source && e.data.target) {
        this.handleClick(e.data.source, e.data.target)
      }
    },
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      const chartNodes = this.nodes.map((node) => ({
        id: node.id,
        name: node.id,
        category: node.id,
        x: null,
        y: null,
        draggable: true,
        itemStyle: {
          color: node.color,
        },
        label: {
          show: true,
        },
      }))
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
        legend: [
          {
            orient: 'vertical',
            x: 'left',
            y: 'center',
            padding: [0, 0, 0, 0],
            data: chartNodes.map((a) => a.name),
            textStyle: {
              color: this.theme.isDark ? 'white' : 'black',
            },
          },
        ],
        series: [
          {
            name: this.title,
            top: 50,
            left: 50,
            right: 50,
            bottom: 250,
            type: 'graph',
            layout: 'force',
            data: chartNodes,
            links: this.chartData,
            categories: chartNodes,
            roam: true,
            label: {
              position: 'bottom',
              formatter: '{b}',
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
            force: {
              repulsion: 1000,
            },
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
