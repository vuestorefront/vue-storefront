import { UseUserOrder } from '../../src/types';
import { UseUserOrderFactoryParams, useUserOrderFactory } from '../../src/factories';
import { Ref } from '@nuxtjs/composition-api';

let useUserOrder: () => UseUserOrder<Readonly<Ref<Readonly<any>>>, any>;
let params: UseUserOrderFactoryParams<any, any>;

const defaultOrdersValue = {
  results: [],
  total: 0
};

function createComposable(): void {
  params = {
    searchOrders: jest.fn().mockResolvedValueOnce(['first', 'second'])
  };
  useUserOrder = useUserOrderFactory<any, any>(params);
}

describe('[CORE - factories] useUserOrderFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createComposable();
  });

  describe('initial setup', () => {
    it('should have proper initial props', () => {
      const { loading, orders } = useUserOrder();
      expect(loading.value).toEqual(false);
      expect(orders.value).toEqual(defaultOrdersValue);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should set search results', async () => {
        const { search, orders } = useUserOrder();
        await search({});
        expect(orders.value).toEqual(['first', 'second']);
      });

      it('should disable loading flag on error', async () => {
        const err = new Error('some-error');
        params.searchOrders = jest.fn().mockImplementationOnce(() => {
          throw err;
        });
        const { search, loading, orders, error } = useUserOrder();
        await search({});
        expect(error.value.search).toBe(err);

        expect(loading.value).toEqual(false);
        expect(orders.value).toEqual(defaultOrdersValue);
      });
    });
  });
});
