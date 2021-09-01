import { Logger } from '@vue-storefront/core';
import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/GraphQL';
import {graphQLError} from '../helpers/internals';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);
    return userResponse.data.user;
  } catch (err) {
    err.message = graphQLError(err);
    Logger.error('useUser.authenticate', err.message);
    throw err?.response?.data?.graphQLErrors?.[0] || err;
  }
};
