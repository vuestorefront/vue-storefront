import { ProductVariant } from '../../types/GraphQL';
import { getAttributeValue } from '../../getters/_utils';
import { Filter, FilterOption } from '@vue-storefront/commercetools-api/lib/types/Api';

export default (products: ProductVariant[]): Record<string, Filter> => {
  if (!products) {
    return {};
  }

  const attributes = products.map(product => product.attributeList).reduce((prev, curr) => [...prev, ...(curr || [])], []);
  return attributes.reduce((prev, attribute) => {
    const filter: Filter = prev[attribute.name] || {
      type: (attribute as any).__typename,
      options: []
    };
    const attrValue = getAttributeValue(attribute);
    const option: FilterOption = {
      value: attrValue,
      label: (attribute as any).label || (typeof attrValue === 'string' ? attrValue : null),
      selected: false
    };
    const hasSuchOption = filter.options.some(opt => opt.value === option.value);
    hasSuchOption || filter.options.push(option);
    prev[attribute.name] = filter;
    return prev;
  }, {});
};
