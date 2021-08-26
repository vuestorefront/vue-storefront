/* istanbul ignore file */
const restrictedOperations = {
  anonymous: [
    'createCart',
    'createMyShoppingList'
  ],
  user: [
    'customerSignMeIn',
    'customerSignMeUp'
  ]
};

export const isAnonymousOperation = (operationName) => restrictedOperations.anonymous.includes(operationName);
export const isUserOperation = (operationName) => restrictedOperations.user.includes(operationName);
