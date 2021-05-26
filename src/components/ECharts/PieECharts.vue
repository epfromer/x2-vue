<template>
  <v-chart
    class="chart"
    :option="config"
    :init-options="initOptions"
    @click="onClick"
    autoresize
  />
</template>

<script>
// https://github.com/ecomfe/vue-echarts/blob/master/src/demo/Demo.vue

import { mapState } from 'vuex'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([PieChart, TooltipComponent, TitleComponent, CanvasRenderer])

export default {
  data() {
    return {
      config: null,
      initOptions: {
        renderer: 'canvas',
      },
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
  components: { VChart },
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
      const cData = this.chartData.map((datum) => ({
        name: datum.name,
        value: datum.value,
        itemStyle: { color: datum.color },
      }))
      this.config = {
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        title: {
          text: this.title,
          left: 'center',
          textStyle: {
            color: this.theme.isDark ? 'white' : 'black',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: this.theme.isDark ? 'white' : 'black',
          },
          data: this.chartData.map((datum) => datum.name),
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: cData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
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

<style scoped>
.chart {
  height: 500px;
}
</style>
