import { ProductVariant, Attribute, Filter, FilterOption } from '@vue-storefront/commercetools-api';
import { getAttributeValue } from '../../getters/_utils';

const extractAttributes = (product: ProductVariant): Attribute[] => product.attributesRaw;

const flattenAttributes = (prev: Attribute[], curr: Attribute[]): Attribute[] => [...prev, ...(curr || [])];

const getFilterFromAttribute = (attribute: Attribute, prev) => {
  const attrValue = getAttributeValue(attribute);
  const filter = prev[attribute.name] || {
    type: (attribute as any).attributeDefinition.type.name,
    options: []
  };
  const option: FilterOption = {
    value: attrValue,
    label: (attribute as any).label || (typeof attrValue === 'string' ? attrValue : null),
    selected: false
  };
  const hasSuchOption = filter.options.some(opt => opt.value === option.value);
  hasSuchOption || filter.options.push(option);
  return filter;
};

export default (products: ProductVariant[]): Record<string, Filter> => {
  if (!products) {
    return {};
  }

  return products.map(extractAttributes).reduce(flattenAttributes, []).reduce((prev, attribute) => {
    prev[attribute.name] = getFilterFromAttribute(attribute, prev);
    return prev;
  }, {});
};
