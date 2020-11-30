<template>
  <highcharts v-if="config" :options="config" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'

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
          type: 'pie',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: this.title,
          style: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        tooltip: {
          pointFormat: '{point.percentage:.1f}%',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        },
        series: [
          {
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
