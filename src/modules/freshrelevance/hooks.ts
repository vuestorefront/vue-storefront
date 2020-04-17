import { Logger } from '@vue-storefront/core/lib/logger';
import { Store } from './types';

import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { coreHooks } from '@vue-storefront/core/hooks';
import { cartHooks } from '@vue-storefront/core/modules/cart/hooks';
import { catalogHooks } from '@vue-storefront/core/modules/catalog-next/hooks';
import {
  buildProductImageUrls,
  $TB,
  data,
  getCategories,
  getProductOptions,
  addProductCategories
} from './helpers';
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category';

function afterUserAuthorise (store: Store) {
  const user = data.user(store);
  $TB().hooks.onUserUpdate(user);
}

function afterAppInit (store: Store) {
  const storeView = currentStoreView();
  $TB().hooks.initializeStore(storeView);
  afterUserAuthorise(store);
}

function afterCartVisited (store: Store) {
  const cart = data.cart(store);
  cart.items = cart.items.map(buildProductImageUrls);
  const options = getProductOptions(store);
  const categories = getCategories(store);
  $TB().hooks.onCartVisit(cart, options, categories);
}

function afterAddToCart (store: Store) {
  afterCartVisited(store);
}

function afterRemoveFromCart (store: Store) {
  afterCartVisited(store);
}

function afterCheckoutVisited (store: Store) {
  $TB().hooks.onCheckoutVisit();
}

function categoryPageVisited (store: Store, category: Category) {
  const products = data
    .categoryProducts(store)
    .map(buildProductImageUrls)
    .map((product) => addProductCategories(store, product, category));
  const options = getProductOptions(store);
  const categories = getCategories(store);
  $TB().hooks.onProductList(products, options, categories);
}

function productPageVisited (store: Store) {
  const product = buildProductImageUrls(data.currentProduct(store));
  const options = getProductOptions(store);
  const categories = getCategories(store);

  $TB().hooks.onProductBrowse(product, options, categories);
}

function productVariantSelected (store: Store) {
  productPageVisited(store);
}

function afterPurchaseComplete (store: Store) {
  $TB().hooks.onPurchaseComplete();
}

function otherPageVisited (route: any) {
  $TB().hooks.onOtherPageVisit(route);
}

export function attachHooks (store: Store) {
  // attach handlers to built-in events hooks
  cartHooks.afterAddToCart(() => afterAddToCart(store));
  cartHooks.afterRemoveFromCart(() => afterRemoveFromCart(store));
  catalogHooks.categoryPageVisited((category) =>
    categoryPageVisited(store, category)
  );
  catalogHooks.productPageVisited(() => productPageVisited(store));

  // attach handlers to specific store actions by inspecting action.type
  // until built-in event hooks are added
  store.subscribe(({ type, payload }) => {
    if (type === 'ui/setMicrocart' && payload === true) {
      // Opening the cart sidebar
      afterCartVisited(store);
    } else if (type === 'checkout/SET_THANKYOU' && payload === true) {
      afterPurchaseComplete(store);
    } else if (type === 'product/product/SET_CURRENT') {
      productVariantSelected(store);
    } else if (type === 'route/ROUTE_CHANGED') {
      if (payload.to.name === 'checkout') {
        afterCheckoutVisited(store);
      } else {
        otherPageVisited(payload.to);
      }
    }
  });

  Logger.debug('Hooks attached', 'FR')();
}

export function initialCapture (store: Store) {
  afterAppInit(store);

  if (data.categoryProducts(store).length) {
    categoryPageVisited(store, data.currentCategory(store));
  } else if (data.currentProduct(store)) {
    productPageVisited(store);
  } else {
    otherPageVisited(data.currentRoute(store));
  }
}
