import path from 'path';
import proxyMiddleware from '@vue-storefront/checkout-com/nuxt/proxyMiddleware';

const defaultPaymentMethods = {
  cc: true,
  klarna: false
};

const paymentMethodSdk = {
  cc: 'https://cdn.checkout.com/js/framesv2.min.js',
  paypal: null,
  klarna: 'https://x.klarnacdn.net/kp/lib/v1/api.js'
};

const isScriptInArray = (headEntries, scriptUrl) => headEntries.some(entry => entry.src === scriptUrl);
const canAddScript = (scripts, enabled, paymentMethod) => enabled &&
  paymentMethodSdk[paymentMethod] &&
  !isScriptInArray(scripts, paymentMethodSdk[paymentMethod]);

export default function CheckoutComModule(moduleOptions) {
  const scripts = this.options.head.script;
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });

  this.addServerMiddleware({
    path: '/cko-api/payment-instruments',
    handler: proxyMiddleware(moduleOptions.channels)
  });

  const paymentMethods = {
    ...defaultPaymentMethods,
    ...moduleOptions.paymentMethods
  };

  for (const [paymentMethod, enabled] of Object.entries(paymentMethods)) {
    if (canAddScript(scripts, enabled, paymentMethod)) {
      scripts.push({
        src: paymentMethodSdk[paymentMethod],
        async: true
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
