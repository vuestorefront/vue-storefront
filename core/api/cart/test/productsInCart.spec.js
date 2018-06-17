import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('cart/productsInCart.js', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      cart: {
       cartItems: 'cartObj'
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected cartItems object from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.productsInCart).to.equal(state.cart.cartItems)
  })

})
