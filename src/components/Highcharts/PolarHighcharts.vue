<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import HighchartPolar from 'highcharts/highcharts-more'
import { Chart } from 'highcharts-vue'

HighchartPolar(Highcharts)
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
      this.config = {
        chart: {
          polar: true,
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: this.title,
          style: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        xAxis: {
          labels: {
            format: '{value}',
          },
        },
        plotOptions: {
          series: {
            pointStart: 0,
            pointInterval: 45,
          },
          column: {
            pointPadding: 0,
            groupPadding: 0,
          },
        },
        series: this.chartData.map((datum) => ({
          type: 'column',
          name: datum.name,
          data: [datum.value],
          color: datum.color,
          pointPlacement: 'between',
          events: {
            click: () => this.handleClick(this.search, datum.name),
          },
        })),
      }
    },
  },
  watch: {
    darkMode() {
      this.createChart()
    },
    chartData() {
      if (this.chartData && this.chartData.length) this.createChart()
    },
  },
}
</script>
