import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'
import getters from '@vue-storefront/store/modules/cart/getters'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] cartTotals.ts', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        cart: {
          state: {
            platformTotalSegments: [
              {'code': 'subtotal', 'title': 'Subtotal', 'value': 39.36},
              {'code': 'shipping', 'title': 'Shipping & Handling (Flat Rate - Fixed)', 'value': 5},
              {'code': 'discount', 'title': 'Discount', 'value': -4.8},
              {'code': 'tax', 'title': 'Tax', 'value': 6.26, 'area': 'taxes',
                'extension_attributes': {
                  'tax_grandtotal_details': [{
                    'amount': 6.26,
                    'rates': [{'percent': '23', 'title': 'VAT23-PL'}],
                    'group_id': 1
                  }]
                }},
              {'code': 'grand_total', 'title': 'Grand Total', 'value': 38.46, 'area': 'footer'}]
          },
          getters,
          namespaced: true
        }
      }
    })
  })

  it('returns expected cartTotals from store', () => {
    const wrapper = shallowMount(TestInstance, {store, localVue})
    expect(wrapper.vm.cartTotals).to.equal(store.state.cart.platformTotalSegments)
  })
})
