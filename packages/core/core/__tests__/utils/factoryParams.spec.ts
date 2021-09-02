import { configureFactoryParams } from '../../src/utils/factoryParams';

describe('context', () => {
  it('create factory params', async () => {
    const factoryParams = {
      provide: () => ({ b: 2, c: 3 }),
      testFn1: () => ({ b: 4, c: 5 }),
      testFn2: () => ({ b: 6, c: 7 }),
      api: {
        platformFn1: (context, params) => params.name
      }
    };

    const mainRef = { value: '' };
    const loading = { value: '' };
    const error = { value: '' };

    const params = configureFactoryParams(
      factoryParams,
      { mainRef, alias: 'currentTest', loading, error }
    );

    expect(params).toEqual({
      provide: expect.any(Function),
      testFn1: expect.any(Function),
      testFn2: expect.any(Function),
      api: {
        platformFn1: expect.any(Function)
      }
    });

    expect(params.testFn1()).toEqual({ b: 4, c: 5 });
    expect(params.testFn2()).toEqual({ b: 6, c: 7 });
    await params.api.platformFn1({ name: 'test-param' });
    expect(mainRef.value).toEqual('test-param');
  });
});
