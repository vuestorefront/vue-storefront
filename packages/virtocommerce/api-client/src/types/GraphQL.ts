export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;
  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: any;
  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: any;
  /** Locale is a scalar value represented as a string language tag. */
  Locale: any;
  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: any;
  /** Raw JSON value */
  Json: any;
  /** Represents a currency. Currencies are identified by their [ISO
   * 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.
   */
  Currency: any;
  /** A key that references a resource. */
  KeyReferenceInput: any;
  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: any;
  /** Search sort */
  SearchSort: any;
  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: any;
  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;
  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: any;
};

/** Versioned object have an ID and version and modification. Every update of this object changes it's version. */
export type Versioned = {
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
};

export type Initiator = {
  __typename?: "Initiator";
  isPlatformClient?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<Reference>;
  externalUserId?: Maybe<Scalars["String"]>;
  customer?: Maybe<Reference>;
  anonymousId?: Maybe<Scalars["String"]>;
  clientId?: Maybe<Scalars["String"]>;
};

export type Reference = {
  __typename?: "Reference";
  typeId: Scalars["String"];
  id: Scalars["String"];
};

export type KeyReference = {
  __typename?: "KeyReference";
  typeId: Scalars["String"];
  key: Scalars["String"];
};

/** An address represents a postal address. */
export type Address = {
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
  additionalAddressInfo?: Maybe<Scalars["String"]>;
  externalId?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
};

/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type User = Versioned & {
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
  defaultShippingAddress?: Maybe<Address>;
  defaultBillingAddress?: Maybe<Address>;
  shippingAddresses: Array<Address>;
  billingAddresses: Array<Address>;
  storesRef: Array<KeyReference>;
  stores: Array<Store>;
};

export type Store = Versioned & {
  __typename?: "Store";
  id: Scalars["String"];
  version: Scalars["Long"];
  key: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  languages?: Maybe<Array<Scalars["Locale"]>>;
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
};

export type Me = {
  __typename?: "UserType";
  user?: Maybe<User>;
};
