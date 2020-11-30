import request, { gql } from 'graphql-request'
import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function doFetch(commit, loadingIndicator, statType, stateVal) {
  commit('setVuexState', { k: loadingIndicator, v: true })
  const url = `${process.env.VUE_APP_X2_SERVER}/${statType}`
  console.log(url)
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => commit('setVuexState', { k: stateVal, v: json }))
    .then(commit('setVuexState', { k: loadingIndicator, v: false }))
    .catch((e) => console.log(e))
}

export default new Vuex.Store({
  getters: {
    getEmailById: (state) => (id) => state.emails.find((e) => e._id === id),
    getNextEmail: (state) => (id) => {
      if (!state.emails || !state.emails.length) return undefined
      const i = state.emails.findIndex((e) => e._id === id)
      return i < state.emails.length - 1 ? state.emails[i + 1] : undefined
    },
    getPreviousEmail: (state) => (id) => {
      if (!state.emails || !state.emails.length) return undefined
      const i = state.emails.findIndex((e) => e._id === id)
      return i > 0 ? state.emails[i - 1] : undefined
    },
    getEmailIndex: (state) => (id) =>
      state.emails.findIndex((e) => e._id === id) + 1,
    getContactColor: (state) => (name) =>
      state.contacts.find((c) => c.name === name).color,
    getEmailSenders: (state) => {
      const custodians = state.custodians.custodians
      const data = []
      if (state.custodians) {
        state.custodians.forEach((custodian) => {
          if (custodian.senderTotal) {
            data.push({
              name: custodian.name,
              value: custodian.senderTotal,
              color: custodian.color,
            })
          }
        })
      }
      return data
    },
    getEmailReceivers: (state) => {
      const custodians = state.custodians.custodians
      const data = []
      if (state.custodians) {
        state.custodians.forEach((custodian) => {
          if (custodian.receiverTotal) {
            data.push({
              name: custodian.name,
              value: custodian.receiverTotal,
              color: custodian.color,
            })
          }
        })
      }
      return data
    },
    getEmailSentByCustodian: (state) => {
      const custodianNameFromId = (id) => {
        if (state.custodians && state.custodians) {
          const c = state.custodians.find((c) => c.id === id)
          return c ? c.name : ''
        }
        return ''
      }

      const custodians = state.custodians
      const data = []
      const nodes = []

      if (custodians) {
        custodians.forEach((fromCustodian) => {
          fromCustodian.toCustodians.forEach((toCustodian) => {
            data.push({
              source: fromCustodian.name,
              target: custodianNameFromId(toCustodian.custodianId),
              value: toCustodian.total,
            })
          })
        })
        // and array of color keys
        custodians.forEach((custodian) => {
          nodes.push({ id: custodian.name, color: custodian.color })
        })
      }

      return { data, nodes }
    },
  },
  mutations: {
    setCustodians: (state, custodians) => {
      state.custodians = _.cloneDeep(custodians)
    },
    setCustodiansLoading: (state, custodiansLoading) => {
      state.custodiansLoading = custodiansLoading
    },
    setEmailSentByDay: (state, emailSentByDay) => {
      state.emailSentByDay = _.cloneDeep(emailSentByDay)
    },
    setEmailSentByDayLoading: (state, emailSentByDayLoading) => {
      state.emailSentByDayLoading = emailSentByDayLoading
    },
    setWordCloud: (state, wordCloud) => {
      state.wordCloud = _.cloneDeep(wordCloud)
    },
    setWordCloudLoading: (state, wordCloudLoading) => {
      state.wordCloudLoading = wordCloudLoading
    },
    setVuexState: (state, { k, v }) => {
      if (k === 'emails') {
        state.emails = _.cloneDeep(v)
      } else if (k === 'wordcloud') {
        state.wordcloud = _.cloneDeep(v)
      } else if (k === 'contacts') {
        state.contacts = _.cloneDeep(v)
        state.contacts.sort((a, b) => {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName < bName) return -1
          else if (aName < bName) return 1
          else return 0
        })
      } else {
        state[k] = v
      }
    },
    saveAppSettings: (state) => {
      localStorage.setItem('densePadding', state.densePadding)
      localStorage.setItem('darkMode', state.darkMode)
      localStorage.setItem('themePrimaryColor', state.themePrimaryColor)
      localStorage.setItem('themeSecondaryColor', state.themeSecondaryColor)
    },
    clearSearch: (state) => {
      state.sent = ''
      state.timeSpan = 0
      state.from = ''
      state.to = ''
      state.subject = ''
      state.allText = ''
      state.body = ''
    },
  },
  actions: {
    // https://vuex.vuejs.org/guide/actions.html
    fetchEmailSentIfNeeded: ({ commit, state }, invalidateCache) => {
      if (invalidateCache || (!state.emailSent && !state.emailSentLoading)) {
        doFetch(commit, 'emailSentLoading', 'emailsent', 'emailSent')
      }
    },
    fetchWordCloudIfNeeded: ({ commit, state }, invalidateCache) => {
      if (invalidateCache || (!state.wordCloud && !state.wordCloudLoading)) {
        doFetch(commit, 'wordCloudLoading', 'wordcloud', 'wordCloud')
      }
    },
    fetchContactsIfNeeded: ({ commit, state }, invalidateCache) => {
      if (invalidateCache || (!state.contacts && !state.contactsLoading)) {
        state.contactsLoading = true
        doFetch(commit, 'contactsLoading', 'contacts', 'contacts')
      }
    },
    getInitialDataAsync: ({ commit }) => {
      commit('setCustodiansLoading', true)
      commit('setEmailSentByDayLoading', true)
      commit('setWordCloudLoading', true)
      const query = gql`
        {
          getWordCloud {
            tag
            weight
          }
          getEmailSentByDay {
            sent
            total
          }
          getCustodians {
            id
            name
            title
            color
            senderTotal
            receiverTotal
            toCustodians {
              custodianId
              total
            }
          }
        }
      `
      const server = process.env.VUE_APP_X2_SERVER
      return request(`${server}/graphql/`, query)
        .then(async (data) => {
          // await sleep(5000)
          commit('setCustodians', data.getCustodians)
          commit('setCustodiansLoading', false)
          commit('setEmailSentByDay', data.getEmailSentByDay)
          commit('setEmailSentByDayLoading', false)
          commit('setWordCloud', data.getWordCloud)
          commit('setWordCloudLoading', false)
        })
        .catch((e) => console.error(e))
    },
  },
  state: {
    custodiansLoading: false,
    custodians: undefined,
    emailSentByDayLoading: false,
    emailSentByDay: undefined,
    emailSentLoading: false,
    emailSent: undefined,
    wordCloudLoading: false,
    wordCloud: undefined,
    contactsLoading: false,
    contacts: undefined,

    // search results
    emails: [],
    totalEmails: 0,

    // email list
    emailListPage: 1,
    emailListItemsPerPage: 5,

    // query
    querySort: 'sent',
    queryOrder: 1,
    sent: '',
    timeSpan: 0,
    from: '',
    to: '',
    subject: '',
    allText: '',
    body: '',

    // app settings
    densePadding:
      localStorage.getItem('densePadding') === 'false' ? false : true,
    darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
    themePrimaryColor: localStorage.getItem('themePrimaryColor')
      ? localStorage.getItem('themePrimaryColor')
      : '#2196f3',
    themeSecondaryColor: localStorage.getItem('themeSecondaryColor')
      ? localStorage.getItem('themeSecondaryColor')
      : '#f50057',
  },
})
