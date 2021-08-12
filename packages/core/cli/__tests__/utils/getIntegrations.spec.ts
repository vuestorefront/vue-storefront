import integrations from '@vue-storefront/cli/src/utils/getIntegrations';

describe('[@core/cli/src/utils] Integrations', () => {
  it('integrations should be an object', () => {
    expect(integrations).toEqual(expect.any(Object));
  });
});
