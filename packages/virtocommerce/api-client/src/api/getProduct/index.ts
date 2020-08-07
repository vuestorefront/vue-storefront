import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from './../../index';
import { ProductQueryResult } from './../../types/GraphQL';
import { productsList } from './defaultQuery';

interface ProductData {
  products: ProductQueryResult;
}

const getProduct = async (): Promise<ApolloQueryResult<ProductData>> => {
  return await apolloClient.query<ProductData>({
    query: productsList,
    variables: {
      filter: 'catalog:25f5ea1b52e54ec1aa903d44cc889324',
      storeId: 'Clothing',
      userId: '03b3df10-7732-4906-ba5b-f2cbe6fa85db'
    },
    fetchPolicy: 'no-cache'
  });
};

export default getProduct;
