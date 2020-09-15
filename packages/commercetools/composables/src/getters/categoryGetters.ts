import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from './../types/GraphQL';

export const getCategoryTree = (category: Category): AgnosticCategoryTree | null => {
  const getRoot = (category: Category): Category => (category.parent ? getRoot(category.parent) : category);
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    id: rootCategory.id,
    isCurrent: rootCategory.id === category.id,
    items: rootCategory.children.map(buildTree)
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
