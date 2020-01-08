import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    // prime the pump and get initial set of emails
    this.$store.dispatch('queryEmails', { skip: 0, limit: 50 })
  },
  render: h => h(App)
}).$mount('#app')
