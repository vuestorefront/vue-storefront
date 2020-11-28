const restrictedOperations = {
  anonymous: [
    'getMe',
    'createCart'
  ],
  user: [
    'customerSignMeIn',
    'customerSignMeUp'
  ]
};

export const isAnonymousOperation = (operationName) => restrictedOperations.anonymous.includes(operationName);
export const isUserOperation = (operationName) => restrictedOperations.user.includes(operationName);
