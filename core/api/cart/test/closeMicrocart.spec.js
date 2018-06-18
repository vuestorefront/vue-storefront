import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('cart/closeMicrocart.js', () => {
  let mutations
  let store
  let state

  beforeEach(() => {
    mutations = {
      setMicrocart: sinon.spy()
    }

    state = {
      microcart: true
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

  it('calls ui/setMicrocart mutation after calling closeMicrocart', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#close-microcart').trigger('click')
    expect(mutations.setMicrocart).to.have.been.called
  })
})
