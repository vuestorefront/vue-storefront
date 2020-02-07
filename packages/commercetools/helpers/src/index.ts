import {
  UiMediaGalleryItem,
  UiCategory,
  UiCartProduct,
  AgnosticProductAttribute
} from '@vue-storefront/interfaces'
import { ProductVariant, Image, Category, Cart, LineItem, ShippingMethod, Customer } from './types/GraphQL'
import { formatAttributeList, getVariantByAttributes } from './_utils'

interface ProductVariantFilters {
  master?: boolean
  attributes?: Record<string, string>
}

// Product
export const getProductName = (product: ProductVariant): string => product ? (product as any)._name : ''

export const getProductSlug = (product: ProductVariant): string => product ? (product as any)._slug : ''

// todo change to getProductPrices returning different types of prices https://github.com/DivanteLtd/next/issues/128
export const getProductPrice = (product: ProductVariant): number | null => product ? product.price.value.centAmount / 100 : null

export const getProductGallery = (product: ProductVariant): UiMediaGalleryItem[] =>
  (product ? product.images : [])
  .map((image: Image) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }))

/** Returns array of product variants meeting criteria */
export const getProductVariants = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant | ProductVariant[]  => {
  if (!products) {
    return []
  }

  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    return getVariantByAttributes(products, filters.attributes)
  }

  if (filters.master) {
    return products.find(product => (product as any)._master)
  }

  return products
}

export const getProductAttributes = (products: ProductVariant[], filterByAttributeName?: Array<string>): Record<string, AgnosticProductAttribute | string> => {
  const isSingleProduct = !Array.isArray(products)
  const productList = (isSingleProduct ? [products] : products) as ProductVariant[]

  if (!products || productList.length === 0) {
    return {} as any
  }

  const formatAttributes = (product: ProductVariant): Array<AgnosticProductAttribute> =>
    (product ? formatAttributeList(product.attributeList) : [])
      .filter(attribute => filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute)


  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some(el => el.name === curr.name && el.value === curr.value)

    if (!isAttributeExist) {
      return [...prev, curr]
    }

    return prev
  }

  const reduceByAttributeName = (prev, curr) => ({
    ...prev,
    [curr.name]: isSingleProduct ? curr.value :[
      ...(prev[curr.name] || []),
      { value: curr.value, label: curr.label }
    ]
  })

  return productList
    .map(product => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, [])
    .reduce(reduceByAttributeName, {})
}


export const getProductDescription = (product: ProductVariant): any => (product as any)._description


// Category
export const getCategoryProducts = (category: Category, options: any = {}): ProductVariant[] => {
  if (!category || !(category as any)._products) {
    return []
  }

  const { _products } = category as any

  if (options.master) {
    return _products.filter(v => (v as any)._master)
  }

  return _products
}

export const getCategoryTree = (category: Category): UiCategory | null => {
  const getRoot = (category: Category): Category => (category.parent ? getRoot(category.parent) : category)
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    items: rootCategory.children.map(buildTree)
  })

  if (!category) {
    return null
  }

  return buildTree(getRoot(category))
}


// Cart

export const getCartProducts = (cart: Cart, includeAttributes: string[] = []): UiCartProduct[] => {
  if (!cart) {
    return []
  }

  const filterAttributes = (attributes) => {
    if (includeAttributes.length === 0) {
      return attributes
    }

    return attributes.filter(f => includeAttributes.includes(f.name))
  }

  return cart.lineItems.map((lineItem: LineItem) => ({
    title: lineItem.name,
    id: lineItem.id,
    price: { regular: lineItem.price.value.centAmount / 100 },
    image: lineItem.variant.images[0].url,
    qty: lineItem.quantity,
    configuration: formatAttributeList(filterAttributes((lineItem as any)._configuration))
  }))
}

export const getCartTotalPrice = (cart: Cart): number => {
  if (!cart) {
    return 0
  }

  const subtotal = cart.totalPrice.centAmount
  const shipping = cart.shippingInfo ? cart.shippingInfo.price.centAmount : 0

  return (shipping + subtotal) / 100
}
export const getCartSubtotalPrice = (cart: Cart): number => cart ? cart.totalPrice.centAmount / 100 : 0
export const getCartShippingPrice = (cart: Cart): number => cart && cart.shippingInfo ? cart.shippingInfo.price.centAmount / 100 : 0
export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0)
}

// ShippingMethod

export const getShippingMethodId = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.id : ''

export const getShippingMethodName = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.name : ''

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.description : ''

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => {
  if (!shippingMethod || !shippingMethod.zoneRates) {
    return null
  }

  // TODO(CHECKOUT): cover the case with zones
  return shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100
}


// User

export const getUserFirstName = (user: Customer): string => user ? user.firstName : ''

export const getUserLastName = (user: Customer): string => user ? user.lastName : ''

export const getUserFullName = (user: Customer): string => user ? `${user.firstName} ${user.lastName}` : ''
