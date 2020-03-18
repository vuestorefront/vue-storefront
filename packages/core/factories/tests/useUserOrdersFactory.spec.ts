import { UseUserOrders } from '@vue-storefront/interfaces';
import { UseUserOrdersFactoryParams, useUserOrdersFactory, OrdersSearchResult } from '../src';
import { Ref } from '@vue/composition-api';

let useUserOrders: () => UseUserOrders<Readonly<Ref<Readonly<OrdersSearchResult<any>>>>>;
let params: UseUserOrdersFactoryParams<any, any>;

function createComposable(): void {
  params = {
    searchOrders: jest.fn().mockResolvedValueOnce({ data: ['first', 'second'], total: 10 })
  };
  useUserOrders = useUserOrdersFactory<any, any>(params);
}

describe('[CORE - factories] useUserOrderFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial props', () => {
      const { loading, orders } = useUserOrders();
      expect(loading.value).toEqual(false);
      expect(orders.data.value).toEqual([]);
      expect(orders.total.value).toEqual(0);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should set search results', async () => {
        const { searchOrders, orders } = useUserOrders();
        await searchOrders();
        expect(orders.data.value).toEqual(['first', 'second']);
        expect(orders.total.value).toEqual(10);
      });
    });
  });
});
