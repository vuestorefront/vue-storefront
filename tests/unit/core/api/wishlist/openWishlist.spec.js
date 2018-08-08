import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] openWishlist.js', () => {
  let mutations
  let store
  let state

  beforeEach(() => {
    mutations = {
      setWishlist: sinon.spy((state, payload) => state.wishlist = payload )
    }

    state = {
      wishlist: false
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

  it('calls ui/setWishlist mutation after calling openWishlist', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#open-wishlist').trigger('click')
    expect(mutations.setWishlist).to.have.been.called
  })

  it('calls ui/setWishlist mutation with argument \'true\'', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#open-wishlist').trigger('click')
    expect(state.wishlist).to.equal(true)
  })
})
