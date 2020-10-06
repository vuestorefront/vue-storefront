/* eslint-disable camelcase, @typescript-eslint/camelcase */
import { isTokenUserSession } from './../../src/helpers/token';
import { setup } from './../../src/index';

describe('[commercetools-api-client] isTokenUserSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('checks if tokens belongs to user session using default implementation', () => {
    expect(isTokenUserSession({ scope: 'test' } as any)).toEqual(false);
    expect(isTokenUserSession({ scope: 'customer_id' } as any)).toEqual(true);
    expect(isTokenUserSession({ scope: 'anonymous_id' } as any)).toEqual(true);
  });

  it('checks if tokens belongs to user session using custom implementation', () => {

    const handleIsTokenUserSession = jest.fn(() => true);

    setup({ handleIsTokenUserSession } as any);

    expect(isTokenUserSession({ scope: 'test' } as any)).toEqual(true);
    expect(isTokenUserSession({ scope: 'customer_id' } as any)).toEqual(true);
    expect(isTokenUserSession({ scope: 'anonymous_id' } as any)).toEqual(true);

    expect(handleIsTokenUserSession).toBeCalledTimes(3);
  });
});
