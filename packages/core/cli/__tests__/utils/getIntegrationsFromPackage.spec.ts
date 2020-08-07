import getIntegrationsFromPackage from '../../src/utils/getIntegrationsFromPackage';

jest.mock('fs', () => ({
  readFileSync: () => `{
        "dependencies": {
            "@vue-storefront/about-you-theme": "^0.0.1",
            "@vue-storefront/boilerplate-theme": "^0.0.3",
            "@vue-storefront/commercetools-theme": "^0.0.3",
            "@vue-storefront/nuxt-theme": "^0.0.1",
            "inquirer": "^7.3.3"
        }
    }`
}));

const expectedIntegrations = ['about-you', 'commercetools'];

describe('[vsf-next-cli] getIntegrationsFromPackage', () => {
  it('gets dependencies from package.json and transform them to list of integrations with filtering', () => {

    const integrations = getIntegrationsFromPackage();
    expect(integrations.sort()).toEqual(expectedIntegrations.sort());

  });
});
