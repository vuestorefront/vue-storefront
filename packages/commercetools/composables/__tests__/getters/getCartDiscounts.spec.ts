import { getCartDiscounts } from './../../src/getters/cartGetters';
import { Cart } from '../../src/types/GraphQL';

interface DiscountDraft {
  id?: number,
  quantity?: number,
  requiresCoupon?: boolean,
  type?: 'Standard' | 'GiftLineItem',
  value?: number,
}

const createTestCart = (...discountDraft: DiscountDraft[]) => {
  return {
    lineItems: discountDraft.map((draft, index) => ({
      quantity: draft.quantity || 1,
      discountedPricePerQuantity: [
        {
          discountedPrice: {
            includedDiscounts: [
              {
                discount: { id: draft.id || index + 1, name: 'discount', requiresDiscountCode: draft.requiresCoupon || false, value: { type: draft.type || 'Standard' } },
                discountedAmount: { centAmount: draft.value || 100 }
              }
            ]
          }
        }
      ]
    }))
  };
};

describe('[commercetools-getters] cart helpers / getCartDiscounts', () => {
  it('returns correct discount value for lineItem with quantity = 1', () => {
    const test_cart_1 = createTestCart({ }) as any as Cart;
    expect(getCartDiscounts(test_cart_1)[0].value).toEqual(1);
  });

  it('returns discount value * quantity for lineItem with quantity > 1', () => {
    const quantity = 4;
    const value = 300;
    const test_cart_2 = createTestCart({ quantity, value }) as any as Cart;
    expect(getCartDiscounts(test_cart_2)[0].value).toEqual(quantity * value / 100);
  });

  it('returns an empty array for carts with lineItems.length = 0', () => {
    const test_cart_3 = createTestCart() as any as Cart;
    expect(getCartDiscounts(test_cart_3).length).toBe(0);
  });

  it('returns multiple agnostic discount objects for separate input discounts', () => {
    const drafts_length = 5;
    const discount_drafts = new Array(drafts_length).fill({ quantity: 1, value: 500 });
    const test_cart_4 = createTestCart(...discount_drafts) as any as Cart;
    expect(getCartDiscounts(test_cart_4).length).toBe(drafts_length);
  });

  it('sums up values of the same discount across all lineItems', () => {
    const drafts_length = 5;
    const quantity = 2;
    const value = 500;
    const discount_drafts = new Array(drafts_length).fill({ id: 1, quantity, value });
    const test_cart_5 = createTestCart(...discount_drafts) as any as Cart;
    const expected_value = drafts_length * quantity * value / 100;
    expect(getCartDiscounts(test_cart_5)[0].value).toBe(expected_value);
  });

  it('handles lineItems with empty \'discountedPricePerQuantity\' array correctly', () => {
    const drafts_length = 5;
    const quantity = 2;
    const value = 500;
    const discount_drafts = new Array(drafts_length).fill({ quantity, value });
    const test_cart_6 = createTestCart(...discount_drafts) as any as Cart;
    test_cart_6.lineItems[0].discountedPricePerQuantity = [];
    expect(getCartDiscounts(test_cart_6).length).toBe(drafts_length - 1);
  });
});
