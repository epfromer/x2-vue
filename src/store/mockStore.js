export const store = {
  getters: {},
  mutations: {
    setVuexState: jest.fn(),
    saveAppSettings: jest.fn(),
    clearSearch: jest.fn(),
  },
  actions: {},
  state: {
    // search results
    emails: [
      {
        _id: '5ccedc7214a5b6cd9203206d',
        body: 'foo\nbar',
        clientSubmitTime: '2001-10-29T23:17:34.000Z',
        displayBCC: '',
        displayCC: 'Catherine McCarthy; Sager  Elizabeth',
        displayTo: 'Samuel Behrends',
        senderEmailAddress: 'Marcus.Nettelton@ENRON.com',
        senderName: 'Nettelton  Marcus',
        subject: 'RE: Draft of Market rate filing',
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
        subject: 'RE: Draft of Market rate filing',
      },
    ],
    totalEmails: 2,

    // email list
    emailListPage: 1,
    emailListItemsPerPage: 5,

    // query
    querySort: 'sent',
    queryOrder: 1,
    sent: '',
    timeSpan: 0,
    from: '',
    to: '',
    subject: '',
    allText: '',
    body: '',

    // stats
    emailSentLoading: false,
    emailSent: [
      {
        sent: '1999-01-06',
        ids: ['301385bc-8730-4c5f-9d44-094fb4791352'],
      },
      {
        sent: '1999-01-07',
        ids: ['301385bc-8730-4c5f-9d44-094fb4791352'],
      },
    ],
    wordCloudLoading: false,
    wordCloud: null,
    contactsLoading: false,
    contacts: null,

    // app settings
    densePadding: false,
    darkMode: false,
    themePrimaryColor: '#2196f3',
    themeSecondaryColor: '#f50057',
  },
}
