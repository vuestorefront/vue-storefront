/**
 * import cart methods
 */
import {
  getCart,
  createCart,
  addToCart,
  updateAttribute,
  removeCart,
  updateCart,
  updateProductQty
} from './cart';

/**
 * Import discount methods
 */
import addDiscount from './discount';
import removeDiscount from './discount';

const getCheckout = {
  getCart: getCart,
  createCart: createCart,
  addToCart: addToCart,
  updateAttribute: updateAttribute,
  removeCart: removeCart,
  updateCart: updateCart,
  updateProductQty: updateProductQty,
  addDiscount: addDiscount,
  removeDiscount: removeDiscount
};

export default getCheckout;
