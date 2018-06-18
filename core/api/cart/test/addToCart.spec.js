import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] addToCart.js', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      addItem: sinon.spy()
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

  it('dispatches cart/addItem action after calling addToCart', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#add-to-cart').trigger('click')
    expect(actions.addItem).to.have.been.called
  })

  it('passes correct product object to product property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'addToCart')
    wrapper.find('button#add-to-cart').trigger('click')
    expect(wrapper.vm.addToCart).to.have.been.calledWithMatch(wrapper.vm.product)
  })
})
