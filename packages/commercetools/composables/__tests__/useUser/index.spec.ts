jest.mock('@vue-storefront/core', () => ({
  useUserFactory: jest.fn(() => ({ useUser: () => ({ user: 'api'}) }))
}));

jest.mock('../../src/useUser/factoryParams', () => ({
  params: {}
}));

import { useUserFactory } from '@vue-storefront/core';
import { params } from '../../src/useUser/factoryParams';
import { useUser } from '../../src/useUser';

describe('[commercetools-composables] useUser', () => {
  it('returns useUserFactory functions', () => {
    expect(useUserFactory).toHaveBeenCalledWith(params);
    expect(useUser()).toEqual({user: 'api'});
  });
});
