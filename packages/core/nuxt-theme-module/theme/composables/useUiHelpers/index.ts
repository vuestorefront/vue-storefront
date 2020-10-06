
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
  const changeSorting = (sort) => {
    console.warn('[VSF] please implement useUiHelpers.changeSorting.');

    return 'latest';
  };

  // eslint-disable-next-line
  const changeFilters = (filters) => {
    console.warn('[VSF] please implement useUiHelpers.changeFilters.');
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
  };

  // eslint-disable-next-line
  const changeSearchTerm = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
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
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox
  };
};

export default useUiHelpers;
