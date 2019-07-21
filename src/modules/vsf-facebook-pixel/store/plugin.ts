import * as wishlistTypes from "@vue-storefront/core/modules/wishlist/store/mutation-types";
import * as cartTypes from "@vue-storefront/core/modules/cart/store/mutation-types";
import { Logger } from "@vue-storefront/core/lib/logger";
import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus/index";
import evAddToCart from "../events/AddToCart";
import rootStore from "@vue-storefront/core/store";

declare const fbq;

export function plugin(mutation, state) {
  if (mutation.type.includes(wishlistTypes.WISH_ADD_ITEM)) {
    EventBus.$emit("wishlist-add-item", mutation.payload);
  } else if (mutation.type.includes(wishlistTypes.WISH_DEL_ITEM)) {
    EventBus.$emit("wishlist-remove-item", mutation.payload);
  } else if (mutation.type.includes(cartTypes.CART_ADD_ITEM)) {
    const currency = rootStore.state.storeView.i18n.currencyCode;
    evAddToCart(fbq, currency, mutation.payload);
  }
}
