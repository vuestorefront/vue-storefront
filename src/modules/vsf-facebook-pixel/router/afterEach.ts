import rootStore from "@vue-storefront/core/store";
import { isServer } from "@vue-storefront/core/helpers";
import { Route } from "vue-router";

import evViewContent from "../events/ViewContent";

declare const fbq;

export function afterEach(to: Route, from: Route) {
  const currency = rootStore.state.storeView.i18n.currencyCode;

  // Each product's route has in name 'product' phrase!
  if (!isServer) {
    if (to.name.match(/product/)) {
      // ViewContent event
      evViewContent(fbq, rootStore.state.product.current, currency);
    }
  }
}
