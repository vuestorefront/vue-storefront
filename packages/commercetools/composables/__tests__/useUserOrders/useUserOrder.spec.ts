import { useUserOrder } from '../../src/useUserOrder';

const mockedResults = ['order1', 'order2', 'order3'];
const mockedTotal = 3;
const mockedEmptyResponse = { count: 0, offset: 0, results: [], total: 0};

jest.mock('@vue-storefront/commercetools-api', () => ({
  getOrders: jest.fn(async () => ({
    data: {
      me: {
        orders: { results: mockedResults, total: mockedTotal }
      }
    }
  }))
}));

jest.mock('@vue-storefront/core', () => ({
  useUserOrderFactory: ({ searchOrders }) => () => ({ search: searchOrders })
}));

const context = {
  $ct: {
    api: {
      getOrders: jest.fn(async () => ({
        data: {
          me: {
            orders: { results: mockedResults, total: mockedTotal }
          }
        }
      }))
    }
  }
};

describe('[commercetools-composables] useUserOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads user orders with criteria', async () => {
    const { search } = useUserOrder() as any;

    const response = await search(context, { param: 'param1' });

    expect(response).toEqual({ results: mockedResults, total: mockedTotal });
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });

  it('loads user all orders', async () => {
    const { search } = useUserOrder() as any;

    const response = await search(context);

    expect(response).toEqual({ results: mockedResults, total: mockedTotal });
    expect(context.$ct.api.getOrders).toBeCalled();
  });

  it('loads user orders with empty response', async () => {
    (context.$ct.api.getOrders as jest.Mock).mockReturnValue({ data: null });

    const { search } = useUserOrder() as any;

    const response = await search(context, { param: 'param1' });

    expect(response).toEqual(mockedEmptyResponse);
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });
});

