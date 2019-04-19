import { mountMixinWithStore } from "@vue-storefront/unit-tests/utils";

import { Newsletter } from '../../../components/Newsletter'
import Vue from "vue"
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'


Vue.prototype.$bus = EventBus

Vue.prototype.$v = {
  $invalid: false
};


describe('Newsletter', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('newsletter dispatches subscriptionStatus action', () => {

    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: {
              email: "me@example.com"
            }
          }
        }
      }
    };

    const wrapper = mountMixinWithStore(Newsletter, storeMock);

    (<any> wrapper.vm).checkStatus()

    expect(storeMock.modules.newsletter.actions.status).toBeCalledWith(expect.anything(), "me@example.com", undefined);
  })

  it('newsletter dispatches subscribe action', () => {

    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(),
            subscribe: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: {
              email: "me@example.com"
            }
          }
        }
      }
    };

    const wrapper = mountMixinWithStore(Newsletter, storeMock);

    (<any> wrapper.vm).subscribe()

    expect(storeMock.modules.newsletter.actions.status).toBeCalledWith(expect.anything(), "me@example.com", undefined);
    expect(storeMock.modules.newsletter.actions.subscribe).toBeCalledWith(expect.anything(), "me@example.com", undefined);
  })

  it('newsletter dispatches unsubscribe action', () => {

    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(),
            unsubscribe: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: {
              email: "me@example.com"
            }
          }
        }
      }
    };

    const wrapper = mountMixinWithStore(Newsletter, storeMock);

    (<any> wrapper.vm).unsubscribe()

    expect(storeMock.modules.newsletter.actions.status).toBeCalledWith(expect.anything(), "me@example.com", undefined);
    expect(storeMock.modules.newsletter.actions.unsubscribe).toBeCalledWith(expect.anything(), "me@example.com", undefined);
  })

  it('newsletter dispatches subscriptionStatus action when user is not logged in', () => {

    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: null
          }
        }
      }
    };

    mountMixinWithStore(Newsletter, storeMock);

    expect(storeMock.modules.newsletter.actions.status).not.toBeCalled()
  })

  it('newsletter dispatches subscriptionStatus action when user is logged in', () => {

    let storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn()
          },
          namespaced: true
        },
        user: {
          state: {
            current: null
          }
        }
      }
    };

    mountMixinWithStore(Newsletter, storeMock);

    expect(storeMock.modules.newsletter.actions.status).not.toBeCalledWith()

    storeMock.modules.user.state.current = {
      email: "me@example.com"
    }
    EventBus.$emit('user-after-loggedin')
    expect(storeMock.modules.newsletter.actions.status).toBeCalledWith(expect.anything(), "me@example.com", undefined)
  })

});
