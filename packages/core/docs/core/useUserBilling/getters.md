Because `billing` property is a raw response, it's recommended to use `UserBillingGetters` for accessing any data from it. It includes following helper functions:

- `getAddresses` - returns list of billing addresses.

- `getDefault` - returns a default billing address.

- `getTotal` - returns total number of billing addresses user has.

- `getId` - returns id from an individual address.

- `getPostCode` - returns post code from an individual address.

- `getStreetName` - returns street name from an individual address.

- `getStreetNumber` - returns street number from an individual address.

- `getCity` - returns city name from an individual address.

- `getFirstName` - returns first name from an individual address.

- `getLastName` - returns last name from an individual address.

- `getCountry` - returns country name from an individual address.

- `getPhone` - return phone number from an individual address.

- `getEmail` - returns e-mail address from an individual address.

- `getProvince` - returns province (state) from an individual address.

- `getCompanyName` - returns company name from an individual address.

- `getTaxNumber` - returns tax number from an individual address.

- `getApartmentNumber` - returns apartment number from an individual address.

- `isDefault` - return information if address is current default.

Interface for the above getter looks like this:

```typescript

export interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
  // Getters for 'billing' data object
  getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
  getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
  getTotal: (billing: USER_BILLING) => number;

  // Getters for individual addresses
  getId: (address: USER_BILLING_ITEM) => string | number;
  getPostCode: (address: USER_BILLING_ITEM) => string;
  getStreetName: (address: USER_BILLING_ITEM) => string;
  getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
  getCity: (address: USER_BILLING_ITEM) => string;
  getFirstName: (address: USER_BILLING_ITEM) => string;
  getLastName: (address: USER_BILLING_ITEM) => string;
  getCountry: (address: USER_BILLING_ITEM) => string;
  getPhone: (address: USER_BILLING_ITEM) => string;
  getEmail: (address: USER_BILLING_ITEM) => string;
  getProvince: (address: USER_BILLING_ITEM) => string;
  getCompanyName: (address: USER_BILLING_ITEM) => string;
  getTaxNumber: (address: USER_BILLING_ITEM) => string;
  getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
  isDefault: (address: USER_BILLING_ITEM) => boolean;
}
```
