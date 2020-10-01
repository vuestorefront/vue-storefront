
const useUiHelpers = () => {
  const getFacetsFromURL = () => {
    console.warn('[VSF] please implement useUiHelpers.getFacets.');

    return {
      categorySlug: null,
      page: 1
    } as any;
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    console.warn('[VSF] please implement useUiHelpers.getCatLink.');

    return '/';
  };

  // eslint-disable-next-line
  const switchSorting = (sort) => {
    console.warn('[VSF] please implement useUiHelpers.switchSorting.');

    return 'latest';
  };

  // eslint-disable-next-line
  const switchFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.switchFilters.');
  };

  // eslint-disable-next-line
  const switchItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.switchItemsPerPage.');
  };

  // eslint-disable-next-line
  const switchSearchPhase = (phase: string) => {
    console.warn('[VSF] please implement useUiHelpers.switchItemsPerPage.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement createThemeHelpers.isFacetCheckbox.');

    return false;
  };

  return {
    getFacetsFromURL,
    getCatLink,
    switchSorting,
    switchFilters,
    switchItemsPerPage,
    switchSearchPhase,
    isFacetColor,
    isFacetCheckbox
  };
};

export default useUiHelpers;
