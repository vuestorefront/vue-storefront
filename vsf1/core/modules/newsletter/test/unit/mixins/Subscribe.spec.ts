import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import Subscribe from '../../../mixins/Subscribe'

jest.mock('vuelidate/lib/validators', () => ({
  email: {},
  required: {}
}))

describe('Subscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('method subscribe dispatches subscription action successfully', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn()
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    (wrapper.vm as any).subscribe()

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '');
  })

  it('method subscribe dispatches subscription action successfully with success Callback', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(() => true)
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    const successCallback = jest.fn()

    await (wrapper.vm as any).subscribe(successCallback)

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '');
    expect(successCallback).toBeCalledWith(true)
  })

  it('method subscribe handles dispatching subscription action that fails', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(() => Promise.reject('subscription failed'))
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    await (wrapper.vm as any).subscribe(() => {})

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '');
  })

  it('method subscribe dispatches subscription action that fails given an error handler', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(() => Promise.reject('subscription failed'))
          },
          namespaced: true
        }
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    const errorCallback = jest.fn()

    await (wrapper.vm as any).subscribe(() => {}, errorCallback)

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '');
    expect(errorCallback).toBeCalledWith('subscription failed')
  })
});
