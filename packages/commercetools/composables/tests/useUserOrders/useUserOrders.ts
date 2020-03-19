import { useUserOrders } from '../../src';
import { getMyOrders } from '@vue-storefront/commercetools-api';

jest.mock('@vue-storefront/commercetools-api', () => ({
  getMyOrders: jest.fn()
}));

describe('[commercetools-composables] useUserOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has proper initial state', () => {
    const { orders, totalOrders, loading } = useUserOrders();
    expect(loading.value).toEqual(false);
    expect(orders.value).toEqual([]);
    expect(totalOrders.value).toEqual(0);
  });

  describe('search orders', () => {
    it('gets no params and resolves to orders list', async () => {
      (getMyOrders as jest.Mock).mockResolvedValueOnce({ data: { me: { orders: { results: [{ id: 'first' }, { id: 'second' }], total: 10 } } } });
      const { orders, totalOrders, searchOrders } = useUserOrders();
      await searchOrders();
      expect(orders.value).toEqual([{ id: 'first' }, { id: 'second' }]);
      expect(totalOrders.value).toEqual(10);
      expect(getMyOrders).toBeCalledWith({});
    });

    it('gets order id and passes it to api client', async () => {
      (getMyOrders as jest.Mock).mockResolvedValueOnce({ data: { me: { orders: { results: [{ id: 'first' }], total: 1 } } } });
      const { orders, totalOrders, searchOrders } = useUserOrders();
      await searchOrders({ id: 'first' });
      expect(getMyOrders).toBeCalledWith({ id: 'first' });
      expect(orders.value).toEqual([{ id: 'first' }]);
      expect(totalOrders.value).toEqual(1);
    });

    it('gets empty result from api client', async () => {
      (getMyOrders as jest.Mock).mockResolvedValueOnce({});
      const { orders, totalOrders, searchOrders } = useUserOrders();
      await searchOrders();
      expect(orders.value).toEqual([]);
      expect(totalOrders.value).toEqual(0);
    });
  });
});
