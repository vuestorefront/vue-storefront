import { useUserOrder } from '../../src/useUserOrder';

const ordersResponse = {
  results: ['order1', 'order2', 'order3'],
  total: 3,
  offset: 0,
  count: 3
};

const emptyOrdersResponse = {
  results: [],
  total: 0,
  offset: 0,
  count: 0
};

jest.mock('@vue-storefront/commercetools-api', () => ({
  getOrders: jest.fn(async () => ({
    data: {
      me: {
        orders: ordersResponse
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
            orders: ordersResponse
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

    expect(response).toEqual(ordersResponse);
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });

  it('loads user all orders', async () => {
    const { search } = useUserOrder() as any;

    const response = await search(context);

    expect(response).toEqual(ordersResponse);
    expect(context.$ct.api.getOrders).toBeCalled();
  });

  it('loads user orders with empty response', async () => {
    (context.$ct.api.getOrders as jest.Mock).mockReturnValue({ data: null });

    const { search } = useUserOrder() as any;

    const response = await search(context, { param: 'param1' });

    expect(response).toEqual(emptyOrdersResponse);
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });
});

