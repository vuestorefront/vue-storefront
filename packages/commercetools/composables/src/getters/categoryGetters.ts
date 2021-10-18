import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category, CategorySearch } from '@vue-storefront/commercetools-api';

export const getCategoryTree = (category: Category | CategorySearch): AgnosticCategoryTree | null => {
  const getRoot = (category: Category | CategorySearch): Category => (category.parent ? getRoot(category.parent) : category) as Category;
  const buildTree = (rootCategory: Category | CategorySearch) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    id: rootCategory.id,
    isCurrent: rootCategory.id === category.id,
    items: rootCategory.children?.map(buildTree),
    count: rootCategory.stagedProductCount
  });

  if (!category) {
    return null;
  }

  return buildTree(getRoot(category));
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree
};

export default categoryGetters;
