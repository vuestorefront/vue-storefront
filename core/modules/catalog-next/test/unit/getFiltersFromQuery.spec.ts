import { getFiltersFromQuery } from '../../helpers/filterHelpers';

describe('getFiltersFromQuery method', () => {
  let availableFilters
  beforeEach(() => {
    availableFilters = {
      'color': [
        {
          'id': '49',
          'label': 'Black',
          'type': 'color'
        },
        {
          'id': '50',
          'label': 'Blue',
          'type': 'color'
        }
      ],
      'size': [
        {
          'id': '172',
          'label': '28',
          'type': 'size'
        },
        {
          'id': '170',
          'label': 'L',
          'type': 'size'
        },
        {
          'id': '169',
          'label': 'M',
          'type': 'size'
        }
      ],
      'price': [
        {
          'id': '0.0-50.0',
          'type': 'price',
          'from': 0,
          'to': 50,
          'label': '< $50'
        },
        {
          'id': '50.0-100.0',
          'type': 'price',
          'from': 50,
          'to': 100,
          'label': '$50 - 100'
        },
        {
          'id': '150.0-*',
          'type': 'price',
          'from': 150,
          'label': '> $150'
        }
      ],
      'erin_recommends': [
        {
          'id': '0',
          'label': 'No',
          'type': 'erin_recommends'
        },
        {
          'id': '1',
          'label': 'Yes',
          'type': 'erin_recommends'
        }
      ],
      'sort': [
        {
          'label': 'Latest',
          'id': 'updated_at',
          'type': 'sort'
        },
        {
          'label': 'Price: Low to high',
          'id': 'final_price',
          'type': 'sort'
        },
        {
          'label': 'Price: High to low',
          'id': 'final_price:desc',
          'type': 'sort'
        }
      ]
    }
  });

  it('should return color filter', () => {
    const filtersQuery = {
      color: '49'
    }
    const result = getFiltersFromQuery({ availableFilters, filtersQuery })
    expect(result).toEqual({
      filters: {
        color: [
          {
            'id': '49',
            'label': 'Black',
            'type': 'color',
            'attribute_code': 'color'
          }
        ]
      }
    })
  });

  it('should return color filters', () => {
    const filtersQuery = {
      color: ['49', '50']
    }
    const result = getFiltersFromQuery({ availableFilters, filtersQuery })
    expect(result).toEqual({
      filters: {
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
    })
  });

  it('should not return not existing filter', () => {
    const filtersQuery = {
      color: '111'
    }
    const result = getFiltersFromQuery({ availableFilters, filtersQuery })
    expect(result).toEqual({
      filters: {}
    })
  });

  it('should return size filter', () => {
    const filtersQuery = {
      sort: 'updated_at'
    }
    const result = getFiltersFromQuery({ availableFilters, filtersQuery })
    expect(result).toEqual({
      filters: {},
      sort: 'updated_at'
    })
  });
});
