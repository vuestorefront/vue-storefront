export const getFiltersForUrl = (filters) => {
  return Object.entries(filters || {}).reduce((prev, [name, filter]) => {
    prev[name] = filter.options.filter(option => option.selected).map(option => option.value);
    return prev;
  }, {});
};
