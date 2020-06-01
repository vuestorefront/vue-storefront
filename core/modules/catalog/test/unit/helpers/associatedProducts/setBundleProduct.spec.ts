import { createBundleProduct, createGroupProduct, createSimpleProduct } from '../../../helpers/createProduct';
import setBundleProducts from '@vue-storefront/core/modules/catalog/helpers/associatedProducts/setBundleProducts';
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

describe('setBundleProducts helper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(ProductService.getProducts as jest.Mock).mockImplementation(async () => ({ items: [] }));
  })
  it('should not fire ProductService.getProducts if it is not bundle product', async () => {
    const groupedProduct = createGroupProduct()

    setBundleProducts(groupedProduct)

    expect(ProductService.getProducts).toHaveBeenCalledTimes(0)
  })
  it('should fire ProductService.getProducts with simple configuration', async () => {
    const bundleProduct = createBundleProduct()

    setBundleProducts(bundleProduct)

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
