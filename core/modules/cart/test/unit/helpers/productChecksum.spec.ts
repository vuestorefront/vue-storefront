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
    expect(productChecksum(bundleProduct)).toBe('3a3c1864b9ecd7cd66ab52d7ed2aab4fd2c8e232dffc2a59902d7b90');
  });

  it('returns checksum for configurable product', async () => {
    expect(productChecksum(configurableProduct)).toBe('c0781e146b8b799836585d19ad3b7a6fb465dfdd2b7d9dcad0793b6b');
  });
});
