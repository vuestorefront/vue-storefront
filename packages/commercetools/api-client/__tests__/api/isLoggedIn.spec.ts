import isLoggedIn from '../../src/api/isLoggedIn';

const getMockContext = () => ({
  client: {
    tokenProvider: true
  },
  config: {
    handleIsLoggedIn: null,
    auth: {
      onTokenRead: null
    }
  }
});

describe('[commercetools-api-client] isLoggedIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('defaults to false', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn();

    expect(isLoggedIn(context)).toBeFalsy();
  });

  it('calls "handleIsLoggedIn" from config', () => {
    const context = getMockContext();
    context.config.handleIsLoggedIn = jest.fn().mockImplementation(() => true);

    expect(isLoggedIn(context)).toBeTruthy();
    expect(context.config.handleIsLoggedIn).toBeCalled();
  });

  it('returns false if visitor is a guest', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: '' }));

    expect(isLoggedIn(context)).toBeFalsy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });

  it('returns false if visitor has anonymous session', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: 'anonymous_id' }));

    expect(isLoggedIn(context)).toBeFalsy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });

  it('returns true if visitor has user session', () => {
    const context = getMockContext();
    context.config.auth.onTokenRead = jest.fn().mockImplementation(() => ({ scope: 'customer_id' }));

    expect(isLoggedIn(context)).toBeTruthy();
    expect(context.config.auth.onTokenRead).toBeCalled();
  });
});
