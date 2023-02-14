import addressKeys from '../types/address-keys';

export default function isAddressEmpty (address: any, ignoreKeys: string[] = []): boolean {
  for (const key of addressKeys) {
    if (!address.hasOwnProperty(key)) {
      throw new Error(`Incorrect address object`)
    }

    if (ignoreKeys.includes(key)) {
      continue;
    }

    if (address[key]) {
      return false;
    }
  }

  return true;
}
