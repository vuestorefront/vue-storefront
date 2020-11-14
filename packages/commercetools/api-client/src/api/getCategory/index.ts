import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { buildCategoryWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';
import ApolloClient from 'apollo-client';
import { apiClientMethodFactory } from './../../configuration';

interface CategoryData {
  categories: CategoryQueryResult;
}

async function getCategory(params, customQueryFn?: CustomQueryFn) {
  const { acceptLanguage, client } = this.$vsf.ct;
  const defaultVariables = params ? {
    where: buildCategoryWhere(this.$vsf.ct, params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await (client as ApolloClient<any>).query<CategoryData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
}

export default apiClientMethodFactory(getCategory);
