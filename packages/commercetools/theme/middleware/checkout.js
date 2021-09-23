const canEnterPayment = cart => cart && cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => cart && Boolean(cart.billingAddress);

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const { data } = await $vsf.$ct.api.getMe();

  const { activeCart } = data.me;

  switch (currentPath) {
    case 'shipping':
      if (!activeCart) {
        app.context.redirect('/');
      }
      break;
    case 'billing':
      if (!canEnterPayment(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case 'payment':
      if (!canEnterReview(activeCart)) {
        app.context.redirect('/');
      }
      break;
  }
};

