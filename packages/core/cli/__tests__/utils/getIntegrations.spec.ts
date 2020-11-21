import getIntegrations from '@vue-storefront/cli/src/utils/getIntegrations';

// const expectedIntegrations = ['commercetools', 'shopify'];
const expectedIntegrations = ['commercetools'];

describe('[vsf-next-cli] getIntegrations', () => {
  it('gets dependencies from package.json and transform them to list of integrations with filtering', () => {
    const integrations = getIntegrations();
    expect(integrations.sort()).toEqual(expectedIntegrations.sort());
  });
});
