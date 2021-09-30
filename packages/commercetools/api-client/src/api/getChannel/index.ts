import { Context, CustomQuery } from '@vue-storefront/core';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { ChannelQueryResult } from '../../types/GraphQL';
import { channelData } from './defaultQuery';
import { ApiResponseWrapper } from '../../types/Api';
import { buildChannelWhere } from '../../helpers/search';

const getChannel = async (context: Context, params: Record<string, string>, customQuery?: CustomQuery) => {
  const variables = {
    ...(params && { where: buildChannelWhere(params) })
  };

  const { getChannelData } = context.extendQuery(customQuery, {
    getChannelData: { query: channelData, variables }
  });

  const response = await (context.client as ApolloClient<any>).query<ApiResponseWrapper<'channel', ChannelQueryResult>>({
    query: gql`${getChannelData.query}`,
    variables: getChannelData.variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.channel;
};

export default getChannel;
