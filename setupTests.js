import { routes } from '@/router'
import { store } from '@/store/mockStore'
import { render } from '@testing-library/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import _ from 'lodash'

require('jest-fetch-mock').enableMocks()

Vue.use(Vuetify)

// https://testing-library.com/docs/vue-testing-library/intro

export function renderComp(comp, customStore = {}, isDark = false) {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  const newStore = { ...store }
  _.merge(newStore, customStore)

  return render(comp, {
    container: document.body.appendChild(root),
    vuetify: new Vuetify(),
    store: newStore,
    routes,
    provide: () => ({ theme: { isDark } }),
  })
}