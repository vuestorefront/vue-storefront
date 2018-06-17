import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('cart/addToCart.js', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      addItem (context, product) { return product }
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
    const wrapper = shallowMount(TestInstance)
    expect(actions.addItem).toBeCalled()
  })
})
