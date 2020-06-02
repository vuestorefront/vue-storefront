import CartItem from '@vue-storefront/core/modules/cart/types/CartItem'
import config from 'config'
import omit from 'lodash-es/omit'
import pullAll from 'lodash-es/pullAll'

const optimizeProduct = (product: CartItem): CartItem => {
  if (!config.entities.optimizeShoppingCart) {
    return product
  }

  let fieldsToOmit = config.entities.optimizeShoppingCartOmitFields

  if (config.cart.productsAreReconfigurable) {
    fieldsToOmit = pullAll(fieldsToOmit, ['configurable_children', 'configurable_options'])
  }

  return omit(product, fieldsToOmit)
}

export default optimizeProduct
