import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] isMicrocartOpen.ts', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      cart: {
        isMicrocartOpen: 'microcartVal'
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected value from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.isOpen).to.equal(state.cart.isMicrocartOpen)
  })
  // TODO: Check the returned value adter state changes
})
