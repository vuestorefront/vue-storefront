import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[review] reviews.ts', () => {
  let store
  let state

  beforeEach(() => {
    state = {
      review: {
        items: {
          items: 'reviews'
        }
      }
    }

    store = new Vuex.Store({
      state
    })
  })

  it('returns expected reviews array from store', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    expect(wrapper.vm.reviews).to.equal(state.review.items.items)
  })
})
