import { changeFilterQuery } from '@vue-storefront/core/modules/catalog-next/store/category/logic/categoryLogic';
import FilterVariant from '@vue-storefront/core/modules/catalog-next/types/FilterVariant';

describe('changeFilterQuery method', () => {
  it('should not change query when no filter variant provided', () => {
    const currentQuery = {
      color: 1
    }
    const result = changeFilterQuery({currentQuery})
    expect(result).toEqual(currentQuery)
  })

  it('should not return same query object instance', () => {
    const currentQuery = {
      color: 1
    }
    const result = changeFilterQuery({currentQuery})
    expect(result).not.toBe(currentQuery)
  });

  it('should add filter to array', () => {
    const currentQuery = {}
    const filterVariant:FilterVariant = {
      id: '33',
      label: 'Red',
      type: 'color'
    }
    const result = changeFilterQuery({currentQuery, filterVariant})
    expect(result).toEqual({color: ['33']})
  });

  it('should remove filter if exist in query', () => {
    const currentQuery = {
      color: ['23', '33']
    }
    const filterVariant:FilterVariant = {
      id: '33',
      label: 'Red',
      type: 'color'
    }
    const result = changeFilterQuery({currentQuery, filterVariant})
    expect(result).toEqual({color: ['23']})
  });
  
  it('should add sort filter', () => {
    const currentQuery = {}
    const filterVariant:FilterVariant = {
      id: 'final_price',
      label: 'Price: Low to high',
      type: 'sort'
    }
    const result = changeFilterQuery({currentQuery, filterVariant})
    expect(result).toEqual({sort: 'final_price'})
  });

  it('should remove sort filter', () => {
    const currentQuery = {sort: 'final_price'}
    const filterVariant:FilterVariant = {
      id: 'final_price',
      label: 'Price: Low to high',
      type: 'sort'
    }
    const result = changeFilterQuery({currentQuery, filterVariant})
    expect(result).toEqual({})
  });

  it('should change sort filter', () => {
    const currentQuery = {sort: 'final_price'}
    const filterVariant:FilterVariant = {
      id: 'updated_at',
      label: 'Latest',
      type: 'sort'
    }
    const result = changeFilterQuery({currentQuery, filterVariant})
    expect(result).toEqual({sort: 'updated_at'})
  });
})
