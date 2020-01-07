import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emails: [],
    totalEmails: 0
  },
  mutations: {
    SET_EMAILS: (state, emails) => {
      state.emails = emails
    },
    SET_TOTAL_EMAILS: (state, totalEmails) => {
      state.totalEmails = totalEmails
    }
  },
  actions: {
    queryEmails: (context, payload) => {
      fetch(`${process.env.VUE_APP_EMAIL_SERVER}/email`)
        .then(resp => resp.json())
        .then(data => {
          context.commit('SET_EMAILS', data.listDocs)
          context.commit('SET_TOTAL_EMAILS', data.total)
          console.log(this.emails[0])
        })
        // ignore errors
        .catch(() => {})
    }
  },
  getters: {
    getEmails: state => state.emails,
    getTotalEmails: state => state.totalEmails
  },
  modules: {}
})
