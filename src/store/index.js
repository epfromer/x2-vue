import request, { gql } from 'graphql-request'
import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import { defaultLimit } from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
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
  getters: {
    // component suse mapState to get to simple state items
    // these getters are for more complex state manipulation

    // appSettingsSlice

    // authenticationSlice

    // custodiansSlice
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
    getContactColor: (state) => (name) =>
      state.contacts.find((c) => c.name === name).color,

    // emailSentByDaySlice

    // emailSlice

    // querySlice
    getTo: (state) => state.emailLoading,
    getQuery: (state) => {
      const query = {
        skip: state.emailListPage * defaultLimit,
        limit: defaultLimit,
        sort: state.sort,
        order: state.order,
      }
      if (state.sent) query.sent = state.sent
      if (state.from) query.from = state.from
      if (state.to) query.to = state.to
      if (state.subject) query.subject = state.subject
      if (state.allText) query.allText = state.allText
      if (state.body) query.body = state.body
      return query
    },
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

    // wordCloudSlice
    getWordCloudLoading: (state) => state.wordCloudLoading,
    getWordCloud: (state) => state.wordCloud,
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
    setCustodiansLoading: (state, custodiansLoading) => {
      state.custodiansLoading = custodiansLoading
    },
    setCustodians: (state, custodians) => {
      state.custodians = _.cloneDeep(custodians)
    },

    // emailSentByDaySlice
    setEmailSentByDayLoading: (state, emailSentByDayLoading) => {
      state.emailSentByDayLoading = emailSentByDayLoading
    },
    setEmailSentByDay: (state, emailSentByDay) => {
      state.emailSentByDay = _.cloneDeep(emailSentByDay)
    },

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
    setSort: (state, sort) => {
      state.sort = sort
    },
    setOrder: (state, order) => {
      state.order = order
    },
    setSent: (state, sent) => {
      state.sent = sent
    },
    setFrom: (state, from) => {
      state.from = from
    },
    setTo: (state, to) => {
      state.to = to
    },
    setSubject: (state, subject) => {
      state.subject = subject
    },
    setAllText: (state, allText) => {
      state.allText = allText
    },
    setBody: (state, body) => {
      state.body = body
    },
    setEmailListPage: (state, emailListPage) => {
      state.emailListPage = emailListPage
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

    // wordCloudSlice
    setWordCloud: (state, wordCloud) => {
      state.wordCloud = _.cloneDeep(wordCloud)
    },
    setWordCloudLoading: (state, wordCloudLoading) => {
      state.wordCloudLoading = wordCloudLoading
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
    getCustodiansAsync: ({ commit }) => {
      commit('setCustodiansLoading', true)
      const server = process.env.VUE_APP_X2_SERVER
      const query = gql`
        {
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
      return request(`${server}/graphql/`, query)
        .then((data) => {
          commit('setCustodians', data.getCustodians)
          commit('setCustodiansLoading', false)
        })
        .catch((e) => console.error(e))
    },

    // emailSentByDaySlice

    // emailSlice
    getEmailAsync: ({ commit, getters }, append = false) => {
      commit('setEmailLoading', true)
      const server = process.env.VUE_APP_X2_SERVER
      // console.log(server)
      const query = gql`
        query getEmail(
          $skip: Int
          $limit: Int
          $sort: String
          $order: Int
          $sent: String
          $from: String
          $to: String
          $subject: String
          $allText: String
          $body: String
        ) {
          getEmail(
            skip: $skip
            limit: $limit
            sort: $sort
            order: $order
            sent: $sent
            from: $from
            to: $to
            subject: $subject
            allText: $allText
            body: $body
          ) {
            emails {
              id
              sent
              sentShort
              from
              fromCustodian
              to
              toCustodians
              cc
              bcc
              subject
              body
            }
            total
          }
        }
      `
      return request(`${server}/graphql/`, query, getters.getQuery)
        .then((data) => {
          if (append) {
            commit('appendEmail', data.getEmail.emails)
          } else {
            commit('setEmail', data.getEmail.emails)
          }
          commit('setEmailTotal', data.getEmail.total)
          commit('setEmailLoading', false)
        })
        .catch((e) => console.error(e))
    },

    // querySlice

    // wordCloudSlice
    getInitialDataAsync: ({ commit }) => {
      commit('setCustodiansLoading', true)
      commit('setEmailSentByDayLoading', true)
      commit('setWordCloudLoading', true)
      const server = process.env.VUE_APP_X2_SERVER
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
})
