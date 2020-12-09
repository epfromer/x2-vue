<template>
  <v-chart v-if="config" :options="config" @click="onClick" autoresize />
</template>

<style>
.echarts {
  width: 100%;
  height: 600px;
}
</style>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState, mapMutations } from 'vuex'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import 'echarts/lib/chart/bar'

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
      this.handleClick(this.search, e.data.name)
    },
    createChart() {
      if (!this.chartData || !this.chartData.length) return
      const cData = this.chartData
        .map((datum) => ({
          name: datum.name,
          value: datum.value,
          itemStyle: {
            normal: {
              color: datum.color,
              lineStyle: {
                color: datum.color,
              },
              areaStyle: {
                color: datum.color,
              },
            },
          },
        }))
        .reverse()
      this.config = {
        title: {
          text: this.title,
          top: 20,
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
        xAxis: {
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        yAxis: {
          data: cData.map((datum) => datum.name),
          axisLabel: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        series: [
          {
            type: 'bar',
            data: cData,
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
