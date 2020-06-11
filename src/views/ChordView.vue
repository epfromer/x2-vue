<template>
  <v-container fluid>
    <v-progress-linear v-if="contactsLoading" indeterminate></v-progress-linear>
    <div class="headline">Senders / Receivers</div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect({ to: 'foo', from: 'bar' })">
      test
    </button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/sankey')(Highcharts)
require('highcharts/modules/dependency-wheel')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/export-data')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts)

export default {
  data() {
    return {
      config: {
        chart: {
          height: '95%',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: 'Chart loading...',
          style: { color: this.theme.isDark ? 'white' : 'black' },
        },
      },
    }
  },
  inject: ['theme'],
  components: {
    highcharts: Chart,
  },
  computed: {
    ...mapState(['contactsLoading', 'contacts', 'darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(ev) {
      if (!ev.from || !ev.to) return
      this.clearSearch()
      this.setVuexState({
        k: 'from',
        v: `(${ev.from})`,
      })
      this.setVuexState({
        k: 'to',
        v: `(${ev.to})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

      if (!this.contacts || !this.contacts.length) return
      const data = []

      // calculate number of emails from each to another
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
            data.push([contact.name, k, v])
          }
        })
      })

      console.log(data)

      // set colors
      const nodes = []
      this.contacts.forEach((contact) => {
        nodes.push({ id: contact.name, color: contact.color })
      })

      this.config = {
        chart: {
          height: '95%',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: '',
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: (ev) => this.handleSelect(ev.point),
            },
          },
        },
        series: [
          {
            keys: ['from', 'to', 'weight'],
            data,
            nodes,
            type: 'dependencywheel',
            name: '',
            dataLabels: {
              color: '#333',
            },
          },
        ],
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
