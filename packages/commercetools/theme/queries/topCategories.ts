import gql from 'graphql-tag';
import { CategoryFragment } from '@vue-storefront/commercetools-api';

const customQuery = gql`
  ${CategoryFragment}

  fragment Children on Category {
    id
    slug(acceptLanguage: $acceptLanguage)
    name(acceptLanguage: $acceptLanguage)
    childCount
  }

  query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $acceptLanguage: [Locale!]) {
    categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {
      offset
      count
      total
      results {
        ...DefaultCategory
      }
    }
  }
`;

export const menuCatQuery = (query, variables) => {
  const customVariables = {
    ...variables,
    where: 'parent is not defined'
  };

  return {
    query: customQuery,
    variables: customVariables
  };
};
