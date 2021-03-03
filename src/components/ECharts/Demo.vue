<template>
  <figure>
    <v-chart
      :option="bar"
      :init-options="initOptions"
      autoresize
      :loading="barLoading"
      :loadingOptions="barLoadingOptions"
      @zr:click="handleZrClick"
      @click="handleClick"
    />
  </figure>
</template>

<script>
import VChart from 'vue-echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([
  BarChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
])

export default {
  components: {
    VChart,
  },
  data() {
    return {
      bar: {
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        dataset: {
          dimensions: ['Product', '2015', '2016', '2017'],
          source: [
            {
              Product: 'Matcha Latte',
              2015: this.random(),
              2016: this.random(),
              2017: this.random(),
            },
            {
              Product: 'Milk Tea',
              2015: this.random(),
              2016: this.random(),
              2017: this.random(),
            },
            {
              Product: 'Cheese Cocoa',
              2015: this.random(),
              2016: this.random(),
              2017: this.random(),
            },
            {
              Product: 'Walnut Brownie',
              2015: this.random(),
              2016: this.random(),
              2017: this.random(),
            },
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      },
      initOptions: {
        renderer: 'canvas',
      },
      barLoading: false,
      barLoadingOptions: {
        text: 'Loading…',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)',
      },
    }
  },
  methods: {
    handleClick(...args) {
      console.log('click from echarts', ...args)
    },
    handleZrClick(...args) {
      console.log('click from zrender', ...args)
    },
    random() {
      return Math.round(300 + Math.random() * 700) / 10
    },
  },
}
</script>

<style lang="postcss">
figure {
  width: 100vw;
  margin: 1em auto;
  padding: 1em 0;
  border: none;
  border-radius: 0;
  box-shadow: none;

  .echarts {
    width: 100%;
    min-width: 0;
    height: 75vw;
  }
}
</style>
