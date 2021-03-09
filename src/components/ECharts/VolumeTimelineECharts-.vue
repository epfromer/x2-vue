<template>
  <v-chart v-if="config" :options="config" @click="onClick" autoresize />
</template>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState, mapMutations } from 'vuex'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/dataZoom'

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
    'v-chart': ECharts,
  },
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    onClick(e) {
      if (e.data && e.data.name) this.handleClick(this.search, e.data.name)
    },
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      this.config = {
        title: {
          text: this.title,
          left: 'center',
          textStyle: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
          {
            type: 'slider',
          },
        ],
        xAxis: {
          data: this.chartData.map((datum) => datum.sent),
          silent: false,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        yAxis: {
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: this.chartData.map((datum) => datum.total),
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
