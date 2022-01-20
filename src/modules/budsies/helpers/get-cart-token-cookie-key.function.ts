import { currentStoreView } from '@vue-storefront/core/lib/multistore';

const CART_TOKEN_COOKIE_KEY = 'shop-current-cart-token';

export default function getCartTokenCookieKey (): string {
  const storeView = currentStoreView();
  return storeView.storeCode ? `${storeView.storeCode}-${CART_TOKEN_COOKIE_KEY}` : CART_TOKEN_COOKIE_KEY;
}
