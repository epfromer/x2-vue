<template>
  <div class="root">
    <div class="headline">Senders / Receivers</div>
    <div class="chart" id="ChordDiagram"></div>
  </div>
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
  computed: {
    ...mapState(['contactsLoading', 'contacts', 'darkMode']),
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
        k: 'from',
        v: `(${ev.target.dataItem.dataContext.from})`,
      })
      this.setVuexState({
        k: 'to',
        v: `(${ev.target.dataItem.dataContext.to})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.amcharts.com/docs/v4/chart-types/chord-diagram/
      if (!this.contacts) return
      if (this.chart) this.chart.dispose()

      // first, need to set colors for each
      const data = []
      this.contacts.forEach((contact) => {
        data.push({ from: contact.name, nodeColor: contact.color })
      })

      this.contacts.forEach((contact) => {
        const sent = new Map()
        contact.asSender.forEach((email) => {
          email.to.forEach((recipient) => {
            if (sent.has(recipient)) {
              sent.set(recipient, sent.get(recipient) + 1)
            } else {
              sent.set(recipient, 1)
            }
          })
        })
        sent.forEach((v, k) => {
          if (contact.name !== k) {
            data.push({
              from: contact.name,
              to: k,
              value: v,
            })
          }
        })
      })

      this.chart = am4core.create('ChordDiagram', am4charts.ChordDiagram)
      this.chart.data = data
      this.chart.dataFields.fromName = 'from'
      this.chart.dataFields.toName = 'to'
      this.chart.dataFields.value = 'value'
      this.chart.dataFields.color = 'nodeColor'
      this.chart.links.template.events.on('hit', (ev) => this.handleSelect(ev))

      if (this.darkMode) {
        this.chart.nodes.template.label.fill = am4core.color('white')
      }
    },
  },
  watch: {
    contacts() {
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
