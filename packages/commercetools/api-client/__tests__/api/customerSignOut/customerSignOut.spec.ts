import customerSignOut from './../../../src/api/customerSignOut';
import { auth } from './../../../src/index';

describe('[commercetools-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears user session', async () => {
    await customerSignOut();

    expect(auth.onTokenRemove).toBeCalled();
  });
});
