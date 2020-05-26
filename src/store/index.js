import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

function doFetch(commit, loadingIndicator, statType, stateVal) {
  commit('setVuexState', { k: loadingIndicator, v: true })
  const url = `${process.env.VUE_APP_EMAIL_SERVER}/${statType}`
  console.log(url)
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => commit('setVuexState', { k: stateVal, v: json }))
    .then(commit('setVuexState', { k: loadingIndicator, v: false }))
    .catch(() => {}) // TODO: handle errors
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
  },
  mutations: {
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
      const s = _.cloneDeep(state)
      localStorage.setItem('densePadding', state.densePadding)
      localStorage.setItem('darkMode', state.darkMode)
      localStorage.setItem('themePrimaryColor', state.themePrimaryColor)
      localStorage.setItem('themeSecondaryColor', state.themeSecondaryColor)
      return s
    },
    clearSearch: (state) => {
      const s = _.cloneDeep(state)
      s.sent = ''
      s.timeSpan = 0
      s.from = ''
      s.to = ''
      s.subject = ''
      s.allText = ''
      s.body = ''
      return s
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
        doFetch(commit, 'contactsLoading', 'contacts', 'contacts')
      }
    },
  },
  state: {
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

    // stats
    emailSentLoading: false,
    emailSent: null,
    wordCloudLoading: false,
    wordCloud: null,
    contactsLoading: false,
    contacts: null,

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
