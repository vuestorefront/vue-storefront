import Vue, {
  defineComponent,
  nextTick,
  watch
} from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import {
  createRouteView,
  I18nAdapter,
  useI18n,
  useRoute,
  useRouter,
  useStore
} from '@vue-storefront/core/application-services';
import RootState from '@vue-storefront/core/types/RootState';
import { mountWithApplicationServices } from '../../../../../test/unit/utils/application-services';

Vue.use(VueRouter);
Vue.use(Vuex);

describe('application services', () => {
  it.each([
    ['store', useStore],
    ['router', useRouter],
    ['route', useRoute],
    ['i18n', useI18n]
  ])('fails descriptively when the %s provider is missing', (serviceName, useService) => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    try {
      expect(() => useService()).toThrow(
        `Missing application service provider: ${serviceName}.`
      );
    } finally {
      consoleError.mockRestore();
    }
  });

  it('provides the exact store, router, route, and translation adapter', () => {
    const state: RootState = {
      version: '',
      __DEMO_MODE__: false,
      config: {},
      cart: {},
      checkout: {},
      cms: {},
      compare: {},
      product: {},
      shipping: {},
      user: {},
      wishlist: {},
      attribute: {},
      ui: {},
      newsletter: {},
      category: {
        current_path: '',
        current_product_query: null,
        current: {
          slug: '',
          name: ''
        },
        filters: {}
      },
      stock: {
        cache: {}
      },
      storeView: {},
      twoStageCachingDelta1: 0,
      twoStageCachingDelta2: 0,
      twoStageCachingDisabled: false,
      userTokenInvalidated: null,
      userTokenInvalidateAttemptsCount: 0,
      userTokenInvalidateLock: 0,
      url: {}
    };
    const store = new Vuex.Store<RootState>({ state });
    const router = new VueRouter({ mode: 'abstract' });
    const route = createRouteView(router);
    const i18n: I18nAdapter = {
      t: ((key: string) => `translated:${key}`) as I18nAdapter['t']
    };
    const observed: Record<string, unknown> = {};
    const Fixture = defineComponent({
      name: 'ApplicationServiceFixture',
      template: '<div />',
      setup () {
        observed.store = useStore();
        observed.router = useRouter();
        observed.route = useRoute();
        observed.translation = useI18n().t('Message');

        return {};
      }
    });

    const wrapper = mountWithApplicationServices(Fixture as any, {
      store,
      router,
      route,
      i18n
    });

    expect(observed).toEqual({
      store,
      router,
      route,
      translation: 'translated:Message'
    });
    wrapper.destroy();
  });

  it('keeps one reactive route view through push, replace, params, redirects, and records', async () => {
    const First = { template: '<div>first</div>' };
    const Second = { template: '<div>second</div>' };
    const router = new VueRouter({
      mode: 'abstract',
      routes: [
        {
          path: '/first/:id',
          name: 'first',
          component: First
        },
        {
          path: '/second',
          name: 'second',
          component: Second
        },
        {
          path: '/redirect',
          redirect: {
            name: 'second',
            query: { source: 'redirect' }
          }
        }
      ]
    });
    const route = createRouteView(router);
    const originalRouteView = route;
    const observedFullPaths: string[] = [];
    const watcher = watch(
      () => route.fullPath,
      fullPath => observedFullPaths.push(fullPath)
    );

    await router.push({
      name: 'first',
      params: { id: 'one' },
      query: { view: 'summary' }
    });
    await nextTick();
    expect(route).toBe(originalRouteView);
    expect(route.name).toBe('first');
    expect(route.params).toEqual({ id: 'one' });
    expect(route.query).toEqual({ view: 'summary' });
    expect(route.matched[0].components.default).toBe(First);

    await router.replace({
      name: 'first',
      params: { id: 'two' },
      query: { view: 'details' }
    });
    await nextTick();
    expect(route.params).toEqual({ id: 'two' });
    expect(route.query).toEqual({ view: 'details' });

    await router.push('/redirect');
    await nextTick();
    expect(route.name).toBe('second');
    expect(route.query).toEqual({ source: 'redirect' });
    expect(route.redirectedFrom).toBe('/redirect');
    expect(route.matched[0].components.default).toBe(Second);
    expect(observedFullPaths).toEqual([
      '/first/one?view=summary',
      '/first/two?view=details',
      '/second?source=redirect'
    ]);

    watcher();
  });
});
