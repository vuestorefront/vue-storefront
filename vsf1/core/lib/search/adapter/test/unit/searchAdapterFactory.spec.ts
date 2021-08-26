import { getSearchAdapter } from '@vue-storefront/core/lib/search/adapter/searchAdapterFactory'

jest.mock('config', () => {
  return { server: { api: 'api' } };
});
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    log: jest.fn(() => () => {}),
    debug: jest.fn(() => () => {}),
    warn: jest.fn(() => () => {}),
    error: jest.fn(() => () => {})
  }
}));

const mockSearchAdapterModule = {
  SearchAdapter: jest.fn().mockImplementation(() => {
    return {
      search: (Request: any): void => {
      },
      registerEntityType: (entityType: string, options: any): void => {
      }
    }
  })
};

describe('Search adapter factory tests', () => {
  it('Search adapter constructor called always only once', async () => {
    jest.mock('../../api/searchAdapter', () => {
      return mockSearchAdapterModule;
    })

    const apiSearchAdapter1 = await getSearchAdapter()
    const apiSearchAdapter2 = await getSearchAdapter('api')
    expect(mockSearchAdapterModule.SearchAdapter).toHaveBeenCalledTimes(1)
  })

  it('Search adapter class is not provided', async () => {
    jest.mock(
      '../../virtual/searchAdapter',
      () => {
        return {};
      },
      { virtual: true }
    )

    await expect(getSearchAdapter('virtual')).rejects.toThrowError(new Error('Search adapter class is not provided'))
  })

  it('Search adapter class has invalid search method', async () => {
    jest.mock(
      '../../invalidSearchMethod/searchAdapter',
      () => {
        return {
          SearchAdapter: jest.fn().mockImplementation(() => {
            return {
              search: 1,
              registerEntityType: (entityType: string, options: any): void => {
              }
            }
          })
        }
      },
      { virtual: true }
    )

    await expect(getSearchAdapter('invalidSearchMethod'))
      .rejects.toThrowError(
        new Error('Not valid search adapter class provided. Search Adapter must implements SearchAdapterInterfaces')
      )
  })

  it('Search adapter class has invalid registerEntityTypeMethod method', async () => {
    jest.mock(
      '../../invalidRegisterEntityTypeMethod/searchAdapter',
      () => {
        return {
          SearchAdapter: jest.fn().mockImplementation(() => {
            return {
              search: (Request: any): void => {
              },
              registerEntityType: 1
            }
          })
        }
      },
      { virtual: true }
    )

    await expect(getSearchAdapter('invalidRegisterEntityTypeMethod'))
      .rejects.toThrowError(
        new Error('Not valid search adapter class provided. Search Adapter must implements SearchAdapterInterfaces')
      )
  })
})
