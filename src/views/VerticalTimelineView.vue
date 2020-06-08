<template>
  <v-container fluid>
    <div class="headline">Enron Timeline</div>
    <div class="chart" id="Serpentine"></div>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

const chartStart = '2000-05-01'

export default {
  data() {
    return {
      chart: null,
    }
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
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    createChart() {
      // this.chart = am4core.create(
      //   'Serpentine',
      //   am4plugins_timeline.SerpentineChart
      // )
      // this.chart.curveContainer.padding(50, 20, 50, 20)
      // this.chart.levelCount = 4
      // this.chart.yAxisRadius = am4core.percent(25)
      // this.chart.yAxisInnerRadius = am4core.percent(-25)
      // this.chart.maskBullets = false
      // this.chart.data = this.chartTrackData
      // this.chart.dateFormatter.dateFormat = 'yyyy-MM-dd'
      // this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd'
      // this.chart.fontSize = 11
      // let categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis())
      // categoryAxis.dataFields.category = 'category'
      // categoryAxis.renderer.grid.template.disabled = true
      // categoryAxis.renderer.labels.template.paddingRight = 25
      // if (this.darkMode) categoryAxis.renderer.labels.template.fill = 'white'
      // categoryAxis.renderer.minGridDistance = 10
      // categoryAxis.renderer.innerRadius = -60
      // categoryAxis.renderer.radius = 60
      // let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
      // dateAxis.renderer.minGridDistance = 70
      // dateAxis.baseInterval = { count: 1, timeUnit: 'day' }
      // dateAxis.renderer.tooltipLocation = 0
      // dateAxis.startLocation = -0.5
      // dateAxis.renderer.line.strokeDasharray = '1,4'
      // dateAxis.renderer.line.strokeOpacity = 0.6
      // dateAxis.tooltip.background.fillOpacity = 0.2
      // dateAxis.tooltip.background.cornerRadius = 5
      // dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      //   'alternativeBackground'
      // )
      // dateAxis.tooltip.label.paddingTop = 7
      // let labelTemplate = dateAxis.renderer.labels.template
      // labelTemplate.verticalCenter = 'middle'
      // labelTemplate.fillOpacity = 0.7
      // labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      //   'background'
      // )
      // labelTemplate.background.fillOpacity = 1
      // labelTemplate.padding(7, 7, 7, 7)
      // let series = this.chart.series.push(
      //   new am4plugins_timeline.CurveColumnSeries()
      // )
      // series.columns.template.height = am4core.percent(20)
      // series.columns.template.tooltipText =
      //   '{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]'
      // series.columns.template.events.on('hit', (ev) => handleSelect(ev))
      // series.dataFields.openDateX = 'start'
      // series.dataFields.dateX = 'end'
      // series.dataFields.categoryY = 'category'
      // series.columns.template.propertyFields.fill = 'color' // get color from data
      // series.columns.template.propertyFields.stroke = 'color'
      // series.columns.template.strokeOpacity = 0
      // let bullet = series.bullets.push(new am4charts.CircleBullet())
      // bullet.circle.radius = 3
      // bullet.circle.strokeOpacity = 0
      // bullet.propertyFields.fill = 'color'
      // bullet.locationX = 0
      // let bullet2 = series.bullets.push(new am4charts.CircleBullet())
      // bullet2.circle.radius = 3
      // bullet2.circle.strokeOpacity = 0
      // bullet2.propertyFields.fill = 'color'
      // bullet2.locationX = 1
      // let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet())
      // imageBullet1.disabled = true
      // imageBullet1.propertyFields.disabled = 'disabled1'
      // imageBullet1.locationX = 1
      // imageBullet1.circle.radius = 20
      // imageBullet1.propertyFields.stroke = 'color'
      // imageBullet1.background.propertyFields.fill = 'color'
      // imageBullet1.image = new am4core.Image()
      // imageBullet1.image.propertyFields.href = 'image1'
      // imageBullet1.events.on('hit', (ev) => this.handleSelect(ev))
      // let imageBullet2 = series.bullets.push(new am4plugins_bullets.PinBullet())
      // imageBullet2.disabled = true
      // imageBullet2.propertyFields.disabled = 'disabled2'
      // imageBullet2.locationX = 0
      // imageBullet2.circle.radius = 20
      // imageBullet2.propertyFields.stroke = 'color'
      // imageBullet2.background.propertyFields.fill = 'color'
      // imageBullet2.image = new am4core.Image()
      // imageBullet2.image.propertyFields.href = 'image2'
      // imageBullet2.events.on('hit', (ev) => this.handleSelect(ev))
      // let eventSeries = this.chart.series.push(
      //   new am4plugins_timeline.CurveLineSeries()
      // )
      // eventSeries.dataFields.dateX = 'eventDate'
      // eventSeries.dataFields.categoryY = 'category'
      // eventSeries.data = this.chartEventData
      // eventSeries.strokeOpacity = 0
      // let flagBullet = eventSeries.bullets.push(
      //   new am4plugins_bullets.FlagBullet()
      // )
      // flagBullet.label.propertyFields.text = 'name'
      // flagBullet.locationX = 0
      // flagBullet.tooltipText = '{description}'
      // this.chart.scrollbarX = new am4core.Scrollbar()
      // this.chart.scrollbarX.align = 'center'
      // this.chart.scrollbarX.width = am4core.percent(85)
      // let cursor = new am4plugins_timeline.CurveCursor()
      // this.chart.cursor = cursor
      // cursor.xAxis = dateAxis
      // cursor.yAxis = categoryAxis
      // cursor.lineY.disabled = true
      // cursor.lineX.strokeDasharray = '1,4'
      // cursor.lineX.strokeOpacity = 1
      // dateAxis.renderer.tooltipLocation2 = 0
      // categoryAxis.cursorTooltipEnabled = false
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
.chart {
  width: 100%;
  height: 80vh;
}
</style>
