import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import EmailList from '@/views/EmailList.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EmailList', () => {
  let vuetify
  let store
  const emails = [
    {
      _id: '5ccedc7214a5b6cd9203206d',
      body: 'foo',
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
  const getters = {
    getNumSavedEmails: () => 10,
    getSavedEmail: () => ({})
  }
  const mutations = {
    saveEmails: jest.fn(),
    saveQuery: jest.fn(),
    saveOptions: jest.fn(),
    setSelected: jest.fn()
  }

  beforeEach(() => {
    vuetify = new Vuetify()
    store = new Vuex.Store({
      state,
      getters,
      mutations
    })
    fetch.resetMocks()
  })

  function doMount(mountType) {
    return mountType(EmailList, {
      localVue,
      vuetify,
      store
    })
  }

  it('should match snapshot', () => {
    const wrapper = doMount(mount)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('saves state', () => {
    const wrapper = doMount(shallowMount)
    wrapper.vm.saveState(0)
    expect(mutations.saveQuery).toHaveBeenCalled()
    expect(mutations.saveEmails).toHaveBeenCalled()
    expect(mutations.saveOptions).toHaveBeenCalled()
    expect(mutations.setSelected).toHaveBeenCalled()
  })

  it('restores state', () => {
    const wrapper = doMount(shallowMount)
    wrapper.vm.restoreState()
    expect(wrapper.vm.query).toEqual(state.savedQuery)
    expect(wrapper.vm.options).toEqual(state.savedOptions)
    expect(wrapper.vm.selected).toEqual(state.selected)
    expect(wrapper.vm.emails).toEqual(state.savedEmails)
  })

  it('encoded params', () => {
    const wrapper = doMount(shallowMount)
    expect(wrapper.vm.encodedParams).toEqual('?skip=0&limit=5')
  })

  it('fetch emails', () => {
    const wrapper = doMount(mount)
    wrapper.vm.restoreState()
    wrapper.vm.doQuery()
    expect(fetch.mock.calls.length).toEqual(2)
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=0&limit=5'
    )
    expect(fetch.mock.calls[1][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=0&limit=5&sort=toSearchString&order=1'
    )
  })

  it('options.itemsPerPage', () => {
    const wrapper = doMount(shallowMount)
    wrapper.setData({ options: { itemsPerPage: 25 } })
    wrapper.vm.doQuery()
    expect(fetch.mock.calls.length).toEqual(2)
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=0&limit=5'
    )
    expect(fetch.mock.calls[1][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=0&limit=25'
    )
  })

  it('options.page', () => {
    const wrapper = doMount(shallowMount)
    wrapper.setData({ options: { page: 2 } })
    wrapper.vm.doQuery()
    expect(fetch.mock.calls.length).toEqual(2)
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=0&limit=5'
    )
    expect(fetch.mock.calls[1][0]).toEqual(
      'https://x2-server-mongodb.herokuapp.com/email/?skip=5&limit=5'
    )
  })
})
