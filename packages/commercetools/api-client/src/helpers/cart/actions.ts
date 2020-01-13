import { UiCartProduct } from '@vue-storefront/interfaces'
import { ProductVariant } from './../../types/GraphQL'

export const createAddLineItemAction = (variant: ProductVariant, quantity: number) => ({
  addLineItem: {
    variantId: variant.id,
    quantity: quantity,
    sku: variant.sku,
  }
})

export const createRemoveLineItemAction = (product: UiCartProduct) => ({
  removeLineItem: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
})

export const createChangeLineItemQuantityAction = (product: UiCartProduct) => ({
  changeLineItemQuantity: {
    lineItemId: product.id,
    quantity: parseInt(product.qty)
  }
})
