import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] closeWishlist.js', () => {
  let mutations
  let store
  let state

  beforeEach(() => {
    mutations = {
      setWishlist: sinon.spy((state, payload) => state.wishlist = payload )
    }

    state = {
      wishlist: true
    }

    store = new Vuex.Store({
      modules: {
        ui: {
          state,
          mutations,
          namespaced: true
        }
      }
    })
  })

  it('calls ui/setWishlist mutation after calling closeWishlist', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#close-wishlist').trigger('click')
    expect(mutations.setWishlist).to.have.been.called
  })

  it('calls ui/setWishlist mutation with argument \'false\'', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#close-wishlist').trigger('click')
    expect(state.wishlist).to.equal(false)
  })
})
