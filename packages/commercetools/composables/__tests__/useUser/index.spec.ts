jest.mock('@vue-storefront/core', () => ({
  useUserFactory: jest.fn(() => () => ({ user: 'api'}))
}));

jest.mock('../../src/useUser/factoryParams', () => ({
  params: {}
}));

import { useUserFactory } from '@vue-storefront/core';
import { useUserFactoryParams } from '../../src/useUser/factoryParams';
import { useUser } from '../../src/useUser';

describe('[commercetools-composables] useUser', () => {
  it('returns useUserFactory functions', () => {
    expect(useUserFactory).toHaveBeenCalledWith(useUserFactoryParams);
    expect(useUser()).toEqual({user: 'api'});
  });
});
