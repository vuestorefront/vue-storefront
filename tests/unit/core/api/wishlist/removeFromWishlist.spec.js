import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] removeFromWishlist.js', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      removeItem: sinon.spy()
    }

    store = new Vuex.Store({
      modules: {
        wishlist: {
          state: {},
          actions,
          namespaced: true
        }
      }
    })
  })

  it('dispatches wishlist/removeItem action after calling removeFromWishlist', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#remove-from-wishlist').trigger('click')
    expect(actions.removeItem).to.have.been.called
  })

  it('passes correct product object to function\'s product property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'removeFromWishlist')
    wrapper.find('button#remove-from-wishlist').trigger('click')
    expect(wrapper.vm.removeFromWishlist).to.have.been.calledWithMatch(wrapper.vm.product)
  })
})
