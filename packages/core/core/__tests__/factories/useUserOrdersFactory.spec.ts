import { UseUserOrders } from '../../src/types';
import { UseUserOrdersFactoryParams, useUserOrdersFactory } from '../../src/factories';
import { Ref } from '@vue/composition-api';

let useUserOrders: () => UseUserOrders<Readonly<Ref<Readonly<any>>>, any>;
let params: UseUserOrdersFactoryParams<any, any>;

function createComposable(): void {
  params = {
    searchOrders: jest.fn().mockResolvedValueOnce(['first', 'second'])
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
      expect(orders.value).toEqual([]);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should set search results', async () => {
        const { search, orders } = useUserOrders();
        await search({});
        expect(orders.value).toEqual(['first', 'second']);
      });

      it('should disable loading flag on error', async () => {
        const err = new Error('some-error');
        params.searchOrders = jest.fn().mockImplementationOnce(() => {
          throw err;
        });
        const { search, loading, orders, error } = useUserOrders();
        await search({});
        expect(error.value.search).toBe(err);

        expect(loading.value).toEqual(false);
        expect(orders.value).toEqual([]);
      });
    });
  });
});
