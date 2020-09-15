import facetGetters from './../../src/getters/facetGetters';
import { getProductFiltered } from './../../src/getters/productGetters';
import { getCategoryTree } from './../../src/getters/categoryGetters';

jest.mock('./../../src/getters/productGetters', () => ({
  getProductFiltered: jest.fn()
}));

jest.mock('./../../src/getters/categoryGetters', () => ({
  getCategoryTree: jest.fn()
}));

describe('[commercetools-getters] facet getters', () => {
  it('returns sorting options', () => {
    expect(facetGetters.getSortOptions({ input: { sort: null } } as any)).toEqual({
      options: [
        { type: 'sort', id: 'latest', selected: false, value: 'Latest', count: null },
        {
          type: 'sort',
          id: 'price-up',
          selected: false,
          value: 'Price from low to high',
          count: null
        },
        {
          type: 'sort',
          id: 'price-down',
          selected: false,
          value: 'Price from high to low',
          count: null
        }
      ],
      selected: 'latest'
    });

    expect(facetGetters.getSortOptions({ input: { sort: 'latest' } } as any)).toEqual({
      options: [
        { type: 'sort', id: 'latest', selected: true, value: 'Latest', count: null },
        {
          type: 'sort',
          id: 'price-up',
          selected: false,
          value: 'Price from low to high',
          count: null
        },
        {
          type: 'sort',
          id: 'price-down',
          selected: false,
          value: 'Price from high to low',
          count: null
        }
      ],
      selected: 'latest'
    });
  });

  it('returns grouped facets', () => {
    expect(facetGetters.getGrouped({} as any)).toEqual([]);

    const searchData = {
      input: {},
      data: {
        facets: {
          color: {
            type: 'LocalizedEnumAttribute',
            options: [
              { label: 'white', value: 'white' },
              { label: 'black', value: 'black' }
            ]
          },
          size: {
            type: 'StringAttribute',
            options: [
              { label: '34', value: '34' },
              { label: 'M', value: 'M' }
            ]
          }
        }
      }
    } as any;

    const facets = facetGetters.getGrouped(searchData);

    expect(facets).toEqual([
      {
        count: null,
        id: 'color',
        label: 'color',
        options: [
          { attrName: 'color', count: null, id: 'white', selected: false, type: 'attribute', value: 'white' },
          { attrName: 'color', count: null, id: 'black', selected: false, type: 'attribute', value: 'black' }
        ]
      },
      {
        count: null,
        id: 'size',
        label: 'size',
        options: [
          { attrName: 'size', count: null, id: '34', selected: false, type: 'attribute', value: '34' },
          { attrName: 'size', count: null, id: 'M', selected: false, type: 'attribute', value: 'M' }
        ]
      }
    ]);
  });

  it('returns facets', () => {
    expect(facetGetters.getGrouped({} as any)).toEqual([]);

    const searchData = {
      input: {},
      data: {
        facets: {
          color: {
            type: 'LocalizedEnumAttribute',
            options: [
              { label: 'white', value: 'white' },
              { label: 'black', value: 'black' }
            ]
          },
          size: {
            type: 'StringAttribute',
            options: [
              { label: '34', value: '34' },
              { label: 'M', value: 'M' }
            ]
          }
        }
      }
    } as any;

    const facets = facetGetters.getAll(searchData);

    expect(facets).toEqual([
      { attrName: 'color', id: 'white', value: 'white', count: null, selected: false, type: 'attribute' },
      { attrName: 'color', id: 'black', value: 'black', count: null, selected: false, type: 'attribute' },
      { attrName: 'size', id: '34', value: '34', count: null, selected: false, type: 'attribute' },
      { attrName: 'size', id: 'M', value: 'M', count: null, selected: false, type: 'attribute' }
    ]);
  });

  it('returns search results', () => {
    const searchData = {
      input: {},
      data: {
        products: []
      }
    } as any;

    facetGetters.getProducts(searchData);

    expect(getProductFiltered).toBeCalled();
  });

  it('returns category tree', () => {
    expect(facetGetters.getCategoryTree({ data: null } as any)).toEqual({});

    const searchData = {
      input: {},
      data: {
        products: [],
        categories: [{ cat: 1 }]
      }
    } as any;

    facetGetters.getCategoryTree(searchData);

    expect(getCategoryTree).toBeCalled();
  });

  it('returns breadcrumbs', () => {
    expect(facetGetters.getBreadcrumbs({ data: null } as any)).toEqual([]);

    const searchData = {
      input: {},
      data: {
        categories: [{
          name: 'cat3',
          slug: 'cat-3',
          parent: {
            name: 'cat2',
            slug: 'cat-2',
            parent: {
              name: 'cat1',
              slug: 'cat-1'
            }
          }
        }]
      }
    } as any;

    const breadcrumbs = facetGetters.getBreadcrumbs(searchData);

    expect(breadcrumbs).toEqual([
      { link: '/', text: 'Home' },
      { link: '/c/cat-1', text: 'cat1' },
      { link: '/c/cat-1/cat-2', text: 'cat2' },
      { link: '/c/cat-1/cat-2/cat-3', text: 'cat3' }
    ]);
  });

  it('returns pagination info', () => {
    expect(facetGetters.getPagination({ data: null } as any)).toEqual({});

    const searchData = {
      input: {
        page: 2,
        itemsPerPage: 10
      },
      data: {
        total: 120,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 50]
      }
    } as any;

    const paginationInfo = facetGetters.getPagination(searchData);

    expect(paginationInfo).toEqual({
      currentPage: 2,
      itemsPerPage: 10,
      pageOptions: [10, 20, 50],
      totalItems: 120,
      totalPages: 12
    });
  });
});
