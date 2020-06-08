<template>
  <v-container fluid>
    <div class="headline">Enron Timeline</div>
    <highcharts :options="config" />
    <button hidden @click="() => handleSelect('foo')">test</button>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/timeline')(Highcharts)

const chartStart = '2000-05-01'

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
    ...mapGetters(['getContactColor']),
    chartTrackData() {
      if (!this.contacts) return []
      return [
        {
          category: 'Arthur Andersen',
          start: '2001-10-12',
          end: '2001-10-23',
          color: 'blue',
          task: 'Andersen destroys 1 ton of Enron documents',
          queryKey: 'allText',
          queryValue: 'anderson',
          image1: '/anderson.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Arthur Andersen',
          start: '2002-03-14',
          end: '2002-10-16',
          color: 'blue',
          task: 'Andersen litigation',
          queryKey: 'allText',
          queryValue: 'anderson',
          image1: '/anderson.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Chewco',
          start: '2000-09-19',
          end: '2001-02-01',
          color: 'brown',
          task: 'Chewco partnership discussions',
          queryKey: 'allText',
          queryValue: 'chewco',
          image2: '/chewco.jpg',
          disabled2: false,
          location: 0,
        },
        {
          category: 'Raptor',
          start: chartStart,
          end: '2001-04-01',
          color: 'yellow',
          task: 'Raptor swaps discussions',
          queryKey: 'allText',
          queryValue: 'raptor',
          image2: '/raptor.jpg',
          disabled2: false,
          location: 0,
        },
        {
          category: 'Causey',
          start: chartStart,
          end: '2002-02-14',
          color: this.getContactColor('Causey, Richard'),
          task: 'Causey employed',
          queryKey: 'from',
          queryValue: '(Causey, Richard)',
          image2: '/causey.jpg',
          disabled2: false,
          location: 0,
        },
        {
          category: 'Skilling',
          start: chartStart,
          end: '2001-08-14',
          color: this.getContactColor('Skilling, Jeff'),
          task: 'Skilling employed',
          queryKey: 'from',
          queryValue: '(Skilling, Jeff)',
          image2: '/skilling.jpg',
          disabled2: false,
          location: 0,
        },
        {
          category: 'Fastow',
          start: chartStart,
          end: '2001-10-24',
          color: this.getContactColor('Fastow, Andrew'),
          task: 'Fastow employed',
          queryKey: 'from',
          queryValue: '(Fastow, Andrew)',
          image2: '/fastow.jpg',
          disabled2: false,
          location: 0,
        },
        {
          category: 'Fastow',
          start: '2002-10-31',
          end: '2004-01-14',
          color: this.getContactColor('Fastow, Andrew'),
          task: 'Fastow litigation',
          queryKey: 'from',
          queryValue: '(Fastow, Andrew)',
          image1: '/fastow.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Lay',
          start: chartStart,
          end: '2002-01-23',
          color: this.getContactColor('Lay, Kenneth'),
          task: 'Lay employed',
          queryKey: 'from',
          queryValue: '(Lay, Kenneth)',
          image1: '/lay.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Skilling',
          start: '2004-02-19',
          end: '2006-05-25',
          color: this.getContactColor('Skilling, Jeff'),
          task: 'Skilling litigation',
          queryKey: 'from',
          queryValue: '(Skilling, Jeff)',
          image1: '/skilling.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Lay',
          start: '2004-07-08',
          end: '2006-05-25',
          color: this.getContactColor('Lay, Kenneth'),
          task: 'Lay litigation',
          queryKey: 'from',
          queryValue: '(Lay, Kenneth)',
          image1: '/lay.jpg',
          disabled1: false,
          location: 0,
        },
        {
          category: 'Causey',
          start: '2004-01-22',
          end: '2005-12-28',
          color: this.getContactColor('Causey, Richard'),
          task: 'Causey litigation',
          queryKey: 'from',
          queryValue: '(Causey, Richard)',
          image1: '/causey.jpg',
          disabled1: false,
          location: 0,
        },
      ]
    },
    chartEventData() {
      return [
        {
          category: '',
          eventDate: '2001-08-22',
          name: 'Watkins meeting',
          description: 'Watkins meets with Lay',
        },
        {
          category: '',
          eventDate: '2001-12-02',
          name: 'Enron bankruptcy',
          description:
            'Enron files for bankruptcy, thousands of workers laid off',
        },
        {
          category: '',
          eventDate: '2002-03-14',
          name: 'Anderson indicted',
          description: 'Andersen indicted on charges of destroying documents',
        },
        {
          category: '',
          eventDate: '2002-06-15',
          name: 'Anderson convicted',
          description: 'Andersen convicted on charges of destroying documents',
        },
        {
          category: '',
          eventDate: '2002-08-31',
          name: 'Anderson defunct',
          description: 'Andersen ceases auditing practice',
        },
        {
          category: '',
          eventDate: '2002-01-25',
          name: 'Baxter suicide',
          description: 'Baxter found dead of self-inflicted gunshot wound',
        },
        {
          category: '',
          eventDate: '2003-04-30',
          name: 'Lea Fastow charged',
          description:
            'Lea Fastow (wife) charged with tax crimes and conspiracy',
        },
        {
          category: '',
          eventDate: '2006-07-05',
          name: 'Lay dies',
          description: 'Lay dies of heart attack while vacationing in Aspen',
        },
        {
          category: '',
          eventDate: '2006-09-26',
          name: 'Fastow sentenced',
          description: 'Fastow sentenced to 6 years in prison',
        },
        {
          category: '',
          eventDate: '2006-10-23',
          name: 'Skilling sentenced',
          description: 'Fastow sentenced to 24 years in prison',
        },
        {
          category: '',
          eventDate: '2004-01-22',
          name: 'Causey indicted',
          description: 'Causey indicted for wire fraud and conspiracy',
        },
        {
          category: '',
          eventDate: '2005-12-28',
          name: 'Causey pleads guilty',
          description:
            'Causey pleads guilty, agrees to testify against Lay and Skilling',
        },
        {
          category: '',
          eventDate: '2004-07-08',
          name: 'Lay indicted',
          description:
            'Lay surrenders after being indicted. He pleads innocent.',
        },
        {
          category: '',
          eventDate: '2002-10-31',
          name: 'Fastow indicted',
          description:
            'Fastow indicted on charges of conspiracy, fraud, money laundering and other counts.',
        },
        {
          category: '',
          eventDate: '2004-01-14',
          name: 'Fastow pleads guilty',
          description:
            'Fastow pleads guilty to two counts of conspiracy and agrees to serve 10 years in prison.',
        },
        {
          category: '',
          eventDate: '2004-02-19',
          name: 'Skilling indicted',
          description:
            'Skilling added to Causey indictment, pleads innocent to more than 30 counts.',
        },
        {
          category: '',
          eventDate: '2002-01-09',
          name: 'Criminal investigation',
          description: 'Justice Department launches a criminal investigation.',
        },
      ]
    },
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      // https://www.highcharts.com/docs/chart-and-series-types/timeline-series

      this.config = {
        chart: {
          type: 'timeline',
          inverted: true,
          height: '95%',
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
              click: (ev) => this.handleSelect(ev.point.name),
            },
          },
        },
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        series: [
          {
            data: [
              {
                x: new Date('22 July 1951').getTime(),
                name: 'First dogs',
                label: '1951: First dogs in space',
                color: 'red',
                description:
                  '22 July 1951 First dogs in space (Dezik and Tsygan) ',
              },
              {
                x: new Date('4 October 1957').getTime(),
                name: 'Sputnik 1',
                label: '1957: First artificial satellite',
                color: 'blue',
                description:
                  '4 October 1957 First artificial satellite. First signals from space.',
              },
              {
                x: new Date('4 October 1961').getTime(),
                name: 'First human spaceflight',
                label: '1961: First human spaceflight (Yuri Gagarin)',
                description:
                  'First human spaceflight (Yuri Gagarin), and the first human-crewed orbital flight',
              },
              {
                x: new Date('4 March 1969').getTime(),
                name: 'First human on the Moon',
                label: '1969: First human on the Moon',
                description:
                  'First human on the Moon, and first space launch from a celestial body other than the Earth. First sample return from the Moon',
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
