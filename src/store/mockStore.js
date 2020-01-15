const emails = [
  {
    _id: '5ccedc7214a5b6cd9203206d',
    body: 'foo\nbar',
    clientSubmitTime: '2001-10-29T23:17:34.000Z',
    displayBCC: '',
    displayCC: 'Catherine McCarthy; Sager  Elizabeth',
    displayTo: 'Samuel Behrends',
    senderEmailAddress: 'Marcus.Nettelton@ENRON.com',
    senderName: 'Nettelton  Marcus',
    subject: 'RE: Draft of Market rate filing'
  },
  {
    _id: '5ccedc7214a5b6cd9203206f',
    body: 'bar',
    clientSubmitTime: '2001-10-29T22:55:22.000Z',
    displayBCC: '',
    displayCC: 'Sager  Elizabeth',
    displayTo: 'Samuel Behrends',
    senderEmailAddress: 'Marcus.Nettelton@ENRON.com',
    senderName: 'Nettelton  Marcus',
    subject: 'RE: Draft of Market rate filing'
  }
]
const state = {
  savedEmails: emails,
  savedQuery: {
    skip: 20,
    limit: 100,
    allTextSearchString: null,
    sort: '',
    order: '',
    toSearchString: '',
    senderSearchString: '',
    subjectSearchString: '',
    bodySearchString: '',
    clientSubmitTimeSearchString: '',
    clientSubmitTimeSpan: ''
  },
  savedOptions: {
    page: 1,
    itemsPerPage: 5,
    sortBy: ['toSearchString'],
    sortDesc: [false]
  },
  selected: 0
}
const mutations = {
  saveEmails: jest.fn(),
  saveQuery: jest.fn(),
  saveOptions: jest.fn(),
  setSelected: jest.fn()
}

export { emails, state, mutations }
