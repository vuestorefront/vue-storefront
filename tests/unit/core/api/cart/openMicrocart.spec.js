import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[cart] openMicrocart.ts', () => {
  let mutations
  let store
  let state

  beforeEach(() => {
    mutations = {
      setMicrocart: sinon.spy((state, payload) => state.microcart = payload )
    }

    state = {
      microcart: false
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

  it('calls ui/setMicrocart mutation after calling openMicrocart', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#open-microcart').trigger('click')
    expect(mutations.setMicrocart).to.have.been.called
  })

  it('calls ui/setMicrocart mutation with argument \'true\'', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#open-microcart').trigger('click')
    expect(state.microcart).to.equal(true)
  })
})
