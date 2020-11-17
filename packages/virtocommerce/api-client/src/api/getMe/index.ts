import { xApiClient, getSettings } from '../../index';
import {
  UserType,
  LoadUserQuery,
  LoadUserQueryVariables,  
} from '../../graphql/types';
import queryDocument from './getMeQuery';
import Cookies from 'js-cookie';


const getMe = async (): Promise<any> => {
  const { store, currency, locale } = getSettings();
  const { data } = await xApiClient.query<LoadUserQuery, LoadUserQueryVariables>({
    query: queryDocument,
    variables: {
    },
    fetchPolicy: "no-cache"
  });
  console.log('getMe()');
  console.log(data);

  return data.me.userName === 'Anonymous' ? null : data.me;
};

export default getMe;

