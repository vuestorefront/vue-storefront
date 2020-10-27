import { UseUserOrders } from '../../src/types';
import { UseUserOrdersFactoryParams, useUserOrdersFactory, OrdersSearchResult } from '../../src/factories';
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
      const { loading, orders, totalOrders } = useUserOrders();
      expect(loading.value).toEqual(false);
      expect(orders.value).toEqual([]);
      expect(totalOrders.value).toEqual(0);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should set search results', async () => {
        const { searchOrders, orders, totalOrders } = useUserOrders();
        await searchOrders({});
        expect(orders.value).toEqual(['first', 'second']);
        expect(totalOrders.value).toEqual(10);
      });

      it('should disable loading flag on error', async () => {
        params.searchOrders = jest.fn().mockImplementationOnce(() => {
          throw new Error();
        });
        const { searchOrders, loading, orders } = useUserOrders();
        await searchOrders({});

        expect(loading.value).toEqual(false);
        expect(orders.value).toEqual([]);
      });
    });
  });
});
