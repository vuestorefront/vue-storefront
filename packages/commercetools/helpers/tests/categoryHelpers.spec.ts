import {
  getCategoryProducts,
} from './../src/index'

const category = {
  _products: [
    { _name: 'prod1', _master: true },
    { _name: 'prod2', _master: false },
    { _name: 'prod3', _master: false },
    { _name: 'prod4', _master: false },
    { _name: 'prod5', _master: true },
    { _name: 'prod6', _master: false },
  ]
} as any

describe('[commercetools-api-client] category helpers', () => {
  it('returns empty array when there are no _products', () => {
    expect(getCategoryProducts(null)).toEqual([])
  })

  it('returns all products', () => {
    expect(getCategoryProducts(category)).toEqual(category._products)
  })

  it('returns master products', () => {
    expect(getCategoryProducts(category, { master: true })).toEqual([
      { _name: 'prod1', _master: true },
      { _name: 'prod5', _master: true },
    ])
  })
})
