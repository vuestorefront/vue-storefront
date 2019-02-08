import {shallowMount} from '@vue/test-utils'

import { CartSummary } from '../../../components/CartSummary'

describe('CartSummary', () => {

  it('can be initialized', () => {
    const wrapper = shallowMount({
      template: "<div />",
      mixins: [CartSummary]
    });

    expect(wrapper.exists()).toBe(true);
  })
});