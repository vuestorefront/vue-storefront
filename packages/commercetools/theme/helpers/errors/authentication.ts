export const getFriendlyError = (message, email) => {

  const knownErrors = [
    {
      originalMessage: `There is already an existing customer with the email '"${email}"'.`,
      displayMessage: `There is already an existing customer with this email ${email}.`,
      fieldName: 'email'
    },
    {
      originalMessage: 'Account with the given credentials not found.',
      displayMessage: 'Account with the given credentials not found.',
      fieldName: null
    },
    {
      originalMessage: 'Network error: Customer account with the given credentials not found.',
      displayMessage: 'Customer account with the given credentials not found.',
      fieldName: null
    }
  ];

  return knownErrors.find(knownError => knownError.originalMessage === message);
};
