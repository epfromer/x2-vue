import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

// NEED TO CLONE THESE OBJECTS

export default new Vuex.Store({
  state: {
    savedEmails: [],
    savedQuery: {},
    savedOptions: {}
  },
  getters: {
    getNumSavedEmails: state => state.savedEmails.length,
    getSavedEmail: state => i =>
      i >= 0 && i < state.savedEmails.length ? state.savedEmails[i] : {}
  },
  mutations: {
    saveEmails: (state, emails) =>
      (state.savedEmails = emails.map(email => ({ ...email }))),
    saveQuery: (state, query) => (state.savedQuery = { ...query }),
    saveOptions: (state, options) => (state.savedOptions = { ...options })
  },
  actions: {},
  modules: {}
})
