import Vue, { defineComponent } from 'vue';
import { mount, Wrapper } from '@vue/test-utils';

import {
  useCurrentInstance,
  useRootInstance
} from '../../../composables/use-current-instance';

describe('useCurrentInstance', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
  });

  it('provides the current public instance, root, refs, and SSR context', () => {
    let currentInstance: Vue | undefined;
    let rootInstance: Vue | undefined;

    const TestComponent = defineComponent({
      name: 'CurrentInstanceFixture',
      template: '<div><span ref="target">target</span></div>',
      setup () {
        currentInstance = useCurrentInstance();
        rootInstance = useRootInstance();

        return {};
      }
    });

    wrapper = mount(TestComponent as any);

    const ssrContext = {
      server: {
        request: {
          headers: {
            host: 'instance.test'
          }
        }
      }
    };
    Object.assign(wrapper.vm.$vnode, { ssrContext });

    expect(currentInstance).toBe(wrapper.vm);
    expect(rootInstance).toBe(wrapper.vm.$root);
    expect(currentInstance?.$refs.target).toBeInstanceOf(HTMLSpanElement);
    expect(currentInstance?.$ssrContext).toBe(ssrContext);
  });

  it('fails descriptively outside component setup', () => {
    expect(() => useCurrentInstance()).toThrow(
      'useCurrentInstance() must be called during component setup.'
    );
    expect(() => useRootInstance()).toThrow(
      'useCurrentInstance() must be called during component setup.'
    );
  });

  it('preserves store, router, translation, refs, and SSR-header access', () => {
    const store = { getters: { example: 'store-value' } };
    const router = { currentRoute: { path: '/current-instance' } };
    let readServices: (() => Record<string, unknown>) | undefined;

    const TestComponent = defineComponent({
      name: 'CurrentInstanceServicesFixture',
      template: '<div><input ref="field"></div>',
      setup () {
        const currentInstance = useCurrentInstance();
        const rootInstance = useRootInstance();

        readServices = () => ({
          store: rootInstance.$store,
          router: rootInstance.$router,
          translation: rootInstance.$t('Current instance').toString(),
          field: currentInstance.$refs.field,
          host: currentInstance.$ssrContext.server.request.headers.host
        });

        return {};
      }
    });

    wrapper = mount(TestComponent as any, {
      mocks: {
        $store: store,
        $router: router,
        $t: (value: string) => `translated:${value}`
      }
    });

    Object.assign(wrapper.vm.$vnode, {
      ssrContext: {
        server: {
          request: {
            headers: {
              host: 'services.test'
            }
          }
        }
      }
    });

    expect(readServices?.()).toEqual({
      store,
      router,
      translation: 'translated:Current instance',
      field: wrapper.vm.$refs.field,
      host: 'services.test'
    });
  });
});
