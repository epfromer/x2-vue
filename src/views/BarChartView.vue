<template>
  <v-container fluid>
    <v-progress-linear v-if="contactsLoading" indeterminate></v-progress-linear>
    <div class="headline">Senders / Receivers</div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect({ to: 'foo', from: 'bar' })">
      handleSelect
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
    handleSelect(name, query) {
      this.clearSearch()
      this.setVuexState({
        k: query,
        v: `(${name})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    getSenderTotals() {
      const data = []
      if (this.contacts) {
        this.contacts.forEach((contact) => {
          data.push(contact.senderTotal ? contact.senderTotal : 0)
        })
      }
      return data
    },
    getReceiverTotals() {
      const data = []
      if (this.contacts) {
        this.contacts.forEach((contact) => {
          data.push(contact.receiverTotal ? contact.receiverTotal : 0)
        })
      }
      return data
    },
    getContactNames() {
      const data = []
      if (this.contacts) {
        this.contacts.forEach((contact) => {
          data.push(contact.name)
        })
      }
      return data
    },
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/dependency-wheel

      if (!this.contacts || !this.contacts.length) return
      const data = []

      this.config = {
        chart: {
          type: 'bar',
          height: '80%',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: this.getContactNames(),
          title: {
            text: null,
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: '# email',
            align: 'high',
          },
          labels: {
            overflow: 'justify',
          },
        },
        tooltip: {
          valueSuffix: ' email',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
            events: {
              click: (ev) =>
                this.handleSelect(
                  ev.point.category,
                  ev.point.colorIndex === 0 ? 'from' : 'to'
                ),
            },
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
          shadow: true,
        },
        series: [
          {
            name: 'Sent',
            data: this.getSenderTotals(),
          },
          {
            name: 'Received',
            data: this.getReceiverTotals(),
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
