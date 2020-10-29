export type Maybe<T> = T | null;

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

  /** Array */
  Array: any;

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

export type Cart = {
  __typename?: 'Cart';
  appliedGiftCards: Maybe<Scalars['Array']>;
  completedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  currencyCode: Maybe<Scalars['String']>;
  customAttributes: Maybe<Scalars['Array']>;
  discountApplications: Maybe<Scalars['Array']>;
  email: Maybe<Scalars['String']>;
  errors: Maybe<Scalars['Json']>;
  id: Maybe<Scalars['String']>;
  lineItems?: Maybe<Scalars['Array']>;
  lineItemsSubtotalPrice?: Maybe<Scalars['Json']>;
  note?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  orderStatusUrl?: Maybe<Scalars['String']>;
  paymentDue?: Maybe<Scalars['String']>;
  ready?: Maybe<Scalars['String']>;
  requiresShipping?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Scalars['Json']>;
  shippingLine?: Maybe<Scalars['String']>;
  subtotalPrice?: Maybe<Scalars['String']>;
  taxExempt?: Maybe<Scalars['String']>;
  taxesIncluded?: Maybe<Scalars['String']>;
  totalPrice?: Maybe<Scalars['String']>;
  totalTax?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  userErrors?: Maybe<Scalars['Array']>;
  webUrl?: Maybe<Scalars['String']>;
}

export type CartItem = {
  __typename?: 'CartItem';
  id: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['Array']>;
}

export type Wishlist = {}
export type Product = {
  __typename?: 'ProductVariant';
  id: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  images: Maybe<Scalars['Array']>;
  options: Maybe<Scalars['Array']>;
  productType: Maybe<Scalars['String']>;
  publishedAt: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  descriptionHtml: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  isOnWishlist: Maybe<Scalars['Boolean']>;
  availableForSale: Maybe<Scalars['Boolean']>;
  variants: Maybe<Scalars['Array']>;
  vendor: Maybe<Scalars['String']>;
  selectedVariant: Maybe<Scalars['Array']>;
}
export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  images: Maybe<Scalars['Array']>;
  options: Maybe<Scalars['Array']>;
  productType: Maybe<Scalars['String']>;
  publishedAt: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  descriptionHtml: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  isOnWishlist: Maybe<Scalars['Boolean']>;
  availableForSale: Maybe<Scalars['Boolean']>;
  available?: Maybe<Scalars['Boolean']>;
  variants: Maybe<Scalars['Array']>;
  vendor: Maybe<Scalars['String']>;
  selectedVariant: Maybe<Scalars['Array']>;
}
export type ProductParams = {
  type: Scalars['String'];
  data: Maybe<Scalars['Json']>;
}
export type Category = {
  __typename?: 'Category';
  id: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  image: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  descriptionHtml: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  products: Maybe<Scalars['Array']>;
}
export type CategoryFilter = {}
export type ShippingMethod = {}
export type LineItem = {
  __typename?: 'LineItem';
  customAttributes: Maybe<Scalars['Array']>;
  discountAllocations: Maybe<Scalars['Array']>;
  hasNextPage: Maybe<Scalars['String']>;
  hasPreviousPage: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>;
  title: Maybe<Scalars['String']>;
  // variableValues: Maybe<Scalars['Json']>;
  variableValues: {
    checkoutId: Maybe<Scalars['String']>;
    lineItems: Maybe<Scalars['Array']>;
  };
  variant: {
    available: Maybe<Scalars['String']>;
    compareAtPrice: Maybe<Scalars['String']>;
    id: Maybe<Scalars['String']>;
    image: {
      altText: Maybe<Scalars['String']>;
      id: Maybe<Scalars['String']>;
      src: Maybe<Scalars['String']>;
    };
    price: Maybe<Scalars['String']>;
    product: Maybe<Scalars['Json']>;
    sku: Maybe<Scalars['String']>;
    title: Maybe<Scalars['String']>;
    unitPrice: Maybe<Scalars['String']>;
    weight: Maybe<Scalars['String']>;
    selectedOptions?: Maybe<Scalars['Array']>;
  };
};
export type CategorySearchParams = {
  id: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  handle: Maybe<Scalars['String']>;
  customQuery: Maybe<Scalars['String']>;
  withProducts: Maybe<Scalars['Boolean']>;
}
export type ProductSearchParams = {
  id?: Maybe<Scalars['String']>;
  // ids: Maybe<Scalars['Json']>;
  slug?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  customQuery?: Maybe<Scalars['Json']>;
  ids?: any;
  with?: any;
  where?: any;
  sort?: any;
  page?: any;
  masterKey?: Maybe<Scalars['String']>;
  term?: any;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  reverse?: Maybe<Scalars['Boolean']>;
  sortKey?: Maybe<Scalars['String']>;
  collectionQuery?: Maybe<Scalars['Json']>;
}
export type Shop = {}
export type ShopSearchParams = {
  withPolicy: Maybe<Scalars['Boolean']>;
}
export type CartParams = {
  id: Maybe<Scalars['String']>;
  // checkoutId: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  lineItems?: Maybe<Scalars['Json']>;
  lineItemIds?: Maybe<Scalars['Array']>;
  input?: Maybe<Scalars['Json']>;
  discountCode?: Maybe<Scalars['String']>;
  appliedGiftCardId?: Maybe<Scalars['String']>;
  giftCardCodes?: Maybe<Scalars['Array']>;
  shippingAddress?: Maybe<Scalars['Json']>;
}

export type Customer = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}

export type CustomerParams = {}

export type Content = {
  id: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  body: Maybe<Scalars['String']>;
}

export type ContentSearchParams = {

}

export type ProductsByCollectionSearchParams = {
  __typename?: 'ProductsByCollectionSearch';
  handle: Maybe<Scalars['String']>;
  products?: Maybe<ProductSearchParams>;
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
}

export type ProductsByCollection = {
  __typename?: 'ProductsByCollectionSearch';
  category?: Maybe<Category>;
  products?: Maybe<Product>;
  pageInfo?: Maybe<PageInfo>;
}
