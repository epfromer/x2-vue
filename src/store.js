import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // current page of emails
    emails: [],

    // total emails that match query
    totalEmails: 0
  },
  mutations: {
    setEmails: (state, emails) => (state.emails = emails),
    setTotalEmails: (state, totalEmails) => (state.totalEmails = totalEmails)
  },
  actions: {
    setEmailsAsync: (context, emails) => context.commit('setEmails', emails),
    setTotalEmailsAsync: (context, totalEmails) => context.commit('setTotalEmails', totalEmails)
  }
});
