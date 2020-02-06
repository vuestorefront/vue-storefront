import {
  UiMediaGalleryItem,
  UiCategory,
  UiCartProduct,
  AgnosticProductAttribute
} from '@vue-storefront/interfaces'
import { ProductVariant, Category, Cart } from '@vue-storefront/boilerplate-api/src/types'

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product
export const getProductName = (product: ProductVariant): string => {
  return 'ProductName'
}

export const getProductSlug = (product: ProductVariant): string => {
  return 'product-slug'
}


// todo change to getProductPrices returning different types of prices https://github.com/DivanteLtd/next/issues/128
export const getProductPrice = (product: ProductVariant): number | null => {
  return 22.99
}


export const getProductGallery = (product: ProductVariant): UiMediaGalleryItem[] => {
  return [{
    small: '',
    big: '',
    normal: ''
  }]
}

export const getProductVariants = (products: ProductVariant[], filters: ProductVariantFilters = {}): ProductVariant | ProductVariant[]  => {
  return [{},{},{}]
}

// done: unified filters param from filterByAttributes
export const getProductAttributes = (products: ProductVariant[], filters?: Array<string>): AgnosticProductAttribute[] => {
    return [{
      name: 'color',
      value: 'red',
      label: 'red'
    }, {
      name: 'size',
      value: 'S',
      label: 'S'
    },]
}


export const getProductDescription = (product: ProductVariant): string => {
  return 'Lorem ipsum dolor sit amet'
}


// Category
// TODO:  What is options?
export const getCategoryProducts = (category: Category, options: any = {}): ProductVariant[] => {
  return [{},{},{},{},{}]
}

// Cart

// TODO: Change UICartProduct to something agnostic. 
export const getCartProducts = (cart: Cart, includeAttributes: string[] = []): UiCartProduct[] => {
  return [{},{},{},{},{}]
}


// todo: remove CartPrice and unify with getProductPrice
export const getCartTotalPrice = (cart: Cart): number => {
  return 300.00
}
export const getCartSubtotalPrice = (cart: Cart): number => {
  return 200.00
}
export const getCartShippingPrice = (cart: Cart): number => {
  return 100.00
}

export const getCartTotalItems = (cart: Cart): number => {
  return 3
}

// ShippingMethod

export const getShippingMethodId = (shippingMethod: ShippingMethod): string => {
  return 'shipping-method-id'
}

export const getShippingMethodName = (shippingMethod: ShippingMethod): string => {
  return 'shipping-method-name'
}

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => {
  return 'Shipping method description'
}

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => {
  return 10.00
}
