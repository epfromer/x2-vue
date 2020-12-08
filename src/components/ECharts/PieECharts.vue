<template>
  <v-chart v-if="config" :options="config" @click="onClick" />
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
/* .echarts {
  width: 100%;
  height: 100%;
} */
</style>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState, mapMutations } from 'vuex'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

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
      const cData = []
      this.chartData.forEach((datum) => {
        cData.push({
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
        })
      })
      this.config = {
        title: {
          text: this.title,
          top: 20,
          left: 'center',
          textStyle: {
            color: this.theme.isDark ? '#121212' : 'white',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            data: cData,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: () => Math.random() * 200,
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
