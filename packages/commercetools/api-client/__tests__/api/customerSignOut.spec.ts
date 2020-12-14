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

  it('calls "invalidateTokenInfo" if provided', () => {
    const tokenProvider = { invalidateTokenInfo: jest.fn().mockImplementation(() => {}) };
    mockContext.client.tokenProvider = tokenProvider;

    customerSignOut(mockContext);
    expect(tokenProvider.invalidateTokenInfo).toBeCalled();
  });

  it('calls "onTokenRemove" and "invalidateTokenInfo" if both are provided', () => {
    const onTokenRemove = jest.fn().mockImplementation(() => {});
    const tokenProvider = { invalidateTokenInfo: jest.fn().mockImplementation(() => {}) };
    mockContext.config.auth.onTokenRemove = onTokenRemove;
    mockContext.client.tokenProvider = tokenProvider;

    customerSignOut(mockContext);
    expect(onTokenRemove).toBeCalled();
    expect(tokenProvider.invalidateTokenInfo).toBeCalled();
  });
});
