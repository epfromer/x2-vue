<template>
  <v-container fluid>
    <v-progress-linear
      v-if="emailSentLoading"
      indeterminate
    ></v-progress-linear>
    <div class="headline">Emails Sent By Day</div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect('1999-01-01')">test</button>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Chart } from 'highcharts-vue'

export default {
  data() {
    return {
      config: {
        title: {
          text: 'Chart loading...',
        },
      },
    }
  },
  components: {
    highcharts: Chart,
  },
  computed: {
    ...mapState(['emailSentLoading', 'emailSent', 'darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(date) {
      this.clearSearch()
      this.setVuexState({
        k: 'sent',
        v: date,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.highcharts.com/demo/line-time-series

      if (!this.emailSent || !this.emailSent.length) return
      const data = []
      this.emailSent.forEach((stat) => {
        data.push([new Date(stat.sent).getTime(), stat.ids.length])
      })

      this.config = {
        chart: {
          zoomType: 'x',
        },
        title: {
          text: '',
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? 'Click and drag in the plot area to zoom in'
              : 'Pinch the chart to zoom in',
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
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
              click: (event) =>
                this.handleSelect(
                  new Date(event.point.category).toISOString().slice(0, 10)
                ),
            },
          },
        },
        series: [
          {
            type: 'area',
            name: '# emails sent',
            data,
          },
        ],
      }

      if (this.darkMode) {
        this.config.chart.backgroundColor = {
          linearGradient: [0, 0, 500, 500],
          stops: [
            [0, 'black'],
            [1, '#3e3e40'],
          ],
        }
      } else {
        this.config.chart.backgroundColor = {
          linearGradient: [0, 0, 500, 500],
          stops: [
            [0, 'white'],
            [1, 'white'],
          ],
        }
      }
    },
  },
  watch: {
    emailSent() {
      this.createChart()
    },
    darkMode() {
      this.createChart()
    },
  },
}
</script>
