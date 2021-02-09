const canEnterPersonalDetails = cart => cart && !cart.customerId && cart.lineItems.length > 0;

const canEnterShipping = cart => cart && (cart.customerEmail || cart.customerId);

const canEnterPayment = cart => cart && cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => cart && Boolean(cart.billingAddress);

const handlers = {
  '/checkout/personal-details': (app, activeCart) => !canEnterPersonalDetails(activeCart) && app.context.redirect('/'),
  '/checkout/shipping': (app, activeCart) => !canEnterShipping(activeCart) && app.context.redirect('/checkout/personal-details'),
  '/checkout/payment': (app, activeCart) => !canEnterPayment(activeCart) && app.context.redirect('/checkout/shipping'),
  '/checkout/order-review': (app, activeCart) => !canEnterReview(activeCart) && app.context.redirect('/checkout/payment')
};

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath;

  if (!currentPath.includes('/checkout/')) {
    return;
  }

  const { data } = await $vsf.$ct.api.getMe();

  if (!data) {
    return app.context.redirect('/');
  }

  const handler = handlers[currentPath];

  if (handler) {
    handler(app, data.me.activeCart);
  }
};

