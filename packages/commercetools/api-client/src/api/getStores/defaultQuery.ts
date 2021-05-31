import gql from 'graphql-tag';
// import { StoreQueryResultFragment } from './../../fragments';

// const storesData = gql`
//   query stores(
//     $where: String
//     $sort: [String!]
//     $limit: Int
//     $offset: Int
//   ){
//     stores(
//       where: $where
//       sort: $sort
//       limit: $limit
//       offset: $offset
//     ) {
//       offset
//       count
//       total
//       results {
//         id
//         version
//         key
//         name
//         nameAllLocales {
//           locale
//           value
//         }
//         languages
//         createdAt
//         lastModifiedAt
//         createdBy {
//           isPlatformClient
//           user {
//             typeId
//             id
//           }
//           externalUserId
//           customer {
//             typeId
//             id
//           }
//           anonymousId
//           clientId
//         }
//         lastModifiedBy
//       }
//     }
//   }
// `;

// const storesData = gql`
//   ${StoreQueryResultFragment}

//   query stores(
//     $where: String
//     $sort: [String!]
//     $limit: Int
//     $offset: Int
//   ){
//     stores(
//       where: $where
//       sort: $sort
//       limit: $limit
//       offset: $offset
//     ) {
//       ...StoreQueryResultFragment
//     }
//   }
// `;

const storesData = gql`
  query stores(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
  ){
    stores(
      where: $where
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      offset
      count
      total
      results {
        id
        version
        key
        name
        nameAllLocales {
          locale
          value
        }
        languages
        createdAt
        lastModifiedAt
        createdBy {
          isPlatformClient
          user {
            typeId
            id
          }
          externalUserId
          anonymousId
          clientId
        }
      }
    }
  }
`;

export { storesData };
