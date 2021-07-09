import config from 'config'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

const createCartItemForUpdate = (clientItem: CartItem, serverItem: any, updateIds: boolean = false, mergeQty: boolean = false): CartItem => {
  const sku = clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku
  const cartItem = {
    sku,
    ...((serverItem && serverItem.item_id) ? { item_id: serverItem.item_id } : {}),
    qty: mergeQty ? (clientItem.qty + serverItem.qty) : clientItem.qty,
    product_option: clientItem.product_option,
    customerImagesIds: clientItem.customerImagesIds ? clientItem.customerImagesIds : undefined,
    plushieId: clientItem.plushieId ? clientItem.plushieId : undefined,
    email: clientItem.email ? clientItem.email : undefined,
    plushieBreed: clientItem.plushieBreed ? clientItem.plushieBreed : undefined,
    plushieName: clientItem.plushieName ? clientItem.plushieName : undefined,
    plushieDescription: clientItem.plushieDescription ? clientItem.plushieDescription : undefined,
    bodyparts: clientItem.bodyparts ? clientItem.bodyparts : undefined,
    customFields: clientItem.customFields ? clientItem.customFields : undefined,
    uploadMethod: clientItem.uploadMethod ? clientItem.uploadMethod : undefined
  } as any as CartItem

  if (updateIds && serverItem.quote_id && serverItem.item_id) {
    return {
      ...cartItem,
      quoteId: serverItem.quote_id,
      item_id: serverItem.item_id
    }
  }

  return cartItem
}

export default createCartItemForUpdate
