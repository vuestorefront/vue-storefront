import config from 'config'

const createCartItemForUpdate = (clientItem, serverItem, updateIds = false) => {
  const sku = clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku
  const cartItem = {
    sku,
    qty: clientItem.qty,
    product_option: clientItem.product_option
  }

  if (updateIds && serverItem.quote_id && serverItem.item_id) {
    const { quote_id, item_id } = serverItem
    return { ...cartItem, quote_id, item_id }
  }

  return cartItem
}

export default createCartItemForUpdate
