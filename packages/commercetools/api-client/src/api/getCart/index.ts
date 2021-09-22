import gql from 'graphql-tag';
import { CartQueryResponse } from '../../types/Api';
import defaultQuery from './defaultQuery';

const getCart = async ({ config, client }, cartId: string): Promise<CartQueryResponse> => {
  const { locale, acceptLanguage, currency } = config;

  return await client.query({
    query: gql`${defaultQuery}`,
    variables: {
      cartId,
      locale,
      acceptLanguage,
      currency
    },
    fetchPolicy: 'no-cache'
  });
};

export default getCart;
