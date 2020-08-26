import gql from 'graphql-tag';

export default gql`
    query($ids: String, $levels: String) {
        categories(ids: $ids, levels: $levels) {
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
