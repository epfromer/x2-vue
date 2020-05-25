<template>
  <v-container fluid>
    <v-row no-gutters dense>
      <div class="headline">Senders / Receivers</div>
    </v-row>
    <v-row no-gutters dense>
      <v-col xs="4" sm="3">
        <ContactPicker
          :contactsToShow="contactsToShow"
          :onChange="(contacts) => onContactsChange(contacts)"
        />
      </v-col>
      <v-col xs="8" sm="9">
        <div class="chart" id="FDT"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected'
import { mapMutations, mapState } from 'vuex'
import ContactPicker from '../components/ContactPicker'

export default {
  data() {
    return {
      chart: null,
      showSenders: true,
      selectAll: true,
      contactsToShow: new Map(),
    }
  },
  computed: {
    ...mapState(['contactsLoading', 'contacts', 'darkMode']),
  },
  components: {
    ContactPicker,
  },
  mounted() {
    if (this.contacts) {
      this.contactsToShow = this.createContactList()
      this.createChart()
    }
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    contactColor(contact) {
      return this.contacts.find((c) => c.name === contact).color
    },
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
    createContactList() {
      const map = new Map()
      this.contacts.forEach((contact) => {
        if (this.showSenders) {
          contact.asSender.forEach((email) => {
            if (email.to.length) map.set(contact.name, true)
          })
        } else {
          contact.asReceiver.forEach((email) => {
            map.set(email.from, true)
          })
        }
      })
      return new Map([...map.entries()].sort())
    },
    createChart() {
      // https://www.amcharts.com/docs/v4/chart-types/force-directed/
      if (!this.contactsToShow.size) return
      if (this.chart) this.chart.dispose()

      const data = []
      this.contacts.forEach((contact) => {
        const sent = new Map()
        if (this.showSenders) {
          contact.asSender.forEach((email) => {
            email.to.forEach((recipient) => {
              if (sent.has(recipient)) {
                sent.set(recipient, sent.get(recipient) + 1)
              } else {
                sent.set(recipient, 1)
              }
            })
          })
        } else {
          contact.asReceiver.forEach((email) => {
            if (sent.has(email.from)) {
              sent.set(email.from, sent.get(email.from) + 1)
            } else {
              sent.set(email.from, 1)
            }
          })
        }

        const parent = {
          name: contact.name,
          color: this.contactColor(contact.name),
          children: [],
        }
        sent.forEach((v, k) => {
          if (contact.name !== k && this.contactsToShow.get(contact.name))
            if (this.showSenders) {
              parent.children.push({
                from: contact.name,
                to: k,
                name: k,
                value: v,
                color: this.contactColor(k),
              })
            } else {
              parent.children.push({
                from: k,
                to: contact.name,
                name: k,
                value: v,
                color: this.contactColor(k),
              })
            }
        })

        if (parent.children.length) data.push(parent)
      })

      this.chart = am4core.create(
        'FDT',
        am4plugins_forceDirected.ForceDirectedTree
      )
      let series = this.chart.series.push(
        new am4plugins_forceDirected.ForceDirectedSeries()
      )
      series.data = data
      series.dataFields.value = 'value'
      series.dataFields.name = 'name'
      series.dataFields.color = 'color'
      series.dataFields.children = 'children'
      series.nodes.template.tooltipText = '{name}:{value}'
      series.nodes.template.fillOpacity = 1
      series.nodes.template.label.text = '{name}'
      series.fontSize = 10
      series.minRadius = 15
      series.nodes.template.events.on('hit', (ev) => this.handleSelect(ev))

      if (this.darkMode) {
        series.nodes.template.label.fill = am4core.color('black')
      }
    },
    toggleSendersReceivers() {},
    onContactsChange(contacts) {
      this.contactsToShow = contacts
    },
    toggleSelectAll() {},
  },
  watch: {
    contacts() {
      if (this.contacts) {
        this.contactsToShow = this.createContactList()
      }
    },
    contactsToShow() {
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
  height: 82vh;
}
</style>
