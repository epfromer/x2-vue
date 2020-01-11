import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    emailIds: []
  },
  getters: {
    previousEmailId: state => id => {
      const i = state.emailIds.indexOf(id)
      console.log('')
    }
  },
  mutations: {
    setEmailIds: (state, emails) => {
      const ids = []
      emails.forEach(email => ids.push(email._id))
      state.emailIds = ids
    }
  },
  actions: {},
  modules: {}
})
