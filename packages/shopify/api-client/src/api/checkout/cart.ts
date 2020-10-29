import { _shopifyClient } from '../../index';
import { Cart, CartParams } from '../../types';

/**
 * Fetches a checkout by ID.
 *
 * @example
 * _shopifyClient.checkout.fetch('FlZj9rZXlN5MDY4ZDFiZTUyZTUwNTE2MDNhZjg=').then((checkout) => {
 *   // Do something with the checkout
 * });
 *
 * @param {String} checkoutId The id of the checkout to fetch.
 * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the checkout.
 */
async function getCartFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .fetch(options.id)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Creates a checkout.
 *
 * @example
 * const input = {
 *   lineItems: [
 *     {variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}
 *   ]
 * };
 *
 * _shopifyClient.checkout.create(input).then((checkout) => {
 *   // Do something with the newly created checkout
 * });
 *
 * @param {Object} [input] An input object containing zero or more of:
 *   @param {String} [input.email] An email connected to the checkout.
 *   @param {Object[]} [input.lineItems] A list of line items in the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
 *   @param {Object} [input.shippingAddress] A shipping address. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/mailingaddressinput|Storefront API reference} for valid input fields.
 *   @param {String} [input.note] A note for the checkout.
 *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput|Storefront API reference} for valid input fields.
 *   @param {String} [input.presentmentCurrencyCode ] A presentment currency code. See the {@link https://help.shopify.com/en/api/storefront-api/reference/enum/currencycode|Storefront API reference} for valid currency code values.
 * @return {Promise|GraphModel} A promise resolving with the created checkout.
 */
async function createCartFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .create(options.input)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Adds line items to an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
 *
 * _shopifyClient.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to add line items to.
 * @param {Object[]} lineItems A list of line items to add to the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function addToCartFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .addLineItems(options.id, options.lineItems)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Replaces the value of checkout's custom attributes and/or note with values defined in the input
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const input = {customAttributes: [{key: "MyKey", value: "MyValue"}]};
 *
 * _shopifyClient.checkout.updateAttributes(checkoutId, input).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to update.
 * @param {Object} [input] An input object containing zero or more of:
 *   @param {Boolean} [input.allowPartialAddresses] An email connected to the checkout.
 *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/attributeinput|Storefront API reference} for valid input fields.
 *   @param {String} [input.note] A note for the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function updateAttributeFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .updateAttributes(options.id, options.input)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Removes line items from an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const lineItemIds = ['TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU='];
 *
 * _shopifyClient.checkout.removeLineItems(checkoutId, lineItemIds).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to remove line items from.
 * @param {String[]} lineItemIds A list of the ids of line items to remove from the checkout.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function removeCartFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .removeLineItems(options.id, options.lineItemIds)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Replace line items on an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
 *
 * _shopifyClient.checkout.replaceLineItems(checkoutId, lineItems).then((checkout) => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to add line items to.
 * @param {Object[]} lineItems A list of line items to set on the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function updateProductQtyFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .replaceLineItems(options.id, options.lineItems)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

/**
 * Updates line items on an existing checkout.
 *
 * @example
 * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
 * const lineItems = [
 *   {
 *     id: 'TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU=',
 *     quantity: 5,
 *     variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg=='
 *   }
 * ];
 *
 * _shopifyClient.checkout.updateLineItems(checkoutId, lineItems).then(checkout => {
 *   // Do something with the updated checkout
 * });
 *
 * @param {String} checkoutId The ID of the checkout to update a line item on.
 * @param {Object[]} lineItems A list of line item information to update. See the {@link https://help.shopify.com/api/storefront-api/reference/input-object/checkoutlineitemupdateinput|Storefront API reference} for valid input fields for each line item.
 * @return {Promise|GraphModel} A promise resolving with the updated checkout.
 */
async function updateCartFn(options: CartParams): Promise<Cart> {
  const checkout = await _shopifyClient.checkout
    .updateLineItems(options.id, options.lineItems)
    .then((checkout) => {
      return checkout;
    });
  return checkout;
}

export const getCart = getCartFn;
export const createCart = createCartFn;
export const addToCart = addToCartFn;
export const updateProductQty = updateProductQtyFn;
export const removeCart = removeCartFn;
export const updateCart = updateCartFn;
export const updateAttribute = updateAttributeFn;
