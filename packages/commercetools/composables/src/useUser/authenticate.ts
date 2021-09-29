import { Logger } from '@vue-storefront/core';
import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/GraphQL';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

const validateUserResponse = (response) => {
  if (response?.data?.user) {
    return response.data.user;
  }

  throw response;
};

export const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);

    return validateUserResponse(userResponse);
  } catch (err) {
    err.message = err?.graphQLErrors?.[0]?.message || err.message;
    Logger.error('useUser.authenticate', err.message);
    throw err?.response?.data?.graphQLErrors?.[0] || err;
  }
};
