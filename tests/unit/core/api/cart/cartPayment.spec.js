import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] cartPayment.ts', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        cart: {
          state: {
            payment: {
              'title': 'Cash on delivery',
              'code': 'cashondelivery',
              'cost': 0,
              'costInclTax': 0,
              'default': true,
              'offline': true
            }
          },
          namespaced: true
        }
      }
    })
  })

  it('cart payment equal to returned from api', () => {
    const wrapper = shallowMount(TestInstance, {store, localVue})
    expect(wrapper.vm.cartPayment).to.equal(store.state.cart.payment)
  })
})
