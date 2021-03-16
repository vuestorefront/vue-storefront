import { getCurrentInstance } from '@vue/composition-api';
import { Category } from '@vue-storefront/commercetools-api';
import { AgnosticFacet } from '@vue-storefront/core';

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const getInstance = () => {
  const vm = getCurrentInstance();
  return vm.$root as any;
};

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const instance = getInstance();

  const getFacetsFromURL = () => {
    const { query, params } = instance.$router.history.current;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      term: query.term
    };
  };

  const getSearchTermFromUrl = () => {
    const { query, params } = instance.$router.history.current;
    // hardcoded categorySlug for search results
    const categorySlug = 'women-clothing-jackets';

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(instance, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 20,
      term: query.term
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${instance.$route.params.slug_1}/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    const { query } = instance.$router.history.current;
    instance.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        itemsPerPage
      }
    });
  };

  const setTermForUrl = (term: string) => {
    instance.$router.push({
      query: {
        ...getFiltersDataFromUrl(instance, false),
        term: term || undefined
      }
    });
  };

  const isFacetColor = (facet: AgnosticFacet): boolean => facet.id === 'color';

  const isFacetCheckbox = (): boolean => false;

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
