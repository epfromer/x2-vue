<template>
  <v-container fluid>
    <v-progress-linear v-if="contactsLoading" indeterminate></v-progress-linear>
    <v-row no-gutters dense>
      <div class="headline">Senders / Receivers</div>
      <button hidden @click="() => handleSelect('foo')">test</button>
    </v-row>
    <v-row no-gutters dense>
      <v-col xs="4" sm="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div class="button">
              <v-btn
                fab
                small
                :elevation="0"
                v-on="on"
                class="ma-2"
                @click="toggleSelectAll"
              >
                <v-icon>select_all</v-icon>
              </v-btn>
              <v-btn
                small
                :elevation="0"
                v-on="on"
                class="ma-2"
                @click="toggleSendersReceivers"
              >
                {{ showSenders ? 'Senders' : 'Receivers' }}
              </v-btn>
            </div>
          </template>
          <span>Toggle Senders / Receivers</span>
        </v-tooltip>
        <ContactPicker
          :contactsToShow="contactsToShow"
          :onChange="(contacts) => onContactsChange(contacts)"
        />
      </v-col>
      <v-col xs="8" sm="9">
        <highcharts :options="config" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import ContactPicker from '../components/ContactPicker'
import Highcharts from 'highcharts'
import { Chart } from 'highcharts-vue'
require('highcharts/modules/networkgraph')(Highcharts)

export default {
  data() {
    return {
      config: {
        chart: {
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: 'Chart loading...',
          style: { color: this.theme.isDark ? 'white' : 'black' },
        },
      },
      showSenders: true,
      selectAll: true,
      contactsToShow: new Map(),
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
  components: {
    highcharts: Chart,
    ContactPicker,
  },
  mounted() {
    if (this.contacts) {
      this.contactsToShow = this.createContactList()
      this.createChart()
    }
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(ev) {
      const from = ev.target.dataItem.dataContext.from
      const to = ev.target.dataItem.dataContext.to
      if (from) {
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
      }
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
      // https://www.highcharts.com/docs/chart-and-series-types/network-graph

      if (!this.contacts || !this.contacts.length) return
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

        sent.forEach((v, k) => {
          if (contact.name !== k && this.contactsToShow.get(contact.name))
            data.push(this.showSenders ? [contact.name, k] : [k, contact.name])
        })
      })

      this.config = {
        chart: {
          backgroundColor: this.theme.isDark ? '#121212' : 'white',
        },
        title: {
          text: '',
        },
        // plotOptions: {
        //   networkgraph: {
        //     keys: ['from', 'to'],
        //   },
        // },
        series: [
          {
            type: 'networkgraph',
            data,
            marker: {
              radius: 20,
            },
            dataLabels: {
              enabled: true,
              textPath: {
                enabled: true,
              },
            },
          },
        ],
      }
    },
    toggleSendersReceivers() {
      this.showSenders = !this.showSenders
      this.selectAll = true
      this.contactsToShow = this.createContactList()
    },
    onContactsChange(contacts) {
      this.contactsToShow = contacts
    },
    toggleSelectAll() {
      const toShow = new Map(this.contactsToShow)
      toShow.forEach((v, k) => toShow.set(k, !this.selectAll))
      this.selectAll = !this.selectAll
      this.contactsToShow = toShow
    },
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
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
