const hotjarSnippet = (hjid) => (function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = {hjid, hjsv: 6};
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script');
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window as any, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');

export function afterRegistration ({ Vue, config, store, isServer }) {
  if (!isServer && config.hotjar && config.hotjar.id) {
    hotjarSnippet(config.hotjar.id);
  }
}
