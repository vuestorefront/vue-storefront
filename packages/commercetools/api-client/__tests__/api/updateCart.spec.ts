import updateCart from '../../src/api/updateCart';
import defaultMutation from '../../src/api/updateCart/defaultMutation';

jest.unmock('../../src/api/updateCart');

const givenVariables = {
  acceptLanguage: ['en', 'de'],
  locale: 'en',
  id: 'cart id',
  version: 1,
  actions: [{ addLineItem: {} }]
};

const createContext = (client) => ({
  config: {
    locale: 'en',
    acceptLanguage: ['en', 'de'],
    currency: 'USD',
    country: 'UK'
  },
  client,
  extendQuery: (args) => args
});

describe('[commercetools-api-client] updateCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates cart', async () => {
    const context = createContext({
      mutate: ({ variables, mutation }) => {
        expect(variables).toEqual(givenVariables);
        expect(mutation).toEqual(defaultMutation);

        return { data: 'cart response' };
      }
    });

    const { data } = await updateCart(context, {
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    });

    expect(data).toBe('cart response');
  });

  it('retries by default if error is caused by version mismatch', async () => {
    const requestMock = jest.fn()
      .mockImplementationOnce(() => {
        const error: any = new Error('Mismatch');
        error.graphQLErrors = [{ code: 'ConcurrentModification', currentVersion: 10 }];
        throw error;
      })
      .mockImplementationOnce(() => 'SECOND_RETRY');

    const context = createContext({ mutate: requestMock });

    const params = {
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    };

    await expect(updateCart(context, params)).resolves.toBe('SECOND_RETRY');
    expect(requestMock).toHaveBeenCalledTimes(2);
    expect(requestMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ variables: expect.objectContaining({ version: 1 }) }));
    expect(requestMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ variables: expect.objectContaining({ version: 10 }) }));
  });

  it('doesnt retry if it was disabled', async () => {
    const requestMock = jest.fn().mockImplementation(() => {
      const error: any = new Error('Mismatch');
      error.graphQLErrors = [{ code: 'ConcurrentModification', currentVersion: 10 }];
      throw error;
    });

    const context = createContext({ mutate: requestMock });

    const params = {
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }],
      versionFallback: false
    };

    await expect(updateCart(context, params)).rejects.toThrow(/Mismatch/);
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it('doesnt retry if error was not caused by mismatch', async () => {
    const requestMock = jest.fn().mockImplementation(() => {
      const error: any = new Error('Some error');
      error.graphQLErrors = [{ code: 'SomeRandomErrorCode' }];
      throw error;
    });

    const context = createContext({ mutate: requestMock });

    const params = {
      id: 'cart id',
      version: 1,
      actions: [{ addLineItem: {} }]
    };

    await expect(updateCart(context, params)).rejects.toThrow(/Some error/);
    expect(requestMock).toHaveBeenCalledTimes(1);
  });
});
