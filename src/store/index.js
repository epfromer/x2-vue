import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

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
  },
  mutations: {
    setVuexState: (state, { k, v }) => {
      if (k === 'emails') {
        state.emails = _.cloneDeep(v)
      } else {
        state[k] = v
      }
    },
  },
  state: {
    emails: [],
    totalEmails: 0,
    savedQuery: {}, // todo remove
    savedOptions: {}, // todo remove
    selected: 0, // todo remove
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
