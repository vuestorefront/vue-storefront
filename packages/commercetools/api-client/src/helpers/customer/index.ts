export const changeCustomerEmailAction = (email: string) => ({
  changeEmail: { email }
});

export const setCustomerFirstNameAction = (firstName: string) => ({
  setFirstName: { firstName }
});

export const setCustomerLastNameAction = (lastName: string) => ({
  setLastName: { lastName }
});
