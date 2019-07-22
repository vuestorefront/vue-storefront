import rootStore from "@vue-storefront/core/store";
import evPurchase from "../events/Purchase";
import evSearch from "../events/Search";
import evAddToWishlist from "../events/AddToWishlist";

declare const fbq;

const facebookPixelSnippet = function(f, b, e, v, callback) {
  let n, t, s;
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
  t.onload = callback;
};

export function afterRegistration({ Vue, config, store, isServer }) {
  if (!isServer && config.facebookPixel && config.facebookPixel.id) {
    facebookPixelSnippet(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
      () => {
        fbq("init", config.facebookPixel.id);
        fbq("track", "PageView");

        const currency = rootStore.state.storeView.i18n.currencyCode;

        evPurchase(fbq, currency);
        evSearch(fbq);
        evAddToWishlist(fbq, currency);
      }
    );
  }
}
