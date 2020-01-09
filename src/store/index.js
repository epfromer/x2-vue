import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const DEFAULT_SKIP = 0
const DEFAULT_LIMIT = 25

const getSearchParamsAsEncodedString = ({
  skip,
  limit,
  toSearchString,
  senderSearchString,
  subjectSearchString,
  bodySearchString,
  clientSubmitTimeSearchString,
  clientSubmitTimeSpan,
  allTextSearchString,
  sortField,
  sortOrder
}) => {
  let params = `?skip=${skip}&limit=${limit}`
  params += toSearchString
    ? `&toSearchString=${encodeURIComponent(toSearchString)}`
    : ''
  params += senderSearchString
    ? `&senderSearchString=${encodeURIComponent(senderSearchString)}`
    : ''
  params += subjectSearchString
    ? `&subjectSearchString=${encodeURIComponent(subjectSearchString)}`
    : ''
  params += bodySearchString
    ? `&bodySearchString=${encodeURIComponent(bodySearchString)}`
    : ''
  params += clientSubmitTimeSearchString
    ? `&clientSubmitTimeSearchString=${encodeURIComponent(
        clientSubmitTimeSearchString
      )}`
    : ''
  params += clientSubmitTimeSpan
    ? `&clientSubmitTimeSpan=${encodeURIComponent(clientSubmitTimeSpan)}`
    : ''
  params += allTextSearchString
    ? `&allTextSearchString=${encodeURIComponent(allTextSearchString)}`
    : ''
  params += sortField ? `&sort=${sortField}&order=${sortOrder}` : ''

  console.log(params)
  return params
}

export default new Vuex.Store({
  state: {
    emails: [],
    totalEmails: 0,
    skip: DEFAULT_SKIP,
    limit: DEFAULT_LIMIT
  },
  mutations: {
    SET_EMAILS: (state, emails) => (state.emails = emails),
    SET_TOTAL_EMAILS: (state, totalEmails) => (state.totalEmails = totalEmails),
    SET_SKIP: (state, skip) => (state.skip = skip),
    SET_LIMIT: (state, limit) => (state.limit = limit)
  },
  actions: {
    queryEmails: async ({ commit, state }, payload) => {
      // don't mutate param, need to get skip and limit in params if not specified
      const params = Object.assign({}, payload)
      if (!params.hasOwnProperty('skip')) params.skip = state.skip
      if (!params.hasOwnProperty('limit')) params.limit = state.limit

      // convert the params to a query string
      const searchString = getSearchParamsAsEncodedString(params)
      await fetch(`${process.env.VUE_APP_EMAIL_SERVER}/email/${searchString}`)
        .then(resp => resp.json())
        .then(data => {
          // commit changes
          commit('SET_EMAILS', data.listDocs)
          commit('SET_TOTAL_EMAILS', data.total)
          commit('SET_SKIP', params.skip)
          commit('SET_LIMIT', params.limit)
        })
        // ignore errors
        .catch(() => {})
    }
  },
  getters: {
    emails: state => state.emails,
    totalEmails: state => state.totalEmails,
    skip: state => state.skip,
    limit: state => state.limit
  },
  modules: {}
})
