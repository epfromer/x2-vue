import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Vuex from 'vuex'
import App from './App.vue'
import { Auth0Plugin } from './auth'
import router from './router'
import store from './store'

Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  },
})

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store: new Vuex.Store(store),
  vuetify: new Vuetify({
    dark: localStorage.getItem('darkMode') === 'true' ? true : false,
    icons: {
      iconfont: 'md',
    },
  }),
  render: (h) => h(App),
}).$mount('#app')
