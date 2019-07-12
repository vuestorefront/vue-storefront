import { changeFilterQuery } from '@vue-storefront/core/modules/catalog-next/helpers/filterHelpers';
import FilterVariant from '@vue-storefront/core/modules/catalog-next/types/FilterVariant';

describe('changeFilterQuery method', () => {
  it('should not change query when no filter variant provided', () => {
    const currentQuery = {
      color: 1
    };
    const result = changeFilterQuery({ currentQuery });
    expect(result).toEqual(currentQuery);
  });

  it('should not return same query object instance', () => {
    const currentQuery = {
      color: 1
    };
    const result = changeFilterQuery({ currentQuery });
    expect(result).not.toBe(currentQuery);
  });

  it('should add filter to array', () => {
    const currentQuery = {};
    const filterVariant: FilterVariant = {
      id: '33',
      label: 'Red',
      type: 'color'
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ color: ['33'] });
  });

  it('should remove filter if exist in query', () => {
    const currentQuery = {
      color: ['23', '33']
    };
    const filterVariant: FilterVariant = {
      id: '33',
      label: 'Red',
      type: 'color'
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ color: ['23'] });
  });

  it('should add sort filter', () => {
    const currentQuery = {};
    const filterVariant: FilterVariant = {
      id: 'final_price',
      label: 'Price: Low to high',
      type: 'sort'
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ sort: 'final_price' });
  });

  it('should remove sort filter', () => {
    const currentQuery = { sort: 'final_price' };
    const filterVariant: FilterVariant = {
      id: 'final_price',
      label: 'Price: Low to high',
      type: 'sort'
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({});
  });

  it('should change sort filter', () => {
    const currentQuery = { sort: 'final_price' };
    const filterVariant: FilterVariant = {
      id: 'updated_at',
      label: 'Latest',
      type: 'sort'
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ sort: 'updated_at' });
  });

  it('should add single filter when there is none', () => {
    const currentQuery = {
    };
    const filterVariant: FilterVariant = {
      id: '50.0-100.0',
      type: 'price',
      from: '50',
      to: '100',
      label: '$50 - 100',
      single: true
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ price: ['50.0-100.0'] });
  });

  it('should remove single filter when adding is the same', () => {
    const currentQuery = {
      price: ['50.0-100.0']
    };
    const filterVariant: FilterVariant = {
      id: '50.0-100.0',
      type: 'price',
      from: '50',
      to: '100',
      label: '$50 - 100',
      single: true
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({});
  });

  it('should change single filter when adding another single', () => {
    const currentQuery = {
      price: ['100.0-150.0']
    };
    const filterVariant: FilterVariant = {
      id: '50.0-100.0',
      type: 'price',
      from: '50',
      to: '100',
      label: '$50 - 100',
      single: true
    };
    const result = changeFilterQuery({ currentQuery, filterVariant });
    expect(result).toEqual({ price: ['50.0-100.0'] });
  });
});
