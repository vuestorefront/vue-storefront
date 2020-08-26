import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from '../../index';
import defaultProductSearchQuery from './defaultProductSearchQuery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getProduct = async (search: any): Promise<ApolloQueryResult<any>> => {
  const searchParams = search && search.length ? search[0] : {};
  const filterParams = [];
  if (searchParams.sort) {
    filterParams.push({ id: 'sort', value: search.sort });
  }
  if (searchParams.catId) {
    filterParams.push({ id: 'cgid', value: search.catId });
  }

  // TODO: add support for product details
  return await apolloClient.query<any>({
    query: defaultProductSearchQuery,
    variables: {
      filters: filterParams,
      query: ''
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });

};

export default getProduct;
