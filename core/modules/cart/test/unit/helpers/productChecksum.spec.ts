import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum from './../../../helpers/productChecksum';

const configurableProduct: CartItem = {
  product_option: {
    extension_attributes: {
      configurable_item_options: [
        {
          option_id: '93',
          option_value: 53
        },
        {
          option_id: '142',
          option_value: 169
        }
      ]
    }
  }
} as any as CartItem;

const bundleProduct: CartItem = {
  product_option: {
    extension_attributes: {
      bundle_options: [
        {
          option_id: 1,
          option_qty: 1,
          option_selections: [2]
        },
        {
          option_id: 2,
          option_qty: 1,
          option_selections: [4]
        },
        {
          option_id: 3,
          option_qty: 1,
          option_selections: [5]
        },
        {
          option_id: 4,
          option_qty: 1,
          option_selections: [8]
        }
      ]
    }
  }
} as any as CartItem;

describe('Cart productChecksum', () => {
  it('returns checksum for bundle product', async () => {
    expect(productChecksum(bundleProduct)).toBe('d8ba5d5baf59fe28647d6a08fdaeb683a7b39ccdebc77eecabc6457c');
  });

  it('returns checksum for configurable product', async () => {
    expect(productChecksum(configurableProduct)).toBe('0bbb27ec7a3cb5dfd1d3f6c4ee54c8b522c4063fe6ea0571794d446f');
  });
});
