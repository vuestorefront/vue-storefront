import {
  UserType,
  LoadUserQuery,
  LoadUserQueryVariables,  
} from '../../graphql/types';
import queryDocument from './getMeQuery';
import Cookies from 'js-cookie';


const getMe = async ({ config, client }): Promise<any> => {
  const { store, currency, locale } = config;
  const { data } = await client.query({
    query: queryDocument,
    variables: {
    },
    fetchPolicy: "no-cache"
  });
  return data.me.userName === 'Anonymous' ? null : data.me;
};

export default getMe;

