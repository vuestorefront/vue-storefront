export const compareAddresses = (savedAddress, currentAddress) => {
  return savedAddress.city === currentAddress.city &&
    savedAddress.company === currentAddress.company &&
    savedAddress.country === currentAddress.country &&
    savedAddress.firstName === currentAddress.firstName &&
    savedAddress.lastName === currentAddress.lastName &&
    savedAddress.phone === currentAddress.phone &&
    savedAddress.postalCode === currentAddress.postalCode &&
    savedAddress.state === currentAddress.state &&
    savedAddress.streetName === currentAddress.streetName &&
    savedAddress.apartment === currentAddress.streetNumber;
};
