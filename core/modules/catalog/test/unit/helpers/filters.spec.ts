import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { ProductConfiguration } from '@vue-storefront/core/modules/catalog/types/ProductConfiguration';
import {
  getAvailableFiltersByProduct,
  getSelectedFiltersByProduct
} from '@vue-storefront/core/modules/catalog/helpers/filters';

const product = ({
  configurable_options: [
    {
      attribute_id: '93',
      values: [
        { value_index: 50, label: 'Blue' },
        { value_index: 52, label: 'Gray' },
        { value_index: 58, label: 'Red' }
      ],
      product_id: 755,
      id: 101,
      label: 'Color',
      position: 1,
      attribute_code: 'color'
    },
    {
      attribute_id: '142',
      values: [
        { value_index: 176, label: '32' },
        { value_index: 177, label: '33' },
        { value_index: 178, label: '34' },
        { value_index: 179, label: '36' }
      ],
      product_id: 755,
      id: 100,
      label: 'Size',
      position: 0,
      attribute_code: 'size'
    }
  ]
} as any) as Product;

describe('Product configuration', () => {
  it('returns available filters based on given product', () => {
    const availableFilters = getAvailableFiltersByProduct(product)

    expect(availableFilters).toEqual({
      color: [
        { id: 50, label: 'Blue', type: 'color' },
        { id: 52, label: 'Gray', type: 'color' },
        { id: 58, label: 'Red', type: 'color' }
      ],
      size: [
        { id: 176, label: '32', type: 'size' },
        { id: 177, label: '33', type: 'size' },
        { id: 178, label: '34', type: 'size' },
        { id: 179, label: '36', type: 'size' }
      ]
    });
  });

  it('returns selected filters based on given product and current configuration', () => {
    const configuration: ProductConfiguration = {
      color: {
        attribute_code: 'color',
        id: 52,
        label: 'Gray'
      },
      size: {
        attribute_code: 'size',
        id: 177,
        label: '33'
      }
    }
    const selectedFilters = getSelectedFiltersByProduct(product, configuration)

    expect(selectedFilters).toEqual({
      color: { id: 52, label: 'Gray', type: 'color' },
      size: { id: 177, label: '33', type: 'size' }
    })
  });
});
