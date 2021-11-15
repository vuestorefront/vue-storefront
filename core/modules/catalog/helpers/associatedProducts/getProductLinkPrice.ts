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
    const product = productLink.product ||
    {
      price: 0,
      price_incl_tax: 0,
      priceInclTax: 0,
      originalPriceInclTax: 0,
      specialPrice: 0
    }

    return calculateProductLinkPrice({
      price: product.price,
      priceInclTax: product.price_incl_tax || product.priceInclTax,
      originalPriceInclTax: (product as any).original_price_incl_tax || (product as any).originalPriceInclTax,
      specialPrice: (product as any).special_price || (product as any).specialPrice,
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
