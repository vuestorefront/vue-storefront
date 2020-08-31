import { Category, GqlCategoriesSearchResponse } from '../../types';

import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from '../../index';
import defaultCategoriesQuery from './defaultCategoriesQuery';
import normalizeCategoryId from '../../helpers/normalizeCategoryId';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategory = async (searchParams: any): Promise<Category[]> => {
  if (!searchParams) {
    searchParams = { ids: 'root', levels: '1' };
  }
  const result: ApolloQueryResult<GqlCategoriesSearchResponse> = await apolloClient.query<any>({
    query: defaultCategoriesQuery,
    variables: {
      ids: searchParams.slug ? normalizeCategoryId(searchParams.slug) : 'root',
      levels: searchParams.levels ? searchParams.levels : '1'
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return result.data.categories.data;
};

export default getCategory;

