import { routes } from '@/router'
import store from '@/store'
import {
  testCustodians,
  testEmail,
  testEmailSentByDay,
  testWordCloud,
} from '@/store/testData'
import { render } from '@testing-library/vue'
import _ from 'lodash'
import Vue from 'vue'
import Vuetify from 'vuetify'

require('jest-fetch-mock').enableMocks()

Vue.use(Vuetify)

// https://testing-library.com/docs/vue-testing-library/intro

const getStore = (customStore) => {
  const mockStore = store
  mockStore.commit('setWordCloud', testWordCloud)
  mockStore.commit('setCustodians', testCustodians)
  mockStore.commit('setEmailSentByDay', testEmailSentByDay)
  mockStore.commit('setEmail', testEmail)
  return _.merge(mockStore, customStore)
}

export function renderComp(comp, props = {}, customStore = {}, isDark = false) {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')

  return render(comp, {
    container: document.body.appendChild(root),
    vuetify: new Vuetify(),
    store: getStore(customStore),
    props,
    routes,
    provide: () => ({ theme: { isDark } }),
  })
}
