import gql from "graphql-tag";

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

  fragment Attributes on ProductVariant {
    attributeList {
      name
      ... on BooleanAttribute {
        booleanValue: value
      }
      ... on DateAttribute {
        dateValue: value
      }
      ... on DateTimeAttribute {
        dateTimeValue: value
      }
      ... on StringAttribute {
        stringValue: value
      }
      ... on TimeAttribute {
        timeValue: value
      }
      ... on NumberAttribute {
        numberValue: value
      }
      ... on EnumAttribute {
        key
        label
      }
      ... on LocalizedEnumAttribute {
        key
        localizedLabel: label(locale: $locale)
      }
      ... on LocalizedStringAttribute {
        localizedString: value(locale: $locale)
      }
      ... on MoneyAttribute {
        centAmount
        currencyCode
      }
      ... on ReferenceAttribute {
        typeId
        id
      }
    }
  }

  fragment DefaultVariant on ProductVariant {
    id
    sku
    ...Images
    ...Price
    ...Attributes
  }

  query products(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
    $skus: [String!]
    $locale: Locale!
    $currency: Currency!
  ) {
    products(
      where: $where
      sort: $sort
      limit: $limit
      offset: $offset
      skus: $skus
    ) {
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
            description(locale: $locale)
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
