import { _shopifyClient } from '../../index';
import { Cart, CartParams } from '../../types';

/**
 * Replaces the value of checkout's email address
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const email = 'user@example.com';
 *
 * client.checkout.updateEmail(checkoutId, email).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to update.
 * @param {String} email The email address to apply to the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function updateEmail(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .updateEmail(options.checkoutId, options.email)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

export default {
  updateEmail
};
