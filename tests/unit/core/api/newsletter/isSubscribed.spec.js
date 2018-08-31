import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[newsletter] isSubscribed.ts', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      user: {
        newsletter: {
          isSubscribed: true
        }
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected newsletter preferences from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.isSubscribed).to.equal(state.user.newsletter.isSubscribed)
  })

})
