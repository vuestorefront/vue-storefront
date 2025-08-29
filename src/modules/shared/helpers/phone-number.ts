import { CountryCode, PhoneNumber } from 'libphonenumber-js';

export type ParsePhoneNumber = (
  text: string,
  defaultCountry?: CountryCode | { defaultCountry?: CountryCode, defaultCallingCode?: string, extract?: boolean }
) => PhoneNumber;

export interface PhoneHelpers {
  formatPhoneNumberToE164: (phoneNumber: string, country: string) => string | null,
  formatPhoneNumberForDisplay: (phoneNumber: string, country: string) => string,
  isValidPhoneNumber: (phoneNumber: string, country: string) => boolean
}

export function createPhoneHelpers (parsePhoneNumber: ParsePhoneNumber): PhoneHelpers {
  const formatPhoneNumberToE164 = (phoneNumber: string, country: string): string | null => {
    if (!phoneNumber || !country) {
      return null;
    }

    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, country as CountryCode);
      return parsedNumber.format('E.164');
    } catch (e) {
      return null;
    }
  };

  const formatPhoneNumberForDisplay = (phoneNumber: string, country: string): string => {
    if (!phoneNumber) {
      return phoneNumber;
    }

    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, country as CountryCode);
      return parsedNumber.formatInternational();
    } catch (e) {
      try {
        if (phoneNumber.startsWith('+')) {
          const parsedNumber = parsePhoneNumber(phoneNumber);
          return parsedNumber.formatInternational();
        }
      } catch (innerError) {}

      return phoneNumber;
    }
  };

  const isValidPhoneNumber = (phoneNumber: string, country: string): boolean => {
    if (!phoneNumber || !country) {
      return false;
    }

    try {
      const parsedNumber = parsePhoneNumber(phoneNumber, country as CountryCode);
      return parsedNumber.isValid();
    } catch (e) {
      return false;
    }
  };

  return {
    formatPhoneNumberToE164,
    formatPhoneNumberForDisplay,
    isValidPhoneNumber
  };
}
