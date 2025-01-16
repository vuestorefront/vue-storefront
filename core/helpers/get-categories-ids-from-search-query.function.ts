import { SearchQuery } from 'storefront-query-builder';

const CATEGORIES_ID_FIELDS = [
  'url-key',
  'slug',
  'id'
];

export function getCategoriesIdsFromSearchQuery (searchQuery: SearchQuery): string[] {
  const appliedFilters = searchQuery.getAppliedFilters();
  const idFilters = appliedFilters.filter(
    (filter) => CATEGORIES_ID_FIELDS.includes(filter.attribute)
  );
  const ids: string[] = [];

  if (idFilters.length === 0) {
    return ids;
  }

  for (const filter of idFilters) {
    if (filter.value['in']) {
      ids.push(...filter.value['in']);
    }

    if (filter.value['eq']) {
      ids.push(filter.value['eq']);
    }
  }

  return ids;
}
