import useUserOrders from '../../src/useUserOrders';

jest.mock('@vue-storefront/commercetools-api', () => ({
  getOrders: jest.fn(async () => ({
    data: {
      me: {
        orders: { results: ['order1', 'order2', 'order3'], total: 3 }
      }
    }
  }))
}));

jest.mock('@vue-storefront/core', () => ({
  useUserOrdersFactory: (params) => () => params
}));

const context = {
  $ct: {
    api: {
      getOrders: jest.fn(async () => ({
        data: {
          me: {
            orders: { results: ['order1', 'order2', 'order3'], total: 3 }
          }
        }
      }))
    }
  }
};

describe('[commercetools-composables] useUserOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads user orders with criteria', async () => {
    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders(context, { param: 'param1' });

    expect(response).toEqual({
      data: ['order1', 'order2', 'order3'],
      total: 3
    });
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });

  it('loads user all orders', async () => {
    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders(context);

    expect(response).toEqual({
      data: ['order1', 'order2', 'order3'],
      total: 3
    });
    expect(context.$ct.api.getOrders).toBeCalled();
  });

  it('loads user orders with empty response', async () => {
    (context.$ct.api.getOrders as jest.Mock).mockReturnValue({ data: null });

    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders(context, { param: 'param1' });

    expect(response).toEqual({
      data: [],
      total: 0
    });
    expect(context.$ct.api.getOrders).toBeCalledWith({ param: 'param1' }, undefined);
  });
});

