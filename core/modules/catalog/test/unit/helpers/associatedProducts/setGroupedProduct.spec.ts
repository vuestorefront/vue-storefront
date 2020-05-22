import { createBundleProduct, createGroupProduct, createSimpleProduct } from '../../../helpers/createProduct';
import setGroupedProduct from '@vue-storefront/core/modules/catalog/helpers/associatedProducts/setGroupedProduct';
import setProductLink from '@vue-storefront/core/modules/catalog/helpers/associatedProducts/setProductLink';
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: (str) => jest.fn()
}))
jest.mock('@vue-storefront/i18n', () => ({ t: jest.fn(str => str) }));
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {
    error: jest.fn(() => () => {})
  }
}));
jest.mock('@vue-storefront/core/store', () => ({}));
jest.mock('@vue-storefront/core/data-resolver/ProductService', () => ({
  ProductService: {
    getProducts: jest.fn(),
    getProductRenderList: jest.fn(),
    getProductByKey: jest.fn()
  }
}));
jest.mock('@vue-storefront/core/modules/catalog/helpers/associatedProducts/setProductLink', () => jest.fn());

describe('setGroupedProduct helper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(ProductService.getProducts as jest.Mock).mockImplementation(async () => ({ items: [] }));
  })
  it('should not fire ProductService.getProducts if it is not grouped product', async () => {
    const bundleProduct = createBundleProduct()

    setGroupedProduct(bundleProduct)

    expect(ProductService.getProducts).toHaveBeenCalledTimes(0)
  })
  it('should fire ProductService.getProducts with simple configuration', async () => {
    const groupedProduct = createGroupProduct()

    setGroupedProduct(groupedProduct)

    expect(ProductService.getProducts).toHaveBeenNthCalledWith(1, {
      query: expect.anything(),
      excludeFields: null,
      includeFields: null,
      options: {
        prefetchGroupProducts: false,
        fallbackToDefaultWhenNoAvailable: false,
        setProductErrors: false,
        setConfigurableProductOptions: false,
        assignProductConfiguration: false,
        separateSelectedVariant: false
      }
    })
  })
})
