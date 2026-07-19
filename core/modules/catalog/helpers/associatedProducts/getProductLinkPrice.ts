import Product from '@vue-storefront/core/modules/catalog/types/Product';

interface BaseProductLink {
  product?: Product,
  qty?: number
}

export const calculateProductLinkPrice = (
  {
    price = 0,
    priceInclTax = 0,
    originalPriceInclTax = 0,
    specialPrice = null,
    qty = 1
  }: {
    price?: number,
    priceInclTax?: number,
    originalPriceInclTax?: number,
    specialPrice: number | null | undefined,
    qty?: number
  }
) => {
  const productPrice: {
    price: number,
    priceInclTax: number,
    originalPriceInclTax: number,
    specialPrice: number | null
  } = {
    price: 0,
    priceInclTax: 0,
    originalPriceInclTax: 0,
    specialPrice: null
  }
  const qtyNum = typeof qty === 'string' ? parseInt(qty) : qty
  if (qtyNum >= 0) {
    productPrice.price += price * qtyNum
    productPrice.priceInclTax += priceInclTax * qtyNum
    productPrice.originalPriceInclTax += originalPriceInclTax * qtyNum
    productPrice.specialPrice = specialPrice !== null ? specialPrice * qtyNum : null
  }

  return productPrice
}

export const getProductLinkPrice = (productLinks: BaseProductLink[]) => productLinks
  .map((productLink) => {
    const defaultProductPrices: Partial<Product> = {
      price: 0,
      priceInclTax: 0,
      originalPriceInclTax: 0,
      specialPrice: null
    }
    const product = productLink.product || defaultProductPrices;

    return calculateProductLinkPrice({
      price: product.price,
      priceInclTax: product.price_incl_tax || product.priceInclTax,
      originalPriceInclTax: product.original_price_incl_tax || product.originalPriceInclTax,
      specialPrice: product.special_price || product.specialPrice,
      qty: productLink.qty
    })
  })
  .reduce((
    priceDelta: {
      price: number,
      priceInclTax: number,
      originalPriceInclTax: number,
      specialPrice: number
    },
    currentPriceDelta
  ) => ({
    price: currentPriceDelta.price + priceDelta.price,
    priceInclTax: currentPriceDelta.priceInclTax + priceDelta.priceInclTax,
    originalPriceInclTax: currentPriceDelta.originalPriceInclTax + priceDelta.originalPriceInclTax,
    specialPrice: currentPriceDelta.specialPrice !== null
      ? currentPriceDelta.specialPrice + priceDelta.specialPrice
      : currentPriceDelta.priceInclTax + priceDelta.specialPrice
  }),
  { price: 0, priceInclTax: 0, originalPriceInclTax: 0, specialPrice: 0 }
  )
