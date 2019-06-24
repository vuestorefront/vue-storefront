import { _prepareCategoryMaps } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers';
import { Category } from '../../types/Category';

jest.mock('@vue-storefront/core/modules/breadcrumbs/helpers', () => jest.fn());

describe('_prepareCategoryMaps method', () => {
  let parentCategory: Category

  beforeEach(() => {
    parentCategory = {
      is_active: true,
      level: 1,
      product_count: 1181,
      children_count: '38',
      parent_id: 1,
      name: 'All',
      id: 2,
      url_key: 'all-2',
      children_data: [],
      url_path: 'all-2'
    }
  })

  it('should return empty array when no category provided', () => {
    const result = _prepareCategoryMaps(null)
    expect(result).toBeDefined()
    expect(result.length).toEqual(0)
  });

  it('should return single array when parent category has no children data', () => {
    const result = _prepareCategoryMaps(parentCategory)
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual([2])
  })

  it('should return map with children', () => {
    parentCategory.children_data = [
      {
        id: 38
      },
      {
        id: 20
      }
    ]
    const result = _prepareCategoryMaps(parentCategory)
    expect(result).toBeDefined()
    expect(result.length).toEqual(3)
    expect(result[0]).toEqual([2])
    expect(result[1]).toEqual([2, 38])
    expect(result[2]).toEqual([2, 20])
  });

  it('should return map with deep children data', () => {
    parentCategory.children_data = [
      {
        id: 38
      },
      {
        id: 20,
        children_data: [
          { id: 22 },
          { id: 23 }
        ]
      },
      {
        id: 11,
        children_data: [
          {
            id: 12,
            children_data: [
              { id: 33 },
              { id: 34 }
            ]
          },
          { id: 13 }
        ]
      }
    ]
    const result = _prepareCategoryMaps(parentCategory)
    expect(result).toBeDefined()
    expect(result.length).toEqual(10)
    expect(result[0]).toEqual([2])
    expect(result[1]).toEqual([2, 38])
    expect(result[2]).toEqual([2, 20])
    expect(result[3]).toEqual([2, 20, 22])
    expect(result[4]).toEqual([2, 20, 23])
    expect(result[5]).toEqual([2, 11])
    expect(result[6]).toEqual([2, 11, 12])
    expect(result[7]).toEqual([2, 11, 12, 33])
    expect(result[8]).toEqual([2, 11, 12, 34])
    expect(result[9]).toEqual([2, 11, 13])
  });
})
