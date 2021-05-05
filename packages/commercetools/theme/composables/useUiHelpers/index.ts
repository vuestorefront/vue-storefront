import { Category } from '@vue-storefront/commercetools-api';
import { AgnosticFacet } from '@vue-storefront/core';
import {useRoute, useRouter} from '@nuxtjs/composition-api';

const nonFilters = ['page', 'sort', 'phrase', 'itemsPerPage'];

function normalizeQueryValue(queryValue: string | string[]): string[] {
  return Array.isArray(queryValue) ? queryValue : [queryValue];
}

function getQueryValue(query: string | string[], position = 0): string {
  return normalizeQueryValue(query)[position];
}

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrlQuery = (query, onlyFilters) => {
  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const route = useRoute();
  const router = useRouter();

  const getFacetsFromURL = () => {
    const { query, params } = route.value;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(getQueryValue(query.page), 10) || 1,
      sort: getQueryValue(query.sort) || 'latest',
      filters: getFiltersDataFromUrlQuery(query, true),
      itemsPerPage: parseInt(getQueryValue(query.itemsPerPage), 10) || 20,
      phrase: getQueryValue(query.phrase)
    };
  };

  const getSearchTermFromUrl = () => {
    const { query, params } = route.value;
    // hardcoded categorySlug for search results
    const categorySlug = 'women-clothing-jackets';

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(getQueryValue(query.page), 10) || 1,
      sort: getQueryValue(query.sort) || 'latest',
      filters: getFiltersDataFromUrlQuery(query, true),
      itemsPerPage: parseInt(getQueryValue(query.itemsPerPage), 10) || 20,
      phrase: getQueryValue(query.phrase)
    };
  };

  const getCatLink = (category: Category): string => {
    return `/c/${route.value.params.slug_1}/${category.slug}`;
  };

  const changeSorting = (sort: string) => {
    const { query } = route.value;
    router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: any) => {
    const { query } = route.value;
    router.push({
      query: {
        ...getFiltersDataFromUrlQuery(query, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    const { query } = route.value;
    router.push({
      query: {
        ...getFiltersDataFromUrlQuery(query, false),
        itemsPerPage
      }
    });
  };

  const setTermForUrl = (term: string) => {
    const { query } = route.value;
    router.push({
      query: {
        ...getFiltersDataFromUrlQuery(query, false),
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
