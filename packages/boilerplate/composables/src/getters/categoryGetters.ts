import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { Category } from '@vue-storefront/boilerplate-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: Category): AgnosticCategoryTree {
  return {
    label: '',
    slug: '',
    items: [],
    isCurrent: false
  };
}

export const categoryGetters: CategoryGetters<Category> = {
  getTree
};
