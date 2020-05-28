export const getFiltersForUrl = (filters) => {
  return Object.entries(filters || {}).reduce((prev, [name, filter]) => {
    prev[name] = filter.options
      .filter(option => option.selected || filter.type === 'range')
      .map(option => {
        if (filter.type === 'range') {
          console.log('MAP range', [option.min, option.max]);
          return [option.min, option.max];
        }
        return option.name;
      });
    return prev;
  }, {});
};
