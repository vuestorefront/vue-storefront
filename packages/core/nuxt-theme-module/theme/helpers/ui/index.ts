
export interface ThemeHelpers<CATEGORY, FILTERS, SORT, SEARCH_INPUT, FACET, ITEMS_PER_PAGE> {
  getFacets: () => SEARCH_INPUT;
  getCatLink: (category: CATEGORY) => string;
  switchSorting: (sort: SORT) => void;
  switchFilters: (filters: FILTERS) => void;
  switchItemsPerPage: (itemsPerPage: ITEMS_PER_PAGE) => void;
  isFacetColor: (facet: FACET) => boolean;
  isFacetCheckbox: (facet: FACET) => boolean;
}

const createThemeHelpers = <
  CATEGORY = any,
  FILTERS = any,
  SORT = any,
  SEARCH_INPUT = any,
  FACET = any,
  ITEMS_PER_PAGE = any
>(): ThemeHelpers<CATEGORY, FILTERS, SORT, SEARCH_INPUT, FACET, ITEMS_PER_PAGE> => {
  const getFacets = (): SEARCH_INPUT => {
    console.warn('[VSF] please implement createThemeHelpers.getFacets.');

    return {
      categorySlug: null,
      page: 1
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category: CATEGORY): string => {
    console.warn('[VSF] please implement createThemeHelpers.getCatLink.');

    return '/';
  };

  // eslint-disable-next-line
  const switchSorting = (sort: SORT) => {
    console.warn('[VSF] please implement createThemeHelpers.switchSorting.');

    return 'latest';
  };

  // eslint-disable-next-line
  const switchFilters = (filters: FILTERS) => {
    console.warn('[VSF] please implement createThemeHelpers.switchFilters.');
  };

  // eslint-disable-next-line
  const switchItemsPerPage = (itemsPerPage: ITEMS_PER_PAGE) => {
    console.warn('[VSF] please implement createThemeHelpers.switchItemsPerPage.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet: FACET): boolean => {
    console.warn('[VSF] please implement createThemeHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet: FACET): boolean => {
    console.warn('[VSF] please implement createThemeHelpers.isFacetCheckbox.');

    return false;
  };

  return {
    getFacets,
    getCatLink,
    switchSorting,
    switchFilters,
    switchItemsPerPage,
    isFacetColor,
    isFacetCheckbox
  };
};

export default createThemeHelpers;
