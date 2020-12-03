import customerSignOut from './../../../src/api/customerSignOut';

describe('[commercetools-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears user session', async () => {
    const context = {
      $ct: { api: { cleanSession: jest.fn() }}
    };
    await customerSignOut(context);

    expect(context.$ct.api.cleanSession).toBeCalled();
  });
});
