import enhanceProfile from './../../src/helpers/internals/enhanceProfile';

const createCartResponse = (items): any => ({
  data: {
    me: {
      activeCart: {
        lineItems: items
      }
    }
  }
});

describe('[commercetools-composables] enhanceProfile', () => {
  it('returns cart response items configurations', () => {
    const profileResponse = createCartResponse([
      { prod: '1',
        variant: { attributeList: [{ name: 'attr1',
          value: '20' }] } }
    ]);

    expect(enhanceProfile(profileResponse)).toEqual({
      data: {
        me: {
          activeCart: {
            lineItems: [
              {
                prod: '1',
                variant: { attributeList: [{ name: 'attr1',
                  value: '20' }] },
                _configuration: [{ name: 'attr1',
                  value: '20' }]
              }
            ]
          }
        }
      }
    });
  });
});
