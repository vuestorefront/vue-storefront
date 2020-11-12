import { Logger } from '@vue-storefront/core';
import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/GraphQL';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const authenticate = async (context, userData: UserData, fn) => {
  try {
    const userResponse = await fn(context, userData);
    return userResponse.data.user;
  } catch (err) {
    err.message = err?.graphQLErrors?.[0]?.message || err.message;
    Logger.error('useUser.authenticate', err.message);
    throw err;
  }
};
