import useUserOrders from '../../src/useUserOrders';
import { getMyOrders } from '@vue-storefront/commercetools-api';

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMyOrders: jest.fn(async () => ({
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

describe('[commercetools-composables] useUserOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads user orders with criteria', async () => {
    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders({ param: 'param1' });

    expect(response).toEqual({
      data: ['order1', 'order2', 'order3'],
      total: 3
    });
    expect(getMyOrders).toBeCalledWith({ param: 'param1' });
  });

  it('loads user all orders', async () => {
    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders();

    expect(response).toEqual({
      data: ['order1', 'order2', 'order3'],
      total: 3
    });
    expect(getMyOrders).toBeCalled();
  });

  it('loads user orders with empty response', async () => {
    (getMyOrders as any).mockReturnValue({ data: null });

    const { searchOrders } = useUserOrders() as any;

    const response = await searchOrders({ param: 'param1' });

    expect(response).toEqual({
      data: [],
      total: 0
    });
    expect(getMyOrders).toBeCalledWith({ param: 'param1' });
  });
});

