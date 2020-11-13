import gql from 'graphql-tag';

export default gql`
  mutation AddOrUpdateCartShpment($command: InputAddOrUpdateCartShipmentType!) {
    addOrUpdateCartShipment(command: $command) {
      name
    }
  }
`;


