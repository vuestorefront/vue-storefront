import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] productsInWishlist.ts', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      wishlist: {
        items: 'wishlistsItems'
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected wishlist\'s items array from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.productsInWishlist).to.equal(state.wishlist.items)
  })
  // TODO: Check the returned value adter state changes
})
