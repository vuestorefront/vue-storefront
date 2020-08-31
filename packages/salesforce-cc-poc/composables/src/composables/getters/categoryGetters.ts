import { CategoryGetters, AgnosticCategoryTree, AgnosticBreadcrumb } from '@vue-storefront/core';
import { Category } from '@vue-storefront/salesforce-cc-poc-api/src/types';

const itemToTree = (category: Category): AgnosticCategoryTree => {
  return {
    label: category.name,
    slug: category.id,
    items: category.categories ? category.categories.map(itemToTree) : []
  };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (category: Category): AgnosticCategoryTree => {
  if (category) {
    return itemToTree(category);
  }
  return {} as AgnosticCategoryTree;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryBreadcrumbs = (category: Category): AgnosticBreadcrumb[] => {
  if (category) {
    // TODO: add the current category info for the product
    return [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: category.pageTitle,
        link: '/c/' + category.id
      }
    ];
  } else {
    return [
      {
        text: 'Home',
        link: '/'
      }];
  }
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree,
  getBreadcrumbs: getCategoryBreadcrumbs
};

export default categoryGetters;
