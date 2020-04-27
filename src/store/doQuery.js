function encodeQuery(q) {
  // encode query for URL
  let params = ''
  Object.keys(q).forEach((key) => {
    if ((typeof q[key] == 'string' && q[key]) || typeof q[key] == 'number') {
      params += '&' + key + '=' + q[key]
    }
  })
  return '?' + params.slice(1)
}

export default async function doQuery(
  setVuexState,
  emailListPage,
  emailListItemsPerPage,
  querySort,
  queryOrder,
  sent,
  timeSpan,
  from,
  to,
  subject,
  allText,
  queryStart,
  queryFinish
) {
  // construct query
  const query = {
    skip: emailListPage * emailListItemsPerPage,
    limit: emailListItemsPerPage,
    sort: querySort,
    order: queryOrder,
  }
  if (sent) query.sent = sent
  if (timeSpan) query.timeSpan = timeSpan
  if (from) query.from = from
  if (to) query.to = to
  if (subject) query.subject = subject
  if (allText) query.allText = allText

  const encodedQuery = encodeQuery(query)

  // do fetch
  queryStart()
  const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${encodedQuery}`
  console.log(url)
  const resp = await fetch(url)
  resp
    .json()
    .then((resp) => {
      console.log('setting vuex state')
      setVuexState('emails', resp.listDocs)
      setVuexState('totalEmails', resp.total)
    })
    .catch(() => {}) // TODO: handle errors
    .then(queryFinish())
  // .then(() => console.log('loading complete'))
}
