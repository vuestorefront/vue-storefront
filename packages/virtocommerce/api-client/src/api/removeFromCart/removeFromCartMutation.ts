import gql from 'graphql-tag';

export default gql`
  mutation RemoveFromCart($command: InputRemoveItemType!) {
    removeCartItem(command: $command) {
      itemsCount
    }
  }
`;
