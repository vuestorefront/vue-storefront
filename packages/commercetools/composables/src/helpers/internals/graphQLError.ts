const getCtGraphQLErrorMessage = (err):string => err?.graphQLErrors?.[0]?.message || err.message;

export default getCtGraphQLErrorMessage;
