import { ProductPriceFragment } from './product-price';

export const LineItemFragment = `
  ${ProductPriceFragment}

  fragment DefaultLineItem on LineItem {
    id
    productId
    name(acceptLanguage: $acceptLanguage)
    productSlug(acceptLanguage: $acceptLanguage)
    quantity
    discountedPricePerQuantity {
      quantity
      discountedPrice {
        value {
          centAmount
        }
        includedDiscounts {
          discount {
            name(acceptLanguage: $acceptLanguage)
            isActive
          }
        }
      }
    }
    variant {
      id
      sku
      price(currency: $currency) {
        tiers {
          value {
            centAmount
          }
        }
        value {
          centAmount
        }
        discounted {
          value {
            centAmount
          }
          discount {
            isActive
            name(acceptLanguage: $acceptLanguage)
          }
        }
      }
      images {
        url
        label
      }
      attributesRaw {
        name
        value
        attributeDefinition {
          type {
            name
          }
          label(locale: $locale)
        }
      }
    }
    price {
      ...DefaultProductPrice
    }
  }
`;
