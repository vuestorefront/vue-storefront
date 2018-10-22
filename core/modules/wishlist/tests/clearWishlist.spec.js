import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] clearWishlist.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      clear: sinon.spy()
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

  it('dispatches wishlist/clear action after calling clearWishlist', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#clear-wishlist').trigger('click')
    expect(actions.clear).to.have.been.called
  })
})
