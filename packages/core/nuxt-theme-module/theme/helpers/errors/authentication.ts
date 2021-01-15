export const knownErrors = (context, email) => {
  const { $i18n } = context.root;

  return [
    {
      originalMessage: `There is already an existing customer with the email '"${email}"'.`,
      displayMessage: `${$i18n.t('There is already an existing customer with this email')} ${email}.`,
      fieldName: 'email'
    },
    {
      originalMessage: 'Account with the given credentials not found.',
      displayMessage: `${$i18n.t('Account with the given credentials not found.')}`,
      fieldName: null
    },
    {
      originalMessage: 'Network error: Customer account with the given credentials not found.',
      displayMessage: `${$i18n.t('Customer account with the given credentials not found.')}`,
      fieldName: null
    }
  ];
};
