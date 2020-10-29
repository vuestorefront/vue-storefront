import { _shopifyClient } from '../../index';
import { Cart, CartParams } from '../../types';

/**
 * Applies a discount to an existing checkout using a discount code.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const discountCode = 'best-discount-ever';
 *
 * _shopifyClient.checkout.addDiscount(checkoutId, discountCode).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to add discount to.
 * @param {String} discountCode The discount code to apply to the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function addDiscount(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .addDiscount(options.checkoutId, options.discountCode)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Removes the applied discount from an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 *
 * _shopifyClient.checkout.removeDiscount(checkoutId).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to remove the discount from.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function removeDiscount(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .removeDiscount(options.checkoutId)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

const discount = {
  ...addDiscount,
  ...removeDiscount
};

export default discount;
