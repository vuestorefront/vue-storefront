import { createBundleProduct, createGroupProduct, createSimpleProduct } from '../../../helpers/createProduct';
import setProductLink from '@vue-storefront/core/modules/catalog/helpers/associatedProducts/setProductLink';

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

describe('setProductLink helper', () => {
  it('should add product if associatedProduct exist for bundle link', async () => {
    const bundleProduct = createBundleProduct()
    const productLink = bundleProduct.bundle_options[0].product_links[0]
    const simpleProduct = createSimpleProduct()

    setProductLink(productLink, simpleProduct)

    expect(productLink.product).toStrictEqual(simpleProduct)
    expect(productLink.product.qty).toBe(1)
  })
  it('should add product if associatedProduct exist for group link', async () => {
    const groupProduct = createGroupProduct()
    const productLink = groupProduct.product_links[0]
    const simpleProduct = createSimpleProduct()

    setProductLink(productLink, simpleProduct)

    expect(productLink.product).toStrictEqual(simpleProduct)
    expect(productLink.product.qty).toBe(1)
  })
  it('should not add product if associatedProduct doesn\'t exist', async () => {
    const groupProduct = createGroupProduct()
    const productLink = groupProduct.product_links[0]

    setProductLink(productLink, null)

    expect(productLink.product).toBe(undefined)
  })
})
