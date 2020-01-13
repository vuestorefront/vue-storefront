import * as types from '../../../store/mutation-types';
import wishlistMutations from '../../../store/mutations'

describe('Wishlist mutations', () => {
  let product1;
  let product2;
  let product3;

  beforeEach(() => {
    product1 = {
      sku: 'example-product-id1',
      qty: 123
    };

    product2 = {
      sku: 'example-product-id2',
      qty: 456
    };

    product3 = {
      sku: 'example-product-id3',
      qty: 789
    };
  });

  describe('WISH_ADD_ITEM', () => {
    it('should add exactly one product to wishlist if it does not exist there', () => {
      const mockState = {
        items: []
      };

      const expectedState = {
        items: [{ ...product1, qty: 1 }]
      };

      (wishlistMutations as any)[types.WISH_ADD_ITEM](mockState, { product: product1 });

      expect(mockState).toEqual(expectedState);
    });

    it('should not add product to wishlist if it exists there', () => {
      const mockState = {
        items: [{ ...product1 }]
      };

      const expectedState = {
        items: [{ ...product1 }]
      };

      (wishlistMutations as any)[types.WISH_ADD_ITEM](mockState, { product: product1 });

      expect(mockState).toEqual(expectedState);
    });
  });

  describe('WISH_DEL_ITEM', () => {
    it('should remove existing product from wishlist', () => {
      const mockState = {
        items: [{ ...product1 }, { ...product2 }, { ...product3 }]
      };

      const expectedState = {
        items: [{ ...product1 }, { ...product2 }]
      };

      (wishlistMutations as any)[types.WISH_DEL_ITEM](mockState, { product: product3 });

      expect(mockState).toEqual(expectedState);
    });

    it('should not modify wishlist if product does not exist there', () => {
      const mockState = {
        items: [{ ...product1 }, { ...product2 }]
      };

      const expectedState = {
        items: [{ ...product1 }, { ...product2 }]
      };

      (wishlistMutations as any)[types.WISH_DEL_ITEM](mockState, { product: product3 });

      expect(mockState).toEqual(expectedState);
    });
  });

  describe('WISH_LOAD_WISH', () => {
    it('should init wishlist', () => {
      const mockState = {
        items: [{ ...product1 }]
      };

      const expectedState = {
        items: [{ ...product2 }, { ...product3 }]
      };

      (wishlistMutations as any)[types.WISH_LOAD_WISH](mockState, [{ ...product2 }, { ...product3 }]);

      expect(mockState).toEqual(expectedState);
    });

    it('should init wishlist with empty array if loaded wishlist is falsy', () => {
      const mockState = {
        items: [{ ...product1 }]
      };

      const expectedState = {
        items: []
      };

      (wishlistMutations as any)[types.WISH_LOAD_WISH](mockState, null);

      expect(mockState).toEqual(expectedState);
    });
  });

  describe('WISH_DEL_ALL_ITEMS', () => {
    it('should delete all products from wishlist', () => {
      const mockState = {
        items: [{ ...product1 }, { ...product2 }, { ...product3 }]
      };

      const expectedState = {
        items: []
      };

      (wishlistMutations as any)[types.WISH_DEL_ALL_ITEMS](mockState);

      expect(mockState).toEqual(expectedState);
    });
  });

  describe('SET_WISHLIST_LOADED', () => {
    it('should set loaded state for wishlist', () => {
      const mockState = {
        loaded: false
      };

      const expectedState = {
        loaded: true
      };

      (wishlistMutations as any)[types.SET_WISHLIST_LOADED](mockState);

      expect(mockState).toEqual(expectedState);
    });
  });
});
