import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductVariant, ProductPrice, DiscountedProductPriceValue, LineItem } from './../types/GraphQL';
import { DiscountedLineItemPrice } from '../types/GraphQL';
import { getCartItemQty } from './cartGetters';

export const getAttributeValue = (attribute) => {

  /**
   * List of attribute types: https://docs.commercetools.com/api/projects/productTypes#attributetype
   */
  switch (attribute.attributeDefinition.type.name) {
    case 'text':
    case 'ltext':
    case 'boolean':
    case 'number':
    case 'date':
    case 'time':
    case 'datetime':
    case 'money':
    case 'set':
      return attribute.value;

    case 'lenum':
    case 'enum':
      return attribute.value.key;

    case 'reference':
      return { typeId: attribute.value.typeId, id: attribute.value.id };

    default:
      return null;
  }
};

export const formatAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    const attrValue = getAttributeValue(attr);
    return {
      name: attr.name,
      value: attrValue,
      label: attr._translated
    };
  });

export const getVariantByAttributes = (products: ProductVariant[] | Readonly<ProductVariant[]>, attributes: any): ProductVariant => {
  if (!products || products.length === 0) {
    return null;
  }

  const configurationKeys = Object.keys(attributes);

  return products.find((product) => {
    const currentAttributes = formatAttributeList(product.attributesRaw);

    return configurationKeys.every((attrName) =>
      currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
    );
  });
};

const getPrice = (price: ProductPrice | DiscountedProductPriceValue | DiscountedLineItemPrice) => {
  return price ? price.value.centAmount / 100 : null;
};

const getDiscount = (product: ProductVariant | LineItem) => product.price?.discounted;

const getSpecialPrice = (product: ProductVariant | LineItem) => {
  const discount = getDiscount(product);

  if (isLineItem(product)) {
    const { discountedPricePerQuantity } = product;
    const discountsLength = discountedPricePerQuantity.length;

    if (discountsLength > 0) {
      return getPrice(discountedPricePerQuantity[discountsLength - 1].discountedPrice);
    }
  }

  if (discount?.discount.isActive) {
    return getPrice(discount);
  }

  return null;
};

export const createPrice = (product: ProductVariant | LineItem): AgnosticPrice => {
  if (!product || !product.price) {
    return { regular: null, special: null };
  }

  const quantity = isLineItem(product) ? getCartItemQty(product) : 1;

  const regularPrice = getPrice(product.price) * quantity;
  const specialPrice = getSpecialPrice(product) * quantity;

  return {
    regular: regularPrice,
    special: specialPrice
  };
};

function isLineItem (product: ProductVariant | LineItem): product is LineItem {
  return product.__typename === 'LineItem';
}
