import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from '../../types/GraphQL';
import { buildCategoryWhere } from '../../helpers/search';
import ApolloClient from 'apollo-client';

export interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (context, params) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = params ? {
    where: buildCategoryWhere(context.config, params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { categories } = context.createQuery({
    categories: { query: defaultQuery, variables: defaultVariables }
  });

  const request = await (context.client as ApolloClient<any>).query<CategoryData>({
    query: gql`${categories.query}`,
    variables: categories.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getCategory;
