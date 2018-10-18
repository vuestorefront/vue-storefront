import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] addToWishlist.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      addItem: sinon.spy()
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

  it('dispatches wishlist/addItem action after calling addToWishlist', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#add-to-wishlist').trigger('click')
    expect(actions.addItem).to.have.been.called
  })

  it('passes correct product object to function\'s product property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'addToWishlist')
    wrapper.find('button#add-to-wishlist').trigger('click')
    expect(wrapper.vm.addToWishlist).to.have.been.calledWithMatch(wrapper.vm.product)
  })
})
