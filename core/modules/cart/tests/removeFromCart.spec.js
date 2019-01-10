import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] removeFromCart.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      removeItem: sinon.spy()
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

  it('dispatches cart/removeItem action after calling removeFromCart', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    console.info(TestInstance.mixins)
    wrapper.find('button#remove-from-cart').trigger('click')
    expect(actions.removeItem).to.have.been.called
  })

  it('passes correct product object to function\s product property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'removeFromCart')
    wrapper.find('button#remove-from-cart').trigger('click')
    expect(wrapper.vm.removeFromCart).to.have.been.calledWithMatch(wrapper.vm.product)
  })
})
