<template>
  <v-container fluid>
    <v-progress-linear
      v-if="wordCloudLoading"
      indeterminate
    ></v-progress-linear>
    <div class="headline">Email Word Cloud</div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect('foo')">test</button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/wordcloud')(Highcharts)

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
  components: {
    highcharts: Chart,
  },
  computed: {
    ...mapState(['wordCloudLoading', 'wordCloud', 'darkMode']),
  },
  mounted() {
    Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (
      relativeWeight
    ) {
      const minFontSize = 10
      const maxFontSize = 25
      return Math.floor(
        minFontSize + (maxFontSize - minFontSize) * relativeWeight
      )
    }

    this.createChart()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(word) {
      this.clearSearch()
      this.setVuexState({ k: 'allText', v: word })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/word-cloud-series

      if (!this.wordCloud || !this.wordCloud.length) return
      const data = []
      this.wordCloud.forEach((word) =>
        data.push({ name: word.tag, weight: word.weight })
      )

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
            type: 'wordcloud',
            name: 'Occurrences',
            data,
          },
        ],
      }
    },
  },
  watch: {
    wordCloud() {
      this.createChart()
    },
    darkMode() {
      this.createChart()
    },
  },
}
</script>
