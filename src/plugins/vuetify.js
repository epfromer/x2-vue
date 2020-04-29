import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: localStorage.getItem('darkMode') === 'true' ? true : false,
    themes: {
      light: {
        primary: localStorage.getItem('themePrimaryColor')
          ? localStorage.getItem('themePrimaryColor')
          : '#2196f3',
        secondary: localStorage.getItem('themeSecondaryColor')
          ? localStorage.getItem('themeSecondaryColor')
          : '#f50057',
      },
      dark: {
        primary: localStorage.getItem('themePrimaryColor')
          ? localStorage.getItem('themePrimaryColor')
          : '#2196f3',
        secondary: localStorage.getItem('themeSecondaryColor')
          ? localStorage.getItem('themeSecondaryColor')
          : '#f50057',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
})
