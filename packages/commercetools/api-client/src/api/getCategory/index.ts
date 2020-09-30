import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from './../../types/GraphQL';
import { apolloClient, getSettings } from './../../index';
import { buildCategoryWhere } from './../../helpers/search';
import { getCustomQuery } from './../../helpers/queries';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (params, customQueryFn?) => {
  const { acceptLanguage } = getSettings();
  const defaultVariables = params ? {
    where: buildCategoryWhere(params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await apolloClient.query<CategoryData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return {
    ...request,
    query,
    variables
  };
};

export default getCategory;
