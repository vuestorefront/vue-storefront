import path from 'path';

export default function CheckoutComModule(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './../plugin.js'),
    options: {
      publicKey: moduleOptions.publicKey
    }
  });

  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'cko-payment-success',
      path: '/cko/payment-success',
      component: resolve(__dirname, './../CheckoutComPaymentSuccess.vue')
    });
  });
}
