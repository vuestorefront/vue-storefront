export const ProductPriceFragment = `
  fragment DefaultProductPrice on ProductPrice {
    discounted {
      value {
        type
        currencyCode
        centAmount
        fractionDigits
      }
      discount {
        validFrom
        validUntil
        isActive
        name(acceptLanguage: $acceptLanguage)
      }
    }
    value {
      type
      currencyCode
      centAmount
      fractionDigits
    }
  }
`;
