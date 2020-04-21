/* istanbul ignore file */
import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { BapiCategory } from '../../types';

export const getCategoryTree = (category: BapiCategory): AgnosticCategoryTree | null => {
  if (!category) {
    return null;
  }

  return {
    label: category.name,
    slug: category.slug,
    items: category.children ? category.children.map(getCategoryTree) : []
  };
};

const categoryGetters: CategoryGetters<BapiCategory> = {
  getTree: getCategoryTree
};

export default categoryGetters;
