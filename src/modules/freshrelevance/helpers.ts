import config from 'config';
import { Store } from './types';
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import { getThumbnailPath } from '@vue-storefront/core/helpers';
import { productThumbnailPath } from '@vue-storefront/core/helpers';
import getThumbnailForProduct from '@vue-storefront/core/modules/cart/helpers/getThumbnailForProduct';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';

export const $TB = () => (window as any).$TB;

export const data = {
  currentRoute: (store: Store) => store.state.route,
  categoryProducts: (store: Store) =>
    store.getters['category-next/getCategoryProducts'],

  categories: (store: Store) => store.getters['category/getCategories'],
  categoryMap: (store: Store) =>
    store.getters['category-next/getCategoriesMap'],
  breadcrumbs: (store: Store) =>
    store.getters['category-next/getBreadcrumbs'],
  currentBreadcrumb: (store: Store) =>
    store.getters['breadcrumbs/getBreadcrumbsCurrent'],
  currentCategory: (store: Store) =>
    store.getters['category-next/getCurrentCategory'],
  currentProduct: (store: Store) =>
    store.getters['product/getCurrentProduct'],
  currentProductOptions: (store: Store) =>
    store.getters['product/getCurrentProductOptions'],
  cart: (store: Store) => ({
    items: store.getters['cart/getCartItems'],
    totals: store.getters['cart/getTotals'].reduce(
      (totals, { code, value }) => ({ ...totals, [code]: value }),
      {}
    ),
    coupon: store.getters['cart/getCoupon']
  }),
  user: (store: Store) => ({
    email: store.getters['user/getUserEmail']
  })
};

export function getImageForProduct (product: CartItem) {
  const thumbnail = productThumbnailPath(product);
  return getThumbnailPath(
    thumbnail,
    config.products.gallery.width,
    config.products.gallery.height
  );
}

export function buildProductImageUrls (product: CartItem) {
  const image = getImageForProduct(product);
  const thumbnail = getThumbnailForProduct(product);
  let configurable_children = product.configurable_children;

  if (configurable_children) {
    configurable_children = configurable_children.map(
      buildProductImageUrls
    );
  }

  return { ...product, image, thumbnail, configurable_children };
}

export function getProductOptions (store: Store) {
  Object.values(data.currentProductOptions(store)).reduce(
    (allValues: any[], values) => allValues.concat(values),
    []
  );
}

export function getCategories (store: Store) {
  const categoryMap = data.categoryMap(store);
  return [...Object.values(categoryMap), ...data.categories(store)].reduce(
    (categories, category) => {
      categories[category.id.toString()] = category.name;
      return categories;
    },
    {}
  );
}

export function addProductCategories (
  store: Store,
  product: CartItem,
  category: Category
) {
  const categoryIds = category.path.split('/').map(Number);
  const categories = data
    .categories(store)
    .filter((category) => categoryIds.some((id) => id === category.id));

  return {
    ...product,
    category: categories,
    category_ids: categoryIds
  };
}
