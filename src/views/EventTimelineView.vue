<template>
  <v-container fluid>
    <div class="headline">
      Enron Timeline
      <v-btn data-testid="toggle-vertical" @click="toggleVertical" icon>
        <v-icon>{{
          vertical ? 'swap_vertical_circle' : 'swap_horizontal_circle'
        }}</v-icon>
      </v-btn>
    </div>
    <button
      hidden
      @click="() => handleSelect({ queryKey: 'foo', queryValue: 'bar' })"
    >
      test
    </button>
    <highcharts :options="config" />
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/timeline')(Highcharts)

// http://content.time.com/time/specials/packages/article/0,28804,2021097_2023262_2023247,00.html
// https://www.tampabay.com/archive/2006/01/29/enron-a-timeline/
// https://www.myplainview.com/news/article/A-chronology-of-Enron-Corp-8499449.php
// https://business.nmsu.edu/~dboje/enron/chronology.htm
// https://www.econcrises.org/2016/12/07/enron-corporation-2001/

export default {
  data() {
    return {
      vertical: true,
      config: {
        chart: {
          height: '90%',
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
    ...mapGetters(['getContactColor']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    toggleVertical() {
      this.vertical = !this.vertical
      this.createChart()
    },
    handleSelect(options) {
      if (!options.queryKey) return
      this.clearSearch()
      this.setVuexState({ k: options.queryKey, v: options.queryValue })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/timeline-series

      if (!this.contacts || !this.contacts.length) return
      this.config = {
        chart: {
          type: 'timeline',
          inverted: this.vertical ? true : false,
          height: this.vertical ? '90%' : '30%',
          zoomType: 'x',
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: '',
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: (ev) => this.handleSelect(ev.point.options),
            },
          },
        },
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        tooltip: {
          style: {
            width: 300,
          },
        },
        series: [
          {
            dataLabels: {
              allowOverlap: false,
              format:
                '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                '{point.x:%d %b %Y}</span><br/>{point.label}',
            },
            marker: {
              symbol: 'circle',
            },
            data: [
              {
                x: new Date('2000-09-19').getTime(),
                label: 'Chewco',
                description: 'Chewco partnership discussions',
                queryKey: 'allText',
                queryValue: 'chewco',
                color: 'brown',
              },
              {
                x: new Date('2001-04-01').getTime(),
                label: 'Raptor',
                description: 'Raptor swaps discussions',
                queryKey: 'allText',
                queryValue: 'raptor',
                color: 'brown',
              },
              {
                x: new Date('2001-08-22').getTime(),
                label: 'Watkins meeting',
                description: 'Watkins meets with Lay',
                queryKey: 'from',
                queryValue: '(Watkins, Sherron)',
                color: this.getContactColor('Watkins, Sherron'),
              },
              {
                x: new Date('2001-10-12').getTime(),
                label: 'Anderson shreds documents',
                description: 'Andersen destroys 1 ton of Enron documents',
                queryKey: 'allText',
                queryValue: 'anderson',
                color: 'black',
              },
              {
                x: new Date('2001-12-02').getTime(),
                label: 'Enron bankruptcy',
                description:
                  'Enron files for bankruptcy, thousands of workers laid off',
                queryKey: 'allText',
                queryValue: 'bankruptcy',
                color: 'black',
              },
              {
                x: new Date('2002-01-09').getTime(),
                label: 'Criminal investigation',
                description:
                  'Justice Department launches a criminal investigation.',
                queryKey: 'allText',
                queryValue: 'investigation',
                color: 'black',
              },
              {
                x: new Date('2002-01-25').getTime(),
                label: 'Baxter suicide',
                description:
                  'Baxter found dead of self-inflicted gunshot wound',
                queryKey: 'to',
                queryValue: 'baxter',
                color: 'black',
              },
              {
                x: new Date('2002-03-14').getTime(),
                label: 'Anderson indicted',
                description:
                  'Andersen indicted on charges of destroying documents',
                queryKey: 'allText',
                queryValue: 'anderson',
                color: 'black',
              },
              {
                x: new Date('2002-06-15').getTime(),
                label: 'Anderson convicted',
                description:
                  'Andersen convicted on charges of destroying documents',
                queryKey: 'allText',
                queryValue: 'anderson',
                color: 'black',
              },
              {
                x: new Date('2002-08-31').getTime(),
                label: 'Anderson defunct',
                description: 'Andersen ceases auditing practice',
                queryKey: 'allText',
                queryValue: 'anderson',
                color: 'black',
              },
              {
                x: new Date('2002-10-31').getTime(),
                label: 'Fastow indicted',
                description:
                  'Fastow indicted on charges of conspiracy, fraud, money laundering and other counts.',
                queryKey: 'from',
                queryValue: '(Fastow, Andrew)',
                color: this.getContactColor('Fastow, Andrew'),
              },
              {
                x: new Date('2004-01-14').getTime(),
                label: 'Fastow pleads guilty',
                description:
                  'Fastow pleads guilty to two counts of conspiracy and agrees to serve 10 years in prison.',
                queryKey: 'from',
                queryValue: '(Fastow, Andrew)',
                color: this.getContactColor('Fastow, Andrew'),
              },
              {
                x: new Date('2004-01-22').getTime(),
                label: 'Causey indicted',
                description: 'Causey indicted for wire fraud and conspiracy',
                queryKey: 'from',
                queryValue: '(Causey, Richard)',
                color: this.getContactColor('Causey, Richard'),
              },
              {
                x: new Date('2004-02-19').getTime(),
                label: 'Skilling indicted',
                description:
                  'Skilling added to Causey indictment, pleads innocent to more than 30 counts.',
                queryKey: 'from',
                queryValue: '(Skilling, Jeff)',
                color: this.getContactColor('Skilling, Jeff'),
              },
              {
                x: new Date('2004-07-08').getTime(),
                label: 'Lay indicted',
                description:
                  'Lay surrenders after being indicted. He pleads innocent.',
                queryKey: 'from',
                queryValue: '(Lay, Kenneth)',
                color: this.getContactColor('Lay, Kenneth'),
              },
              {
                x: new Date('2005-12-28').getTime(),
                label: 'Causey pleads guilty',
                description:
                  'Causey pleads guilty, agrees to testify against Lay and Skilling',
                queryKey: 'from',
                queryValue: '(Causey, Richard)',
                color: this.getContactColor('Causey, Richard'),
              },
              {
                x: new Date('2006-07-05').getTime(),
                label: 'Lay dies',
                description:
                  'Lay dies of heart attack while vacationing in Aspen',
                queryKey: 'from',
                queryValue: '(Lay, Kenneth)',
                color: this.getContactColor('Lay, Kenneth'),
              },
              {
                x: new Date('2006-10-23').getTime(),
                label: 'Skilling sentenced',
                description: 'Skilling sentenced to 24 years in prison',
                queryKey: 'from',
                queryValue: '(Skilling, Jeff)',
                color: this.getContactColor('Skilling, Jeff'),
              },
            ],
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
