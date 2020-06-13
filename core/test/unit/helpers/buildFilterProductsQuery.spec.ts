import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'

jest.mock('remove-accents', () => jest.fn());
jest.mock('@vue-storefront/core/modules/url/helpers', () => jest.fn());
jest.mock('@vue-storefront/core/lib/multistore', () => jest.fn());
jest.mock('config', () => ({
  products: {
    'defaultFilters': ['color', 'size', 'price', 'erin_recommends']
  }
}));
jest.mock('@vue-storefront/core/store', () => ({}));

describe('buildFilterProductsQuery method', () => {
  let currentCategory

  beforeEach(() => {
    currentCategory = {
      'path': '1/2/20',
      'is_active': true,
      'level': 2,
      'product_count': 0,
      'children_count': '8',
      'parent_id': 2,
      'name': 'Women',
      'id': 20,
      'url_path': 'women/women-20',
      'url_key': 'women-20',
      'children_data': [
        {
          'id': 21,
          'children_data': [
            {
              'id': 23
            },
            {
              'id': 24
            },
            {
              'id': 25
            },
            {
              'id': 26
            }
          ]
        },
        {
          'id': 22,
          'children_data': [
            {
              'id': 27
            },
            {
              'id': 28
            }
          ]
        }
      ],
      '_score': null,
      'slug': 'women-20'
    }
  });

  it('should build default query', () => {
    const result = buildFilterProductsQuery(currentCategory)
    const categoryFilter = result.getAppliedFilters().find(filter => filter.attribute === 'category_ids')
    expect(categoryFilter).toBeDefined()
    expect(categoryFilter.value.in).toEqual([20, 21, 23, 24, 25, 26, 22, 27, 28])
  });

  it('should build query with color filters', () => {
    const filters = {
      color: [
        {
          'id': '49',
          'label': 'Black',
          'type': 'color',
          'attribute_code': 'color'
        },
        {
          'id': '50',
          'label': 'Blue',
          'type': 'color',
          'attribute_code': 'color'
        }
      ]
    }
    const result = buildFilterProductsQuery(currentCategory, filters)
    const categoryFilter = result.getAppliedFilters().find(filter => filter.attribute === 'color')
    expect(categoryFilter).toBeDefined()
    expect(categoryFilter.value.in).toEqual(['49', '50'])
  });

  it('should build query with single price from 0 filter', () => {
    const filters = {
      price: {
        'id': '0.0-50.0',
        'type': 'price',
        'from': 0,
        'to': 50,
        'label': '< $50',
        'attribute_code': 'price'
      }
    }
    const result = buildFilterProductsQuery(currentCategory, filters)
    const categoryFilter = result.getAppliedFilters().find(filter => filter.attribute === 'price')
    expect(categoryFilter).toBeDefined()
    expect(categoryFilter.value.lte).toEqual(50)
  });

  it('should build query with single price between 50-100 filter', () => {
    const filters = {
      price: {
        'id': '50.0-100.0',
        'type': 'price',
        'from': 50,
        'to': 100,
        'label': '$50 - 100',
        'attribute_code': 'price'
      }
    }
    const result = buildFilterProductsQuery(currentCategory, filters)
    const categoryFilter = result.getAppliedFilters().find(filter => filter.attribute === 'price')
    expect(categoryFilter).toBeDefined()
    expect(categoryFilter.value.gte).toEqual(50)
    expect(categoryFilter.value.lte).toEqual(100)
  });

  it('should build query with price filters', () => {
    const filters = {
      price: [{
        'id': '0.0-50.0',
        'type': 'price',
        'from': 0,
        'to': 50,
        'label': '< $50',
        'attribute_code': 'price'
      }]
    }
    const result = buildFilterProductsQuery(currentCategory, filters)
    const categoryFilter = result.getAppliedFilters().find(filter => filter.attribute === 'price')
    expect(categoryFilter).toBeDefined()
    expect(categoryFilter.value.lte).toEqual(50)
  });

  it('should build query with color and erin_recommends filters', () => {
    const filters = {
      color: [
        {
          'id': '49',
          'label': 'Black',
          'type': 'color',
          'attribute_code': 'color'
        },
        {
          'id': '50',
          'label': 'Blue',
          'type': 'color',
          'attribute_code': 'color'
        }
      ],
      erin_recommends: [
        {
          'id': '1',
          'label': 'Yes',
          'type': 'erin_recommends',
          'attribute_code': 'erin_recommends'
        }
      ]
    }
    const result = buildFilterProductsQuery(currentCategory, filters)
    const colorFilter = result.getAppliedFilters().find(filter => filter.attribute === 'color')
    expect(colorFilter).toBeDefined()
    expect(colorFilter.value.in).toEqual(['49', '50'])
    const erinFilter = result.getAppliedFilters().find(filter => filter.attribute === 'erin_recommends')
    expect(erinFilter).toBeDefined()
    expect(erinFilter.value.in).toEqual(['1'])
  });
});
