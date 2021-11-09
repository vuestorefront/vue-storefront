import { useRoute, useRouter } from '@nuxtjs/composition-api';
import { Category } from '@vue-storefront/commercetools-api';
import { AgnosticFacet } from '@vue-storefront/core';

const nonFilters = ['page', 'sort', 'phrase', 'itemsPerPage'];

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getQueryParameter = (item): string => {
  return Array.isArray(item)
    ? item[0]
    : item;
};

const getFiltersDataFromUrl = (query, onlyFilters) => {
  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();
  const { query, params } = route.value;

  const getFacetsFromURL = () => {
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(getQueryParameter(query.page), 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(query, true),
      itemsPerPage: parseInt(getQueryParameter(query.itemsPerPage), 10) || 20,
      phrase: query.phrase
    };
  };

  const getSearchTermFromUrl = () => {
    // hardcoded categorySlug for search results
    const categorySlug = 'women-clothing-jackets';

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(getQueryParameter(query.page), 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(query, true),
      itemsPerPage: parseInt(getQueryParameter(query.itemsPerPage), 10) || 20,
      phrase: query.phrase
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${route.value.params.slug_1}/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        itemsPerPage
      }
    });
  };

  const setTermForUrl = (term: string) => {
    router.push({
      query: {
        ...getFiltersDataFromUrl(query, false),
        phrase: term || undefined
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
