export const getFiltersFromUrl = (context, filters) => {
  const { query } = context.root.$route;
  const filtersFromQuery = Object.entries(query).filter(([name]) => !['page', 'items'].includes(name));
  filtersFromQuery.forEach(([name, values]) => {
    if (!filters[name]) {
      return;
    }

    if (!Array.isArray(values)) {
      values = [values];
    }
    filters[name].options.forEach(option => {
      if (values.includes(option.value)) {
        option.selected = true;
      }
    });
  });
  return filters;
};
