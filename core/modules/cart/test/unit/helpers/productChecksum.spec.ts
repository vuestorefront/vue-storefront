import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productChecksum from './../../../helpers/productChecksum';

const configurableProduct: CartItem = {
  product_option: {
    extension_attributes: {
      configurable_item_options: [
        { option_id: '93', option_value: '53' },
        { option_id: '142', option_value: '169' }
      ]
    }
  }
} as any as CartItem;

const bundleProduct: CartItem = {
  product_option: {
    extension_attributes: {
      bundle_options: [
        { option_id: '1', option_qty: '1', option_selections: [ '2' ] },
        { option_id: '2', option_qty: '1', option_selections: [ '4' ] },
        { option_id: '3', option_qty: '1', option_selections: [ '5' ] },
        { option_id: '4', option_qty: '1', option_selections: [ '8' ] }
      ]
    }
  }
} as any as CartItem;

describe('Cart productChecksum', () => {
  it('returns checksum for bundle product', async () => {
    expect(productChecksum(bundleProduct)).toBe('3e183f026489207a9cd535d20f141e07ddfea729af58a9088b82612f');
  });

  it('returns checksum for configurable product', async () => {
    expect(productChecksum(configurableProduct)).toBe('357e8f9f8918873f12ed993c3073ddd3e8980c933034b5e2fdab10b6');
  });
});
