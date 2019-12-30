import enhanceCategory from './../../src/helpers/internals/enhanceCategory'

const categoryResponse = {
  data: {
    categories: {
      results: [
        { name: 'cat1', id: 'bbb' },
        { name: 'cat2', id: 'aaa' },
        { name: 'cat3', id: 'fcd' },
      ]
    }
  }
} as any

const productResponse = {
  data: {
    products: {
      results: [
        { name: 'prod1' },
        { name: 'prod2' },
        { name: 'prod3' },
        { name: 'prod4' },
      ]
    },
    _variants: [
      { _name: 'prod1', _categoriesRef: ['aaa', 'bbb', 'ccc'] },
      { _name: 'prod2', _categoriesRef: ['ddd', 'ase', 'erx'] },
      { _name: 'prod3', _categoriesRef: ['yty', 'bbb', 'fer'] },
      { _name: 'prod4', _categoriesRef: ['aaa', 'fcd', 'etf'] },
    ]
  }
} as any

describe('[commercetools-composables] enhanceCategory', () => {
  it('returns category response with the products inside', () => {
    expect(enhanceCategory(categoryResponse, productResponse)).toEqual({
      data: {
        categories: {
          results: [
            { name: 'cat1', id: 'bbb', _products: [
              { _name: 'prod1', _categoriesRef: ['aaa', 'bbb', 'ccc'] },
              { _name: 'prod3', _categoriesRef: ['yty', 'bbb', 'fer'] },
            ] },
            { name: 'cat2', id: 'aaa', _products: [
              { _name: 'prod1', _categoriesRef: ['aaa', 'bbb', 'ccc'] },
              { _name: 'prod4', _categoriesRef: ['aaa', 'fcd', 'etf'] },
            ] },
            { name: 'cat3', id: 'fcd', _products: [
              { _name: 'prod4', _categoriesRef: ['aaa', 'fcd', 'etf'] },
            ] },
          ]
        }
      }
    })
  })
})
