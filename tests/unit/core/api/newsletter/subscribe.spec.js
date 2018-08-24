import EventBus from '@vue-storefront/core/plugins/event-bus'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'

const localVue = createLocalVue()

describe('[newsletter] subscribe.ts', () => {
  let subscribeSpy
  let newsletter = {
    subscribe: (email) => {}
  }

  subscribeSpy = sinon.spy(newsletter, 'subscribe')

  EventBus.$on('newsletter-after-subscribe', (payload) => {
    newsletter.subscribe(payload)
  })

  it('emittes newsletter-after-subscribe event', () => {
    const wrapper = shallowMount(TestInstance, { localVue })
    wrapper.find('button#subscribe').trigger('click')
    expect(subscribeSpy).to.have.been.called
  })

  it('passes correct email address to function\'s property', () => {
    const wrapper = shallowMount(TestInstance, { localVue })
    wrapper.find('button#subscribe').trigger('click')
    expect(subscribeSpy.getCalls()[0].args[0].email).to.equal(wrapper.vm.email)
  })

})
