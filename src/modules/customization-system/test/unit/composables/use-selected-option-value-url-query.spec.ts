import { mount, Wrapper } from '@vue/test-utils';
import Vue, { defineComponent, ref } from 'vue';

import { useSelectedOptionValueUrlQuery } from '../../../composables/use-selected-option-value-url-query';

const mockRoot = {
  $route: {
    query: {}
  },
  $router: {
    replace: jest.fn()
  }
};

jest.mock('src/modules/shared', () => ({
  useRootInstance: () => mockRoot
}));

describe('useSelectedOptionValueUrlQuery', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
    mockRoot.$router.replace.mockClear();
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
      wrapper = mount(TestComponent as any);
    }).not.toThrow();
    expect(mockRoot.$router.replace).toHaveBeenCalledWith({
      query: {
        size: 'large'
      }
    });
  });
});
