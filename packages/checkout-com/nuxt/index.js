import path from 'path';

export default function CheckoutComModule(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: {
      publicKey: moduleOptions.publicKey
    }
  });

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
