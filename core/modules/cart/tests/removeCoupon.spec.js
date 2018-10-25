import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] removeCoupon.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      removeCoupon: sinon.spy()
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
    wrapper.find('button#remove-coupon').trigger('click')
    expect(actions.removeCoupon).to.have.been.called
  })
})
