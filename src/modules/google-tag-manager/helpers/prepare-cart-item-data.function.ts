import { Store } from 'vuex';

import { GET_CART_ITEM_PRICE } from '@vue-storefront/core/modules/cart';
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import RootState from '@vue-storefront/core/types/RootState';
import { normalizeProductPurchaseFlow, PriceHelper } from 'src/modules/shared';

import { prepareBaseItemData } from './prepare-base-item-data.function';
import { getComposedSku } from './get-composed-sku.function';

export function prepareCartItemData (
  cartItem: CartItem,
  store: Store<RootState>
) {
  const price = store.getters[GET_CART_ITEM_PRICE](cartItem)
  const purchaseFlow = cartItem.extension_attributes?.flow;

  const finalTotalPrice = PriceHelper.getFinalPrice(price);
  const itemPrice = finalTotalPrice / cartItem.qty;

  const baseData = prepareBaseItemData(cartItem);

  return {
    ...baseData,
    purchase_flow: normalizeProductPurchaseFlow(purchaseFlow),
    item_variant: getComposedSku(cartItem),
    discount: PriceHelper.getProductDiscount(price),
    price: itemPrice
  }
}
