import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { apolloClient, acceptLanguage } from './../../index';
import { CategorySearch } from './../../types/Api';
import { CategoryQueryResult } from './../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildCategoryWhere } from './../../helpers/search';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (search?: CategorySearch): Promise<ApolloQueryResult<CategoryData>> => {
  if (!search) {
    return await apolloClient.query<CategoryData>({
      query: defaultQuery,
      variables: { acceptLanguage }
    });
  }

  if (search.customQuery) {
    const { query, variables } = search.customQuery;

    return await apolloClient.query<CategoryData>({
      query: gql`${query}`,
      variables
    });
  }

  return await apolloClient.query<CategoryData>({
    query: defaultQuery,
    variables: {
      where: buildCategoryWhere(search),
      limit: search.limit,
      offset: search.offset,
      acceptLanguage
    }
  });
};

export default getCategory;
