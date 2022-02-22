import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategorySearchResult } from '../../types/GraphQL';
import { buildCategoryFilter } from '../../helpers/search';
import ApolloClient from 'apollo-client';
import { CustomQuery } from '@vue-storefront/core';
import { CategoryWhereSearch } from '@vue-storefront/commercetools-api';

export interface CategoryData {
  categorySearch: CategorySearchResult;
}

export interface CategorySearchParams {
  filter?: CategoryWhereSearch;
  limit?: number;
  offset?: number;
}

const categorySearch = async (context, params?: CategorySearchParams, customQuery?: CustomQuery) => {
  const { acceptLanguage } = context.config;
  const defaultVariables = params ? {
    filter: buildCategoryFilter(context.config, params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { categorySearch } = context.extendQuery(customQuery,
    { categorySearch: { query: defaultQuery, variables: defaultVariables } }
  );
  const request = await (context.client as ApolloClient<any>).query<CategoryData>({
    query: gql`${categorySearch.query}`,
    variables: categorySearch.variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default categorySearch;
