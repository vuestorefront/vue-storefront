import { mountMixinWithStore } from '@vue-storefront/unit-tests/utils'

import compareMountedMixin from '../../../mixins/compareMountedMixin'

describe('compareMountedMixin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('load compare state on mount', () => {
    const storeMock = {
      modules: {
        compare: {
          actions: {
            load: jest.fn()
          },
          namespaced: true
        }
      }
    }

    mountMixinWithStore(compareMountedMixin, storeMock)

    expect(storeMock.modules.compare.actions.load).toBeCalled()
  })
})
