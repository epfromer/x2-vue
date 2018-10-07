import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // current page of emails
    listEmails: [],

    // total emails that match query
    totalEmails: 0,

    // pagination: how many to skip
    skip: 0,

    // pagination: number to limit to
    limit: 5,

    // field to sort on
    sortField: 'clientSubmitTime',

    // sort order
    sortOrder: 'asc',

    // email list loading (for progress bar)?
    loading: true,

    // selected email displayed in detail pane
    selectedEmail: {}
  },
  mutations: {
    setSkip: (state, skip) => (state.skip = skip),
    setLimit: (state, limit) => (state.limit = limit),
    setSortField: (state, sortField) => (state.sortField = sortField),
    setSortOrder: (state, sortOrder) => (state.sortOrder = sortOrder),
    setLoading: (state, loading) => (state.loading = loading),
    setSelectedEmail: (state, email) => (state.selectedEmail = email),
    setEmails(state, emails) {
      state.listEmails = emails.listEmails;
      state.totalEmails = emails.totalEmails;
    }
  },
  actions: {
    setEmailsAsync: (context, emails) => context.commit('setEmails', emails),
    setSelectedEmailAsync: (context, email) =>
      context.commit('setSelectedEmail', email)
  }
});
