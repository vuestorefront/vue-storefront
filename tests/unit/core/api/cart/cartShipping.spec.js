import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] cartShipping.ts', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        cart: {
          state: {
            shipping: {
              'method_title': 'DPD Courier',
              'method_code': 'flatrate',
              'carrier_code': 'flatrate',
              'amount': 4,
              'price_incl_tax': 5,
              'default': true,
              'offline': true
            }
          },
          namespaced: true
        }
      }
    })
  })

  it('cart shipping equal to returned from api', () => {
    const wrapper = shallowMount(TestInstance, {store, localVue})
    expect(wrapper.vm.cartShipping).to.equal(store.state.cart.shipping)
  })
})
