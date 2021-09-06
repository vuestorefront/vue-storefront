import gql from 'graphql-tag';

export default gql`
  query ($filter: [SearchFilter!], $acceptLanguage: [Locale!]) {
  categorySearch(filters: $filter) {
    offset
    count
    total
    results {
      id
      slug(acceptLanguage: $acceptLanguage)
      name(acceptLanguage: $acceptLanguage)
      description(acceptLanguage: $acceptLanguage)
      childCount
      stagedProductCount
      parent {
        ...DefaultCategorySearch
        parent {
          ...DefaultCategorySearch
          parent {
            ...DefaultCategorySearch
          }
        }
      }
      children {
        ...DefaultCategorySearch
      }
    }
  }
}

fragment DefaultCategorySearch on CategorySearch {
  id
  slug(acceptLanguage: $acceptLanguage)
  name(acceptLanguage: $acceptLanguage)
  childCount
  stagedProductCount
  children {
    ...CategorySearchChildren
    children {
      ...CategorySearchChildren
      children {
        ...CategorySearchChildren
      }
    }
  }
}

fragment CategorySearchChildren on CategorySearch {
  id
  slug(acceptLanguage: $acceptLanguage)
  name(acceptLanguage: $acceptLanguage)
  childCount
  stagedProductCount
}
`;
