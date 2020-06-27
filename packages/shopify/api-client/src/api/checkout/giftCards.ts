import { _shopifyClient } from '../../index';
import { Cart, CartParams } from '../../types';

/**
 * Applies gift cards to an existing checkout using a list of gift card codes
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const giftCardCodes = ['6FD8853DAGAA949F'];
 *
 * _shopifyClient.checkout.addGiftCards(checkoutId, giftCardCodes).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to add gift cards to.
 * @param {String[]} giftCardCodes The gift card codes to apply to the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function addGiftCards(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .addGiftCards(options.checkoutId, options.giftCardCodes)
    .then((products) => {
      return products;
    });
  return checkout;
}

/**
 * Remove a gift card from an existing checkout
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const appliedGiftCardId = 'Z2lkOi8vc2hvcGlmeS9BcHBsaWVkR2lmdENhcmQvNDI4NTQ1ODAzMTI=';
 *
 * _shopifyClient.checkout.removeGiftCard(checkoutId, appliedGiftCardId).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to add gift cards to.
 * @param {String} appliedGiftCardId The gift card id to remove from the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function removeGiftCard(options: CartParams): Promise<Cart[]> {
  const checkout = await _shopifyClient.checkout
    .removeGiftCard(options.checkoutId, options.appliedGiftCardId)
    .then((products) => {
      return products;
    });
  return checkout;
}

export default {
  addGiftCards,
  removeGiftCard
};
