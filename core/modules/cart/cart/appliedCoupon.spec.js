import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] appliedCoupon.ts', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        cart: {
          state: {
            platformTotals: {
              coupon_code: 'ARMANI',
              discount_amount: '-15.04'
            }
          },
          namespaced: true
        }
      }
    })
  })

  it('applied coupon code is equal to returned from api', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.appliedCoupon.code).to.equal(store.state.cart.platformTotals.coupon_code)
  })

  it('applied discount amount is equal to returned from api', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.appliedCoupon.discount).to.equal(store.state.cart.platformTotals.discount_amount)
  })
})
