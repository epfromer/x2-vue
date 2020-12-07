<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'

require('highcharts/modules/wordcloud')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (
  relativeWeight
) {
  const minFontSize = 10
  const maxFontSize = 25
  return Math.floor(minFontSize + (maxFontSize - minFontSize) * relativeWeight)
}

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
          zoomType: 'x',
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
            overflow: 'justify',
            style: {
              color: this.theme.isDark ? 'white' : 'black',
            },
          },
          type: 'datetime',
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            style: {
              color: this.theme.isDark ? 'white' : 'black',
            },
          },
          title: {
            text: '# emails sent',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: (e) =>
                this.handleClick(
                  new Date(e.point.category).toISOString().slice(0, 10)
                ),
            },
          },
        },
        series: [
          {
            type: 'area',
            name: '# emails sent',
            data: this.chartData.map((stat) => [
              new Date(stat.sent).getTime(),
              stat.total,
            ]),
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
