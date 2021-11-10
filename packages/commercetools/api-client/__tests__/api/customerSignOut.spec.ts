import customerSignOut from '../../src/api/customerSignOut';

const mockContext = {
  config: {
    auth: {
      onTokenRemove: null
    }
  },
  client: {
    tokenProvider: null
  }
};

describe('[commercetools-api-client] customerSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls "onTokenRemove" if provided', () => {
    const onTokenRemove = jest.fn().mockImplementation(() => {});
    mockContext.config.auth.onTokenRemove = onTokenRemove;

    customerSignOut(mockContext);
    expect(onTokenRemove).toBeCalled();
  });
});
