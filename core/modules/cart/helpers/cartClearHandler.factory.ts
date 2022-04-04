import { CART_LOAD_CART_SERVER_TOKEN } from '../store/mutation-types';

export default function cartClearHandlerFactory (router) {
  return (mutation) => {
    if (mutation.type === CART_LOAD_CART_SERVER_TOKEN && !mutation.payload && router.route.name === 'checkout') {
      router.replace({ name: 'detailed-cart' });
    }
  }
}
