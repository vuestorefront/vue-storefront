/**
 * Makes product variants comparission and returns variant with lowest price
 */
export default function getVariantWithLowestPrice (prevVariant, nextVariant) {
  if (!prevVariant || !prevVariant.original_price_incl_tax) {
    return nextVariant
  }

  const prevPrice = prevVariant.price_incl_tax || prevVariant.original_price_incl_tax
  const nextPrice = nextVariant.price_incl_tax || nextVariant.original_price_incl_tax
  return nextPrice < prevPrice ? nextVariant : prevVariant
}
