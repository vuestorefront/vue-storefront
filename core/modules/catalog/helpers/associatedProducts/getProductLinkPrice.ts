import Product from '@vue-storefront/core/modules/catalog/types/Product';

interface BaseProductLink {
  product?: Product,
  qty?: number
}

export const calculateProductLinkPrice = ({ price = 0, priceInclTax = 0, originalPriceInclTax = 0, specialPrice = 0, qty = 1 }) => {
  const product = {
    price: 0,
    priceInclTax: 0,
    originalPriceInclTax: 0,
    specialPrice: 0
  }
  const qtyNum = typeof qty === 'string' ? parseInt(qty) : qty
  if (qtyNum >= 0) {
    product.price += price * qtyNum
    product.priceInclTax += priceInclTax * qtyNum
    product.originalPriceInclTax += originalPriceInclTax * qtyNum
    product.specialPrice += specialPrice * qtyNum
  }
  return product
}

export const getProductLinkPrice = (productLinks: BaseProductLink[]) => productLinks
  .map((productLink) => {
    const defaultProductPrices: Partial<Product> = {
      price: 0,
      priceInclTax: 0,
      originalPriceInclTax: 0,
      specialPrice: 0,
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
  .reduce(
    (priceDelta, currentPriceDelta) => ({
      price: currentPriceDelta.price + priceDelta.price,
      priceInclTax: currentPriceDelta.priceInclTax + priceDelta.priceInclTax,
      originalPriceInclTax: currentPriceDelta.originalPriceInclTax + priceDelta.originalPriceInclTax,
      specialPrice: currentPriceDelta.specialPrice + priceDelta.specialPrice
    }),
    { price: 0, priceInclTax: 0, originalPriceInclTax: 0, specialPrice: 0 }
  )
