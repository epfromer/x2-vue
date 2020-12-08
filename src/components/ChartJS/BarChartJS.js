import { HorizontalBar } from 'vue-chartjs'
import { mapState } from 'vuex'

export default {
  extends: HorizontalBar,
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
      const data = {
        labels: this.chartData.map((datum) => datum.name),
        datasets: [
          {
            label: false,
            backgroundColor: this.chartData.map((datum) => datum.color),
            data: this.chartData.map((datum) => datum.value),
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
            this.handleClick(this.search, this.chartData[item[0]._index].name)
          }
        },
        scales: {
          xAxes: [
            {
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
