import gql from 'graphql-tag';
import { ProductPriceFragment } from './../../fragments';

export default gql`
  ${ProductPriceFragment}

  fragment Images on ProductVariant {
    images {
      url
      label
    }
  }

  fragment Price on ProductVariant {
    price(currency: $currency, country: $country) {
      ...DefaultProductPrice
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
    $acceptLanguage: [Locale!]
    $currency: Currency!
    $country: Country!
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
        reviewRatingStatistics {	
          averageRating,
          ratingsDistribution,
          count
        }
        masterData {
          current {
            slug(acceptLanguage: $acceptLanguage)
            name(acceptLanguage: $acceptLanguage)
            metaTitle(acceptLanguage: $acceptLanguage)
            metaKeywords(acceptLanguage: $acceptLanguage)
            metaDescription(acceptLanguage: $acceptLanguage)
            description(acceptLanguage: $acceptLanguage)
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
