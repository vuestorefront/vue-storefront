export const getFiltersForUrl = (filters) => {
  return Object.entries(filters || {}).reduce((prev, [name, filter]) => {
    console.log('GetFiltersForUrl reduce', name, filter);
    prev[name] = filter.options.filter(option => option.selected).map(option => option.name);
    return prev;
  }, {});
};
