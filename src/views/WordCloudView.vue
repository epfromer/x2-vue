<template>
  <div class="root">
    <div class="headline">Email Word Cloud</div>
    <div class="chart" id="WordCloud"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      chart: null,
    }
  },
  computed: {
    ...mapState(['wordCloudLoading', 'wordCloud', 'darkMode']),
  },
  mounted() {
    this.createChart()
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(ev) {
      this.clearSearch()
      this.setVuexState({ k: 'allText', v: ev.target.dataItem.dataContext.tag })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.amcharts.com/docs/v4/chart-types/wordcloud/
      if (!this.wordCloud) return
      if (this.chart) this.chart.dispose()

      // console.time()
      this.chart = am4core.create('WordCloud', am4plugins_wordCloud.WordCloud)
      const series = this.chart.series.push(
        new am4plugins_wordCloud.WordCloudSeries()
      )
      series.data = this.wordCloud
      series.dataFields.word = 'tag'
      series.dataFields.value = 'weight'
      series.labels.template.tooltipText = '{word} {value}'
      const labels = series.labels.template
      labels.events.on('hit', (ev) => this.handleSelect(ev))
      // series.labels.template.url = '/SearchView?allText={word}'
      if (this.darkMode) {
        series.heatRules.push({
          target: series.labels.template,
          property: 'fill',
          min: am4core.color('white'),
          max: am4core.color('red'),
          dataField: 'value',
        })
      } else {
        series.heatRules.push({
          target: series.labels.template,
          property: 'fill',
          min: am4core.color(themeSecondaryColor),
          max: am4core.color(themePrimaryColor),
          dataField: 'value',
        })
      }
      // console.timeEnd()
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

<style scoped>
.root {
  height: 92vh;
}
.chart {
  width: 100%;
  height: 90%;
}
</style>
