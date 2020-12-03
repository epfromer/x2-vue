<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'

require('highcharts/modules/treemap')(Highcharts)
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
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: this.title,
          style: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: (e) => this.handleClick(this.search, e.point.name),
            },
          },
        },
        series: [
          {
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            // layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [
              {
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  verticalAlign: 'top',
                  style: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                  },
                },
              },
            ],
            data: this.chartData,
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
      if (this.chartData && this.chartData.length) this.createChart()
    },
  },
}
</script>
