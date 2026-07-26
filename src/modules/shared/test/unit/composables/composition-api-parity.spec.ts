/* eslint-disable vue/one-component-per-file */
import Vue, {
  computed,
  defineComponent,
  del,
  onServerPrefetch,
  ref,
  set,
  watch
} from 'vue';
import { mount, Wrapper } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';

import { useCurrentInstance } from '../../../composables/use-current-instance';

async function flushWatchers (): Promise<void> {
  await Vue.nextTick();
  await Promise.resolve();
  await Vue.nextTick();
}

describe('Vue Composition API parity fixtures', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
  });

  it('preserves representative default, immediate, and deep watcher effects', async () => {
    const effects: string[] = [];

    const WatcherFixture = defineComponent({
      name: 'WatcherParityFixture',
      template: '<div />',
      setup () {
        const customizationSelection = ref('small');
        const addressCountry = ref('US');
        const upload = ref({ items: [] as string[] });
        const currency = ref('USD');
        const bannerVersion = ref('one');
        const isLoggedIn = ref(false);
        const cartOptions = ref({ selected: [] as string[] });

        watch(customizationSelection, value => {
          effects.push(`customization:${value}`);
        });
        watch(addressCountry, value => {
          effects.push(`address-reset:${value}`);
        }, { immediate: true });
        watch(upload, value => {
          effects.push(`upload:${value.items.join(',')}`);
        }, { deep: true });
        watch([currency, bannerVersion], ([currencyValue, bannerValue]) => {
          effects.push(`currency-banner:${currencyValue}:${bannerValue}`);
        });
        watch(isLoggedIn, value => {
          effects.push(`auth-restore:${value}`);
        });
        watch(cartOptions, value => {
          effects.push(`cart-options:${value.selected.join(',')}`);
        }, { deep: true });

        return {
          addressCountry,
          bannerVersion,
          cartOptions,
          currency,
          customizationSelection,
          isLoggedIn,
          upload
        };
      }
    });

    wrapper = mount(WatcherFixture as any);
    expect(effects).toEqual(['address-reset:US']);

    const fixture = wrapper.vm as Vue & {
      addressCountry: string,
      bannerVersion: string,
      cartOptions: { selected: string[] },
      currency: string,
      customizationSelection: string,
      isLoggedIn: boolean,
      upload: { items: string[] }
    };
    fixture.customizationSelection = 'large';
    fixture.addressCountry = 'CA';
    fixture.upload.items.push('photo.jpg');
    fixture.currency = 'EUR';
    fixture.bannerVersion = 'two';
    fixture.isLoggedIn = true;
    fixture.cartOptions.selected.push('gift-wrap');

    await flushWatchers();

    expect(effects).toEqual([
      'address-reset:US',
      'customization:large',
      'address-reset:CA',
      'upload:photo.jpg',
      'currency-banner:EUR:two',
      'auth-restore:true',
      'cart-options:gift-wrap'
    ]);
  });

  it('keeps set and del reactive for computed and rendered consumers', async () => {
    const ReactivityFixture = defineComponent({
      name: 'SetDelParityFixture',
      template: '<div>{{ optionSummary }}</div>',
      setup () {
        const options = ref<Record<string, string>>({});
        const optionSummary = computed(() => Object.values(options.value).join(','));

        return {
          addOption: (key: string, value: string) => set(options.value, key, value),
          removeOption: (key: string) => del(options.value, key),
          optionSummary
        };
      }
    });

    wrapper = mount(ReactivityFixture as any);
    const fixture = wrapper.vm as Vue & {
      addOption: (key: string, value: string) => void,
      removeOption: (key: string) => void,
      optionSummary: string
    };

    fixture.addOption('size', 'large');
    await flushWatchers();
    expect(fixture.optionSummary).toBe('large');
    expect(wrapper.text()).toBe('large');

    fixture.removeOption('size');
    await flushWatchers();
    expect(fixture.optionSummary).toBe('');
    expect(wrapper.text()).toBe('');
  });

  it('records plugin teardown behavior and requires native ref cleanup', async () => {
    const field = ref<HTMLInputElement | null>(null);
    const TemplateRefFixture = defineComponent({
      name: 'TemplateRefParityFixture',
      template: '<div><input ref="field"></div>',
      setup () {
        return { field };
      }
    });

    wrapper = mount(TemplateRefFixture as any);
    expect(field.value).toBeInstanceOf(HTMLInputElement);
    const mountedField = field.value;

    wrapper.destroy();
    wrapper = undefined;
    await flushWatchers();

    if (Vue.version.startsWith('2.6.')) {
      expect(field.value).toBe(mountedField);
      return;
    }

    expect(field.value).toBeNull();
  });

  it('awaits server prefetch and isolates current-instance SSR data per render', async () => {
    const renderer = createRenderer();
    const SsrFixture = defineComponent({
      name: 'ServerPrefetchParityFixture',
      template: '<div>{{ renderedHost }}</div>',
      setup () {
        const currentInstance = useCurrentInstance();
        const renderedHost = ref('pending');

        onServerPrefetch(async () => {
          await Promise.resolve();
          renderedHost.value =
            currentInstance.$ssrContext.server.request.headers.host;
        });

        return { renderedHost };
      }
    });

    async function renderForHost (host: string): Promise<string> {
      const app = new Vue({
        render: createElement => createElement(SsrFixture as any)
      });

      return renderer.renderToString(app, {
        server: {
          request: {
            headers: { host }
          }
        }
      });
    }

    const [firstRender, secondRender] = await Promise.all([
      renderForHost('first.test'),
      renderForHost('second.test')
    ]);

    expect(firstRender).toContain('<div data-server-rendered="true">first.test</div>');
    expect(secondRender).toContain('<div data-server-rendered="true">second.test</div>');
    expect(secondRender).not.toContain('first.test');
  });
});
