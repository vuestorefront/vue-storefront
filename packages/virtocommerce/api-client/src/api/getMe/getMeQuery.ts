import gql from 'graphql-tag';

export default gql`
  query loadUser {
  me
  {
    id
    userName
    email
    emailConfirmed
    photoUrl
    phoneNumber
    permissions
    
    contact
    {
      firstName
      lastName
      fullName      
    }
  }
}
`;
