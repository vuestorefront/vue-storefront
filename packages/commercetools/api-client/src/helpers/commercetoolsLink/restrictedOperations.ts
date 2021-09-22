/* istanbul ignore file */
const restrictedOperations = {
  server: [
    'customerCreatePasswordResetToken',
    'createReview',
    'reviews'
  ],
  anonymous: [
    'createCart',
    'createMyShoppingList'
  ],
  user: [
    'customerSignMeIn',
    'customerSignMeUp'
  ]
};

export function isServerOperation(operationName: string): boolean {
  return restrictedOperations.server.includes(operationName);
}

export function isAnonymousOperation(operationName: string): boolean {
  return restrictedOperations.anonymous.includes(operationName);
}

export function isUserOperation(operationName: string): boolean {
  return restrictedOperations.user.includes(operationName);
}
