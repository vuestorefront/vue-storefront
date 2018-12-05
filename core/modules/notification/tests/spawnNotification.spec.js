import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { module } from '../store'
import TestInstance from './TestInstance.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('[notification] Notification.ts', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        notification: module
      }
    })
  })

  it('adds a notification', () => {
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#spawn-notification-button').trigger('click')
    expect(store.getters['notification/notifications'].length).to.equal(1)
    expect(store.getters['notification/notifications'][0].type).to.equal('error')
    expect(store.getters['notification/notifications'][0].message).to.equal('Test message')
    expect(store.getters['notification/notifications'][0].action1.label).to.equal('OK')
  })

  it('removes a notification after 5 seconds', function(done) {
    this.timeout(10000)
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#spawn-notification-button').trigger('click')
    setTimeout(() => {
      try {
        expect(store.getters['notification/notifications'].length).to.equal(0)
        done()
      } catch(e) {
        done(e)
      }
    }, 5001)
  })

  it('removes a notification after a period of time set by timeToLive', function(done) {
    this.timeout(10000)
    const wrapper = shallowMount(TestInstance, { store, localVue })
    wrapper.find('button#spawn-notification-button2').trigger('click')
    setTimeout(() => {
      try {
        expect(store.getters['notification/notifications'].length).to.equal(0)
        done()
      } catch(e) {
        done(e)
      }
    }, 2001)
  })
})
