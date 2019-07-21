import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus/index";
import debounce from "../util/debounce";
import { EventAddToCart } from "../types/events";

export default (fbq, currency, product) => {
  let myDebounce: Function | null = null;

  const track = (body: EventAddToCart) => {
    fbq("track", "AddToCart", body);
  };

  const pr = product.product;
  track({
    content_ids: pr.sku,
    content_name: pr.name,
    value: pr.priceInclTax * pr.qty,
    currency,
    content_type: "product"
  });
};
