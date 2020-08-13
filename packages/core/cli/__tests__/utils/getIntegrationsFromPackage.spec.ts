import getIntegrationsFromPackage from '../../src/utils/getIntegrationsFromPackage';

const expectedIntegrations = ['about-you', 'commercetools'];

describe('[vsf-next-cli] getIntegrationsFromPackage', () => {
  it('gets dependencies from package.json and transform them to list of integrations with filtering', () => {
    const integrations = getIntegrationsFromPackage();
    expect(integrations.sort()).toEqual(expectedIntegrations.sort());
  });
});
