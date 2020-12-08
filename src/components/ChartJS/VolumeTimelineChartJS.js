import { Bar } from 'vue-chartjs'
import { mapState } from 'vuex'

export default {
  extends: Bar,
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
  components: {},
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      const dailyTotals = this.chartData.map((stat) => ({
        time: stat.sent,
        value: stat.total,
      }))
      const data = {
        labels: dailyTotals.map((d) => d.time),
        datasets: [
          {
            label: this.title,
            data: dailyTotals.map((d) => d.value),
            fill: 'none',
            backgroundColor: '#c43a31',
            pointRadius: 2,
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      }
      const options = {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: true,
          fontColor: this.theme.isDark ? 'white' : 'black',
          fontSize: 16,
          padding: 10,
          text: this.title,
        },
        onClick: (e, item) => {
          if (item && item.length > 0) {
            this.handleClick(
              new Date(dailyTotals[item[0]._index].time)
                .toISOString()
                .slice(0, 10)
            )
          }
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
              },
              ticks: {
                fontColor: this.theme.isDark ? 'white' : 'black',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                fontColor: this.theme.isDark ? 'white' : 'black',
              },
            },
          ],
        },
      }
      this.renderChart(data, options)
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
