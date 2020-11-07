import gql from 'graphql-tag';

export default gql`
  mutation AddItem($command: InputAddItemType!) {
    addItem(command: $command) {
      name,
      itemsQuantity
    }
  }
`;


