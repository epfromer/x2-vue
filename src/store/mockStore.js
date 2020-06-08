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
    wordCloud: [
      { tag: 'avici', weight: 28 },
      { tag: 'azurix', weight: 475 },
      { tag: 'backbone', weight: 161 },
      { tag: 'braveheart', weight: 27 },
    ],
    contactsLoading: false,
    contacts: [
      {
        _id: '5ec916d6fef4030598a9c835',
        senderTotal: 6,
        receiverTotal: 8,
        asSender: [
          {
            id: 'f8a62092-9ac1-4cfb-b7d4-dc828906da0b',
            to: ['Cash, Michelle'],
            sent: '2001-11-20T00:07:49.000Z',
          },
          {
            id: 'ea670da4-7e30-4296-abf4-293db35f9ff7',
            to: ['Buy, Richard'],
            sent: '2001-08-14T16:53:03.000Z',
          },
          {
            id: 'fd04ce13-2081-4c7b-9f8d-00c559925536',
            to: ['Buy, Richard'],
            sent: '2001-08-15T00:27:42.000Z',
          },
          {
            id: '3d7622e5-8598-440a-9320-456bbb0c325b',
            to: ['Buy, Richard'],
            sent: '2001-09-27T16:29:35.000Z',
          },
        ],
        asReceiver: [
          {
            id: 'd5b2ef5a-a027-489c-ad06-6def049b9f2d',
            from: 'Buy, Richard',
            sent: '2001-09-28T01:49:10.000Z',
          },
          {
            id: 'd5b2ef5a-a027-489c-ad06-6def049b9f2d',
            from: 'Buy, Richard',
            sent: '2001-09-28T01:49:10.000Z',
          },
        ],
        name: 'Watkins, Sherron',
        title: 'Vice President of Corporate Development',
        color: '#F06292',
        aliases: [
          'Sherron Watkins',
          'sherron',
          'Watkins Sherron',
          'watkins  sherron',
          'sherron_watkins@enron.net',
          'watkins',
        ],
      },
      {
        _id: '5ec916d6fef4030598a9c836',
        senderTotal: 0,
        receiverTotal: 164,
        asSender: [],
        asReceiver: [
          {
            id: 'f5a0e1bd-bf21-45af-9ead-9d0bff8c2501',
            from: 'Fleming, Rosalee',
            sent: '2000-12-13T19:24:00.000Z',
          },
          {
            id: '1d6b2d01-a893-4c64-bd6f-0246d450cc6a',
            from: 'Fleming, Rosalee',
            sent: '2000-12-14T02:04:00.000Z',
          },
          {
            id: '36b4d986-196f-4b32-868e-23dc864e86a2',
            from: 'Fleming, Rosalee',
            sent: '2000-12-14T02:02:00.000Z',
          },
          {
            id: '47c91a19-6c3b-4fca-a425-5485b07c4e6c',
            from: 'Fleming, Rosalee',
            sent: '2000-12-12T22:47:00.000Z',
          },
          {
            id: 'ce0b14ce-4e3f-4a00-a991-8fb99723e08e',
            from: 'Skilling, Jeff',
            sent: '2001-04-20T10:18:00.000Z',
          },
          {
            id: '28b4f565-2456-4607-8267-89d9a6e06b14',
            from: 'Lavorato, John',
            sent: '2000-10-10T23:35:00.000Z',
          },
          {
            id: '11ba6534-7cd6-46a7-9236-e5bc39a6d96e',
            from: 'Lavorato, John',
            sent: '1999-12-21T19:14:00.000Z',
          },
          {
            id: '3c5ed9d0-132b-4a66-bf7c-63b4a60b47cd',
            from: 'Fleming, Rosalee',
            sent: '2000-12-01T22:56:00.000Z',
          },
          {
            id: '08cac43d-70e2-415c-9f21-3ef61da479de',
            from: 'Fleming, Rosalee',
            sent: '1999-08-16T16:17:00.000Z',
          },
          {
            id: 'ec0fa1a7-9c29-4e41-bc75-0aabe9bfb794',
            from: 'Kitchen, Louise',
            sent: '2000-03-24T02:42:00.000Z',
          },
        ],
        name: 'Baxter, Cliff',
        title: 'Vice Chairman',
        color: '#5FC81D',
        aliases: [
          'cliff baxter',
          'cbaxter@enron.com',
          'Baxter@ect, Cliff',
          'Cliff, Baxter',
          'cliff baxter@ect',
          'baxter  cliff  aep',
          'baxter  cliff',
          'baxter',
          'cliff baxter/hou/ect@enron',
        ],
      },
      {
        _id: '5ec916d6fef4030598a9c838',
        senderTotal: 17,
        receiverTotal: 271,
        asSender: [
          {
            id: 'ed84944f-7d45-4c54-973c-4f5e9696c174',
            to: ['Whalley, Greg', 'Lavorato, John', 'Buy, Richard'],
            sent: '2001-08-23T15:52:44.000Z',
          },
          {
            id: '5d120d9c-3b04-4064-99b8-a56dd343606a',
            to: ['Buy, Richard', 'Glisan, Ben'],
            sent: '2001-10-03T18:35:13.000Z',
          },
          {
            id: '355f82eb-d507-4160-a3dc-55d8907db1dd',
            to: ['Buy, Richard'],
            sent: '2001-02-28T23:39:00.000Z',
          },
          {
            id: 'a2034c12-1aa0-4d71-a909-ad9ca5c7b789',
            to: ['Buy, Richard'],
            sent: '2000-02-11T00:49:00.000Z',
          },
          {
            id: '655b52c3-4d07-44d9-ad91-3363b57dd063',
            to: ['Buy, Richard'],
            sent: '2000-02-11T23:58:00.000Z',
          },
        ],
        asReceiver: [
          {
            id: '973dac60-b462-45bd-a668-bb09deac4386',
            from: 'McMahon, Jeffrey',
            sent: '2001-10-08T22:27:47.000Z',
          },
          {
            id: 'c6bb4562-731b-4b4b-aa47-482e4a9941c7',
            from: 'Buy, Richard',
            sent: '2001-01-31T07:01:00.000Z',
          },
          {
            id: '5559d4ef-e7e5-4634-abac-111d650e0de7',
            from: 'Buy, Richard',
            sent: '2001-10-03T21:38:26.000Z',
          },
          {
            id: '0ca3face-7b64-4b6c-be55-ee6bc12ea187',
            from: 'Glisan, Ben',
            sent: '2001-10-09T19:45:46.000Z',
          },
          {
            id: '58d1c387-d2d8-468b-99e8-0adfcc3d7401',
            from: 'Buy, Richard',
            sent: '2001-01-30T19:01:00.000Z',
          },
          {
            id: '38af6131-b38b-43d5-8f6e-34dcedac3b52',
            from: 'Buy, Richard',
            sent: '2001-01-30T23:58:00.000Z',
          },
          {
            id: 'b9db2813-0fe1-4239-aee9-e1da08ec5922',
            from: 'Buy, Richard',
            sent: '2000-08-04T23:53:00.000Z',
          },
          {
            id: '318256c4-a181-4035-8d97-be4855fb60a9',
            from: 'Buy, Richard',
            sent: '2001-04-23T23:55:00.000Z',
          },
        ],
        name: 'Causey, Richard',
        title: 'Executive Vice President and Chief Accounting Officer',
        color: '#558B2F',
        aliases: [
          'richard causey@enron',
          'richard causey',
          'causey',
          'Causey@enron, Richard',
          'Richard, Causey',
          'causey  richard',
          "'causey,'",
          'richard.causey@enron.com',
          "'causey",
          'rick causey@enron',
          'richard causey/corp/enron@enron',
          'rcausey@enron.com',
        ],
      },
    ],

    // app settings
    densePadding: false,
    darkMode: false,
    themePrimaryColor: '#2196f3',
    themeSecondaryColor: '#f50057',
  },
}
