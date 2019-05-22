import { mountMixinWithStore } from "@vue-storefront/unit-tests/utils";

import Subscribe from '../../../mixins/Subscribe'

jest.mock('vuelidate/lib/validators',() => ({
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
        },
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    (<any> wrapper.vm).subscribe()

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '', undefined);
  })

  it('method subscribe dispatches subscription action successfully with success Callback', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(() => true)
          },
          namespaced: true
        },
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

    await (<any> wrapper.vm).subscribe(successCallback)

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '', undefined);
    expect(successCallback).toBeCalledWith(true)
  })

  it('method subscribe handles dispatching subscription action that fails', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(()=> Promise.reject('subscription failed'))
          },
          namespaced: true
        },
      }
    };

    const wrapper = mountMixinWithStore(Subscribe, storeMock, {
      mocks: {
        $v: {
          $invalid: false
        }
      }
    });

    await (<any> wrapper.vm).subscribe(()=>{})

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '', undefined);
  })

  it('method subscribe dispatches subscription action that fails given an error handler', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            subscribe: jest.fn(()=> Promise.reject('subscription failed'))
          },
          namespaced: true
        },
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

    await (<any> wrapper.vm).subscribe(()=>{}, errorCallback)

    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), '', undefined);
    expect(errorCallback).toBeCalledWith('subscription failed')
  })
});
