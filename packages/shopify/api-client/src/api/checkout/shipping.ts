import { _shopifyClient } from '../../index';
import { Cart, CartParams } from '../../types';

/**
 * Updates shipping address on an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const shippingAddress = {
 *    address1: 'Chestnut Street 92',
 *    address2: 'Apartment 2',
 *    city: 'Louisville',
 *    company: null,
 *    country: 'United States',
 *    firstName: 'Bob',
 *    lastName: 'Norman',
 *    phone: '555-625-1199',
 *    province: 'Kentucky',
 *    zip: '40202'
 *  };
 *
 * _shopifyClient.checkout.updateShippingAddress(checkoutId, shippingAddress).then(checkout => {
 *   // Do something with the updated checkout
 * });
 *
 * @param  {String} checkoutId The ID of the checkout to update shipping address.
 * @param  {Object} shippingAddress A shipping address.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function updateShippingAddress(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .updateShippingAddress(options.checkoutId, options.shippingAddress)
    .then((products) => {
      return products;
    });
  return checkout;
}

export default {
  updateShippingAddress
};
