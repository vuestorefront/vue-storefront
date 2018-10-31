import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[mailer] EmailForm.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      sendEmail: sinon.spy()
    }

    store = new Vuex.Store({
      modules: {
        mailer: {
          state: {},
          actions,
          namespaced: true
        }
      }
    })
  })

  it('dispatches sendEmail action after calling sendEmail method', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#send-email').trigger('click')
    expect(actions.sendEmail).to.have.been.called
  })

  it('passes correct letter object to function\'s letter property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'sendEmail')
    wrapper.find('button#send-email').trigger('click')
    expect(wrapper.vm.sendEmail).to.have.been.calledWithMatch(wrapper.vm.letter)
  })
})
