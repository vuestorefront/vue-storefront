import { Address } from '../types/address';
import { getRegionNameByCountryAndRegionId } from './get-region-name-by-country-and-region-id.function';

function formatStreet (street: string[]): string {
  return street.join('\n');
}

async function digestMessage (message: string): Promise<string> {
  const encoded = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

export async function generateAddressHash (address: Address): Promise<string> {
  const regionName = address.region_id
    ? getRegionNameByCountryAndRegionId(address.country, address.region_id)
    : address.region;

  const parts: string[] = [
    formatStreet(address.street).trim(),
    address.city,
    address.region_id?.toString() || '',
    regionName,
    address.postcode,
    address.country
  ];

  return digestMessage(parts.join('|'));
}
