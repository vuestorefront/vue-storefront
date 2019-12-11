import gql from 'graphql-tag'

export default gql`
  fragment Images on ProductVariant {
    images {
      url
      label
    }
  }

  fragment Price on ProductVariant {
    price(currency: $currency) {
      value {
        type
        currencyCode
        centAmount
        fractionDigits
      }
    }
  }

  fragment DefaultVariant on ProductVariant {
    sku
    ...Images
    ...Price
  }

  query products(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
    $skus: [String!]
    $locale: Locale
    $currency: Currency!
  ) {
    products(where: $where, sort: $sort, limit: $limit, offset: $offset, skus: $skus) {
      offset
      count
      total
      results {
        id
        masterData {
          current {
            name(locale: $locale)
            metaTitle(locale: $locale)
            metaKeywords(locale: $locale)
            metaDescription(locale: $locale)
            allVariants {
              ...DefaultVariant
            }
            masterVariant {
              ...DefaultVariant
            }
          }
        }
      }
    }
  }
`;
