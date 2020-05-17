import { getCategoryTree } from '../../../src/composables/getters/categoryGetters';

describe('[about-you-composables] category getters', () => {
  it('getCategoryTree returns null given no category', async () => {
    expect(getCategoryTree(null as any)).toEqual(null);
  });

  it('getCategoryTree returns 1-level category tree given category with no children', async () => {
    const category = {
      name: 'foo',
      slug: 'bar',
      path: '/baz'
    };
    const expectedCategoryTree = {
      label: category.name,
      slug: category.slug,
      path: category.path,
      items: []
    };

    expect(getCategoryTree(category as any)).toEqual(expectedCategoryTree);
  });

  it('getCategoryTree returns multi-level category tree given category with children', async () => {
    const category = {
      name: 'foo',
      slug: 'bar',
      path: '/baz',
      children: [
        {
          name: 'qux',
          slug: 'quat',
          path: '/corge'
        }
      ]
    };
    const expectedCategoryTree = {
      label: category.name,
      slug: category.slug,
      path: category.path,
      items: [
        {
          label: 'qux',
          slug: 'quux',
          path: '/corge',
          items: []
        }
      ]
    };

    expect(getCategoryTree(category as any)).toEqual(expectedCategoryTree);
  });
});
