import gql from 'graphql-tag';
import defaultQuery from './defaultQuery';
import { CategoryQueryResult } from '../../types/GraphQL';
import { CustomQueryFn } from '../../index';
import { buildCategoryWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';
import { Config } from './../../types/setup';

interface CategoryData {
  categories: CategoryQueryResult;
}

const getCategory = async (settings: Config, params, customQueryFn?: CustomQueryFn) => {
  const { acceptLanguage, client } = settings;
  const defaultVariables = params ? {
    where: buildCategoryWhere(settings, params),
    limit: params.limit,
    offset: params.offset,
    acceptLanguage
  } : { acceptLanguage };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });

  const request = await client.query<CategoryData>({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getCategory;
