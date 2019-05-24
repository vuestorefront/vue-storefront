import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils'

import SubscriptionStatus from '../../../mixins/SubscriptionStatus'

jest.mock('vuelidate/lib/validators', () => ({
  email: {},
  required: {}
}))

describe('SubscriptionStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('updates subscription status on mount if user emails is set', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => false)
          },
          namespaced: true
        },
        user: {
          state: {
            current: {
              email: 'e@ma.il'
            }
          },
          namespaced: true
        }
      }
    }

    mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    })

    expect(storeMock.modules.newsletter.actions.status).toBeCalled()
  })

  it('does not update subscription status on mount if user data is not available', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => false)
          },
          namespaced: true
        },
        user: {
          state: {
            current: null
          },
          namespaced: true
        }
      }
    }

    mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    })

    expect(storeMock.modules.newsletter.actions.status).not.toBeCalled()
  })

  it('starts watching subscription status on mount, stops watching on destroy', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => false)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const busOnHook = jest.fn()
    const busOffHook = jest.fn()

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: busOnHook,
          $off: busOffHook
        }
      }
    })

    wrapper.destroy()

    expect(busOnHook).toBeCalled()
    expect(busOffHook).toBeCalled()
  })

  it('updates subscription status on mount if user emails is set', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => false)
          },
          namespaced: true
        },
        user: {
          state: {
            current: {
              email: 'e@ma.il'
            }
          },
          namespaced: true
        }
      }
    }

    const busOnHook = jest.fn()
    const busOffHook = jest.fn()

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: busOnHook,
          $off: busOffHook
        }
      }
    })

    wrapper.destroy()

    expect(storeMock.modules.newsletter.actions.status).toBeCalled()
    expect(busOnHook).toBeCalled()
    expect(busOffHook).toBeCalled()
  })

  it('renders subscription status', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => true)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    }, "<p v-if='isSubscribed'>should be displayed</p>")

    expect(wrapper).toMatchInlineSnapshot('<p>should be displayed</p>')
  })

  it('method checkStatus can be called without callbacks', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => true)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    });

    (wrapper.vm as any).checkStatus()

    expect(storeMock.modules.newsletter.actions.status).toBeCalled()
  })

  it('method checkStatus can be called without callbacks', () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => true)
          },
          getters: {
            isSubscribed: jest.fn(() => true)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    });

    (wrapper.vm as any).checkStatus()

    expect(storeMock.modules.newsletter.actions.status).toBeCalled()
  })

  it('method checkStatus handles dispatching fetching status data action that fails', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => Promise.reject('fetching failed'))
          },
          getters: {
            isSubscribed: jest.fn(() => true)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    });

    await (wrapper.vm as any).checkStatus()

    expect(storeMock.modules.newsletter.actions.status).toBeCalled()
  })

  it('method checkStatus handles dispatching fetching status data action that fails with custom handler', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            status: jest.fn(() => Promise.reject('fetching failed'))
          },
          getters: {
            isSubscribed: jest.fn(() => true)
          },
          namespaced: true
        },
        user: {
          namespaced: true
        }
      }
    }

    const wrapper = mountMixinWithStore(SubscriptionStatus, storeMock, {
      mocks: {
        $emit: jest.fn(),
        $v: {
          $invalid: false
        },
        $bus: {
          $on: jest.fn()
        }
      }
    });

    const errorHandler = jest.fn()

    await (wrapper.vm as any).checkStatus(() => {}, errorHandler)

    expect(errorHandler).toBeCalled()
  })
})
