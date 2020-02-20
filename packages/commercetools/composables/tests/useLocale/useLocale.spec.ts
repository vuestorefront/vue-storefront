import useLocale from '../../src/useLocale';
import { cookies } from '@vue-storefront/commercetools-api';
import mountComposable from '../_mountComposable';
import Cookies from 'js-cookie';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn()
}));

describe('[commercetools-composables] useLocale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads default values', async () => {
    const wrapper = mountComposable(useLocale);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.country).toEqual('UK');
    expect(wrapper.vm.$data.currency).toEqual('USD');
    expect(wrapper.vm.$data.locale).toEqual('en');
  });

  it('loads values from cookies', async () => {
    (Cookies.get as any).mockImplementation((cookieName) => {
      if (cookieName === cookies.countryCookieName) {
        return 'some-country';
      }
      if (cookieName === cookies.currencyCookieName) {
        return 'some-currency';
      }
      if (cookieName === cookies.localeCookieName) {
        return 'some-locale';
      }
    });

    const wrapper = mountComposable(useLocale);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.country).toEqual('some-country');
    expect(wrapper.vm.$data.currency).toEqual('some-currency');
    expect(wrapper.vm.$data.locale).toEqual('some-locale');
  });

  it('sets currency', async () => {
    const wrapper = mountComposable(useLocale);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.currency = 'EUR';
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.currency).toEqual('EUR');
    expect(Cookies.set).toBeCalled();
  });

  it('sets country', async () => {
    const wrapper = mountComposable(useLocale);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.$data.country = 'US';
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.country).toEqual('US');
    expect(Cookies.set).toBeCalled();
  });
});
