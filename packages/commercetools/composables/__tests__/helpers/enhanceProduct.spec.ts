import enhanceProduct from './../../src/helpers/internals/enhanceProduct';

const attributesRaw = () => [
  { name: 'attr1', attributeDefinition: { type: { name: 'number'} }, value: '34' },
  { name: 'attr2', attributeDefinition: { type: { name: 'ltext'} }, value: { en: 'size' } },
  { name: 'attr3', attributeDefinition: { type: { name: 'lenum'} }, value: { label: { en: 'color' } } }
];

const product = (name, slug, id) => ({
  masterData: {
    current: {
      name,
      slug,
      masterVariant: {
        id
      },
      categoriesRef: [{ id: 'aaa' }],
      allVariants: [
        { id: '123', attributesRaw: attributesRaw() },
        { id: '456', attributesRaw: attributesRaw() },
        { id: '789', attributesRaw: attributesRaw() }
      ]
    }
  }
});

const productResponse = {
  data: {
    products: {
      results: [
        product('prod1', 'prod-1', 'sde213'),
        product('prod2', 'prod-2', '34s42d'),
        product('prod3', 'prod-3', 'fdf334'),
        product('prod4', 'prod-4', 'dfsdf3')
      ]
    }
  }
} as any;

const context = {
  $ct: {
    config: { locale: 'en' }
  }
} as any;

describe('[commercetools-composables] enhanceProduct', () => {
  it('returns category response with the products inside', () => {
    expect(enhanceProduct(productResponse, context)).toMatchSnapshot();
  });
});
