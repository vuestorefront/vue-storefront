import gql from 'graphql-tag';

export default gql`
  mutation ClearCart($command: InputClearCartType!) {
    clearCart(command: $command) {
      itemsCount
    }
  }
`;
