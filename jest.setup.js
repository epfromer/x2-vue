import { routes } from '@/router'
import { store } from '@/store/mockStore'
import { render } from '@testing-library/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

require('jest-fetch-mock').enableMocks()

Vue.use(Vuetify)

export function renderComp(comp, customStore) {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  return render(comp, {
    container: document.body.appendChild(root),
    vuetify: new Vuetify(),
    store: { ...store, ...customStore },
    routes,
  })
}