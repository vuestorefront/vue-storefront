import path from 'path';

const isScriptInArray = (headEntries, scriptUrl) => headEntries.some(entry => entry.src === scriptUrl);
const framesSdk = 'https://cdn.checkout.com/js/framesv2.min.js';

export default function CheckoutComModule(moduleOptions) {
  const scripts = this.options.head.script;
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

  if (moduleOptions.publicKey) {
    if (!isScriptInArray(scripts)) {
      scripts.push({
        src: framesSdk
      });
    }
  }

  const { successComponent, errorComponent } = moduleOptions;

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'cko-payment-success',
      path: '/cko/payment-success',
      component: successComponent || resolve(__dirname, './CheckoutComPaymentSuccess.vue')
    });
  });

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'cko-payment-error',
      path: '/cko/payment-error',
      component: errorComponent || resolve(__dirname, './CheckoutComPaymentError.vue')
    });
  });
}
