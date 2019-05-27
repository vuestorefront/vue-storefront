import {shallowMount} from '@vue/test-utils'

import { CartSummary } from '../../../components/CartSummary'

jest.mock('@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart');

describe('CartSummary', () => {
  it('can be initialized', () => {
    const wrapper = shallowMount({
      template: '<div />',
      mixins: [CartSummary]
    });

    expect(wrapper.isVueInstance()).toBe(true);
  })
});
