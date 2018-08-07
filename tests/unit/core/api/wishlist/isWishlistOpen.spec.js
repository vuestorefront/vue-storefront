import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] isWishlistOpen.js', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      ui: {
       wishlist: 'wishlistVal'
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected value from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.isWishlistOpen).to.equal(state.ui.wishlist)
  })
  // TODO: Check the returned value adter state changes
})
