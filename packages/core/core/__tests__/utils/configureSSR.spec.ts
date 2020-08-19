
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

  });
});
