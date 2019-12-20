import gql from 'graphql-tag'

export default gql`
  fragment DefaultCategory on Category {
    id
    slug(locale: $locale)
    name(locale: $locale)
  }

  query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale) {
    categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
      offset
      count
      total
      results {
        ...DefaultCategory
        childCount
        parent {
          ...DefaultCategory
        }
        children {
          ...DefaultCategory
        }
      }
    }
  }
`;
