import { ref } from '@vue/composition-api';
import makeComputedGetters from '../src/makeComputedGetters';

describe('[CORE core] makeComputedGetters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should map all getter functions to computed getters', () => {
    const mockGetters = {
      getProducts: param => `${param}`,
      getTree: param => `${param}`
    };

    const computedGetters = makeComputedGetters(mockGetters);

    expect(computedGetters.getProducts('test')).toEqual(ref('test'));
    expect(computedGetters.getTree('test')).toEqual(ref('test'));
  });

  it('should computed getters include all parameters', () => {
    const mockGetters = {
      getProducts: (param, param2, param3) => `${param} ${param2} ${param3}`
    };

    const computedGetters = makeComputedGetters(mockGetters);
    expect(computedGetters.getProducts('param1', 'param2', 'param3').value).toEqual('param1 param2 param3');
  });
});
