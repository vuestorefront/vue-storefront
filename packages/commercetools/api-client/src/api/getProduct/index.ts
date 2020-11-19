import gql from 'graphql-tag';
import { CustomQueryFn } from '../../index';
import { ProductQueryResult } from '../../types/GraphQL';
import defaultQuery from './defaultQuery';
import { buildProductWhere } from '../../helpers/search';
import { getCustomQuery } from '../../helpers/queries';
import { Config } from './../../types/setup';

export interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (settings: Config, params, customQueryFn?: CustomQueryFn) => {
  const { locale, acceptLanguage, currency, country, client } = settings;
  const defaultVariables = {
    where: buildProductWhere(settings, params),
    skus: params.skus,
    limit: params.limit,
    offset: params.offset,
    locale,
    acceptLanguage,
    currency,
    country
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery, defaultVariables });
  const request = await client.query<ProductData>({
    query: gql`${query}`,
    variables,
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return request;
};

export default getProduct;
