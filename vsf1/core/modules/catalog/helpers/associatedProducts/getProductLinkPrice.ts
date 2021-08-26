import Product from '@vue-storefront/core/modules/catalog/types/Product';

interface BaseProductLink {
  product?: Product,
  qty?: number
}

export const calculateProductLinkPrice = ({ price = 1, priceInclTax = 1, qty = 1 }) => {
  const product = {
    price: 0,
    priceInclTax: 0
  }
  const qtyNum = typeof qty === 'string' ? parseInt(qty) : qty
  if (qtyNum >= 0) {
    product.price += price * qtyNum
    product.priceInclTax += priceInclTax * qtyNum
  }
  return product
}

export const getProductLinkPrice = (productLinks: BaseProductLink[]) => productLinks
  .map((productLink) => {
    const product = productLink.product || { price: 1, price_incl_tax: 1, priceInclTax: 1 }
    return calculateProductLinkPrice({
      price: product.price,
      priceInclTax: product.price_incl_tax || product.priceInclTax,
      qty: productLink.qty
    })
  })
  .reduce(
    (priceDelta, currentPriceDelta) => ({
      price: currentPriceDelta.price + priceDelta.price,
      priceInclTax: currentPriceDelta.priceInclTax + priceDelta.priceInclTax
    }),
    { price: 0, priceInclTax: 0 }
  )
