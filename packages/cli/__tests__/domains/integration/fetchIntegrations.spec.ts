import { fetchIntegrations } from '../../../src/domains/integration';

describe('fetchIntegrations | integration tests', () => {
  it('fetches the integration list', async () => {
    const integrations = await fetchIntegrations();

    expect(integrations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          gitRepositoryURL: expect.any(String)
        })
      ])
    );
  });
});
