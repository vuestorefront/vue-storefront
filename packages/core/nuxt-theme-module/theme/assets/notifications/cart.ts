import { useUiNotification } from '~/composables';

export const addItem = ({ productName, error, onClick, $i18n }) => {
  const { send } = useUiNotification();

  if (error) {
    send({
      type: 'danger',
      message: error
    });
  } else {
    send({
      type: 'success',
      message: $i18n.t('Successfully added {PRODUCT_NAME} to the cart', { PRODUCT_NAME: productName }),
      persist: true,
      action: {
        text: $i18n.t('Go to Checkout'),
        onClick
      }
    });
  }
};
