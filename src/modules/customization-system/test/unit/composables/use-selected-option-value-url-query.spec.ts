import { Wrapper } from '@vue/test-utils';
import Vue, { defineComponent, ref } from 'vue';

import { mountWithApplicationServices } from '../../../../../../test/unit/utils/application-services';
import { useSelectedOptionValueUrlQuery } from '../../../composables/use-selected-option-value-url-query';

const mockServices = {
  route: {
    query: {}
  },
  router: {
    replace: jest.fn()
  },
  store: {},
  i18n: {
    t: jest.fn()
  }
} as any;

describe('useSelectedOptionValueUrlQuery', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
    mockServices.router.replace.mockClear();
  });

  it('serializes computed query data without serializing the computed ref', () => {
    const TestComponent = defineComponent({
      setup () {
        useSelectedOptionValueUrlQuery(
          ref([{
            id: 'size',
            optionData: {
              showInUrlQuery: true,
              sku: 'size',
              values: [{ id: 'large', sku: 'large' }]
            }
          }] as any),
          ref([{ id: 'large', sku: 'large' }] as any),
          ref({ size: 'large' }),
          ref({ sku: 'forevers' } as any),
          jest.fn(),
          jest.fn(() => ({}))
        );

        return {};
      },
      template: '<div />'
    });

    expect(() => {
      wrapper = mountWithApplicationServices(TestComponent as any, mockServices);
    }).not.toThrow();
    expect(mockServices.router.replace).toHaveBeenCalledWith({
      query: {
        size: 'large'
      }
    });
  });
});
