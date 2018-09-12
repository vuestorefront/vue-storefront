import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] applyCoupon.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      applyCoupon: sinon.spy()
    }

    store = new Vuex.Store({
      modules: {
        cart: {
          state: {},
          actions,
          namespaced: true
        }
      }
    })
  })

  it('dispatches cart/applyCoupon action', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#apply-coupon').trigger('click')
    expect(actions.applyCoupon).to.have.been.called
  })

  it('call applyCoupon action with couponCode as argument', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'applyCoupon')
    wrapper.find('button#apply-coupon').trigger('click')
    expect(wrapper.vm.applyCoupon).to.have.been.calledWithMatch(wrapper.vm.couponCode)
  })
})
