import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import productsEquals from './../../../helpers/productsEquals';

const createBundleOptions = (options) => {
  if (!options) {
    return []
  }

  return [
    {
      option_id: 1,
      option_qty: 1
    },
    {
      option_id: 2,
      option_qty: 1
    },
    {
      option_id: 3,
      option_qty: 1
    },
    {
      option_id: 4,
      option_qty: 1
    }
  ].map((o, index) => ({ ...o, option_selections: [options[index]] }))
}

const createBundleProduct = ({ id, sku, type_id, options }): CartItem => ({
  sku,
  type_id,
  server_item_id: id,
  product_option: {
    extension_attributes: {
      bundle_options: createBundleOptions(options)
    }
  }
} as any as CartItem)

const createConfigurableProduct = ({ id, sku }): CartItem => ({
  sku,
  type_id: 'configurable',
  server_item_id: id,
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
} as any as CartItem)

describe('Cart productEquals', () => {
  it('returns true because bundle products have the same options selected', async () => {
    const product1 = createBundleProduct({ id: 1, sku: 'WG-001', type_id: 'bundle', options: [2, 4, 5, 8] })
    const product2 = createBundleProduct({ id: 2, sku: 'WG-001', type_id: 'bundle', options: [2, 4, 5, 8] })

    expect(productsEquals(product1, product2)).toBeTruthy()
  });

  it('returns false because bundle products have not the same options selected', async () => {
    const product1 = createBundleProduct({ id: 1, sku: 'WG-001', type_id: 'bundle', options: [2, 2, 5, 8] })
    const product2 = createBundleProduct({ id: 2, sku: 'WG-001', type_id: 'bundle', options: [2, 4, 5, 8] })

    expect(productsEquals(product1, product2)).toBeFalsy()
  });

  it('returns true because bundle products have the same server id', async () => {
    const product1 = createBundleProduct({ id: 1, sku: 'WG-001', type_id: 'bundle', options: null })
    const product2 = createBundleProduct({ id: 1, sku: 'WG-001', type_id: 'none', options: [2, 4, 5, 8] })

    expect(productsEquals(product1, product2)).toBeTruthy()
  });

  it('returns true because configurable products have the same sku', async () => {
    const product1 = createConfigurableProduct({ id: 1, sku: 'WG-001' })
    const product2 = createConfigurableProduct({ id: 2, sku: 'WG-001' })

    expect(productsEquals(product1, product2)).toBeTruthy()
  });
});
