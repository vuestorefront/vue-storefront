import { ProductVariant, Attribute } from '../../types/GraphQL';
import { getAttributeValue } from '../../getters/_utils';
import { Filter, FilterOption } from '@vue-storefront/commercetools-api';

const extractAttributes = (product: ProductVariant): Attribute[] => product.attributeList;

const flattenAttributes = (prev: Attribute[], curr: Attribute[]): Attribute[] => [...prev, ...(curr || [])];

const getFilterFromAttribute = (attribute: Attribute, prev: Record<string, Filter>): Filter => {
  const attrValue = getAttributeValue(attribute);
  const filter: Filter = prev[attribute.name] || {
    type: (attribute as any).__typename,
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
