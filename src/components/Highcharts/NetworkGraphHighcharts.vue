<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/networkgraph')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

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
    highcharts: Chart,
  },
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      this.config = {
        chart: {
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: this.title,
          style: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        plotOptions: {
          networkgraph: {
            keys: ['from', 'to', 'weight'],
          },
          series: {
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              linkFormat: '{point.fromNode.name} \u2192 {point.toNode.name}',
            },
            events: {
              click: (e) => this.handleClick(e.point.id, ''),
            },
            marker: {
              radius: 20,
            },
          },
        },
        series: [
          {
            type: 'networkgraph',
            data: this.chartData.map((datum) => [
              datum.source,
              datum.target,
              datum.value,
            ]),
            nodes: this.nodes,
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
