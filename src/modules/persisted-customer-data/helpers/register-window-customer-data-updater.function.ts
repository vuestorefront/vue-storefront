export interface CustomerDataInput {
  email?: string,
  phoneNumber?: string
}

export function registerWindowCustomerDataUpdater (
  setEmail: (email: string) => void,
  setPhoneNumber: (phoneNumber: string) => void
) {
  if (!window.budsies) {
    window.budsies = {};
  }

  window.budsies.updateCustomerData = (data?: CustomerDataInput) => {
    if (data?.email) {
      setEmail(data.email);
    }

    if (data?.phoneNumber) {
      setPhoneNumber(data.phoneNumber);
    }
  };
}
