import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emails: [],
    totalEmails: 0,
    savedQuery: {},
    savedOptions: {},
    selected: 0,
  },
  mutations: {
    setEmails: (state, emails) => (state.emails = _.cloneDeep(emails)),
    setTotalEmails: (state, totalEmails) => (state.totalEmails = totalEmails),
    saveQuery: (state, query) => (state.savedQuery = { ...query }),
    saveOptions: (state, options) => (state.savedOptions = { ...options }),
    setSelected: (state, value) => (state.selected = value),
  },
  actions: {},
  modules: {},
})
