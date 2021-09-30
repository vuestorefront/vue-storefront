import gql from 'graphql-tag';
import { ChannelQueryResultFragment } from './../../fragments';

const channelData = gql`
  ${ChannelQueryResultFragment}

  query channels(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    channels(
      where: $where
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      ...ChannelQueryResultFragment
    }
  }
`;

export { channelData };
