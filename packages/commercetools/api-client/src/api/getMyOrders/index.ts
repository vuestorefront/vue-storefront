import { apolloClient, locale, acceptLanguage } from './../../index';
import defaultQuery from './defaultQuery';
import { buildOrderWhere } from './../../helpers/search';
import { OrderSearch, ProfileResponse } from './../../types/Api';

export default async (search: OrderSearch): Promise<ProfileResponse> => {
  return await apolloClient.query({
    query: defaultQuery,
    variables: {
      where: buildOrderWhere(search),
      sort: search.sort,
      limit: search.limit,
      offset: search.offset,
      acceptLanguage,
      locale
    },
    fetchPolicy: 'no-cache'
  });
};
