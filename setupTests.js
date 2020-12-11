import { routes } from '@/router'
import store from '@/store'
import {
  testCustodians,
  testEmail,
  testEmailSentByDay,
  testWordCloud,
} from '@/store/testData'
import { render } from '@testing-library/vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vuetify)

// https://testing-library.com/docs/vue-testing-library/intro

const getStore = () => {
  const mockStore = store
  mockStore.state.wordCloud = testWordCloud
  mockStore.state.custodians = testCustodians
  mockStore.state.emailSentByDay = testEmailSentByDay
  mockStore.state.email = testEmail
  return mockStore
}

export function renderComp(comp, props = {}, isDark = false) {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')
  window.IntersectionObserver = jest.fn(function () {
    this.observe = jest.fn()
    this.unobserve = jest.fn()
  })
  return render(comp, {
    container: document.body.appendChild(root),
    store: getStore(),
    vuetify: new Vuetify(),
    props,
    routes,
    provide: () => ({ theme: { isDark } }),
  })
}
