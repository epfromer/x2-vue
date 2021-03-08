<template>
  <div>
    <p>foo</p>
    <figure>
      <v-chart :option="pie" :init-options="initOptions" ref="pie" autoresize />
    </figure>
  </div>
</template>

<script>
/* eslint-disable no-console */
import qs from 'qs'
import VChart from 'vue-echarts'
import * as echarts from 'echarts/core'
import {
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
} from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const { use } = echarts

use([
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
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
      pie: {
        textStyle: {
          fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
        },
        title: {
          text: 'Traffic Sources',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [
            'Direct',
            'Email',
            'Ad Networks',
            'Video Ads',
            'Search Engines',
          ],
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 234, name: 'Ad Networks' },
              { value: 135, name: 'Video Ads' },
              { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      expand: {
        pie: true,
        polar: true,
        scatter: true,
        map: true,
        radar: true,
        connect: true,
        flight: true,
      },
      initOptions: {
        renderer: 'canvas',
      },
      polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      barLoading: false,
      barLoadingOptions: {
        text: 'Loading…',
        color: '#4ea397',
        maskColor: 'rgba(255, 255, 255, 0.4)',
      },
      flight: null,
      flightLoaded: false,
      flightLoading: false,
      flightLoadingOptions: {
        text: '',
        color: '#c23531',
        textColor: 'rgba(255, 255, 255, 0.5)',
        maskColor: '#003',
        zlevel: 0,
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
    refresh() {
      // simulating async data from server
      this.seconds = 3
      this.barLoading = true
      const timer = setInterval(() => {
        this.seconds--
        if (this.seconds === 0) {
          clearTimeout(timer)
        }
      }, 1000)
    },
    convert() {
      const map = this.$refs.map
      this.img = {
        src: map.getDataURL({
          pixelRatio: window.devicePixelRatio || 1,
        }),
        width: map.getWidth(),
        height: map.getHeight(),
      }
      this.open = true
    },
    startActions() {
      let dataIndex = -1
      const pie = this.$refs.pie

      if (!pie) {
        return
      }

      const dataLen = pie.option.series[0].data.length

      this.actionTimer = setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex,
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex,
        })
        // 显示 tooltip
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex,
        })
      }, 1000)
    },
    stopActions() {
      clearInterval(this.actionTimer)
    },
  },
  watch: {
    connected: {
      handler(value) {
        echarts[value ? 'connect' : 'disconnect']('radiance')
      },
      immediate: true,
    },
    'initOptions.renderer'(value) {
      this.options.renderer = value === 'svg' ? value : undefined
      let query = qs.stringify(this.options)
      query = query ? '?' + query : ''
      history.pushState(
        {},
        document.title,
        `${location.origin}${location.pathname}${query}${location.hash}`
      )
    },
    'expand.pie'(value) {
      if (value) {
        this.$nextTick(this.startActions)
      } else {
        this.stopActions()
      }
    },
  },
  mounted() {
    console.log('mounted')
    // this.startActions()
  },
}
</script>

<style lang="postcss">
figure {
  display: inline-block;
  position: relative;
  margin: 2em auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
  padding: 1.5em 2em;
  min-width: calc(40vw + 4em);
  height: 400px;

  .echarts {
    width: 100%;
    width: 40vw;
    min-width: 400px;
    height: 300px;
  }
}
</style>
