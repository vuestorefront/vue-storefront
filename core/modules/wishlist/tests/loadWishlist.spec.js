import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstanceForLoadTest.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[wishlist] loadWishlist.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      load: sinon.spy()
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

  it('dispatches wishlist/load action on created hook', () => {
    shallowMount(TestInstance, { store, localVue })
    expect(actions.load).to.have.been.called
  })
})
