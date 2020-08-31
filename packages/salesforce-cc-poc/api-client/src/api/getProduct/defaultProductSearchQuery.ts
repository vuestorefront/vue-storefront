import gql from 'graphql-tag';

export default gql`
query($query: String!, $filters: [Filter]) {
  productSearch(query: $query, filterParams: $filters) {
      limit,
      total,
      offset
      productHits {
          productId
          productName
          price
          priceMax          
          prices {
              sale
              list
          }
          image {
              title
              link
              alt
          }
          colorSwatches {
              name
              value
              title
              link
              alt
              style
          }
      }
      sortingOptions {
          id
          label
      }
      refinements {
          values {
              label
              value
              hitCount
              values {
                  label
                  value
                  hitCount
              }
          }
          label
          attributeId
      }
      currentFilters {
          id
          value
      }
  }
}
`;
