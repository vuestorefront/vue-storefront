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
        if (!Array.isArray(values[0])) {
          const urlToArray = values[0].split(',');
          option.min = parseInt(urlToArray[0]);
          option.max = parseInt(urlToArray[1]);
        } else {
          option.min = values[0][0];
          option.max = values[0][1];
        }
      }

      if (values.includes(option.name)) {
        option.selected = true;
      }
    });
  });
  return filters;
};
