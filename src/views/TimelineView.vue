<template>
  <v-container fluid>
    <v-progress-linear
      v-if="emailSentLoading"
      indeterminate
    ></v-progress-linear>
    <div class="headline">Emails Sent By Day</div>
    <div class="chart" id="XYTimeline"></div>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      chart: null,
    }
  },
  computed: {
    ...mapState(['emailSentLoading', 'emailSent', 'darkMode']),
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
        k: 'sent',
        v: ev.target.dataItem.dataContext.date,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      //   const data = []
      //   this.emailSent.forEach((stat) => {
      //     data.push({ date: stat.sent, value: stat.ids.length })
      //   })
      //   this.chart = am4core.create('XYTimeline', am4charts.XYChart)
      //   this.chart.data = data
      //   this.chart.paddingRight = 20
      //   const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
      //   dateAxis.renderer.grid.template.location = 0
      //   dateAxis.groupData = true
      //   if (this.darkMode) {
      //     dateAxis.renderer.labels.template.fill = am4core.color('white')
      //   }
      //   const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())
      //   valueAxis.min = 0
      //   valueAxis.max = 1300
      //   valueAxis.strictMinMax = true
      //   valueAxis.tooltip.disabled = true
      //   valueAxis.renderer.minWidth = 35
      //   if (this.darkMode) {
      //     valueAxis.renderer.labels.template.fill = am4core.color('white')
      //   }
      //   // axis break for outlier
      //   const axisBreak = valueAxis.axisBreaks.create()
      //   axisBreak.startValue = 200
      //   axisBreak.endValue = 1300
      //   const d =
      //     (axisBreak.endValue - axisBreak.startValue) /
      //     (valueAxis.max - valueAxis.min)
      //   axisBreak.breakSize = (0.05 * (1 - d)) / d // 0.05 means that the break will take 5% of the total value axis height
      //   // make break expand on hover
      //   const hoverState = axisBreak.states.create('hover')
      //   hoverState.properties.breakSize = 1
      //   hoverState.properties.opacity = 0.1
      //   hoverState.transitionDuration = 1500
      //   axisBreak.defaultState.transitionDuration = 1000
      //   const series = this.chart.series.push(new am4charts.ColumnSeries())
      //   series.dataFields.dateX = 'date'
      //   series.dataFields.valueY = 'value'
      //   series.columns.template.events.on('hit', (ev) => this.handleSelect(ev))
      //   series.tooltipText = '{valueY.value}'
      //   this.chart.cursor = new am4charts.XYCursor()
      //   const scrollbarX = new am4charts.XYChartScrollbar()
      //   scrollbarX.series.push(series)
      //   this.chart.scrollbarX = scrollbarX
    },
  },
  watch: {
    emailSent() {
      this.createChart()
    },
    darkMode() {
      this.createChart()
    },
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
</style>
