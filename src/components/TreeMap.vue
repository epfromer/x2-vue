<template>
  <div class="chart" :id="`${search}TreeMap`" />
</template>

<script>
import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      chart: null,
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
      this.setVuexState({
        k: this.search,
        v: `(${ev.target.dataItem.dataContext.dataContext.name})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      if (this.chart) this.chart.dispose()

      this.chart = am4core.create(`${this.search}TreeMap`, am4charts.TreeMap)
      this.chart.data = this.data
      this.chart.colors.step = 2
      this.chart.dataFields.name = 'name'
      this.chart.dataFields.value = 'value'
      this.chart.dataFields.color = 'color'
      const series = this.chart.seriesTemplates.create('0')
      series.columns.template.events.on('hit', (ev) => this.handleSelect(ev))
      const seriesBullet = series.bullets.push(new am4charts.LabelBullet())
      seriesBullet.locationY = 0.5
      seriesBullet.locationX = 0.5
      seriesBullet.label.text = '{name}'
      seriesBullet.label.fill = am4core.color('white')
      seriesBullet.template.events.on('hit', (ev) => this.handleSelect(ev))
    },
  },
  watch: {
    data() {
      this.createChart()
    },
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
