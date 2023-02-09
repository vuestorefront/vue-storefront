import addressKeys from '../types/address-keys';

export default function isAddressesEquals (firstAddress: any, secondAddress: any) {
  for (const key of addressKeys) {
    if (!firstAddress.hasOwnProperty(key) || !secondAddress.hasOwnProperty(key)) {
      throw new Error(`Incorrect address object`)
    }

    if (firstAddress[key] !== secondAddress[key]) {
      return false;
    }
  }

  return true;
}
