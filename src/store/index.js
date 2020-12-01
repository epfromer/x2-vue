import request, { gql } from 'graphql-request'
import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    // appSettingsSlice
    getDarkMode: (state) => state.darkMode,
    getThemeName: (state) => state.themeName,

    // authenticationSlice
    getAuthenticated: (state) => state.authenticated,
    getUsername: (state) => state.username,

    // custodiansSlice
    // emailSentByDaySlice
    // emailSlice
    // querySlice
    // wordCloudSlice

    getEmailById: (state) => (id) => state.emails.find((e) => e._id === id),
    getNextEmail: (state) => (id) => {
      if (!state.emails || !state.emails.length) return undefined
      const i = state.emails.findIndex((e) => e._id === id)
      return i < state.emails.length - 1 ? state.emails[i + 1] : undefined
    },
    getPreviousEmail: (state) => (id) => {
      if (!state.emails || !state.emails.length) return undefined
      const i = state.emails.findIndex((e) => e._id === id)
      return i > 0 ? state.emails[i - 1] : undefined
    },
    getEmailIndex: (state) => (id) =>
      state.emails.findIndex((e) => e._id === id) + 1,
    getContactColor: (state) => (name) =>
      state.contacts.find((c) => c.name === name).color,
    getEmailSenders: (state) => {
      const custodians = state.custodians.custodians
      const data = []
      if (state.custodians) {
        state.custodians.forEach((custodian) => {
          if (custodian.senderTotal) {
            data.push({
              name: custodian.name,
              value: custodian.senderTotal,
              color: custodian.color,
            })
          }
        })
      }
      return data
    },
    getEmailReceivers: (state) => {
      const custodians = state.custodians.custodians
      const data = []
      if (state.custodians) {
        state.custodians.forEach((custodian) => {
          if (custodian.receiverTotal) {
            data.push({
              name: custodian.name,
              value: custodian.receiverTotal,
              color: custodian.color,
            })
          }
        })
      }
      return data
    },
    getEmailSentByCustodian: (state) => {
      const custodianNameFromId = (id) => {
        if (state.custodians && state.custodians) {
          const c = state.custodians.find((c) => c.id === id)
          return c ? c.name : ''
        }
        return ''
      }

      const custodians = state.custodians
      const data = []
      const nodes = []

      if (custodians) {
        custodians.forEach((fromCustodian) => {
          fromCustodian.toCustodians.forEach((toCustodian) => {
            data.push({
              source: fromCustodian.name,
              target: custodianNameFromId(toCustodian.custodianId),
              value: toCustodian.total,
            })
          })
        })
        // and array of color keys
        custodians.forEach((custodian) => {
          nodes.push({ id: custodian.name, color: custodian.color })
        })
      }

      return { data, nodes }
    },
  },
  mutations: {
    // appSettingsSlice
    setDarkMode: (state, darkMode) => {
      state.darkMode = darkMode
    },
    setThemeName: (state, themeName) => {
      state.themeName = themeName
    },

    // authenticationSlice
    setAuthenticated: (state, authenticated) => {
      state.authenticated = authenticated
    },
    setUsername: (state, username) => {
      state.username = username
    },

    // custodiansSlice
    // emailSentByDaySlice
    // emailSlice
    setEmailLoading: (state, emailLoading) => {
      state.emailLoading = emailLoading
    },
    setEmail: (state, email) => {
      state.email = _.cloneDeep(email)
    },
    appendEmail: (state, email) => {
      if (state.email) {
        // console.log('appending email')
        state.email.push(...email)
      } else {
        // console.log('setting email')
        state.email = _.cloneDeep(email)
      }
    },
    setEmailTotal: (state, emailTotal) => {
      state.emailTotal = emailTotal
    },

    // querySlice
    // wordCloudSlice

    setCustodians: (state, custodians) => {
      state.custodians = _.cloneDeep(custodians)
    },
    setCustodiansLoading: (state, custodiansLoading) => {
      state.custodiansLoading = custodiansLoading
    },
    setEmailSentByDay: (state, emailSentByDay) => {
      state.emailSentByDay = _.cloneDeep(emailSentByDay)
    },
    setEmailSentByDayLoading: (state, emailSentByDayLoading) => {
      state.emailSentByDayLoading = emailSentByDayLoading
    },
    setWordCloud: (state, wordCloud) => {
      state.wordCloud = _.cloneDeep(wordCloud)
    },
    setWordCloudLoading: (state, wordCloudLoading) => {
      state.wordCloudLoading = wordCloudLoading
    },
    saveAppSettings: (state) => {
      localStorage.setItem('densePadding', state.densePadding)
      localStorage.setItem('darkMode', state.darkMode)
      localStorage.setItem('themePrimaryColor', state.themePrimaryColor)
      localStorage.setItem('themeSecondaryColor', state.themeSecondaryColor)
    },
    clearSearch: (state) => {
      state.sent = ''
      state.timeSpan = 0
      state.from = ''
      state.to = ''
      state.subject = ''
      state.allText = ''
      state.body = ''
    },
  },
  actions: {
    // https://vuex.vuejs.org/guide/actions.html - async mutations

    // appSettingsSlice
    loadAppSettingsAsync: async ({ commit, store }) => {
      try {
        let darkMode = false
        let themeName = defaultThemeName
        if (typeof Storage !== 'undefined') {
          if (
            localStorage.getItem('darkMode') &&
            localStorage.getItem('darkMode') === 'true'
          ) {
            darkMode = true
          }
          if (
            localStorage.getItem('themeName') &&
            localStorage.getItem('themeName') !== 'null'
          ) {
            themeName = localStorage.getItem('themeName')
          }
        } else {
          const value = await AsyncStorage.getItem('darkMode')
          if (value === 'true') darkMode = true
          value = await AsyncStorage.getItem('themeName')
          if (value) themeName = value
        }
        commit('setDarkMode', darkMode)
        commit('setThemeName', themeName)
      } catch (e) {
        console.error(e)
      }
    },
    setDarkModeAsync: async ({ commit }, darkMode) => {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('darkMode', String(darkMode))
      } else {
        await AsyncStorage.setItem('darkMode', String(darkMode))
      }
      commit('setDarkMode', darkMode)
    },
    setThemeNameAsync: async ({ commit }, themeName) => {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('themeName', themeName)
      } else {
        await AsyncStorage.setItem('themeName', themeName)
      }
      commit('setThemeName', themeName)
    },

    // authenticationSlice
    // custodiansSlice
    // emailSentByDaySlice
    // emailSlice
    // querySlice
    // wordCloudSlice
    getInitialDataAsync: ({ commit }) => {
      commit('setCustodiansLoading', true)
      commit('setEmailSentByDayLoading', true)
      commit('setWordCloudLoading', true)
      const query = gql`
        {
          getWordCloud {
            tag
            weight
          }
          getEmailSentByDay {
            sent
            total
          }
          getCustodians {
            id
            name
            title
            color
            senderTotal
            receiverTotal
            toCustodians {
              custodianId
              total
            }
          }
        }
      `
      const server = process.env.VUE_APP_X2_SERVER
      return request(`${server}/graphql/`, query)
        .then(async (data) => {
          // await sleep(5000)
          commit('setCustodians', data.getCustodians)
          commit('setCustodiansLoading', false)
          commit('setEmailSentByDay', data.getEmailSentByDay)
          commit('setEmailSentByDayLoading', false)
          commit('setWordCloud', data.getWordCloud)
          commit('setWordCloudLoading', false)
        })
        .catch((e) => console.error(e))
    },
  },
  state: {
    // appSettingsSlice
    darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
    themeName: '',
    // TODO remove
    densePadding:
      localStorage.getItem('densePadding') === 'false' ? false : true,
    themePrimaryColor: localStorage.getItem('themePrimaryColor')
      ? localStorage.getItem('themePrimaryColor')
      : '#2196f3',
    themeSecondaryColor: localStorage.getItem('themeSecondaryColor')
      ? localStorage.getItem('themeSecondaryColor')
      : '#f50057',

    // authenticationSlice
    authenticated: false,
    username: '',

    // custodiansSlice
    custodiansLoading: false,
    custodians: undefined,

    // emailSentByDaySlice
    emailSentByDayLoading: false,
    emailSentByDay: undefined,

    // emailSlice
    emailLoading: false,
    email: undefined,
    emailTotal: 0,

    // querySlice
    sort: 'sent',
    order: 1,
    sent: '',
    from: '',
    to: '',
    subject: '',
    allText: '',
    body: '',
    emailListPage: 0,

    // wordCloudSlice
    wordCloudLoading: false,
    wordCloud: undefined,
  },
})
