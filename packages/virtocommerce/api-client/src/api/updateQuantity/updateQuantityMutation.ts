import gql from 'graphql-tag';

export default gql`
  mutation UpdateCartItemQuantity($command: InputChangeCartItemQuantityType!) {
    changeCartItemQuantity(command: $command) {
      itemsQuantity
    }
  }
`;
