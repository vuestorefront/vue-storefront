import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { buildCategoryWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (context, params, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = params ? {
    where: buildCategoryWhere(context, params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await (context.client as ApolloClient<any>).query<CategoryData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getCategory;
