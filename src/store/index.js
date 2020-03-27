import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedEmails: [],
    savedQuery: {},
    savedOptions: {},
    selected: 0,
  },
  mutations: {
    saveEmails: (state, emails) =>
      (state.savedEmails = emails.map((email) => ({ ...email }))),
    saveQuery: (state, query) => (state.savedQuery = { ...query }),
    saveOptions: (state, options) => (state.savedOptions = { ...options }),
    setSelected: (state, value) => (state.selected = value),
  },
  actions: {},
  modules: {},
})
