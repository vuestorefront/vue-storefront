import Vuex from 'vuex'
import {shallowMount, createLocalVue} from '@vue/test-utils'

import { CartSummary } from '../../../components/CartSummary'

jest.mock('@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart', () => (
  {
    methods: {
      microcartMixnIsImported: () => true,
    }
  }
));

const localVue = createLocalVue();

localVue.use(Vuex);

describe('CartSummary', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      'cart/totals': () => 'foo',
      'cart/isVirtualCart': () => 'bar'
    };

    store = new Vuex.Store({
      getters
    })
  });

  it('has all necessary mixins and computed properties', () => {
    const wrapper = shallowMount({
      template: "<div />",
      mixins: [CartSummary]
    }, { store, localVue });

    expect((<any> wrapper.vm).totals).toBe(getters['cart/totals']());
    expect((<any> wrapper.vm).isVirtualCart).toBe(getters['cart/isVirtualCart']());
    expect((<any> wrapper.vm).microcartMixnIsImported()).toBe(true);
  })
});
