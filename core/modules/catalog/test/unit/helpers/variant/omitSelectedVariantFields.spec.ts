import omitSelectedVariantFields from '@vue-storefront/core/modules/catalog/helpers/variant/omitSelectedVariantFields'

jest.mock('config', () => ({
  products: {
    omitVariantFields: Object.freeze(['name', 'visibility'])
  }
}))

describe('omitSelectedVariantFields', () => {
  it('omits the fallback image without mutating frozen configuration', () => {
    const selectedVariant = {
      sku: 'customcollar_jazzy_blue',
      name: 'Jazzy Blue',
      visibility: 1,
      image: 'no_selection'
    }

    expect(omitSelectedVariantFields(selectedVariant)).toEqual({
      sku: 'customcollar_jazzy_blue'
    })
    expect(omitSelectedVariantFields(selectedVariant)).toEqual({
      sku: 'customcollar_jazzy_blue'
    })
    expect(jest.requireMock('config').products.omitVariantFields).toEqual([
      'name',
      'visibility'
    ])
  })

  it('retains a selected variant image', () => {
    expect(omitSelectedVariantFields({
      sku: 'customcollar_jazzy_blue',
      name: 'Jazzy Blue',
      visibility: 1,
      image: '/catalog/product/customcollar-jazzy-blue.jpg'
    })).toEqual({
      sku: 'customcollar_jazzy_blue',
      image: '/catalog/product/customcollar-jazzy-blue.jpg'
    })
  })
})
