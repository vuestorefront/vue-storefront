import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from '../../index';
import defaultQuery from './defaultQuery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProduct = async (search: any): Promise<ApolloQueryResult<any>> => {
  return await apolloClient.query<any>({
    query: defaultQuery,
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
