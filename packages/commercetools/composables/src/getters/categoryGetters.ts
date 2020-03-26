import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/interfaces';
import { Category } from './../types/GraphQL';

export const getCategoryTree = (category: Category): AgnosticCategoryTree | null => {
  const getRoot = (category: Category): Category => (category.parent ? getRoot(category.parent) : category);
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
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
