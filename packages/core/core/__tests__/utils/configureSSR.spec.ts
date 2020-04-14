import { configureSSR, useSSR } from '../../src/utils/ssr';

const vm = {
  $isServer: true,
  $ssrContext: {
    nuxt: {
      vsfState: null
    }
  }
};

jest.mock('@vue/composition-api', () => ({
  getCurrentInstance: () => vm
}));

describe('[CORE - utils] configureSSR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('configures ssr implementation', () => {
    const saveToInitialStateMock = jest.fn();
    const useSSRMock = jest.fn(() => ({
      initialState: 'some state',
      saveToInitialState: saveToInitialStateMock
    }));

    configureSSR({ useSSR: useSSRMock });

    const { initialState, saveToInitialState } = useSSR('cache-id');
    saveToInitialState('some value');

    expect(useSSRMock).toBeCalledWith('cache-id');
    expect(saveToInitialStateMock).toBeCalledWith('some value');
    expect(initialState).toEqual('some state');
  });
});
