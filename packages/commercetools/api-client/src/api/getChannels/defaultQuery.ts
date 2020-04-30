import gql from 'graphql-tag';

export default gql`
  query channels($where: String, $locale: Locale) {
    channels(where: $where) {
      offset
      count
      total
      results {
        id
        name(locale: $locale)
        description(locale: $locale)
        address {
          city
          streetName
          streetNumber
          postalCode
        }
        geoLocation {
          ... on Point {
            coordinates
          }
        }
      }
    }
  }
`;
