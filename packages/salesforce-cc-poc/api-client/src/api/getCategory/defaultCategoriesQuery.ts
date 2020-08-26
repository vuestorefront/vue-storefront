import gql from 'graphql-tag';

export default gql`
    { 
        categories ($ids: String!, $levels: String!) {
            data {
                id,
                name,
                description,
                pageTitle,
                thumbnail
                categories {
                  id,
                  name,
                  description,
                  pageTitle,
                  thumbnail
              }
            }
            }
        }
`;
