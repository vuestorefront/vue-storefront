import gql from 'graphql-tag';

const basicProfile = gql`
  query getMe($username: String) {
    user(userName: $username) {
      id
      userName
      phoneNumber
    }
  }
`;

export { basicProfile };
