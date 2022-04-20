import { CART_LOAD_CART_SERVER_TOKEN, SN_CART } from '../store/mutation-types';

export default function cartClearHandlerFactory (router) {
  return (mutation) => {
    if (
      mutation.type === `${SN_CART}/${CART_LOAD_CART_SERVER_TOKEN}` &&
       !mutation.payload && router.currentRoute.name === 'checkout'
    ) {
      router.replace({ name: 'detailed-cart' });
    }
  }
}
