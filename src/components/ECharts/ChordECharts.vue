<template>
  <v-chart v-if="config" :options="config" @click="onClick" autoresize />
</template>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState, mapMutations } from 'vuex'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/title'

export default {
  data() {
    return {
      config: null,
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
  components: {
    'v-chart': ECharts,
  },
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
      if (!this.chartData || !this.nodes.length) return
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
          normal: {
            show: true,
          },
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
        tooltip: {},
        legend: [
          {
            bottom: 0,
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
