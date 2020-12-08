import { PolarArea } from 'vue-chartjs'
import { mapState } from 'vuex'

export default {
  extends: PolarArea,
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
        title: {
          display: true,
          fontColor: this.theme.isDark ? 'white' : 'black',
          fontSize: 16,
          padding: 10,
          text: this.title,
        },
        legend: {
          position: 'bottom',
          labels: {
            fontColor: this.theme.isDark ? 'white' : 'black',
          },
        },
        onClick: (e, item) => {
          if (item && item.length > 0) {
            handleClick(search, this.chartData[item[0]._index].name)
          }
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
