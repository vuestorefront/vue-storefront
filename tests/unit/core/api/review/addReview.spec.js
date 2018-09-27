import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[review] addReview.ts', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      add: sinon.spy()
    }

    store = new Vuex.Store({
      modules: {
        review: {
          state: {},
          actions,
          namespaced: true
        }
      }
    })
  })

  it('dispatches review/add action after calling addReview', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#add-review').trigger('click')
    expect(actions.add).to.have.been.called
  })

  it('passes correct review object to function\'s review property', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    sinon.spy(wrapper.vm, 'addReview')
    wrapper.find('button#add-review').trigger('click')
    expect(wrapper.vm.addReview).to.have.been.calledWithMatch(wrapper.vm.review)
  })
})
