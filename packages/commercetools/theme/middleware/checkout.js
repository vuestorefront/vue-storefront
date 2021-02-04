const canEnterPersonalDetails = cart => !cart.customerId && cart.lineItems.length > 0;

const canEnterShipping = cart => cart.customerEmail || cart.customerId;

const canEnterPayment = cart => cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => Boolean(cart.billingAddress);

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath;

  if (!currentPath.includes('/checkout/')) return;

  const { data } = await $vsf.$ct.api.getMe();

  if (!data || !data.me.activeCart) {
    return app.context.redirect('/');
  }

  const { activeCart } = data.me;

  switch (currentPath) {
    case '/checkout/personal-details':
      if (!canEnterPersonalDetails(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case '/checkout/shipping':
      if (!canEnterShipping(activeCart)) {
        app.context.redirect('/checkout/personal-details');
      }
      break;
    case '/checkout/payment':
      if (!canEnterPayment(activeCart)) {
        app.context.redirect('/checkout/shipping');
      }
      break;
    case '/checkout/order-review':
      if (!canEnterReview(activeCart)) {
        app.context.redirect('/checkout/payment');
      }
      break;
  }
};

