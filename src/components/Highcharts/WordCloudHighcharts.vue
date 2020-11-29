<template>
  <highcharts :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/wordcloud')(Highcharts)

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
      config: {},
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
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
              click: (e) => this.handleClick(e.point.name),
            },
          },
        },
        series: [
          {
            type: 'wordcloud',
            name: 'Occurrences',
            data: this.data.map((word) => ({
              name: word.tag,
              weight: word.weight,
            })),
          },
        ],
      }
    },
  },
}
</script>
