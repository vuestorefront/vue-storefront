import { useUiNotification } from '../../composables';

export const cart = ({ i18n, router }) => {
  const addItem = ({ productName, error }) => {
    const { send } = useUiNotification();

    if (error) {
      send({
        type: 'danger',
        message: error
      });
    } else {
      send({
        type: 'success',
        message: productName ? i18n.t('Successfully added {PRODUCT_NAME} to the cart', { PRODUCT_NAME: productName }) : i18n.t('Successfully added product to the cart'),
        persist: true,
        action: {
          text: i18n.t('Go to Checkout'),
          onClick: () => router.push('/checkout/shipping')
        }
      });
    }
  };

  return {
    addItem
  };
};
