
import { createMiddleware } from '../../src/server';

jest.mock('express', () => ({
  __esModule: true,
  json: jest.fn(),
  default: () => ({
    use: () => {}
  })
}));

describe('[CORE - server] createMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates middleware', () => {
    const { middleware } = createMiddleware({});

    expect(middleware.handler).toBeInstanceOf(Object);
    expect(middleware.path).toEqual('/api');
  });

  it('extends middleware', () => {
    const extendApi = jest.fn();
    const { extend } = createMiddleware({ extendApi });

    extend(extendApi);

    expect(extendApi).toBeCalledTimes(2);
  });
});
