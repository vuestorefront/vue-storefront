import {
  UiMediaGalleryItem,
  UiCategory,
  AgnosticProductAttribute,
  AgnosticTotals
} from '@vue-storefront/interfaces';
import { ProductVariant, Image, Category, Cart, LineItem, ShippingMethod, Customer } from './types/GraphQL';
import { formatAttributeList, getVariantByAttributes } from './_utils';

interface ProductVariantFilters {
  master?: boolean;
  attributes?: Record<string, string>;
}

// Product
export const getProductName = (product: ProductVariant | Readonly<ProductVariant>): string => product ? (product as any)._name : '';

export const getProductSlug = (product: ProductVariant | Readonly<ProductVariant>): string => product ? (product as any)._slug : '';

// todo change to getProductPrices returning different types of prices https://github.com/DivanteLtd/next/issues/128

export const getProductPrice = (product: ProductVariant | Readonly<ProductVariant>): number | null => product ? product.price.value.centAmount / 100 : null;

export const getProductGallery = (product: ProductVariant | Readonly<ProductVariant>): UiMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image: Image) => ({
      small: image.url,
      big: image.url,
      normal: image.url
    }));

export const getProductVariants = (products: ProductVariant[] | Readonly<ProductVariant[]>, filters: ProductVariantFilters | any = {}): ProductVariant[] | Readonly<ProductVariant[]> => {
  if (!products) {
    return [];
  }

  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    return [getVariantByAttributes(products, filters.attributes)];
  }

  if (filters.master) {
    return products.filter((product) => (product as any)._master);
  }

  return products;
};

export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: Array<string>): Record<string, AgnosticProductAttribute | string> => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as ProductVariant[];

  if (!products || productList.length === 0) {
    return {} as any;
  }

  const formatAttributes = (product: ProductVariant): Array<AgnosticProductAttribute> =>
    formatAttributeList(product.attributeList).filter((attribute) => filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute);

  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some((el) => el.name === curr.name && el.value === curr.value);

    if (!isAttributeExist) {
      return [...prev, curr];
    }

    return prev;
  };

  const reduceByAttributeName = (prev, curr) => ({
    ...prev,
    [curr.name]: isSingleProduct ? curr.value : [
      ...(prev[curr.name] || []),
      { value: curr.value,
        label: curr.label }
    ]
  });

  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, [])
    .reduce(reduceByAttributeName, {});
};

export const getProductDescription = (product: ProductVariant): any => (product as any)._description;

export const getProductCategories = (product: ProductVariant): string[] => (product as any)._categoriesRef;

export const getProductId = (product: ProductVariant): number => (product as any)._id;

// Category
export const getCategoryProducts = (category: Category, options: any = {}): ProductVariant[] => {
  if (!category || !(category as any)._products) {
    return [];
  }

  const { _products } = category as any;

  if (options.master) {
    return _products.filter((v) => (v as any)._master);
  }

  return _products;
};

export const getCategoryTree = (category: Category): UiCategory | null => {
  const getRoot = (category: Category): Category => (category.parent ? getRoot(category.parent) : category);
  const buildTree = (rootCategory: Category) => ({
    label: rootCategory.name,
    slug: rootCategory.slug,
    items: rootCategory.children.map(buildTree)
  });

  if (!category) {
    return null;
  }

  return buildTree(getRoot(category));
};

// Cart

export const getCartProducts = (cart: Cart): LineItem[] => {
  if (!cart) {
    return [];
  }

  return cart.lineItems;
};

export const getCartProductName = (product: LineItem): string => product.name;

export const getCartProductImage = (product: LineItem): string => product.variant.images[0].url;

export const getCartProductPrice = (product: LineItem): number => product.price.value.centAmount / 100;

export const getCartProductQty = (product: LineItem): number => product.quantity;

export const getCartProductAttributes = (product: LineItem, filterByAttributeName?: Array<string>) =>
  getProductAttributes(product.variant, filterByAttributeName);

export const getCartProductSku = (product: LineItem): string => product.variant.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => {
  if (!cart) {
    return {
      total: 0,
      subtotal: 0
    };
  }

  const subtotalPrice = cart.totalPrice.centAmount;
  const shipping = cart.shippingInfo ? cart.shippingInfo.price.centAmount : 0;

  return {
    total: (shipping + subtotalPrice) / 100,
    subtotal: subtotalPrice / 100
  };
};

export const getCartShippingPrice = (cart: Cart): number => cart && cart.shippingInfo ? cart.shippingInfo.price.centAmount / 100 : 0;

export const getCartTotalItems = (cart: Cart): number => {
  if (!cart) {
    return 0;
  }

  return cart.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

// ShippingMethod

export const getShippingMethodId = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.id : '';

export const getShippingMethodName = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.name : '';

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string =>
  shippingMethod ? shippingMethod.description : '';

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => {
  if (!shippingMethod || !shippingMethod.zoneRates) {
    return null;
  }

  // TODO(CHECKOUT): cover the case with zones
  return shippingMethod.zoneRates[0].shippingRates[0].price.centAmount / 100;
};

// User

export const getUserFirstName = (user: Customer): string => user ? user.firstName : '';

export const getUserLastName = (user: Customer): string => user ? user.lastName : '';

export const getUserFullName = (user: Customer): string => user ? `${user.firstName} ${user.lastName}` : '';
