import { _prepareCategoryPathIds } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers';
import { Category } from '../../types/Category';

jest.mock('@vue-storefront/core/modules/breadcrumbs/helpers', () => jest.fn());

describe('_prepareCategoryPathIds method', () => {
  let parentCategory: Category

  beforeEach(() => {
    parentCategory = {
      'path': '1/2',
      'is_active': true,
      'level': 1,
      'product_count': 1181,
      'children_count': '38',
      'parent_id': 1,
      'name': 'All',
      'id': 2,
      'url_key': 'all-2',
      'children_data': [],
      'url_path': 'all-2',
      'slug': 'all-2'
    }
  })

  it('should return empty array when no category provided', () => {
    const result = _prepareCategoryPathIds(null)
    expect(result).toBeDefined()
    expect(result.length).toEqual(0)
  });

  it('should return an array from category path', () => {
    const result = _prepareCategoryPathIds(parentCategory)
    expect(result).toBeDefined()
    expect(result).toEqual(['1', '2'])
  });

  it('should return array with single value', () => {
    parentCategory.path = '2'
    const result = _prepareCategoryPathIds(parentCategory)
    expect(result).toBeDefined()
    expect(result).toEqual(['2'])
  })

  it('should return array deep connection', () => {
    parentCategory.path = '1/2/20/21/252'
    const result = _prepareCategoryPathIds(parentCategory)
    expect(result).toBeDefined()
    expect(result).toEqual(['1', '2', '20', '21', '252'])
  })
})
