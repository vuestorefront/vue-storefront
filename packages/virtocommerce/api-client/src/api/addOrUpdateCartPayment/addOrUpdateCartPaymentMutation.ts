import gql from 'graphql-tag';

export default gql`
  mutation AddOrUpdateCartPayment($command: InputAddOrUpdateCartPaymentType!) {
    addOrUpdateCartPayment(command: $command) {
      name
    }
  }
`;


