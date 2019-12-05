import { apolloClient } from './../index'
import gql from 'graphql-tag'

const getProduct = async () => {
  return await apolloClient.query({
    query: gql`
      {
        product(id: "c8d1fb5e-c3ae-4428-b895-66a17486e6a9") {
          id
          key
          version
        }
      }
    `,
  });
};

export default getProduct;
