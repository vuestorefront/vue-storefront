import {
  generateContext,
  useVSFContext,
  configureContext
} from '../../src/utils/context';
import { Context } from '../../src/types';

describe('context', () => {
  it('useVSFContext returns {} by default', () => {
    expect(useVSFContext()).toEqual({});
  });

  it('is possible to set useVSFContext with configureContext', () => {
    const myFn = jest.fn((): Context => ({}));
    configureContext({
      useVSFContext: myFn
    });

    expect(myFn).toBe(useVSFContext);
  });

  it('configureContext uses fallback to current useVSFContext if not provided', () => {
    const myFn = jest.fn((): Context => ({}));

    configureContext({
      useVSFContext: myFn
    });
    configureContext({
      useVSFContext: null
    });

    expect(myFn).toBe(useVSFContext);
  });

  // it('applyContextToApi adds context as first argument to api functions', () => {
  //   const api = {
  //     firstFunc: jest.fn(),
  //     secondFunc: jest.fn(),
  //     thirdFunc: jest.fn()
  //   };
  //   const context = 123;

  //   const apiWithContext: any = applyContextToApi(api, context);

  //   apiWithContext.firstFunc();
  //   apiWithContext.secondFunc('TEST');
  //   apiWithContext.thirdFunc('A', 'FEW', 'ARGS');

  //   expect(api.firstFunc).toHaveBeenCalledWith(context);
  //   expect(api.secondFunc).toHaveBeenCalledWith(context, 'TEST');
  //   expect(api.thirdFunc).toHaveBeenCalledWith(context, 'A', 'FEW', 'ARGS');
  // });

  it('generateContext returns useVSFContext().$vsf if setup not provided', () => {
    const myFn = jest.fn((): Context => ({
      $vsf: 12345
    }));
    configureContext({
      useVSFContext: myFn
    });

    const generatedContext = generateContext({});

    expect(generatedContext).toBe(12345);
  });

  it('generateContext adds value returned by factoryParams.setup() to generated context', () => {
    const vsfObject = {
      a: 1
    };
    const factoryParams = {
      provide () {
        return {
          b: 2,
          c: 3
        };
      }
    };
    const myFn = jest.fn((): Context => ({
      $vsf: vsfObject
    }));
    configureContext({
      useVSFContext: myFn
    });

    const generatedContext = generateContext(factoryParams);

    expect(generatedContext).toEqual({
      a: 1,
      b: 2,
      c: 3
    });
  });
});
