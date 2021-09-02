import isGuest from '../../src/api/isGuest';

const getMockContext = () => ({
  client: {
    tokenProvider: true
  },
  config: {
    handleIsGuest: null,
    auth: {
      onTokenRead: null
    }
  }
});

describe('[commercetools-api-client] isGuest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('defaults to false', () => {
    const context = getMockContext();
    context.client.tokenProvider = false;

    expect(isGuest(context)).toBeFalsy();
  });

  it('calls "handleIsGuest" from config', () => {
    const context = getMockContext();
    context.config.handleIsGuest = jest.fn().mockImplementation(() => true);

    expect(isGuest(context)).toBeTruthy();
    expect(context.config.handleIsGuest).toBeCalled();
  });

  it('returns true if visitor is a guest', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: '' }));

    expect(isGuest(context)).toBeTruthy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });

  it('returns false if visitor has user session', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: 'customer_id' }));

    expect(isGuest(context)).toBeFalsy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });

  it('returns false if visitor has anonymous session', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: 'anonymous_id' }));

    expect(isGuest(context)).toBeFalsy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });
});
