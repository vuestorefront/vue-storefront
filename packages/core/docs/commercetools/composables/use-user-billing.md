# `useUserBilling`

## Features

`useUserBilling` composable can be used to:

* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `billing` property.

- `addAddress` - function for posting new billing address. This method accepts a single `params` object. The `params` has the following options:

    - `address: BillingAddressAddParams`

    - `customQuery?: customQuery`

      ```typescript
      interface BillingAddressAddParams {
        address: {
          firstName: string;
          lastName: string;
          streetName: string;
          postalCode: string;
          city: string;
          state: string;
          country: string;
          apartment: string;
          phone: string;
          isDefault?: boolean;
        }
      }
      type customQuery = {
        addBillingAddress: string
      }
      ```

- `deleteAddress` - a function for deleting existing billing address. This method accepts a single `params` object. The `params` has the following options:

    - `address: BillingAddressDeleteParams`

    - `customQuery?: customQuery`

      ```typescript
      interface BillingAddressDeleteParams {
        address: {
          id: string;
        }
      }
      type customQuery = {
        deleteBillingAddress: string
      }
      ```

- `updateAddress` - a function for updating existing billing address. This method accepts a single `params` object. The `params` has the following options:

    - `address: BillingAddressUpdateParams`

    - `customQuery?: customQuery`

      ```typescript
      interface BillingAddressUpdateParams {
        address: {
          id: string;
          firstName: string;
          lastName: string;
          streetName: string;
          postalCode: string;
          city: string;
          state: string;
          country: string;
          apartment: string;
          phone: string;
          isDefault?: boolean;
        }
      }
      type customQuery = {
        updateBillingAddress: string
      }
      ```

- `setDefaultAddress` - a function for settings an existing billing address as default. This method accepts a single `params` object. The `params` has the following options:

    - `address: BillingAddressSetDefaultParams`

    - `customQuery?: customQuery`

      ```typescript
      interface BillingAddressSetDefaultParams {
        address: {
          id: string;
        }
      }
      type customQuery = {
        setDefaultBillingAddress: string
      }
      ```

- `billing: User` - a reactive data object containing response from the backend.

  ```ts
  type Customer = {
    __typename?: "Customer";
    customerNumber?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
    password: Scalars["String"];
    addresses: Array<Address>;
    defaultShippingAddressId?: Maybe<Scalars["String"]>;
    defaultBillingAddressId?: Maybe<Scalars["String"]>;
    shippingAddressIds: Array<Scalars["String"]>;
    billingAddressIds: Array<Scalars["String"]>;
    isEmailVerified: Scalars["Boolean"];
    customerGroupRef?: Maybe<Reference>;
    externalId?: Maybe<Scalars["String"]>;
    key?: Maybe<Scalars["String"]>;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    middleName?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    locale?: Maybe<Scalars["Locale"]>;
    salutation?: Maybe<Scalars["String"]>;
    dateOfBirth?: Maybe<Scalars["Date"]>;
    companyName?: Maybe<Scalars["String"]>;
    vatId?: Maybe<Scalars["String"]>;
    customerGroup?: Maybe<CustomerGroup>;
    defaultShippingAddress?: Maybe<Address>;
    defaultBillingAddress?: Maybe<Address>;
    shippingAddresses: Array<Address>;
    billingAddresses: Array<Address>;
    storesRef: Array<KeyReference>;
    stores: Array<Store>;
    customFieldsRaw?: Maybe<Array<RawCustomField>>;
    customFields?: Maybe<Type>;
    custom?: Maybe<CustomFieldsType>;
    id: Scalars["String"];
    version: Scalars["Long"];
    createdAt: Scalars["DateTime"];
    lastModifiedAt: Scalars["DateTime"];
    createdBy?: Maybe<Initiator>;
    lastModifiedBy?: Maybe<Initiator>;
    customFieldList?: Maybe<Array<CustomField>>;
  }

  type User = Customer;
  ```

- `loading: boolean` - a reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefaultAddress` methods.

- `error: UseUserBillingErrors` - a reactive object containing the error message if some properties failed for any reason.

## Getters

- `getAddresses` - returns list of billing addresses.

- `getDefault` - returns a default billing address.

- `getTotal` - returns a total number of billing addresses the user has.

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

  ```typescript
  interface UserBillingGetters {
    getAddresses: (billing: User, criteria?: Record<string, any>) => BillingAddress[];
    getDefault: (billing: User) => BillingAddress;
    getTotal: (billing: User) => number;
    getId: (address: BillingAddress) => string | number;
    getPostCode: (address: BillingAddress) => string;
    getStreetName: (address: BillingAddress) => string;
    getStreetNumber: (address: BillingAddress) => string | number;
    getCity: (address: BillingAddress) => string;
    getFirstName: (address: BillingAddress) => string;
    getLastName: (address: BillingAddress) => string;
    getCountry: (address: BillingAddress) => string;
    getPhone: (address: BillingAddress) => string;
    getEmail: (address: BillingAddress) => string;
    getProvince: (address: BillingAddress) => string;
    getCompanyName: (address: BillingAddress) => string;
    getTaxNumber: (address: BillingAddress) => string;
    getApartmentNumber: (address: BillingAddress) => string | number;
    isDefault: (address: BillingAddress) => boolean;
  }

  type Customer = {
    __typename?: "Customer";
    customerNumber?: Maybe<Scalars["String"]>;
    email: Scalars["String"];
    password: Scalars["String"];
    addresses: Array<Address>;
    defaultShippingAddressId?: Maybe<Scalars["String"]>;
    defaultBillingAddressId?: Maybe<Scalars["String"]>;
    shippingAddressIds: Array<Scalars["String"]>;
    billingAddressIds: Array<Scalars["String"]>;
    isEmailVerified: Scalars["Boolean"];
    customerGroupRef?: Maybe<Reference>;
    externalId?: Maybe<Scalars["String"]>;
    key?: Maybe<Scalars["String"]>;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    middleName?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    locale?: Maybe<Scalars["Locale"]>;
    salutation?: Maybe<Scalars["String"]>;
    dateOfBirth?: Maybe<Scalars["Date"]>;
    companyName?: Maybe<Scalars["String"]>;
    vatId?: Maybe<Scalars["String"]>;
    customerGroup?: Maybe<CustomerGroup>;
    defaultShippingAddress?: Maybe<Address>;
    defaultBillingAddress?: Maybe<Address>;
    shippingAddresses: Array<Address>;
    billingAddresses: Array<Address>;
    storesRef: Array<KeyReference>;
    stores: Array<Store>;
    customFieldsRaw?: Maybe<Array<RawCustomField>>;
    customFields?: Maybe<Type>;
    custom?: Maybe<CustomFieldsType>;
    id: Scalars["String"];
    version: Scalars["Long"];
    createdAt: Scalars["DateTime"];
    lastModifiedAt: Scalars["DateTime"];
    createdBy?: Maybe<Initiator>;
    lastModifiedBy?: Maybe<Initiator>;
    customFieldList?: Maybe<Array<CustomField>>;
  }

  type User = Customer;

  type Address = {
    __typename?: "Address";
    id?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    salutation?: Maybe<Scalars["String"]>;
    firstName?: Maybe<Scalars["String"]>;
    lastName?: Maybe<Scalars["String"]>;
    streetName?: Maybe<Scalars["String"]>;
    streetNumber?: Maybe<Scalars["String"]>;
    additionalStreetInfo?: Maybe<Scalars["String"]>;
    postalCode?: Maybe<Scalars["String"]>;
    city?: Maybe<Scalars["String"]>;
    region?: Maybe<Scalars["String"]>;
    state?: Maybe<Scalars["String"]>;
    country: Scalars["Country"];
    company?: Maybe<Scalars["String"]>;
    department?: Maybe<Scalars["String"]>;
    building?: Maybe<Scalars["String"]>;
    apartment?: Maybe<Scalars["String"]>;
    pOBox?: Maybe<Scalars["String"]>;
    contactInfo: AddressContactInfo;
    additionalAddressInfo?: Maybe<Scalars["String"]>;
    externalId?: Maybe<Scalars["String"]>;
    key?: Maybe<Scalars["String"]>;
  }

  type BillingAddress = Address & {
    isDefault?: boolean;
  }
  ```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vsf-enterprise/commercetools';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
      userBillingGetters
    };
  }
};
```
