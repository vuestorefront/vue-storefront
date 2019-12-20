/**
 * we can have only two addresses: 'shipping' or 'billing'
 */
const removeNonDefaultAddress = (updatedProfile) => {
  if (!(updatedProfile && updatedProfile.addresses)) return
  updatedProfile.addresses = updatedProfile.addresses.filter((address) => address.default_shipping || address.default_billing)
}

export default removeNonDefaultAddress
