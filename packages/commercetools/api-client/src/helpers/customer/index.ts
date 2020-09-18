export const changeCustomerEmail = (email: string) => ({
  changeEmail: { email }
});

export const setCustomerFirstName = (firstName: string) => ({
  setFirstName: { firstName }
});

export const setCustomerLastName = (lastName: string) => ({
  setLastName: { lastName }
});
