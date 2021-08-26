import gql from 'graphql-tag';
import { ChannelFragment, ProductPriceFragment } from './../../fragments';

export default gql`
  ${ProductPriceFragment}
  ${ChannelFragment}

  fragment Images on ProductVariant {
    images {
      url
      label
    }
  }

  fragment Price on ProductVariant {
    price(currency: $currency, country: $country, channelId: $channelId) {
      ...DefaultProductPrice
    }
  }

  fragment Attributes on ProductVariant {
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
  
  fragment Availability on ProductVariant {
    availability {
      noChannel {
        isOnStock
        restockableInDays
        availableQuantity
      }
      channels(
        includeChannelIds: $includeChannelIds 
        excludeChannelIds: $excludeChannelIds 
        limit: $channelLimit
        offset: $channelOffset
      ) {
        limit
        offset
        total
        results {
          channelRef {
            id
          }
          availability {
            isOnStock
            restockableInDays
            availableQuantity
          }
          channel {
            ...ChannelFragment
          }
        }
      }
    }
  }
  
  fragment DefaultVariant on ProductVariant {
    id
    sku
    ...Images
    ...Price
    ...Attributes
    ...Availability
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
    $channelId: String
    $includeChannelIds: [String!]
    $excludeChannelIds: [String!]
    $channelLimit: Int
    $channelOffset: Int
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
