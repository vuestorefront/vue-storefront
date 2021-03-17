# `useCart`

## Features

`useCart` composable can be used to:

* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

- `cart: Cart` - a main data object.

```ts
type Cart = {
  __typename?: "Cart";
  customerId?: Maybe<Scalars["String"]>;
  customer?: Maybe<Customer>;
  customerEmail?: Maybe<Scalars["String"]>;
  anonymousId?: Maybe<Scalars["String"]>;
  lineItems: Array<LineItem>;
  customLineItems: Array<CustomLineItem>;
  totalPrice: Money;
  taxedPrice?: Maybe<TaxedPrice>;
  shippingAddress?: Maybe<Address>;
  billingAddress?: Maybe<Address>;
  inventoryMode: InventoryMode;
  taxMode: TaxMode;
  taxRoundingMode: RoundingMode;
  taxCalculationMode: TaxCalculationMode;
  customerGroup?: Maybe<CustomerGroup>;
  customerGroupRef?: Maybe<Reference>;
  country?: Maybe<Scalars["Country"]>;
  shippingInfo?: Maybe<ShippingInfo>;
  discountCodes: Array<DiscountCodeInfo>;
  refusedGifts: Array<CartDiscount>;
  refusedGiftsRefs: Array<Reference>;
  paymentInfo?: Maybe<PaymentInfo>;
  locale?: Maybe<Scalars["Locale"]>;
  shippingRateInput?: Maybe<ShippingRateInput>;
  origin: CartOrigin;
  storeRef?: Maybe<KeyReference>;
  store?: Maybe<Store>;
  itemShippingAddresses: Array<Address>;
  cartState: CartState;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  deleteDaysAfterLastModification?: Maybe<Scalars["Int"]>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}
```  

- `load` - function required to fetch cart from a server or create brand new if it doesn't exist. This method accepts a single `params` object. The `params` has the following option:

    - `customQuery?: any`
  
- `addItem` - function for adding products to the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: ProductVariant`
    
    - `quantity: any`
    
    - `customQuery?: customQuery`
    
```ts
type ProductVariant = {
  __typename?: "ProductVariant";
  id: Scalars["Int"];
  key?: Maybe<Scalars["String"]>;
  sku?: Maybe<Scalars["String"]>;
  prices?: Maybe<Array<ProductPrice>>;
  price?: Maybe<ProductPrice>;
  images: Array<Image>;
  assets: Array<Asset>;
  availability?: Maybe<ProductVariantAvailabilityWithChannels>;
  attributesRaw: Array<RawProductAttribute>;
  attributes: ProductType;
  attributeList: Array<Attribute>;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```
  
- `updateItemQty` - function for updating quantity of a product that is already in the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: LineItem`
    
    - `quantity: number`
    
    - `customQuery?: CustomQuery`

```ts
type LineItem = {
  __typename?: "LineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  productSlug?: Maybe<Scalars["String"]>;
  productType?: Maybe<ProductTypeDefinition>;
  productTypeRef?: Maybe<Reference>;
  variant?: Maybe<ProductVariant>;
  price: ProductPrice;
  taxedPrice?: Maybe<TaxedItemPrice>;
  totalPrice?: Maybe<Money>;
  quantity: Scalars["Long"];
  state: Array<ItemState>;
  taxRate?: Maybe<TaxRate>;
  supplyChannel?: Maybe<Channel>;
  supplyChannelRef?: Maybe<Reference>;
  distributionChannel?: Maybe<Channel>;
  distributionChannelRef?: Maybe<Reference>;
  discountedPricePerQuantity: Array<DiscountedLineItemPriceForQuantity>;
  lineItemMode: LineItemMode;
  priceMode: LineItemPriceMode;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  shippingDetails?: Maybe<ItemShippingDetails>;
  inventoryMode?: Maybe<ItemShippingDetails>;
  customFieldList?: Maybe<Array<CustomField>>;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```
  
- `removeItem` - function for removing a product that currently is in the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: LineItem`
    
    - `customQuery?: CustomQuery`
    
```ts
type LineItem = {
  __typename?: "LineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  productSlug?: Maybe<Scalars["String"]>;
  productType?: Maybe<ProductTypeDefinition>;
  productTypeRef?: Maybe<Reference>;
  variant?: Maybe<ProductVariant>;
  price: ProductPrice;
  taxedPrice?: Maybe<TaxedItemPrice>;
  totalPrice?: Maybe<Money>;
  quantity: Scalars["Long"];
  state: Array<ItemState>;
  taxRate?: Maybe<TaxRate>;
  supplyChannel?: Maybe<Channel>;
  supplyChannelRef?: Maybe<Reference>;
  distributionChannel?: Maybe<Channel>;
  distributionChannelRef?: Maybe<Reference>;
  discountedPricePerQuantity: Array<DiscountedLineItemPriceForQuantity>;
  lineItemMode: LineItemMode;
  priceMode: LineItemPriceMode;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  shippingDetails?: Maybe<ItemShippingDetails>;
  inventoryMode?: Maybe<ItemShippingDetails>;
  customFieldList?: Maybe<Array<CustomField>>;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```
  
- `isOnCart` - function for checking if a product is currently in the cart. This method accepts a single `params` object. The `params` has the following option:

    - `product: ProductVariant`
    
```ts
type ProductVariant = {
  __typename?: "ProductVariant";
  id: Scalars["Int"];
  key?: Maybe<Scalars["String"]>;
  sku?: Maybe<Scalars["String"]>;
  prices?: Maybe<Array<ProductPrice>>;
  price?: Maybe<ProductPrice>;
  images: Array<Image>;
  assets: Array<Asset>;
  availability?: Maybe<ProductVariantAvailabilityWithChannels>;
  attributesRaw: Array<RawProductAttribute>;
  attributes: ProductType;
  attributeList: Array<Attribute>;
}
```
  
- `clear` - function for removing all items currently stored in cart.

- `applyCoupon` - function for applying coupon to cart. This method accepts a single `params` object. The `params` has the following options:

    - `couponCode: string`
    
    - `customQuery?: CustomQuery`
    
```ts
type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```
  
- `removeCoupon` - function for removing coupon applied to cart. This method accepts a single `params` object. The `params` has the following options:

    - `coupon: AgnosticCoupon`
      
    - `customQuery?: CustomQuery`
    
```ts
interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

type CustomQuery = (query, variables) => {
  query?;
  variables?;
}
```
  
- `loading: boolean` - a reactive object containing information about loading state of the cart.

- `error: UseCartErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseCartErrors {
  addItem: Error;
  removeItem: Error;
  updateItemQty: Error;
  load: Error;
  clear: Error;
  applyCoupon: Error;
  removeCoupon: Error;
}
```

## Getters

- `getTotals` - returns cart totals.

- `getShippingPrice` - returns current shipping price.

- `getItems` - returns all items from cart.
  
- `getItemName` - returns product name.

- `getItemImage` - returns product image.

- `getItemPrice` - returns product price.

- `getItemQty` - returns product quantity.

- `getItemAttributes` - returns product attribute.

- `getItemSku` - returns product SKU.

- `getTotalItems` - returns products amount.

- `getFormattedPrice` - returns product price with currency sign.

- `getCoupons` - returns applied coupons.

- `getDiscounts` - returns all discounts.

```ts
interface CartGetters {
  getTotals: (cart: Cart) => AgnosticTotals;
  getShippingPrice: (cart: Cart) => number;
  getItems: (cart: Cart) => LineItem;
  getItemName: (product: LineItem) => string;
  getItemImage: (product: LineItem) => string;
  getItemPrice: (product: LineItem) => AgnosticPrice;
  getItemQty: (product: LineItem) => number;
  getItemAttributes: (product: LineItem, filterByAttributeName?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (product: LineItem) => string;
  getTotalItems: (cart: Cart) => number;
  getFormattedPrice: (price: number) => string;
  getCoupons: (cart: Cart) => AgnosticCoupon[];
  getDiscounts: (cart: Cart) => AgnosticDiscount[];
}

type LineItem = {
  __typename?: "LineItem";
  id: Scalars["String"];
  productId: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  nameAllLocales: Array<LocalizedString>;
  productSlug?: Maybe<Scalars["String"]>;
  productType?: Maybe<ProductTypeDefinition>;
  productTypeRef?: Maybe<Reference>;
  variant?: Maybe<ProductVariant>;
  price: ProductPrice;
  taxedPrice?: Maybe<TaxedItemPrice>;
  totalPrice?: Maybe<Money>;
  quantity: Scalars["Long"];
  state: Array<ItemState>;
  taxRate?: Maybe<TaxRate>;
  supplyChannel?: Maybe<Channel>;
  supplyChannelRef?: Maybe<Reference>;
  distributionChannel?: Maybe<Channel>;
  distributionChannelRef?: Maybe<Reference>;
  discountedPricePerQuantity: Array<DiscountedLineItemPriceForQuantity>;
  lineItemMode: LineItemMode;
  priceMode: LineItemPriceMode;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  shippingDetails?: Maybe<ItemShippingDetails>;
  inventoryMode?: Maybe<ItemShippingDetails>;
  customFieldList?: Maybe<Array<CustomField>>;
}

interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
  [x: string]: unknown;
}

interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

interface AgnosticDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}
```

## Example

```js
import { useCart, cartGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```
