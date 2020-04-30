import { apolloClient, locale } from './../../index';
import { ChannelsQueryResponse } from './../../types/Api';
import defaultQuery from './defaultQuery';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface SearchParams {
  id?: string;
  coordinates?: Coordinates;
}

const getWhere = (searchParams: SearchParams) => {
  if (searchParams.id) {
    return `id="${searchParams.id}"`;
  }

  return `geoLocation within circle(${searchParams.coordinates.longitude}, ${searchParams.coordinates.latitude}, 10000000)`;
};

const getChannels = async (searchParams: SearchParams): Promise<ChannelsQueryResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: {
      where: getWhere(searchParams),
      locale
    },
    fetchPolicy: 'no-cache'
  });
};

export default getChannels;
