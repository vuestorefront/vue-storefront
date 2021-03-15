import { cart } from './cart';
import { useContext } from '@nuxtjs/composition-api';

const sendNotification = () => {
  const { app } = useContext();
  const { i18n, router } = app;

  return {
    cart: cart({ i18n, router })
  };
};

export default sendNotification;
