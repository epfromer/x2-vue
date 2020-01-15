import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import EmailDetail from '@/views/EmailDetail.vue'
import { emails, state, mutations } from '@/store/mockStore'
import router from '@/router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EmailDetail', () => {
  let vuetify
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    store = new Vuex.Store({
      state,
      mutations
    })
    fetch.resetMocks()
  })

  function doMount(mountType) {
    return mountType(EmailDetail, {
      localVue,
      vuetify,
      store,
      router
    })
  }

  it('should match snapshot', () => {
    const wrapper = doMount(mount)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
