import { Category } from '../../types';

import { ApolloQueryResult } from 'apollo-client';
import { apolloClient } from '../../index';
import defaultCategoriesQuery from './defaultCategoriesQuery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategory = async (searchParams: any): Promise<Category[]> => {
  if (!searchParams) {
    searchParams = { ids: 'root', levels: '1' };
  }
  console.log(searchParams);
  // TODO: add support for product details
  const result: ApolloQueryResult<any> = await apolloClient.query<any>({
    query: defaultCategoriesQuery,
    variables: {
      ids: searchParams.slug ? searchParams.slug : 'root',
      levels: searchParams.levels ? searchParams.levels : '1'
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return (result.data.categories.data as Category[]);
};

export default getCategory;

