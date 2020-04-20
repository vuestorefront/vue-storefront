import { UseUserOrders } from '../../src/types';
import { UseUserOrdersFactoryParams, useUserOrdersFactory, OrdersSearchResult } from '../../src/factories';
import { Ref } from '@vue/composition-api';
import * as vsfUtils from '../../src/utils';

jest.mock('../../src/utils');
const mockedUtils = vsfUtils as jest.Mocked<typeof vsfUtils>;
mockedUtils.onSSR.mockImplementation((fn) => fn());

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
      mockedUtils.useSSR.mockReturnValueOnce({
        initialState: null,
        saveToInitialState: jest.fn()
      });
      const { loading, orders, totalOrders } = useUserOrders();
      expect(loading.value).toEqual(false);
      expect(orders.value).toEqual([]);
      expect(totalOrders.value).toEqual(0);
    });
    it('should have proper initial props from ssr', () => {
      mockedUtils.useSSR.mockReturnValueOnce({
        initialState: { data: [{ x: 1 }], total: 5 },
        saveToInitialState: jest.fn()
      });
      const { loading, orders, totalOrders } = useUserOrders();
      expect(loading.value).toEqual(false);
      expect(orders.value).toEqual([{ x: 1 }]);
      expect(totalOrders.value).toEqual(5);
    });
  });

  describe('methods', () => {
    describe('search', () => {
      it('should set search results', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        const { searchOrders, orders, totalOrders } = useUserOrders();
        await searchOrders();
        expect(orders.value).toEqual(['first', 'second']);
        expect(totalOrders.value).toEqual(10);
      });

      it('should disable loading flag on error', async () => {
        mockedUtils.useSSR.mockReturnValueOnce({
          initialState: null,
          saveToInitialState: jest.fn()
        });
        params.searchOrders = jest.fn().mockImplementationOnce(() => {
          throw new Error();
        });
        const { searchOrders, loading } = useUserOrders();
        await expect(searchOrders()).rejects.toThrow(Error);
        expect(loading.value).toEqual(false);
      });
    });
  });
});
