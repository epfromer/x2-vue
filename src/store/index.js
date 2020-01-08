import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    totalEmails: 0
  },
  mutations: {
    SET_EMAILS: (state, emails) => (state.emails = emails),
    SET_TOTAL_EMAILS: (state, totalEmails) => (state.totalEmails = totalEmails)
  },
  actions: {
    queryEmails: (context, payload) => {
      const params = getSearchParamsAsEncodedString(payload)
      fetch(`${process.env.VUE_APP_EMAIL_SERVER}/email/${params}`)
        .then(resp => resp.json())
        .then(data => {
          context.commit('SET_EMAILS', data.listDocs)
          context.commit('SET_TOTAL_EMAILS', data.total)
          console.log(this.emails[0])
        })
        // ignore errors
        .catch(() => {})
    }
  },
  getters: {
    emails: state => state.emails,
    totalEmails: state => state.totalEmails
  },
  modules: {}
})
