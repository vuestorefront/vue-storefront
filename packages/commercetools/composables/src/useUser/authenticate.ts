import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/GraphQL';

type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;

export const authenticate = async (userData: UserData, fn) => {
  try {
    const userResponse = await fn(userData);
    return userResponse.data.user;
  } catch (err) {
    err.message = err?.graphQLErrors?.[0]?.message || err.message;
    console.error(err.message);
    throw err;
  }
};
