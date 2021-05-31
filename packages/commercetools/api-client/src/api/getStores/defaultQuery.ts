import gql from 'graphql-tag';
import { StoreFragment } from './../../fragments';

const storesData = gql`
  ${StoreFragment}

  query {
    inStores($keys: [KeyReferenceInput!]!) {
      ...DefaultStore
    }
  }
`;

export { storesData };
