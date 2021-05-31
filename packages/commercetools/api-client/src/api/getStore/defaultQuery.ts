import gql from 'graphql-tag';
import { StoreFragment } from './../../fragments';

const storeData = gql`
  ${StoreFragment}

  query {
    inStore($key: KeyReferenceInput!) {
      ...DefaultStore
    }
  }
`;

export { storeData };
