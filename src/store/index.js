import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emails: []
  },
  getters: {
    getEmail: state => i =>
      i >= 0 && i < state.emails.length ? state.emails[i] : {},
    getNumEmails: state => state.emails.length
  },
  mutations: {
    setEmails: (state, emails) => {
      state.emails = emails
    }
  },
  actions: {},
  modules: {}
})
