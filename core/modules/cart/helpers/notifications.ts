import { router } from '@vue-storefront/core/app';
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore';
import i18n from '@vue-storefront/i18n';
import config from 'config';

const proceedToCheckoutAction = () => ({
  label: i18n.t('Proceed to checkout'),
  action: () => router.push(localizedRoute('/checkout', currentStoreView().storeCode))
});
const checkoutAction = () => !config.externalCheckout ? proceedToCheckoutAction() : null;

const productAddedToCart = () => ({
  type: 'success',
  message: i18n.t('Product has been added to the cart!'),
  action1: { label: i18n.t('OK') },
  action2: checkoutAction()
})

const productQuantityUpdated = () => ({
  type: 'success',
  message: i18n.t('Product quantity has been updated!'),
  action1: { label: i18n.t('OK') },
  action2: checkoutAction()
})

const unsafeQuantity = () => ({
  type: 'warning',
  message: i18n.t(
    'The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'
  ),
  action1: { label: i18n.t('OK') }
})

const outOfStock = () => ({
  type: 'error',
  message: i18n.t('The product is out of stock and cannot be added to the cart!'),
  action1: { label: i18n.t('OK') }
})

const createNotification = ({ type, message }) => ({ type, message, action1: { label: i18n.t('OK') } })
const createNotifications = ({ type, messages }) =>
  messages.map(message => createNotification({ type, message }));

export {
  createNotification,
  createNotifications,
  productAddedToCart,
  productQuantityUpdated,
  unsafeQuantity,
  outOfStock
};
