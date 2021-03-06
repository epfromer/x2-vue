<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
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
      if (!this.chartData || !this.chartData.length) return
      this.config = {
        chart: {
          type: 'bar',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: this.title,
          style: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        xAxis: {
          categories: this.chartData.map((datum) => datum.name),
          title: {
            text: null,
          },
          labels: {
            style: {
              color: this.theme.isDark ? 'white' : 'black',
            },
          },
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            style: {
              color: this.theme.isDark ? 'white' : 'black',
            },
          },
          title: {
            text: null,
          },
        },
        tooltip: {
          valueSuffix: ' email',
        },
        plotOptions: {
          bar: {
            events: {
              click: (e) => this.handleClick(this.search, e.point.category),
            },
          },
        },
        series: [
          {
            showInLegend: false,
            colorByPoint: true,
            colors: this.chartData.map((datum) => datum.color),
            data: this.chartData.map((datum) => datum.value),
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
