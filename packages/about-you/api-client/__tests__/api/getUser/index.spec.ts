import getUser from '../../../src/api/getUser';

describe('[about-you-api-client] getUser', () => {
  it('loads user', async () => {
    getUser();
  });
});
