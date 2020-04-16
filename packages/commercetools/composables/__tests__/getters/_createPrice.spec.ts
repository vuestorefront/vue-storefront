import { createPrice } from './../../src/getters/_utils';

describe('[commercetools-getters] utils/createPrice', () => {
  it('returns null prices when there is no product', () => {
    const price = createPrice(null);

    expect(price).toEqual({ regular: null, special: null });
  });

  it('returns null prices when there is no price', () => {
    const price = createPrice({ price: null } as any);

    expect(price).toEqual({ regular: null, special: null });
  });

  it('returns regular price when there is no discount', () => {
    const price = createPrice({
      price: { value: { centAmount: 250 } }
    } as any);

    expect(price).toEqual({ regular: 2.5, special: null });
  });

  it('returns regular price when discount is inactive', () => {
    const price = createPrice({
      price: {
        value: { centAmount: 250 },
        discounted: {
          discount: {
            isActive: false
          },
          value: { centAmount: 350 }
        }
      }
    } as any);

    expect(price).toEqual({ regular: 2.5, special: null });
  });

  it('returns regular and special price', () => {
    const price = createPrice({
      price: {
        value: { centAmount: 250 },
        discounted: {
          discount: {
            isActive: true
          },
          value: { centAmount: 350 }
        }
      }
    } as any);

    expect(price).toEqual({ regular: 2.5, special: 3.5 });
  });
});
