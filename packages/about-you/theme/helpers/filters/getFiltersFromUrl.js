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
      if (filters[name].type === 'range') {
        const value = values[0];

        if (!Array.isArray(value)) {
          const urlToArray = value.split(',');
          option.min = parseInt(urlToArray[0]);
          option.max = parseInt(urlToArray[1]);
          return;
        }
        option.min = value[0];
        option.max = value[1];
      }

      if (values.includes(option.name)) {
        option.selected = true;
      }
    });
  });
  return filters;
};
