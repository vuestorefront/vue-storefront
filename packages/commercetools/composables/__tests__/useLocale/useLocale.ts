jest.mock('@vue-storefront/factories', () => ({
  useLocaleFactory: jest.fn(() => () => ({locale: 'en'}))
}));

jest.mock('../../src/useLocale/factoryParams', () => ({
  params: {}
}));

import { useLocaleFactory } from '@vue-storefront/factories';
import { params } from '../../src/useLocale/factoryParams';
import useLocale from '../../src/useLocale';
describe('[commercetools-composables] useLocale', () => {
  it('returns useLocale api', () => {
    expect(useLocaleFactory).toHaveBeenCalledWith(params);
    expect(useLocale()).toEqual({locale: 'en'});
  });
});
