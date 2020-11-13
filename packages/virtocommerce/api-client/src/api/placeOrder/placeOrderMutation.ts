import gql from 'graphql-tag';

export default gql`
mutation PlaceOrder($command: InputCreateOrderFromCartType!) {
    createOrderFromCart(command: $command) {
      id
      number
    }
  }
`;


