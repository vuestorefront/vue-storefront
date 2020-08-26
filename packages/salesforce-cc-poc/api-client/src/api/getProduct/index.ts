import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from '../../index';
import defaultProductSearchQuery from './defaultProductSearchQuery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProduct = async (search: any): Promise<ApolloQueryResult<any>> => {
  console.log(search);
  // TODO: add support for product details
  return await apolloClient.query<any>({
    query: defaultProductSearchQuery,
    variables: {
      filters: [],
      query: 'Ties'
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });

};

export default getProduct;
