import { getMe } from '@vue-storefront/commercetools-api';

const canEnterPersonalDetails = cart => !cart.customerId;

const canEnterShipping = cart => cart.customerEmail || cart.customerId;

const canEnterPayment = cart => cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => Boolean(cart.billingAddress);

export default async ({ app }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];
  const { data: { me: { activeCart } } } = await getMe();

  switch (currentPath) {
    case 'personal-details':
      if (!canEnterPersonalDetails(activeCart)) {
        app.context.redirect('/checkout/shipping');
      }
      break;
    case 'shipping':
      if (!canEnterShipping(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case 'payment':
      if (!canEnterPayment(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case 'order-review':
      if (!canEnterReview(activeCart)) {
        app.context.redirect('/');
      }
      break;
  }
};

