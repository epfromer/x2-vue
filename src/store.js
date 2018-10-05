import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // current page of emails
    listEmails: [],

    // total emails that match query
    totalEmails: 0
  },
  mutations: {
    setEmails(state, emails) {
      state.listEmails = emails.listEmails;
      state.totalEmails = emails.totalEmails;
    }
  },
  actions: {
    setEmailsAsync: (context, emails) => context.commit('setEmails', emails)
  }
});
