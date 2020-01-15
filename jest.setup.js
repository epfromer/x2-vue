import Vue from 'vue'
import Vuetify from 'vuetify'

require('jest-fetch-mock').enableMocks()

Vue.use(Vuetify)

global.originalLogError = global.console.error

global.console.error = (...args) => {
  // not sure why getting this error
  if (args[0].includes('[Vue warn]: You may have an infinite update loop')) {
    return
  }
  global.originalLogError(...args)
}
