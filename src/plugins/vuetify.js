import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: localStorage.getItem('darkMode') === 'true' ? true : false,
  },
  icons: {
    iconfont: 'md',
  },
})
