import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils';

import Unsubscribe from '../../../mixins/Unsubscribe'

jest.mock('vuelidate/lib/validators', () => ({
  email: {},
  required: {}
}))

describe('Unsubscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('method unsubscribe dispatches unsubscribe action successfully', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            unsubscribe: jest.fn(() => true)
          },
          namespaced: true
        }
      }
    };
    const emit = jest.fn()

    const wrapper = mountMixinWithStore(Unsubscribe, storeMock, {
      mocks: {
        $emit: emit,
        $v: {
          $invalid: false
        }
      }
    });

    await (wrapper.vm as any).unsubscribe()

    expect(storeMock.modules.newsletter.actions.unsubscribe).toBeCalledWith(expect.anything(), '');
    expect(emit).toBeCalledWith('unsubscribed', true)
  })

  it('method unsubscribe dispatches unsubscribe action but it fails', async () => {
    const storeMock = {
      modules: {
        newsletter: {
          actions: {
            unsubscribe: jest.fn(() => Promise.reject('error'))
          },
          namespaced: true
        }
      }
    };
    const emit = jest.fn()

    const wrapper = mountMixinWithStore(Unsubscribe, storeMock, {
      mocks: {
        $emit: emit,
        $v: {
          $invalid: false
        }
      }
    });

    await (wrapper.vm as any).unsubscribe()

    expect(storeMock.modules.newsletter.actions.unsubscribe).toBeCalledWith(expect.anything(), '');
    expect(emit).toBeCalledWith('unsubscription-error', 'error')
  })
});
