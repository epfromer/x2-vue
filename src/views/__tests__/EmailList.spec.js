import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import EmailList from '@/views/EmailList.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EmailList', () => {
  let vuetify
  let store
  const state = {
    savedEmails: [
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
    ],
    savedQuery: {
      skip: 0,
      limit: 5,
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
    savedOptions: { page: 1, itemsPerPage: 5, sortBy: [], sortDesc: [] },
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
})
