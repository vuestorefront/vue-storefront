import EventBus from '@vue-storefront/core/plugins/event-bus'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestInstance from './TestInstance.vue'

const localVue = createLocalVue()

describe('[newsletter] unsubscribe.ts', () => {
  let unsubscribeSpy
  let newsletter = {
    unsubscribe: (email) => {}
  }

  unsubscribeSpy = sinon.spy(newsletter, 'unsubscribe')

  EventBus.$on('newsletter-after-unsubscribe', (payload) => {
    newsletter.unsubscribe(payload)
  })

  it('emittes newsletter-after-unsubscribe event', () => {
    const wrapper = shallowMount(TestInstance, { localVue })
    wrapper.find('button#unsubscribe').trigger('click')
    expect(unsubscribeSpy).to.have.been.called
  })

  it('passes correct email address to function\'s property', () => {
    const wrapper = shallowMount(TestInstance, { localVue })
    wrapper.find('button#unsubscribe').trigger('click')
    expect(unsubscribeSpy.getCalls()[0].args[0].email).to.equal(wrapper.vm.email)
  })

})
