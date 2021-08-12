export const ShippingMethodFragment = `
  fragment DefaultShippingMethod on ShippingMethod {
    id
    version
    name
    isDefault
    localizedDescription(acceptLanguage: $acceptLanguage)
    zoneRates {
      zone {
        id
        name
      }
      shippingRates {
        freeAbove {
          type
          centAmount
        }
        isMatching
        price {
          centAmount
        }
      }
    }
  }
`;
