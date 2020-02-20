import gql from 'graphql-tag';

export default gql`
  fragment Children on Category {
    id
    slug(locale: $locale)
    name(locale: $locale)
    childCount
  }

  fragment DefaultCategory on Category {
    id
    slug(locale: $locale)
    name(locale: $locale)
    childCount
    children {
      ...Children
      children {
        ...Children
        children {
          ...Children
        }
      }
    }
  }

  query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale) {
    categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
      offset
      count
      total
      results {
        id
        slug(locale: $locale)
        name(locale: $locale)
        description(locale: $locale)
        childCount
        parent {
          ...DefaultCategory
          parent {
            ...DefaultCategory
            parent {
              ...DefaultCategory
            }
          }
        }
        children {
          ...DefaultCategory
        }
      }
    }
  }
`;
