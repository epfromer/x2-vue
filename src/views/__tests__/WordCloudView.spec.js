import router from '@/router'
import { mutations, state } from '@/store/mockStore'
import WordCloudView from '@/views/WordCloudView.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('WordCloudView', () => {
  let vuetify
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    store = new Vuex.Store({
      state,
      mutations,
    })
    fetch.resetMocks()
  })

  function doMount(mountType) {
    return mountType(WordCloudView, {
      localVue,
      vuetify,
      store,
      router,
    })
  }

  it('should match snapshot', () => {
    const wrapper = doMount(mount)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
