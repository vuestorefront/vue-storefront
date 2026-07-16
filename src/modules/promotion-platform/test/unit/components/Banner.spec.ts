import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Banner from '../../../components/Banner.vue';
import { Currency, DEFAULT_CURRENCY } from 'src/modules/currency';
import { CampaignContent } from '../../../types/CampaignContent.interface';
import { CountdownBanner } from '../../../types/CountdownBanner.interface';

function mockFormatPrice (value: number | null, currencySign?: string): string {
  if (value === null) {
    return '';
  }

  const formattedValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
  return `${currencySign || ''}${formattedValue}`;
}

function mockGetFinalPrice (price: { regular: number, special: number | null }): number {
  return price.special !== null && price.special < price.regular
    ? price.special
    : price.regular;
}

jest.mock('@vue-storefront/core/helpers', () => ({
  isServer: false,
  PriceHelper: {
    formatPrice: mockFormatPrice,
    getFinalPrice: mockGetFinalPrice
  }
}));

jest.mock('@vue-storefront/core/modules/catalog', () => ({
  PRODUCT_LOCALIZED_PRICE_DICTIONARY: 'product/productLocalizedPriceDictionary'
}));

jest.mock('../../../components/Timer.vue', () => ({
  name: 'CountdownTimer'
}));

jest.mock('src/modules/budsies', () => ({}));

jest.mock('src/modules/currency', () => ({
  DEFAULT_CURRENCY: { code: 'USD', name: 'US Dollar', symbol: '$' },
  GET_ACTIVE_CURRENCY: 'currency/getActiveCurrency',
  GET_CURRENCY_EXCHANGE_RATE: 'currency/getCurrencyExchangeRate'
}));

Vue.use(VueCompositionAPI as any);
Vue.use(Vuex);

interface BannerTestOptions {
  description: string,
  activeCurrency?: Currency,
  exchangeRate?: number,
  productBySkuDictionary?: Record<string, any>,
  localizedPriceDictionary?: Record<string, { regular: number, special: number | null }>,
  statisticValue?: string
}

interface CurrencyState {
  activeCurrency?: Currency,
  exchangeRate?: number
}

interface PromotionPlatformState {
  campaignContent: CampaignContent
}

function createCountdownBanner (description: string): CountdownBanner {
  return {
    date: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    version: 'version-1',
    title: 'Promotion',
    description,
    blacklist_urls: [],
    style: {
      text_color: 'ffffff',
      numbers_color: 'ffffff',
      background_color: '000000'
    }
  };
}

function createBanner (options: BannerTestOptions) {
  const productFindProducts = jest.fn(() => Promise.resolve());
  const fetchStatisticValuesByMetric = jest.fn(() => Promise.resolve());
  const campaignContent = {
    countdown: createCountdownBanner(options.description)
  };

  const store = new Store({
    modules: {
      currency: {
        namespaced: true,
        state: {
          activeCurrency: options.activeCurrency,
          exchangeRate: options.exchangeRate
        },
        getters: {
          getActiveCurrency: (state: CurrencyState) => state.activeCurrency,
          getCurrencyExchangeRate: (state: CurrencyState) => state.exchangeRate
        },
        mutations: {
          setCurrencyAndRate (state: CurrencyState, payload: { currency: Currency, exchangeRate: number }) {
            state.activeCurrency = payload.currency;
            state.exchangeRate = payload.exchangeRate;
          }
        }
      },
      product: {
        namespaced: true,
        getters: {
          getProductBySkuDictionary: () => options.productBySkuDictionary || {},
          productLocalizedPriceDictionary: () => options.localizedPriceDictionary || {}
        },
        actions: {
          findProducts: productFindProducts
        }
      },
      promotionPlatform: {
        namespaced: true,
        state: { campaignContent },
        getters: {
          campaignContent: (state: PromotionPlatformState) => state.campaignContent,
          lastClosedBannerVersionByUser: () => undefined
        }
      },
      budsies: {
        namespaced: true,
        getters: {
          getStatisticValueByMetric: () => () => options.statisticValue || '0'
        },
        actions: {
          fetchStatisticValuesByMetric
        }
      }
    }
  });

  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueCompositionAPI as any);

  const wrapper = shallowMount(Banner as any, {
    localVue,
    store,
    mocks: {
      $store: store,
      $route: { path: '/' },
      $t: (value: string) => value
    },
    stubs: {
      'countdown-timer': true
    }
  });

  return {
    wrapper,
    store,
    productFindProducts,
    fetchStatisticValuesByMetric
  };
}

function renderedDescription (wrapper: Wrapper<Vue>): string {
  return (wrapper.find('._content').element as HTMLElement).innerHTML;
}

async function waitForBannerUpdate (): Promise<void> {
  await Vue.nextTick();
  await Promise.resolve();
  await Vue.nextTick();
}

describe('promotion-platform Banner', () => {
  let wrapper: Wrapper<Vue> | undefined;

  afterEach(() => {
    wrapper?.destroy();
    wrapper = undefined;
  });

  it('renders decimal and integer priceValue directives in the default currency without loading products', async () => {
    const decimalBanner = createBanner({ description: 'Only {{ priceValue(29.99) }} today' });
    wrapper = decimalBanner.wrapper;

    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      `Only ${mockFormatPrice(29.99, DEFAULT_CURRENCY.symbol)} today`
    );
    expect(decimalBanner.productFindProducts).not.toHaveBeenCalled();

    wrapper.destroy();
    const integerBanner = createBanner({ description: 'Save {{ priceValue(30) }} now' });
    wrapper = integerBanner.wrapper;

    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      `Save ${mockFormatPrice(30, DEFAULT_CURRENCY.symbol)} now`
    );
    expect(integerBanner.productFindProducts).not.toHaveBeenCalled();
  });

  it('uses the fallback currency and exchange rate when currency state is unavailable', async () => {
    const banner = createBanner({ description: '{{ priceValue(29.99) }}' });
    wrapper = banner.wrapper;

    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      mockFormatPrice(29.99, DEFAULT_CURRENCY.symbol)
    );
  });

  it('converts fixed prices and refreshes them when currency state changes', async () => {
    const banner = createBanner({
      description: 'From {{ priceValue(29.99) }}',
      activeCurrency: { code: 'EUR', name: 'Euro', symbol: '€' },
      exchangeRate: 0.9
    });
    wrapper = banner.wrapper;

    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      `From ${mockFormatPrice(29.99 * 0.9, '€')}`
    );

    banner.store.commit('currency/setCurrencyAndRate', {
      currency: { code: 'GBP', name: 'British Pound', symbol: '£' },
      exchangeRate: 0.8
    });
    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      `From ${mockFormatPrice(29.99 * 0.8, '£')}`
    );
    expect(banner.productFindProducts).not.toHaveBeenCalled();
  });

  it('preserves surrounding HTML and existing product and statistic directives', async () => {
    const banner = createBanner({
      description: '<strong>Save</strong> {{ priceValue(30) }} with {{ productPrice(TEST-SKU) }} and {{ productSpecificPrice(TEST-SKU, special) }}; {{ orderedPlushiesCount() }} ordered',
      productBySkuDictionary: {
        'TEST-SKU': { id: 'product-id', sku: 'TEST-SKU' }
      },
      localizedPriceDictionary: {
        'product-id': { regular: 20, special: 15 }
      },
      statisticValue: '42'
    });
    wrapper = banner.wrapper;

    await waitForBannerUpdate();

    expect(renderedDescription(wrapper)).toBe(
      `<strong>Save</strong> ${mockFormatPrice(30, DEFAULT_CURRENCY.symbol)} with ${mockFormatPrice(15, DEFAULT_CURRENCY.symbol)} and ${mockFormatPrice(15, DEFAULT_CURRENCY.symbol)}; 42 ordered`
    );
    expect(banner.productFindProducts).not.toHaveBeenCalled();
    expect(banner.fetchStatisticValuesByMetric).toHaveBeenCalledTimes(1);
  });
});
