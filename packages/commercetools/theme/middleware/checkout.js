const canEnterPayment = cart => cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => cart && Boolean(cart.billingAddress);

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath;

  if (!currentPath.includes('/checkout/')) {
    return;
  }

  const { data } = await $vsf.$ct.api.getMe();

  if (!data || !data.me.activeCart) return;
  const { activeCart } = data.me;

  switch (currentPath) {
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

