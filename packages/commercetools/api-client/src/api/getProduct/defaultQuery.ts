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
    id
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
            slug(locale: $locale)
            name(locale: $locale)
            metaTitle(locale: $locale)
            metaKeywords(locale: $locale)
            metaDescription(locale: $locale)
            categoriesRef {
              id
            }
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
