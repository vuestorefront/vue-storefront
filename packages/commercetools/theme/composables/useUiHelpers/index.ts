import { getCurrentInstance } from '@vue/composition-api';
import { Category } from '@vue-storefront/commercetools-api';
import { AgnosticFacet } from '@vue-storefront/core';

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const getContext = () => {
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
  const context = getContext();

  const getFacetsFromURL = () => {
    const { query, params } = context.$router.history.current;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(context, true),
      itemsPerPage: parseInt(query.itemsPerPage, 10) || 30,
      term: query.term
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${context.$route.params.slug_1}/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    const { query } = context.$router.history.current;
    context.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        itemsPerPage
      }
    });
  };

  const changeSearchTerm = (term: string) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
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
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox
  };
};

export default useUiHelpers;
