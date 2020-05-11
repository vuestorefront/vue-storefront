import * as types from '../../../store/mutation-types'
import reviewedMutations from '../../../store/mutations'

describe('Review mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('REVIEW_UPD_REVIEWS', () => {
    it('update review items', () => {
      const stateMock = {
        items: []
      }
      const reviewItem = { foo: '123' }
      const expectedState = {
        items: [
          reviewItem
        ]
      }
      const wrapper = (mutations: any) => mutations[types.REVIEW_UPD_REVIEWS](stateMock, [ reviewItem ])

      wrapper(reviewedMutations)

      expect(stateMock).toEqual(expectedState)
    })
  })
})
