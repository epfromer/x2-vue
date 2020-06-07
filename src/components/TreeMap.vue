<template>
  <div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect(search)">{{ search }}test</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/treemap')(Highcharts)

export default {
  data() {
    return {
      config: {
        title: {
          text: 'Chart loading...',
        },
      },
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  components: {
    highcharts: Chart,
  },
  mounted() {
    this.createChart()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(name) {
      this.clearSearch()
      this.setVuexState({
        k: this.search,
        v: `(${name})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/treemap

      this.config = {
        title: {
          text: '',
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: (ev) => this.handleSelect(ev.point.name),
            },
          },
        },
        series: [
          {
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            // layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            levels: [
              {
                level: 1,
                layoutAlgorithm: 'sliceAndDice',
                dataLabels: {
                  enabled: true,
                  align: 'left',
                  verticalAlign: 'top',
                  style: {
                    fontSize: '15px',
                    fontWeight: 'bold',
                  },
                },
              },
            ],
            data: this.data,
          },
        ],
      }
    },
  },
  watch: {
    data() {
      this.createChart()
    },
  },
}
</script>
