import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import { Category } from '@vue-storefront/shopify-api/src/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCategoryTree = (category: Category): AgnosticCategoryTree => {
  return {} as AgnosticCategoryTree;
};

export const getCategoryName = (category: Category): string => {
  if ((category as any)) {
    return (category as any).title;
  }
  return '';
};

export const getBreadcrumbs = (category: Category): any => {
  const breadCrumbs = [
    {
      text: 'Home',
      route: {
        link: '/'
      }
    }
  ];

  if (category && category.title) {
    breadCrumbs.push({
      text: getCategoryName(category),
      route: {
        link: '#'
      }
    });
  }
  return breadCrumbs;
};

const categoryGetters: CategoryGetters<Category> = {
  getTree: getCategoryTree,
  getName: getCategoryName,
  getBreadcrumbs: getBreadcrumbs
};

export default categoryGetters;
